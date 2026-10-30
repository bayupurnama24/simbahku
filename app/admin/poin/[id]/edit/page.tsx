import { notFound } from "next/navigation";
import { PoinForm } from "@/components/record-forms";
import { EvidenceManager } from "@/components/evidence-manager";
import { DeleteButton } from "@/components/delete-button";
import { getPoin } from "@/lib/data";
export const dynamic="force-dynamic";
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const point=await getPoin(id);if(!point)notFound();return <><div className="page-head"><div><span className="eyebrow">Update tindak lanjut</span><h1 className="mt-2 text-3xl font-black">Edit Poin Rencana</h1></div><DeleteButton url={"/api/poin/"+id} redirectTo={"/admin/berita-acara/"+point.beritaAcaraId} label="Hapus Poin"/></div><PoinForm beritaAcaraId={point.beritaAcaraId} initial={point}/><EvidenceManager poinId={id} items={point.evidence}/></>}
