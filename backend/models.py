from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db


def now():
    return datetime.now(timezone.utc)


class User(db.Model):
    """The single owner/admin account. No public registration."""
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    profile_picture = db.Column(db.String(500))
    cover_image = db.Column(db.String(500))
    short_bio = db.Column(db.Text)
    long_bio = db.Column(db.Text)
    location = db.Column(db.String(255))
    email_public = db.Column(db.String(255))
    linkedin_url = db.Column(db.String(500))
    github_url = db.Column(db.String(500))
    website_url = db.Column(db.String(500))

    created_at = db.Column(db.DateTime, default=now)
    updated_at = db.Column(db.DateTime, default=now, onupdate=now)

    def set_password(self, raw):
        self.password_hash = generate_password_hash(raw)

    def check_password(self, raw):
        return check_password_hash(self.password_hash, raw)

    def to_public_dict(self):
        return {
            "name": self.name,
            "profile_picture": self.profile_picture,
            "cover_image": self.cover_image,
            "short_bio": self.short_bio,
            "long_bio": self.long_bio,
            "location": self.location,
            "email": self.email_public,
            "linkedin_url": self.linkedin_url,
            "github_url": self.github_url,
            "website_url": self.website_url,
        }

    def to_admin_dict(self):
        d = self.to_public_dict()
        d.update({"id": self.id, "login_email": self.email})
        return d


class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    short_description = db.Column(db.String(500))
    description = db.Column(db.Text)
    thumbnail = db.Column(db.String(500))
    screenshots = db.Column(db.JSON, default=list)  # list of URLs
    github_url = db.Column(db.String(500))
    live_url = db.Column(db.String(500))
    tech_stack = db.Column(db.JSON, default=list)  # list of strings
    tags = db.Column(db.JSON, default=list)
    featured = db.Column(db.Boolean, default=False)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=now)
    updated_at = db.Column(db.DateTime, default=now, onupdate=now)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "short_description": self.short_description,
            "description": self.description,
            "thumbnail": self.thumbnail,
            "screenshots": self.screenshots or [],
            "github_url": self.github_url,
            "live_url": self.live_url,
            "tech_stack": self.tech_stack or [],
            "tags": self.tags or [],
            "featured": self.featured,
            "order": self.order,
        }


class Certificate(db.Model):
    __tablename__ = "certificates"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    issuer = db.Column(db.String(255))
    issuer_logo = db.Column(db.String(500))
    issue_date = db.Column(db.String(50))
    credential_id = db.Column(db.String(255))
    credential_url = db.Column(db.String(500))
    image = db.Column(db.String(500))
    pdf_file = db.Column(db.String(500))
    skills_learned = db.Column(db.JSON, default=list)  # list of strings
    grade = db.Column(db.String(100))  # e.g. Elite, Distinction, Pass
    duration = db.Column(db.String(100))
    description = db.Column(db.Text)
    category = db.Column(db.String(100))
    featured = db.Column(db.Boolean, default=False)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=now)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "issuer": self.issuer,
            "issuer_logo": self.issuer_logo,
            "issue_date": self.issue_date,
            "credential_id": self.credential_id,
            "credential_url": self.credential_url,
            "image": self.image,
            "pdf_file": self.pdf_file,
            "skills_learned": self.skills_learned or [],
            "grade": self.grade,
            "duration": self.duration,
            "description": self.description,
            "category": self.category,
            "featured": self.featured,
            "order": self.order,
        }


class Skill(db.Model):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(100))  # e.g. Languages, Backend, Data & ML, Tools
    level = db.Column(db.Integer, default=70)  # 0-100
    color = db.Column(db.String(20), default="#3fe4ff")
    icon = db.Column(db.String(100))
    order = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "level": self.level,
            "color": self.color,
            "icon": self.icon,
            "order": self.order,
        }


class Experience(db.Model):
    __tablename__ = "experience"

    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.String(100))
    description = db.Column(db.Text)
    logo = db.Column(db.String(500))
    order = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "company": self.company,
            "role": self.role,
            "duration": self.duration,
            "description": self.description,
            "logo": self.logo,
            "order": self.order,
        }


class Education(db.Model):
    __tablename__ = "education"

    id = db.Column(db.Integer, primary_key=True)
    degree = db.Column(db.String(255), nullable=False)
    college = db.Column(db.String(255))
    duration = db.Column(db.String(100))
    description = db.Column(db.Text)
    order = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "degree": self.degree,
            "college": self.college,
            "duration": self.duration,
            "description": self.description,
            "order": self.order,
        }


class SocialLink(db.Model):
    __tablename__ = "social_links"

    id = db.Column(db.Integer, primary_key=True)
    platform = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    icon = db.Column(db.String(100))
    order = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "platform": self.platform,
            "url": self.url,
            "icon": self.icon,
            "order": self.order,
        }


class Setting(db.Model):
    __tablename__ = "settings"

    key = db.Column(db.String(100), primary_key=True)
    value = db.Column(db.Text)

    def to_dict(self):
        return {"key": self.key, "value": self.value}


class Upload(db.Model):
    __tablename__ = "uploads"

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(500), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    file_type = db.Column(db.String(50))  # image | pdf
    size_bytes = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=now)

    def to_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "url": self.url,
            "file_type": self.file_type,
            "size_bytes": self.size_bytes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class VisitorStat(db.Model):
    __tablename__ = "visitor_stats"

    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(500))
    country = db.Column(db.String(100))
    device = db.Column(db.String(50))
    referrer = db.Column(db.String(500))
    ip_hash = db.Column(db.String(128))
    created_at = db.Column(db.DateTime, default=now)

    def to_dict(self):
        return {
            "id": self.id,
            "path": self.path,
            "country": self.country,
            "device": self.device,
            "referrer": self.referrer,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    reply_status = db.Column(db.String(50), default="pending")  # pending | replied | archived
    created_at = db.Column(db.DateTime, default=now)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "message": self.message,
            "is_read": self.is_read,
            "reply_status": self.reply_status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class Resume(db.Model):
    __tablename__ = "resume"

    id = db.Column(db.Integer, primary_key=True)
    file_url = db.Column(db.String(500), nullable=False)
    original_name = db.Column(db.String(255))
    uploaded_at = db.Column(db.DateTime, default=now)
    is_active = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            "id": self.id,
            "file_url": self.file_url,
            "original_name": self.original_name,
            "uploaded_at": self.uploaded_at.isoformat() if self.uploaded_at else None,
            "is_active": self.is_active,
        }
