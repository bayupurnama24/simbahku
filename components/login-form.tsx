"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { KpuLogo } from "@/components/site-header";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await r.json();

    if (!r.ok) {
      setError(body.message || "Login gagal");
      setLoading(false);
      return;
    }

    location.href = body.redirect;
  }

  return (
    <form onSubmit={submit} className="card login-card p-7">
      <div className="mb-7 text-center">
        <span className="login-logo-wrap">
          <KpuLogo className="login-logo" />
        </span>
        <h1 className="mt-4 text-2xl font-black">Masuk ke sistem</h1>
        <p className="muted mx-auto mt-2 max-w-xs text-sm">
          Monitoring tindak lanjut Berita Acara Pleno Rutin KPU Kota Cirebon.
        </p>
      </div>

      {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-800">{error}</div>}

      <label className="mb-4 block">
        <span className="label">Username</span>
        <input
          className="input"
          name="username"
          type="text"
          autoComplete="username"
          minLength={3}
          maxLength={30}
          required
          placeholder="Masukkan username"
        />
      </label>

      <label className="mb-5 block">
        <span className="label">Password</span>
        <span className="password-field">
          <input
            className="input password-input"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            minLength={8}
            required
            placeholder="Masukkan password"
          />
          <button
            type="button"
            className="password-toggle"
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </span>
      </label>

      <button disabled={loading} className="btn btn-primary w-full">
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={17} />
            Memeriksa...
          </>
        ) : (
          "Masuk"
        )}
      </button>
    </form>
  );
}
