"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, FileText, Menu, PlusCircle, X } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";
import { KpuLogo } from "@/components/site-header";
import type { SessionUser } from "@/types";

export function AppShell({ user, mode, children }: { user: SessionUser; mode: "internal" | "admin"; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const base = "/" + mode;
  const side = (
    <>
      <div className="sidebar-brand">
        <span className="sidebar-logo-wrap">
          <KpuLogo className="sidebar-logo" />
        </span>
        <div>
          <strong className="text-sm">KPU Kota Cirebon</strong>
          <div className="text-xs text-gray-400">{mode === "admin" ? "Panel operator" : "Ruang internal"}</div>
        </div>
      </div>
      <nav className="side-links" onClick={() => setOpen(false)}>
        <Link className="side-link" href={base + "/dashboard"}>
          <BarChart3 size={17} />
          Dashboard
        </Link>
        <Link className="side-link" href={base + "/berita-acara"}>
          <FileText size={17} />
          Berita Acara
        </Link>
        {mode === "admin" && (
          <Link className="side-link" href="/admin/berita-acara/create">
            <PlusCircle size={17} />
            Tambah Berita Acara
          </Link>
        )}
        <Link className="side-link" href="/">
          ← Halaman publik
        </Link>
        <LogoutButton />
      </nav>
    </>
  );

  return (
    <div className="shell">
      <aside className="sidebar">{side}</aside>
      {open && (
        <>
          <button aria-label="Tutup menu" className="drawer-backdrop" onClick={() => setOpen(false)} />
          <aside className="sidebar drawer-sidebar">
            <button className="drawer-close" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
            {side}
          </aside>
        </>
      )}
      <div className="shell-main">
        <header className="topbar">
          <div className="flex items-center gap-3">
            <button aria-label="Buka menu" className="btn btn-secondary menu-btn" onClick={() => setOpen(true)}>
              <Menu size={18} />
            </button>
            <strong>{mode === "admin" ? "Operator / Admin" : "Monitoring Internal"}</strong>
          </div>
          <div className="text-right">
            <strong className="block text-sm">{user.name}</strong>
            <span className="muted text-xs">{user.email}</span>
          </div>
        </header>
        <div className="shell-content">{children}</div>
      </div>
    </div>
  );
}
