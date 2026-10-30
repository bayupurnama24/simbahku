import { PoinDashboard } from "@/components/poin-dashboard";
import { getBeritaAcaraList, isDemoMode } from "@/lib/data";

export const metadata = { title: "Poin Rencana" };

export default async function Page() {
  const items = await getBeritaAcaraList(true);

  return (
    <>
      <div className="page-head">
        <div>
          <span className="eyebrow">Monitoring tindak lanjut</span>
          <h1 className="mt-2 text-3xl font-black">Poin Rencana</h1>
          <p className="muted">Cari dan pantau perkembangan seluruh poin rencana dari berita acara pleno rutin.</p>
        </div>
      </div>
      {isDemoMode() && <div className="notice mb-4">Mode demo aktif. Data hanya contoh dan tidak dapat diubah.</div>}
      <PoinDashboard items={items} mode="internal" />
    </>
  );
}
