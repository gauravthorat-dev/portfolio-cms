import os
from flask import Flask, jsonify
from config import Config
from extensions import db, jwt, cors, migrate

from routes.auth import bp as auth_bp
from routes.profile import bp as profile_bp
from routes.settings import bp as settings_bp
from routes.uploads import bp as uploads_bp, serve_bp as serve_uploads_bp
from routes.messages import bp as messages_bp
from routes.resume import bp as resume_bp
from routes.stats import bp as stats_bp
from routes.resources import (
    projects_bp,
    certificates_bp,
    skills_bp,
    experience_bp,
    education_bp,
    social_links_bp,
)


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    os.makedirs(os.path.join(app.instance_path), exist_ok=True)
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}}, supports_credentials=True)

    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(settings_bp)
    app.register_blueprint(uploads_bp)
    app.register_blueprint(serve_uploads_bp)
    app.register_blueprint(messages_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(stats_bp)
    app.register_blueprint(projects_bp)
    app.register_blueprint(certificates_bp)
    app.register_blueprint(skills_bp)
    app.register_blueprint(experience_bp)
    app.register_blueprint(education_bp)
    app.register_blueprint(social_links_bp)

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Not found."}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Internal server error."}), 500

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
