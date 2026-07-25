import re
from models import Project, Certificate, Skill, Experience, Education, SocialLink
from routes.crud_factory import make_crud_blueprint


def slugify(text):
    text = (text or "").lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-") or "project"


def project_before_create(data):
    if not data.get("slug"):
        data["slug"] = slugify(data.get("title"))
    return data


def project_before_update(data, item):
    if "title" in data and not data.get("slug"):
        data["slug"] = slugify(data["title"])
    return data


projects_bp = make_crud_blueprint(
    "projects", Project, before_create=project_before_create, before_update=project_before_update
)
certificates_bp = make_crud_blueprint("certificates", Certificate)
skills_bp = make_crud_blueprint("skills", Skill)
experience_bp = make_crud_blueprint("experience", Experience)
education_bp = make_crud_blueprint("education", Education)
social_links_bp = make_crud_blueprint("social-links", SocialLink)
