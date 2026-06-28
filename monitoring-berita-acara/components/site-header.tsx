import Image from "next/image";
import Link from "next/link";

const KPU_LOGO_URL = "https://www.kpu.go.id/images/1627539868logo-kpu.png";

export function KpuLogo({ className = "kpu-logo" }: { className?: string }) {
  return <Image src={KPU_LOGO_URL} alt="Logo KPU" width={96} height={96} className={className} priority />;
}

export function SiteHeader() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <span className="brand-logo-wrap">
            <KpuLogo />
          </span>
          <span className="brand-text">
            <strong>Sistem Monitoring Berita Acara Pleno Rutin</strong>
            <small>Komisi Pemilihan Umum Kota Cirebon</small>
          </span>
        </Link>
        <nav className="nav-links">
          <Link href="/">Dashboard</Link>
          <Link href="/berita-acara">Berita Acara</Link>
          <Link className="btn btn-primary" href="/login">
            Masuk internal
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>Komisi Pemilihan Umum Kota Cirebon</strong>
          <p className="mt-2 max-w-xl text-sm">
            Transparansi tindak lanjut hasil pleno rutin dalam satu ruang monitoring yang mudah dipahami.
          </p>
        </div>
        <p className="text-sm">© 2026 KPU Kota Cirebon</p>
      </div>
    </footer>
  );
}
