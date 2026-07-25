"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ResourceConfig } from "@/lib/resourceConfig";
import { Trash2, Plus } from "lucide-react";

type Row = Record<string, any>;

function emptyForm(config: ResourceConfig): Row {
  const row: Row = {};
  for (const f of config.fields) {
    if (f.type === "checkbox") row[f.key] = false;
    else if (f.type === "number") row[f.key] = 0;
    else row[f.key] = "";
  }
  return row;
}

export default function ResourceManager({ config }: { config: ResourceConfig }) {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Row>(emptyForm(config));
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    try {
      const data = await api.list<Row>(config.key);
      setItems(data);
    } catch {
      setError("Could not load data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setForm(emptyForm(config));
    setShowForm(false);
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.key]);

  const [uploading, setUploading] = useState<string | null>(null);

  async function onFileChange(key: string, file: File | null) {
    if (!file) return;
    setUploading(key);
    setError("");
    try {
      const result = await api.upload(file);
      setForm((f) => ({ ...f, [key]: result.url }));
    } catch {
      setError(`Could not upload ${key}.`);
    } finally {
      setUploading(null);
    }
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload: Row = { ...form };
      for (const f of config.fields) {
        if (f.type === "csv") {
          payload[f.key] = String(payload[f.key] || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }
      await api.create(config.key, payload);
      setForm(emptyForm(config));
      setShowForm(false);
      refresh();
    } catch (err: any) {
      setError(err.message || "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: number) {
    if (!confirm("Delete this item?")) return;
    await api.remove(config.key, id);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl font-semibold">{config.label}</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 text-[13px] font-mono text-cyan border border-line-strong px-4 py-2 rounded-full hover:bg-cyan/5 transition"
        >
          <Plus size={14} /> Add {config.label.slice(0, -1) || config.label}
        </button>
      </div>

      {showForm && (
        <form onSubmit={onCreate} className="glass p-6 mb-6 grid md:grid-cols-2 gap-4">
          {config.fields.map((f) => (
            <div key={f.key} className={`flex flex-col gap-1.5 ${f.type === "textarea" ? "md:col-span-2" : ""}`}>
              <label className="text-[11px] text-faint uppercase tracking-wide font-mono">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="bg-white/[0.02] border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan transition"
                />
              ) : f.type === "checkbox" ? (
                <input
                  type="checkbox"
                  checked={!!form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                  className="w-4 h-4 mt-1"
                />
              ) : f.type === "file" ? (
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept={f.key === "pdf_file" ? "application/pdf" : "image/*"}
                    onChange={(e) => onFileChange(f.key, e.target.files?.[0] || null)}
                    className="text-xs text-dim file:mr-3 file:px-3 file:py-1.5 file:rounded-full file:border file:border-line-strong file:bg-transparent file:text-cyan file:text-xs file:cursor-pointer"
                  />
                  {uploading === f.key && <span className="text-xs text-faint font-mono">Uploading...</span>}
                  {!uploading && form[f.key] && <span className="text-xs text-mint font-mono">✓ uploaded</span>}
                </div>
              ) : (
                <input
                  type={f.type === "number" ? "number" : "text"}
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })
                  }
                  className="bg-white/[0.02] border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan transition"
                />
              )}
            </div>
          ))}
          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving || uploading !== null}
              className="btn-primary px-6 py-2.5 rounded-full text-[13px] font-mono text-white border-none cursor-pointer disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            {error && <span className="text-red-400 text-xs font-mono">{error}</span>}
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-dim text-sm">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-dim text-sm">No {config.label.toLowerCase()} yet.</p>
      ) : (
        <div className="glass overflow-hidden">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center justify-between px-6 py-4 ${i !== 0 ? "border-t border-line" : ""}`}
            >
              <div>
                <div className="text-sm font-medium">{item[config.titleField]}</div>
                <div className="text-xs text-faint font-mono mt-0.5">
                  {config.fields
                    .filter((f) => f.key !== config.titleField && f.type !== "textarea")
                    .slice(0, 3)
                    .map((f) => `${f.label}: ${Array.isArray(item[f.key]) ? item[f.key].join(", ") : item[f.key]}`)
                    .join("  ·  ")}
                </div>
              </div>
              <button onClick={() => onDelete(item.id)} className="text-dim hover:text-red-400 transition">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
