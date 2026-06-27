import { requireRole } from "@/lib/auth";
import { getBeritaAcaraList } from "@/lib/data";
import { PJ_LABEL,STATUS_LABEL } from "@/lib/constants";
const esc=(v:unknown)=>'"'+String(v??"").replaceAll('"','""')+'"';
export async function GET(){const user=await requireRole(["ADMIN"]);if(!user)return new Response("Tidak berwenang",{status:403});const items=await getBeritaAcaraList(true);const rows=[["Nomor BA","Nama BA","Tanggal","Detail Poin","Target","Status","Penanggung Jawab","Indikator Output","Catatan"],...items.flatMap(b=>b.poinRencana.map(p=>[b.nomor,b.nama,b.tanggal.slice(0,10),p.detailPoin,p.targetPelaksanaan.slice(0,10),STATUS_LABEL[p.status],PJ_LABEL[p.penanggungJawab],p.indikatorOutput,p.catatan||""]))];const csv="\uFEFF"+rows.map(r=>r.map(esc).join(",")).join("\r\n");return new Response(csv,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":'attachment; filename="monitoring-berita-acara.csv"'}})}
