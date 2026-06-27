import { notFound } from "next/navigation";
import { BeritaForm } from "@/components/record-forms";
import { getBeritaAcara } from "@/lib/data";
export const dynamic="force-dynamic";
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const item=await getBeritaAcara(id,true);if(!item)notFound();return <><div className="page-head"><div><span className="eyebrow">Perbarui data</span><h1 className="mt-2 text-3xl font-black">Edit Berita Acara</h1></div></div><BeritaForm initial={item}/></>}
