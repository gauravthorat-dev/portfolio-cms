import os
import uuid
from flask import Blueprint, request, jsonify, current_app, send_from_directory
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from extensions import db
from models import Upload

bp = Blueprint("uploads", __name__, url_prefix="/api/uploads")


def _ext(filename):
    return filename.rsplit(".", 1)[-1].lower() if "." in filename else ""


@bp.post("")
@jwt_required()
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file provided."}), 400
    f = request.files["file"]
    if f.filename == "":
        return jsonify({"error": "Empty filename."}), 400

    ext = _ext(f.filename)
    is_image = ext in current_app.config["ALLOWED_IMAGE_EXT"]
    is_doc = ext in current_app.config["ALLOWED_DOC_EXT"]
    if not (is_image or is_doc):
        return jsonify({"error": f"File type .{ext} is not allowed."}), 400

    safe_name = f"{uuid.uuid4().hex}_{secure_filename(f.filename)}"
    folder = current_app.config["UPLOAD_FOLDER"]
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, safe_name)
    f.save(path)

    url = f"/uploads/{safe_name}"
    record = Upload(
        filename=safe_name,
        url=url,
        file_type="image" if is_image else "pdf",
        size_bytes=os.path.getsize(path),
    )
    db.session.add(record)
    db.session.commit()
    return jsonify(record.to_dict()), 201


@bp.get("")
@jwt_required()
def list_uploads():
    items = Upload.query.order_by(Upload.created_at.desc()).all()
    return jsonify([i.to_dict() for i in items])


@bp.delete("/<int:upload_id>")
@jwt_required()
def delete_upload(upload_id):
    item = Upload.query.get_or_404(upload_id)
    folder = current_app.config["UPLOAD_FOLDER"]
    path = os.path.join(folder, item.filename)
    if os.path.exists(path):
        os.remove(path)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Deleted."})


# Serves the actual uploaded files at /uploads/<filename>
serve_bp = Blueprint("serve_uploads", __name__)


@serve_bp.get("/uploads/<path:filename>")
def serve_upload(filename):
    return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)
