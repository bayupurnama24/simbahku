import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { PublicDashboard } from "@/components/public-dashboard";
import { getBeritaAcaraList, isDemoMode } from "@/lib/data";
import { dashboardStats } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getBeritaAcaraList(false);
  const stats = dashboardStats(items);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold">
                <ShieldCheck size={15} />
                Transparan • Informatif • Berkelanjutan
              </div>
              <h1>Monitoring Berita Acara Pleno Rutin</h1>
              <p>
                Sistem informasi untuk memantau tindak lanjut poin-poin rencana kerja yang tertuang dalam Berita Acara
                Pleno Rutin KPU Kota Cirebon secara transparan, informatif, dan berkelanjutan.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#monitoring" className="btn btn-hero-primary">
                  Lihat Monitoring <ArrowRight size={17} />
                </Link>
                <Link href="/berita-acara" className="btn btn-hero-secondary">
                  Semua berita acara
                </Link>
              </div>
            </div>
            <div className="hero-panel">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold">
                <TrendingUp size={18} />
                Ringkasan monitoring
              </div>
              <div className="hero-metric">
                <span>Berita Acara</span>
                <strong>{stats.totalBerita}</strong>
              </div>
              <div className="hero-metric">
                <span>Total Poin</span>
                <strong>{stats.totalPoin}</strong>
              </div>
              <div className="hero-metric">
                <span>Progress Rata-rata</span>
                <strong>{stats.progress}%</strong>
              </div>
            </div>
          </div>
        </section>
        <section id="monitoring" className="page">
          <div className="container">
            {isDemoMode() && (
              <div className="notice mb-4">Mode demo aktif — sambungkan DATABASE_URL untuk memakai data produksi.</div>
            )}
            <div className="page-head">
              <div>
                <span className="eyebrow">Dashboard publik</span>
                <h2 className="mt-2 text-3xl font-black">Gambaran tindak lanjut pleno</h2>
                <p className="muted">Data ringkas untuk membantu masyarakat mengikuti perkembangan pekerjaan.</p>
              </div>
            </div>
            <PublicDashboard items={items} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
