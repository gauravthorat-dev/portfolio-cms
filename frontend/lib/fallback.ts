import { Project, Certificate, Skill, ExperienceItem, EducationItem, Profile } from "./api";

export const fallbackProfile: Profile = {
  name: "Gaurav Thorat",
  profile_picture: null,
  cover_image: null,
  short_bio: "Python backend developer and AI enthusiast.",
  long_bio:
    "I build intelligent systems and scalable applications with clean backend architecture — mostly in Python and Flask, with a growing focus on AI-driven tools and secure design.",
  location: "India",
  email: "hello@example.com",
  linkedin_url: "https://linkedin.com/in/example",
  github_url: "https://github.com/example",
  website_url: "",
};

export const fallbackProjects: Project[] = [
  {
    id: 1, title: "Jarvis NX", slug: "jarvis-nx",
    short_description: "Voice-driven AI assistant with task automation.",
    description: "A voice-driven virtual assistant with task automation and real-time information lookup.",
    thumbnail: null, screenshots: [], github_url: "#", live_url: "#",
    tech_stack: ["Python", "Flask", "SQLite", "WebSocket"], tags: ["AI"], featured: true, order: 1,
  },
  {
    id: 2, title: "FashionHub", slug: "fashionhub",
    short_description: "Full e-commerce platform with admin panel.",
    description: "A full e-commerce platform with cart, checkout, and an admin panel.",
    thumbnail: null, screenshots: [], github_url: "#", live_url: "#",
    tech_stack: ["Flask", "SQLAlchemy", "JWT"], tags: ["E-commerce"], featured: false, order: 2,
  },
  {
    id: 3, title: "Applied ML experiments", slug: "applied-ml-experiments",
    short_description: "ML/DL notebooks covering classification and regression.",
    description: "A collection of machine learning and deep learning notebooks.",
    thumbnail: null, screenshots: [], github_url: "#", live_url: "#",
    tech_stack: ["Python", "scikit-learn", "Pandas"], tags: ["ML"], featured: false, order: 3,
  },
  {
    id: 4, title: "Networking labs", slug: "networking-labs",
    short_description: "Simulated network topologies for hands-on learning.",
    description: "Simulated network topologies exploring routing, subnetting, and security scenarios.",
    thumbnail: null, screenshots: [], github_url: "#", live_url: "#",
    tech_stack: ["Cisco Packet Tracer"], tags: ["Networking"], featured: false, order: 4,
  },
];

export const fallbackCertificates: Certificate[] = [
  {
    id: 1, title: "The Joy of Computing Using Python", issuer: "NPTEL", issuer_logo: null,
    issue_date: "2024", credential_id: "NPTEL24CS0912", credential_url: null, image: null, pdf_file: null,
    skills_learned: ["Python", "Problem Solving", "Recursion"], grade: "Elite", duration: "12 weeks",
    description: "A comprehensive introduction to computational thinking and Python programming.",
    category: "Programming", featured: true, order: 1,
  },
  {
    id: 2, title: "Data Structures & Algorithms", issuer: "NPTEL", issuer_logo: null,
    issue_date: "2024", credential_id: "NPTEL24CS0745", credential_url: null, image: null, pdf_file: null,
    skills_learned: ["Data Structures", "Algorithms"], grade: "Distinction", duration: "8 weeks",
    description: "Core data structures and algorithmic problem solving.",
    category: "Computer Science", featured: false, order: 2,
  },
  {
    id: 3, title: "Cyber Security & Privacy", issuer: "NPTEL", issuer_logo: null,
    issue_date: "2023", credential_id: "NPTEL23CS0631", credential_url: null, image: null, pdf_file: null,
    skills_learned: ["Network Security", "Cryptography Basics"], grade: "Pass", duration: "6 weeks",
    description: "Foundational concepts in cyber security and data privacy.",
    category: "Security", featured: false, order: 3,
  },
];

export const fallbackSkills: Skill[] = [
  { id: 1, name: "Python", category: "Languages", level: 90, color: "#3fe4ff", icon: null, order: 0 },
  { id: 2, name: "Java", category: "Languages", level: 65, color: "#3fe4ff", icon: null, order: 1 },
  { id: 3, name: "JavaScript", category: "Languages", level: 60, color: "#3fe4ff", icon: null, order: 2 },
  { id: 4, name: "Flask", category: "Backend", level: 85, color: "#4a7dff", icon: null, order: 3 },
  { id: 5, name: "REST APIs", category: "Backend", level: 80, color: "#4a7dff", icon: null, order: 4 },
  { id: 6, name: "SQL", category: "Backend", level: 75, color: "#4a7dff", icon: null, order: 5 },
  { id: 7, name: "MySQL", category: "Backend", level: 75, color: "#4a7dff", icon: null, order: 6 },
  { id: 8, name: "AI / ML", category: "Data & ML", level: 65, color: "#9d6bff", icon: null, order: 7 },
  { id: 9, name: "Data Structures", category: "Data & ML", level: 80, color: "#9d6bff", icon: null, order: 8 },
  { id: 10, name: "Algorithms", category: "Data & ML", level: 78, color: "#9d6bff", icon: null, order: 9 },
  { id: 11, name: "Cyber Security", category: "Data & ML", level: 60, color: "#9d6bff", icon: null, order: 10 },
  { id: 12, name: "Git & GitHub", category: "Tools", level: 85, color: "#5be8a8", icon: null, order: 11 },
];

export const fallbackExperience: ExperienceItem[] = [
  { id: 1, company: "Remote", role: "Python Developer Intern", duration: "2025", description: "Built backend APIs and AI-assisted features using Python and Flask.", logo: null, order: 1 },
  { id: 2, company: "Remote", role: "AI & ML Intern", duration: "2024", description: "Worked on model training and data analysis projects.", logo: null, order: 2 },
  { id: 3, company: "On-site", role: "Web Developer Intern", duration: "2023", description: "Built responsive websites and learned front-end fundamentals.", logo: null, order: 3 },
];

export const fallbackEducation: EducationItem[] = [
  { id: 1, degree: "MCA", college: "In progress", duration: "2025 - present", description: "Master of Computer Applications.", order: 1 },
  { id: 2, degree: "BCA", college: "Completed", duration: "2022 - 2025", description: "Bachelor of Computer Applications.", order: 2 },
];
