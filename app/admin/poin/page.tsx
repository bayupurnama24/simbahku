import { PoinDashboard } from "@/components/poin-dashboard";
import { getBeritaAcaraList, isDemoMode } from "@/lib/data";

export const metadata = { title: "Poin Rencana" };

export default async function Page() {
  const items = await getBeritaAcaraList(true);

  return (
    <>
      <div className="page-head">
        <div>
          <span className="eyebrow">Kelola tindak lanjut</span>
          <h1 className="mt-2 text-3xl font-black">Poin Rencana</h1>
          <p className="muted">Pantau, cari, dan perbarui seluruh poin rencana dari semua berita acara.</p>
        </div>
      </div>
      {isDemoMode() && <div className="notice mb-4">Mode demo aktif. Sambungkan database untuk mengaktifkan perubahan data.</div>}
      <PoinDashboard items={items} mode="admin" />
    </>
  );
}
