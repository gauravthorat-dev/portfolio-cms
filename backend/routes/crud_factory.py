"""
Generic CRUD blueprint factory.

Each simple resource (projects, certificates, skills, experience, education,
social_links) follows the same shape: public GET list/detail, admin-only
POST/PUT/DELETE, optional ordering. Rather than hand-write six nearly
identical files, we build them here and keep resource-specific quirks
(slug generation, JSON fields) in small hooks.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db


def make_crud_blueprint(name, model, order_field="order", before_create=None, before_update=None):
    bp = Blueprint(name, __name__, url_prefix=f"/api/{name}")

    def _query():
        q = model.query
        if hasattr(model, order_field):
            q = q.order_by(getattr(model, order_field).asc())
        return q

    @bp.get("")
    def list_items():
        items = _query().all()
        return jsonify([i.to_dict() for i in items])

    @bp.get("/<int:item_id>")
    def get_item(item_id):
        item = model.query.get_or_404(item_id)
        return jsonify(item.to_dict())

    @bp.post("")
    @jwt_required()
    def create_item():
        data = request.get_json(silent=True) or {}
        if before_create:
            data = before_create(data)
        item = model(**{k: v for k, v in data.items() if hasattr(model, k)})
        db.session.add(item)
        db.session.commit()
        return jsonify(item.to_dict()), 201

    @bp.put("/<int:item_id>")
    @jwt_required()
    def update_item(item_id):
        item = model.query.get_or_404(item_id)
        data = request.get_json(silent=True) or {}
        if before_update:
            data = before_update(data, item)
        for k, v in data.items():
            if hasattr(model, k):
                setattr(item, k, v)
        db.session.commit()
        return jsonify(item.to_dict())

    @bp.delete("/<int:item_id>")
    @jwt_required()
    def delete_item(item_id):
        item = model.query.get_or_404(item_id)
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Deleted."})

    return bp
