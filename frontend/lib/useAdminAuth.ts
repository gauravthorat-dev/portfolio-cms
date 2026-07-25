"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export function useAdminAuth() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? window.localStorage.getItem("cms_token") : null;
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    api
      .me()
      .then((u) => {
        setUser(u);
        setReady(true);
      })
      .catch(() => {
        window.localStorage.removeItem("cms_token");
        router.replace("/admin/login");
      });
  }, [router]);

  function logout() {
    window.localStorage.removeItem("cms_token");
    router.replace("/admin/login");
  }

  return { ready, user, logout };
}
