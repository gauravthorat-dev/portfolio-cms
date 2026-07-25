from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models import Setting

bp = Blueprint("settings", __name__, url_prefix="/api/settings")

DEFAULT_SETTINGS = {
    "theme_primary_color": "#3fe4ff",
    "theme_secondary_color": "#9d6bff",
    "homepage_title": "Gaurav Thorat — Backend Engineer & AI Systems Builder",
    "seo_description": "Portfolio of Gaurav Thorat, Python backend engineer and AI enthusiast.",
    "meta_tags": "",
    "google_analytics_id": "",
    "favicon_url": "",
    "logo_url": "",
}


@bp.get("")
def list_settings():
    rows = {s.key: s.value for s in Setting.query.all()}
    merged = {**DEFAULT_SETTINGS, **rows}
    return jsonify(merged)


@bp.put("")
@jwt_required()
def update_settings():
    data = request.get_json(silent=True) or {}
    for key, value in data.items():
        row = Setting.query.get(key)
        if row:
            row.value = value
        else:
            row = Setting(key=key, value=value)
            db.session.add(row)
    db.session.commit()
    rows = {s.key: s.value for s in Setting.query.all()}
    return jsonify({**DEFAULT_SETTINGS, **rows})
