const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type Project = {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  thumbnail: string | null;
  screenshots: string[];
  github_url: string | null;
  live_url: string | null;
  tech_stack: string[];
  tags: string[];
  featured: boolean;
  order: number;
};

export type Certificate = {
  id: number;
  title: string;
  issuer: string | null;
  issuer_logo: string | null;
  issue_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  image: string | null;
  pdf_file: string | null;
  skills_learned: string[];
  grade: string | null;
  duration: string | null;
  description: string | null;
  category: string | null;
  featured: boolean;
  order: number;
};

export type Skill = {
  id: number;
  name: string;
  category: string | null;
  level: number;
  color: string;
  icon: string | null;
  order: number;
};

export type ExperienceItem = {
  id: number;
  company: string;
  role: string;
  duration: string | null;
  description: string | null;
  logo: string | null;
  order: number;
};

export type EducationItem = {
  id: number;
  degree: string;
  college: string | null;
  duration: string | null;
  description: string | null;
  order: number;
};

export interface Profile {
  name: string;
  profile_picture: string | null;
  cover_image: string | null;
  short_bio: string | null;
  long_bio: string | null;
  location: string | null;
  email_public: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  website_url: string | null;
}

export type MessageItem = {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  reply_status: string;
  created_at: string;
};

function authHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("cms_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  // Public reads
  getProjects: () => request<Project[]>("/api/projects"),
  getCertificates: () => request<Certificate[]>("/api/certificates"),
  getSkills: () => request<Skill[]>("/api/skills"),
  getExperience: () => request<ExperienceItem[]>("/api/experience"),
  getEducation: () => request<EducationItem[]>("/api/education"),

  getProfile: () => request<Profile>("/api/profile"),

  updateProfile: (data: Profile) =>
    request<Profile>("/api/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  getSettings: () => request<Record<string, string>>("/api/settings"),

  sendMessage: (data: { name: string; email: string; message: string }) =>
    request("/api/messages", { method: "POST", body: JSON.stringify(data) }),
  trackVisit: (data: { path: string; referrer?: string; device?: string }) =>
    request("/api/stats/track", { method: "POST", body: JSON.stringify(data) }).catch(() => {}),

  // Auth
  login: (email: string, password: string) =>
    request<{ access_token: string; user: any }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<any>("/api/auth/me"),

  // Generic authenticated CRUD helper for CMS resources
  list: <T>(resource: string) => request<T[]>(`/api/${resource}`),
  create: <T>(resource: string, data: Partial<T>) =>
    request<T>(`/api/${resource}`, { method: "POST", body: JSON.stringify(data) }),
  update: <T>(resource: string, id: number, data: Partial<T>) =>
    request<T>(`/api/${resource}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (resource: string, id: number) =>
    request(`/api/${resource}/${id}`, { method: "DELETE" }),

  // Messages (admin)
  getMessages: () => request<MessageItem[]>("/api/messages"),
  updateMessage: (id: number, data: Partial<MessageItem>) =>
    request<MessageItem>(`/api/messages/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteMessage: (id: number) => request(`/api/messages/${id}`, { method: "DELETE" }),

  // Uploads
  upload: async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_URL}/api/uploads`, {
      method: "POST",
      headers: { ...authHeaders() },
      body: form,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },

  // Stats (admin)
  getStatsSummary: () => request<any>("/api/stats/summary"),
};

export { API_URL };
