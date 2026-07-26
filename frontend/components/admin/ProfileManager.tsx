"use client";

import { useEffect, useState } from "react";
import { api, Profile } from "@/lib/api";

const EMPTY: Profile = {
  name: "",
  profile_picture: null,
  cover_image: null,
  short_bio: "",
  long_bio: "",
  location: "",
  email_public: "",
  linkedin_url: "",
  github_url: "",
  website_url: "",
};
export default function ProfileManager() {
  const [form, setForm] = useState<Profile>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getProfile()
      .then((p) => setForm(p))
      .catch(() => setError("Could not load profile."))
      .finally(() => setLoading(false));
  }, []);

  const [uploading, setUploading] = useState<string | null>(null);

  async function onFileChange(key: "profile_picture" | "cover_image", file: File | null) {
    if (!file) return;
    setUploading(key);
    setError("");
    try {
      const result = await api.upload(file);
      setForm((f) => ({ ...f, [key]: result.url }));
    } catch {
      setError(`Could not upload ${key === "profile_picture" ? "profile picture" : "cover image"}.`);
    } finally {
      setUploading(null);
    }
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const updated = await api.updateProfile(form);
      setForm(updated);
      setSaved(true);
    } catch {
      setError("Could not save profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-dim text-sm">Loading...</p>;

  const fields: { key: keyof Profile; label: string; textarea?: boolean; file?: boolean }[] = [
    { key: "name", label: "Full name" },
    { key: "short_bio", label: "Short bio (shown in Hero)" },
    { key: "long_bio", label: "Long bio (shown in About)", textarea: true },
    { key: "location", label: "Location" },
    { key: "email_public", label: "Public email" },
    { key: "linkedin_url", label: "LinkedIn URL" },
    { key: "github_url", label: "GitHub URL" },
    { key: "website_url", label: "Website URL" },
    { key: "profile_picture", label: "Profile picture", file: true },
    { key: "cover_image", label: "Cover image", file: true },
  ];

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-2">Profile</h2>
      <p className="text-dim text-sm mb-6">
        These fields feed your Hero, About, Contact, and Footer sections directly.
      </p>
      <form onSubmit={onSave} className="glass p-6 grid md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className={`flex flex-col gap-1.5 ${f.textarea ? "md:col-span-2" : ""}`}>
            <label className="text-[11px] text-faint uppercase tracking-wide font-mono">{f.label}</label>
            {f.textarea ? (
              <textarea
                rows={4}
                value={form[f.key] || ""}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="bg-white/[0.02] border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan transition"
              />
            ) : f.file ? (
              <div className="flex items-center gap-3">
                {form[f.key] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={
                      String(form[f.key]).startsWith("http")
                        ? String(form[f.key])
                        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${form[f.key]}`
                    }
                    alt={f.label}
                    className="w-12 h-12 rounded-lg object-cover border border-line flex-shrink-0"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFileChange(f.key as "profile_picture" | "cover_image", e.target.files?.[0] || null)}
                  className="text-xs text-dim file:mr-3 file:px-3 file:py-1.5 file:rounded-full file:border file:border-line-strong file:bg-transparent file:text-cyan file:text-xs file:cursor-pointer"
                />
                {uploading === f.key && <span className="text-xs text-faint font-mono">Uploading...</span>}
              </div>
            ) : (
              <input
                value={form[f.key] || ""}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="bg-white/[0.02] border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan transition"
              />
            )}
          </div>
        ))}
        <div className="md:col-span-2 flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || uploading !== null}
            className="btn-primary px-6 py-2.5 rounded-full text-[13px] font-mono text-white border-none cursor-pointer disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save profile"}
          </button>
          {saved && <span className="text-cyan text-xs font-mono">✓ Saved</span>}
          {error && <span className="text-red-400 text-xs font-mono">{error}</span>}
        </div>
      </form>
    </div>
  );
}
