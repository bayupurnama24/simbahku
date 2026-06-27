import { notFound } from "next/navigation";
import Link from "next/link";
import { DetailView } from "@/components/detail-view";
import { DeleteButton } from "@/components/delete-button";
import { getBeritaAcara } from "@/lib/data";
export const dynamic="force-dynamic";
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const item=await getBeritaAcara(id,true);if(!item)notFound();return <><div className="mb-5 flex items-center justify-between"><Link className="font-bold text-red-700" href="/admin/berita-acara">← Kembali</Link><DeleteButton url={"/api/berita-acara/"+id} redirectTo="/admin/berita-acara" label="Hapus Berita Acara"/></div><DetailView item={item} privateView admin/></>}
