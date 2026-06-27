import { BULAN, STATUS_PROGRESS } from "@/lib/constants";
import type { BeritaAcaraData, PoinData, StatusPoin } from "@/types";
export function cn(...classes: Array<string|false|null|undefined>) { return classes.filter(Boolean).join(" "); }
export function formatDate(value: string|Date) { return new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"long",year:"numeric"}).format(new Date(value)); }
export function averageProgress(points: PoinData[]) { return points.length ? Math.round(points.reduce((s,p)=>s+STATUS_PROGRESS[p.status],0)/points.length) : 0; }
export function overallStatus(points: PoinData[]): StatusPoin { const p=averageProgress(points); return p===100?"SUDAH_DILAKSANAKAN":p>0?"DALAM_PROSES":"BELUM_DILAKSANAKAN"; }
export function deadlineState(point: PoinData) {
  if (point.status==="SUDAH_DILAKSANAKAN") return null;
  const today=new Date(); today.setHours(0,0,0,0);
  const days=Math.ceil((new Date(point.targetPelaksanaan).getTime()-today.getTime())/86400000);
  return days<0?"Terlambat":days<=7?"Mendekati Target":null;
}
export function dashboardStats(items: BeritaAcaraData[]) {
  const p=items.flatMap(i=>i.poinRencana); const count=(s:StatusPoin)=>p.filter(x=>x.status===s).length;
  return {totalBerita:items.length,totalPoin:p.length,progress:averageProgress(p),selesai:count("SUDAH_DILAKSANAKAN"),proses:count("DALAM_PROSES"),belum:count("BELUM_DILAKSANAKAN")};
}
export function monthlyProgress(items: BeritaAcaraData[]) {
  return BULAN.map((bulan,i)=>{const list=items.filter(x=>x.bulan===i+1); return {bulan:bulan.slice(0,3),progress:averageProgress(list.flatMap(x=>x.poinRencana)),jumlah:list.length};}).filter(x=>x.progress||x.jumlah);
}
