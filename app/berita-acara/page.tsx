import { SiteFooter,SiteHeader } from "@/components/site-header";
import { PublicDashboard } from "@/components/public-dashboard";
import { getBeritaAcaraList } from "@/lib/data";
export const dynamic="force-dynamic";
export const metadata={title:"Daftar Berita Acara"};
export default async function Page(){const items=await getBeritaAcaraList(false);return <><SiteHeader/><main className="page"><div className="container"><div className="page-head"><div><span className="eyebrow">Arsip publik</span><h1 className="mt-2 text-3xl font-black">Daftar Berita Acara</h1><p className="muted">Cari, filter, dan lihat tindak lanjut hasil pleno rutin.</p></div></div><PublicDashboard compact items={items}/></div></main><SiteFooter/></>}
