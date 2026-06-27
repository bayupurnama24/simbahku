import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { demoData } from "@/lib/demo-data";
import type { BeritaAcaraData } from "@/types";
type BeritaRow=Prisma.BeritaAcaraGetPayload<{include:{poinRencana:{include:{evidence:true}}}}>;
const iso=(d:Date|string)=>new Date(d).toISOString();
function serialize(items:BeritaRow[]):BeritaAcaraData[]{return items.map(item=>({id:item.id,nomor:item.nomor,nama:item.nama,tanggal:iso(item.tanggal),bulan:item.bulan,tahun:item.tahun,deskripsi:item.deskripsi,dokumenUrl:item.dokumenUrl,createdAt:iso(item.createdAt),poinRencana:item.poinRencana.map(p=>({id:p.id,detailPoin:p.detailPoin,targetPelaksanaan:iso(p.targetPelaksanaan),status:p.status,penanggungJawab:p.penanggungJawab,indikatorOutput:p.indikatorOutput,catatan:p.catatan,updatedAt:iso(p.updatedAt),evidence:p.evidence.map(e=>({id:e.id,judul:e.judul,evidenceUrl:e.evidenceUrl,keterangan:e.keterangan,createdAt:iso(e.createdAt)}))}))}));}
function publicOnly(items:BeritaAcaraData[]):BeritaAcaraData[]{return items.map(b=>({id:b.id,nomor:b.nomor,nama:b.nama,tanggal:b.tanggal,bulan:b.bulan,tahun:b.tahun,deskripsi:b.deskripsi,createdAt:b.createdAt,poinRencana:b.poinRencana.map(p=>({id:p.id,detailPoin:p.detailPoin,targetPelaksanaan:p.targetPelaksanaan,status:p.status,penanggungJawab:p.penanggungJawab,indikatorOutput:p.indikatorOutput,updatedAt:p.updatedAt}))}));}
export async function getBeritaAcaraList(privateView=false){if(!process.env.DATABASE_URL)return privateView?demoData:publicOnly(demoData);const rows=await prisma.beritaAcara.findMany({include:{poinRencana:{include:{evidence:true},orderBy:{createdAt:"asc"}}},orderBy:{tanggal:"desc"}});const data=serialize(rows);return privateView?data:publicOnly(data);}
export async function getBeritaAcara(id:string,privateView=false){const all=await getBeritaAcaraList(privateView);return all.find(x=>x.id===id)??null;}
export async function getPoin(id:string){const all=await getBeritaAcaraList(true);return all.flatMap(x=>x.poinRencana.map(p=>({...p,beritaAcaraId:x.id}))).find(x=>x.id===id)??null;}
export const isDemoMode=()=>!process.env.DATABASE_URL;
