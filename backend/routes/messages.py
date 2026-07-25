from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models import Message

bp = Blueprint("messages", __name__, url_prefix="/api/messages")


@bp.post("")
def create_message():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    body = (data.get("message") or "").strip()

    if not name or not email or not body:
        return jsonify({"error": "Name, email, and message are all required."}), 400

    msg = Message(name=name, email=email, message=body)
    db.session.add(msg)
    db.session.commit()
    return jsonify({"message": "Message sent."}), 201


@bp.get("")
@jwt_required()
def list_messages():
    items = Message.query.order_by(Message.created_at.desc()).all()
    return jsonify([i.to_dict() for i in items])


@bp.put("/<int:message_id>")
@jwt_required()
def update_message(message_id):
    item = Message.query.get_or_404(message_id)
    data = request.get_json(silent=True) or {}
    if "is_read" in data:
        item.is_read = bool(data["is_read"])
    if "reply_status" in data and data["reply_status"] in ("pending", "replied", "archived"):
        item.reply_status = data["reply_status"]
    db.session.commit()
    return jsonify(item.to_dict())


@bp.delete("/<int:message_id>")
@jwt_required()
def delete_message(message_id):
    item = Message.query.get_or_404(message_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Deleted."})
