import Link from "next/link";
import { Download,Plus } from "lucide-react";
import { PublicDashboard } from "@/components/public-dashboard";
import { getBeritaAcaraList } from "@/lib/data";
export const dynamic="force-dynamic";
export default async function Page(){const items=await getBeritaAcaraList(true);return <><div className="page-head"><div><span className="eyebrow">Kelola data</span><h1 className="mt-2 text-3xl font-black">Berita Acara</h1><p className="muted">Tambah, perbarui, dan pantau seluruh dokumen pleno.</p></div><div className="flex gap-2"><a className="btn btn-secondary" href="/api/export"><Download size={16}/>Export CSV</a><Link className="btn btn-primary" href="/admin/berita-acara/create"><Plus size={16}/>Tambah</Link></div></div><PublicDashboard compact items={items} basePath="/admin/berita-acara"/></>}
