import hashlib
from collections import Counter
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models import VisitorStat

bp = Blueprint("stats", __name__, url_prefix="/api/stats")


@bp.post("/track")
def track_visit():
    data = request.get_json(silent=True) or {}
    ip = request.headers.get("X-Forwarded-For", request.remote_addr) or "unknown"
    ip_hash = hashlib.sha256(ip.encode()).hexdigest()

    record = VisitorStat(
        path=data.get("path", "/"),
        country=data.get("country", "Unknown"),
        device=data.get("device", "Unknown"),
        referrer=data.get("referrer", "Direct"),
        ip_hash=ip_hash,
    )
    db.session.add(record)
    db.session.commit()
    return jsonify({"message": "Tracked."}), 201


@bp.get("/summary")
@jwt_required()
def summary():
    rows = VisitorStat.query.all()
    total = len(rows)
    countries = Counter(r.country or "Unknown" for r in rows)
    devices = Counter(r.device or "Unknown" for r in rows)
    pages = Counter(r.path or "/" for r in rows)
    sources = Counter(r.referrer or "Direct" for r in rows)

    def top(counter, n=10):
        return [{"label": k, "count": v} for k, v in counter.most_common(n)]

    return jsonify({
        "total_visitors": total,
        "countries": top(countries),
        "devices": top(devices),
        "top_pages": top(pages),
        "traffic_sources": top(sources),
    })
