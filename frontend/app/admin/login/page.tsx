"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.login(email, password);
      window.localStorage.setItem("cms_token", res.access_token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-5">
      <form onSubmit={onSubmit} className="glass w-full max-w-sm p-9">
        <div className="font-display text-lg font-semibold mb-1">Portfolio CMS</div>
        <p className="text-dim text-sm mb-7">Sign in to manage your site.</p>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-[11px] text-faint uppercase tracking-wide font-mono">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/[0.02] border border-line rounded-[10px] px-3.5 py-3 text-sm outline-none focus:border-cyan transition"
          />
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-[11px] text-faint uppercase tracking-wide font-mono">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/[0.02] border border-line rounded-[10px] px-3.5 py-3 text-sm outline-none focus:border-cyan transition"
          />
        </div>
        {error && <p className="text-red-400 text-xs mb-4 font-mono">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center px-7 py-3.5 rounded-full text-[13.5px] font-mono text-white border-none cursor-pointer disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in →"}
        </button>
      </form>
    </div>
  );
}
