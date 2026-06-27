import { notFound } from "next/navigation";
import Link from "next/link";
import { DetailView } from "@/components/detail-view";
import { getBeritaAcara } from "@/lib/data";
export const dynamic="force-dynamic";
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const item=await getBeritaAcara(id,true);if(!item)notFound();return <><Link className="mb-5 inline-block font-bold text-red-700" href="/internal/berita-acara">← Kembali</Link><DetailView item={item} privateView/></>}
