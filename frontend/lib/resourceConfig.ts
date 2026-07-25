export type FieldType = "text" | "textarea" | "number" | "checkbox" | "csv" | "file";

export type FieldConfig = {
  key: string;
  label: string;
  type: FieldType;
};

export type ResourceConfig = {
  key: string; // API path, e.g. "projects"
  label: string;
  titleField: string; // which field to show as the row title
  fields: FieldConfig[];
};

export const RESOURCES: ResourceConfig[] = [
  {
    key: "projects",
    label: "Projects",
    titleField: "title",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "short_description", label: "Short description", type: "text" },
      { key: "description", label: "Full description", type: "textarea" },
      { key: "thumbnail", label: "Thumbnail image", type: "file" },
      { key: "github_url", label: "GitHub URL", type: "text" },
      { key: "live_url", label: "Live demo URL", type: "text" },
      { key: "tech_stack", label: "Tech stack (comma separated)", type: "csv" },
      { key: "tags", label: "Tags (comma separated)", type: "csv" },
      { key: "featured", label: "Featured", type: "checkbox" },
      { key: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "certificates",
    label: "Certificates",
    titleField: "title",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "issuer", label: "Issuer", type: "text" },
      { key: "issuer_logo", label: "Issuer logo", type: "file" },
      { key: "issue_date", label: "Issue date", type: "text" },
      { key: "credential_id", label: "Credential ID", type: "text" },
      { key: "credential_url", label: "Verification URL", type: "text" },
      { key: "image", label: "Certificate image", type: "file" },
      { key: "pdf_file", label: "Certificate PDF", type: "file" },
      { key: "skills_learned", label: "Skills learned (comma separated)", type: "csv" },
      { key: "grade", label: "Grade (Elite / Distinction / Pass)", type: "text" },
      { key: "duration", label: "Duration", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "category", label: "Category", type: "text" },
      { key: "featured", label: "Featured", type: "checkbox" },
      { key: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "skills",
    label: "Skills",
    titleField: "name",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "level", label: "Level (0-100)", type: "number" },
      { key: "color", label: "Color (hex)", type: "text" },
      { key: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "experience",
    label: "Experience",
    titleField: "role",
    fields: [
      { key: "role", label: "Role", type: "text" },
      { key: "company", label: "Company", type: "text" },
      { key: "duration", label: "Duration", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "education",
    label: "Education",
    titleField: "degree",
    fields: [
      { key: "degree", label: "Degree", type: "text" },
      { key: "college", label: "College", type: "text" },
      { key: "duration", label: "Duration", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "social-links",
    label: "Social links",
    titleField: "platform",
    fields: [
      { key: "platform", label: "Platform", type: "text" },
      { key: "url", label: "URL", type: "text" },
      { key: "order", label: "Order", type: "number" },
    ],
  },
];
