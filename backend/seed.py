"""
Run with: python seed.py
Creates the single owner account (from .env OWNER_EMAIL / OWNER_PASSWORD)
and populates sample portfolio content so the site isn't empty on first run.
Safe to re-run - it skips creating rows that already exist.
"""
from app import create_app
from extensions import db
from config import Config
from models import (
    User, Project, Certificate, Skill, Experience, Education,
    SocialLink, Setting,
)

app = create_app()

with app.app_context():
    db.create_all()

    if not User.query.first():
        owner = User(
            email=Config.OWNER_EMAIL,
            name=Config.OWNER_NAME,
            short_bio="Python backend developer and AI enthusiast.",
            long_bio=(
                "I build intelligent systems and scalable applications with clean backend "
                "architecture - mostly in Python and Flask, with a growing focus on AI-driven "
                "tools and secure design. Currently completing an MCA while shipping real projects."
            ),
            location="India",
            email_public="hello@example.com",
            linkedin_url="https://linkedin.com/in/example",
            github_url="https://github.com/example",
            website_url="",
        )
        owner.set_password(Config.OWNER_PASSWORD)
        db.session.add(owner)
        print(f"Created owner account: {Config.OWNER_EMAIL}")
    else:
        print("Owner account already exists, skipping.")

    if not Project.query.first():
        db.session.add_all([
            Project(
                title="Jarvis NX", slug="jarvis-nx",
                short_description="Voice-driven AI assistant with task automation.",
                description="A voice-driven virtual assistant with task automation and real-time "
                             "information lookup, built on Python and a lightweight ML pipeline.",
                tech_stack=["Python", "Flask", "SQLite", "WebSocket"],
                tags=["AI", "Assistant"], featured=True, order=1,
            ),
            Project(
                title="FashionHub", slug="fashionhub",
                short_description="Full e-commerce platform with admin panel.",
                description="A full e-commerce platform with cart, checkout, and an admin panel "
                             "for catalog and order management.",
                tech_stack=["Flask", "SQLAlchemy", "JWT"],
                tags=["E-commerce"], featured=False, order=2,
            ),
            Project(
                title="Applied ML experiments", slug="applied-ml-experiments",
                short_description="ML/DL notebooks covering classification and regression.",
                description="A collection of machine learning and deep learning notebooks "
                             "covering classification, regression, and model evaluation.",
                tech_stack=["Python", "scikit-learn", "Pandas"],
                tags=["AI", "ML"], featured=False, order=3,
            ),
            Project(
                title="Networking labs", slug="networking-labs",
                short_description="Simulated network topologies for hands-on learning.",
                description="Simulated network topologies exploring routing, subnetting, and "
                             "basic security scenarios.",
                tech_stack=["Cisco Packet Tracer", "Networking"],
                tags=["Networking"], featured=False, order=4,
            ),
        ])

    if not Certificate.query.first():
        db.session.add_all([
            Certificate(
                title="The Joy of Computing Using Python", issuer="NPTEL", issue_date="2024",
                credential_id="NPTEL24CS0912", grade="Elite", duration="12 weeks",
                category="Programming",
                skills_learned=["Python", "Problem Solving", "Turtle Graphics", "Recursion"],
                description="A comprehensive introduction to computational thinking and Python programming.",
                featured=True, order=1,
            ),
            Certificate(
                title="Data Structures & Algorithms", issuer="NPTEL", issue_date="2024",
                credential_id="NPTEL24CS0745", grade="Distinction", duration="8 weeks",
                category="Computer Science",
                skills_learned=["Data Structures", "Algorithms", "Time Complexity"],
                description="Core data structures and algorithmic problem solving.",
                featured=False, order=2,
            ),
            Certificate(
                title="Cyber Security & Privacy", issuer="NPTEL", issue_date="2023",
                credential_id="NPTEL23CS0631", grade="Pass", duration="6 weeks",
                category="Security",
                skills_learned=["Network Security", "Cryptography Basics", "Privacy"],
                description="Foundational concepts in cyber security and data privacy.",
                featured=False, order=3,
            ),
        ])

    if not Skill.query.first():
        skills = [
            ("Python", "Languages", 90, "#3fe4ff"),
            ("Java", "Languages", 65, "#3fe4ff"),
            ("JavaScript", "Languages", 60, "#3fe4ff"),
            ("Flask", "Backend", 85, "#4a7dff"),
            ("REST APIs", "Backend", 80, "#4a7dff"),
            ("SQL", "Backend", 75, "#4a7dff"),
            ("MySQL", "Backend", 75, "#4a7dff"),
            ("AI / ML", "Data & ML", 65, "#9d6bff"),
            ("Data Structures", "Data & ML", 80, "#9d6bff"),
            ("Algorithms", "Data & ML", 78, "#9d6bff"),
            ("Cyber Security", "Data & ML", 60, "#9d6bff"),
            ("Git & GitHub", "Tools", 85, "#5be8a8"),
        ]
        db.session.add_all([
            Skill(name=n, category=c, level=l, color=col, order=i)
            for i, (n, c, l, col) in enumerate(skills)
        ])

    if not Experience.query.first():
        db.session.add_all([
            Experience(company="Remote", role="Python Developer Intern", duration="2025",
                       description="Built backend APIs and AI-assisted features using Python, Flask, and applied ML.", order=1),
            Experience(company="Remote", role="AI & ML Intern", duration="2024",
                       description="Worked on model training and data analysis projects.", order=2),
            Experience(company="On-site", role="Web Developer Intern", duration="2023",
                       description="Built responsive websites and learned front-end fundamentals.", order=3),
        ])

    if not Education.query.first():
        db.session.add_all([
            Education(degree="MCA", college="In progress", duration="2025 - present",
                      description="Master of Computer Applications.", order=1),
            Education(degree="BCA", college="Completed", duration="2022 - 2025",
                      description="Bachelor of Computer Applications.", order=2),
        ])

    if not SocialLink.query.first():
        db.session.add_all([
            SocialLink(platform="GitHub", url="https://github.com/example", order=1),
            SocialLink(platform="LinkedIn", url="https://linkedin.com/in/example", order=2),
        ])

    defaults = {
        "theme_primary_color": "#3fe4ff",
        "theme_secondary_color": "#9d6bff",
        "homepage_title": "Gaurav Thorat — Backend Engineer & AI Systems Builder",
        "seo_description": "Portfolio of Gaurav Thorat, Python backend engineer and AI enthusiast.",
    }
    for k, v in defaults.items():
        if not Setting.query.get(k):
            db.session.add(Setting(key=k, value=v))

    db.session.commit()
    print("Seed complete.")
