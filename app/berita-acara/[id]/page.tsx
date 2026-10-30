import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteFooter,SiteHeader } from "@/components/site-header";
import { DetailView } from "@/components/detail-view";
import { getBeritaAcara } from "@/lib/data";
export const dynamic="force-dynamic";
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const item=await getBeritaAcara(id,false);if(!item)notFound();return <><SiteHeader/><main className="page"><div className="container"><div className="mb-5 text-sm"><Link href="/berita-acara" className="font-bold text-red-700">← Kembali ke daftar</Link></div><DetailView item={item}/></div></main><SiteFooter/></>}
