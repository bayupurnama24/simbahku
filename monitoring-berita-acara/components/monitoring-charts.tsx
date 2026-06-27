"use client";
import { Bar,BarChart,CartesianGrid,Cell,Pie,PieChart,ResponsiveContainer,Tooltip,XAxis,YAxis } from "recharts";
import { dashboardStats, monthlyProgress } from "@/lib/utils";
import type { BeritaAcaraData } from "@/types";
export function MonitoringCharts({items}:{items:BeritaAcaraData[]}) {
 const s=dashboardStats(items); const status=[{name:"Selesai",value:s.selesai,color:"#16a34a"},{name:"Dalam proses",value:s.proses,color:"#f59e0b"},{name:"Belum",value:s.belum,color:"#dc2626"}]; const monthly=monthlyProgress(items);
 return <div className="charts-grid" style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1.35fr)",gap:16}}>
  <section className="card" style={{padding:20}}><h3>Status poin</h3><p className="muted text-sm">Komposisi tindak lanjut saat ini</p><div style={{height:250}}><ResponsiveContainer><PieChart><Pie data={status} dataKey="value" nameKey="name" innerRadius={55} outerRadius={88} paddingAngle={4}>{status.map(x=><Cell key={x.name} fill={x.color}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div><div className="flex flex-wrap justify-center gap-4 text-xs">{status.map(x=><span key={x.name} className="flex items-center gap-2"><i className="h-2 w-2 rounded-full" style={{background:x.color}}/>{x.name}: {x.value}</span>)}</div></section>
  <section className="card" style={{padding:20}}><h3>Progress per bulan</h3><p className="muted text-sm">Rata-rata progres dan jumlah berita acara</p><div style={{height:290}}><ResponsiveContainer><BarChart data={monthly}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="bulan" tickLine={false}/><YAxis domain={[0,100]} tickLine={false}/><Tooltip/><Bar dataKey="progress" name="Progress (%)" fill="#c71920" radius={[7,7,0,0]}/></BarChart></ResponsiveContainer></div></section>
 </div>
}
