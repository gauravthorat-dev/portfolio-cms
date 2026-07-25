"use client";

import { useEffect, useState } from "react";
import { api, MessageItem } from "@/lib/api";
import { Trash2, Mail, MailOpen } from "lucide-react";

export default function MessagesManager() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      setMessages(await api.getMessages());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function toggleRead(m: MessageItem) {
    await api.updateMessage(m.id, { is_read: !m.is_read });
    refresh();
  }

  async function remove(id: number) {
    if (!confirm("Delete this message?")) return;
    await api.deleteMessage(id);
    refresh();
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-5">Messages</h2>
      {loading ? (
        <p className="text-dim text-sm">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-dim text-sm">No messages yet.</p>
      ) : (
        <div className="glass overflow-hidden">
          {messages.map((m, i) => (
            <div key={m.id} className={`px-6 py-4 ${i !== 0 ? "border-t border-line" : ""} ${m.is_read ? "" : "bg-cyan/[0.03]"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">{m.name} <span className="text-faint font-mono text-xs">— {m.email}</span></div>
                  <p className="text-dim text-[13.5px] mt-1.5 leading-relaxed max-w-xl">{m.message}</p>
                  <div className="text-[11px] text-faint font-mono mt-2">{new Date(m.created_at).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button onClick={() => toggleRead(m)} className="text-dim hover:text-cyan transition" title={m.is_read ? "Mark unread" : "Mark read"}>
                    {m.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                  </button>
                  <button onClick={() => remove(m.id)} className="text-dim hover:text-red-400 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
