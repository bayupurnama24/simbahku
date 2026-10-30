import { PublicDashboard } from "@/components/public-dashboard";
import { getBeritaAcaraList,isDemoMode } from "@/lib/data";
export const dynamic="force-dynamic";
export default async function Page(){const items=await getBeritaAcaraList(true);return <><div className="page-head"><div><span className="eyebrow">Ruang internal</span><h1 className="mt-2 text-3xl font-black">Dashboard monitoring</h1><p className="muted">Pantau progres, penanggung jawab, catatan, dan evidence.</p></div></div>{isDemoMode()&&<div className="notice mb-4">Mode demo aktif. Data hanya contoh dan tidak dapat diubah.</div>}<PublicDashboard items={items} basePath="/internal/berita-acara"/></>}
