import os
from datetime import timedelta
from dotenv import load_dotenv

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "change-this-secret-key")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "change-this-jwt-secret-key")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=12)

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'portfolio.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
    MAX_CONTENT_LENGTH = 25 * 1024 * 1024  # 25 MB
    ALLOWED_IMAGE_EXT = {"png", "jpg", "jpeg", "gif", "webp", "svg"}
    ALLOWED_DOC_EXT = {"pdf"}

    CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",")

    OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "admin@example.com")
    OWNER_PASSWORD = os.environ.get("OWNER_PASSWORD", "ChangeMe123!")
    OWNER_NAME = os.environ.get("OWNER_NAME", "Gaurav Thorat")
