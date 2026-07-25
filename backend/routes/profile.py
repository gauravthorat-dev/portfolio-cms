from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models import User

bp = Blueprint("profile", __name__, url_prefix="/api/profile")

PUBLIC_EDITABLE_FIELDS = {
    "name", "profile_picture", "cover_image", "short_bio", "long_bio",
    "location", "email_public", "linkedin_url", "github_url", "website_url",
}


@bp.get("")
def get_profile():
    user = User.query.first()
    if not user:
        return jsonify({"error": "Profile not set up yet."}), 404
    return jsonify(user.to_public_dict())


@bp.put("")
@jwt_required()
def update_profile():
    user = User.query.first()
    data = request.get_json(silent=True) or {}
    for k, v in data.items():
        if k in PUBLIC_EDITABLE_FIELDS:
            setattr(user, k, v)
    db.session.commit()
    return jsonify(user.to_public_dict())
