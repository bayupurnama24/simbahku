import { PublicDashboard } from "@/components/public-dashboard";
import { getBeritaAcaraList } from "@/lib/data";
export const dynamic="force-dynamic";
export default async function Page(){const items=await getBeritaAcaraList(true);return <><div className="page-head"><div><span className="eyebrow">Data lengkap</span><h1 className="mt-2 text-3xl font-black">Berita Acara</h1><p className="muted">Akses baca untuk dokumen, catatan, dan evidence.</p></div></div><PublicDashboard compact items={items} basePath="/internal/berita-acara"/></>}
