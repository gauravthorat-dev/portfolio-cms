import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from extensions import db
from models import Resume

bp = Blueprint("resume", __name__, url_prefix="/api/resume")


@bp.get("")
def get_active_resume():
    resume = Resume.query.filter_by(is_active=True).order_by(Resume.uploaded_at.desc()).first()
    if not resume:
        return jsonify({"error": "No resume uploaded yet."}), 404
    return jsonify(resume.to_dict())


@bp.post("")
@jwt_required()
def upload_resume():
    if "file" not in request.files:
        return jsonify({"error": "No file provided."}), 400
    f = request.files["file"]
    if not f.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Resume must be a PDF."}), 400

    safe_name = f"{uuid.uuid4().hex}_{secure_filename(f.filename)}"
    folder = current_app.config["UPLOAD_FOLDER"]
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, safe_name)
    f.save(path)

    # deactivate previous resumes, this one becomes current
    Resume.query.update({Resume.is_active: False})
    record = Resume(file_url=f"/uploads/{safe_name}", original_name=f.filename, is_active=True)
    db.session.add(record)
    db.session.commit()
    return jsonify(record.to_dict()), 201


@bp.get("/history")
@jwt_required()
def resume_history():
    items = Resume.query.order_by(Resume.uploaded_at.desc()).all()
    return jsonify([i.to_dict() for i in items])
