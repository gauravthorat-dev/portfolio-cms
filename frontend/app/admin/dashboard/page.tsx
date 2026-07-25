"use client";

import { useState } from "react";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { RESOURCES } from "@/lib/resourceConfig";
import ResourceManager from "@/components/admin/ResourceManager";
import MessagesManager from "@/components/admin/MessagesManager";
import { LogOut } from "lucide-react";

const TABS = [...RESOURCES.map((r) => r.key), "messages"];

export default function DashboardPage() {
  const { ready, user, logout } = useAdminAuth();
  const [tab, setTab] = useState(TABS[0]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center text-dim text-sm font-mono">
        Verifying access...
      </div>
    );
  }

  const activeResource = RESOURCES.find((r) => r.key === tab);

  return (
    <div className="min-h-screen bg-void">
      <header className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-line">
        <div>
          <div className="font-display font-semibold text-lg">Portfolio CMS</div>
          <div className="text-xs text-faint font-mono mt-0.5">Signed in as {user?.login_email}</div>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-dim hover:text-cyan transition text-sm font-mono">
          <LogOut size={15} /> Sign out
        </button>
      </header>
      <div className="flex flex-col md:flex-row">
        <nav className="md:w-56 flex-shrink-0 border-b md:border-b-0 md:border-r border-line p-4 flex md:flex-col gap-1 overflow-x-auto">
          {RESOURCES.map((r) => (
            <button
              key={r.key}
              onClick={() => setTab(r.key)}
              className={`text-left px-4 py-2.5 rounded-lg text-sm whitespace-nowrap transition ${
                tab === r.key ? "bg-cyan/10 text-cyan" : "text-dim hover:text-text hover:bg-white/[0.03]"
              }`}
            >
              {r.label}
            </button>
          ))}
          <button
            onClick={() => setTab("messages")}
            className={`text-left px-4 py-2.5 rounded-lg text-sm whitespace-nowrap transition ${
              tab === "messages" ? "bg-cyan/10 text-cyan" : "text-dim hover:text-text hover:bg-white/[0.03]"
            }`}
          >
            Messages
          </button>
        </nav>
        <main className="flex-1 p-6 md:p-10">
          {tab === "messages" ? <MessagesManager /> : activeResource ? <ResourceManager config={activeResource} /> : null}
        </main>
      </div>
    </div>
  );
}
