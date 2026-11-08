"use client";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { dashboardStats, monthlyProgress } from "@/lib/utils";
import type { BeritaAcaraData } from "@/types";
import { MONTH_GRADIENTS, STAT_THEME } from "@/lib/theme";

export function MonitoringCharts({ items }: { items: BeritaAcaraData[] }) {
  const s = dashboardStats(items);
  const status = [
    {
      name: "Selesai",
      value: s.selesai,
      from: STAT_THEME.selesai.from,
      to: STAT_THEME.selesai.to,
      gradId: "pieSelesai",
    },
    {
      name: "Dalam proses",
      value: s.proses,
      from: STAT_THEME.proses.from,
      to: STAT_THEME.proses.to,
      gradId: "pieProses",
    },
    {
      name: "Belum",
      value: s.belum,
      from: STAT_THEME.belum.from,
      to: STAT_THEME.belum.to,
      gradId: "pieBelum",
    },
    ...(s.dibatalkan > 0
      ? [
          {
            name: "Dibatalkan",
            value: s.dibatalkan,
            from: STAT_THEME.dibatalkan.from,
            to: STAT_THEME.dibatalkan.to,
            gradId: "pieDibatalkan",
          },
        ]
      : []),
  ];
  const monthly = monthlyProgress(items);

  return (
    <div className="charts-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.35fr)", gap: 16 }}>
      <section className="card" style={{ padding: 22 }}>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-extrabold text-lg text-gray-900">Status Poin</h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100">
            Total {s.totalPoin}
          </span>
        </div>
        <p className="muted text-xs mb-3">Distribusi status tindak lanjut hasil pleno</p>
        <div style={{ height: 240 }}>
          <ResponsiveContainer>
            <PieChart>
              <defs>
                {status.map((st) => (
                  <linearGradient key={st.gradId} id={st.gradId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={st.from} />
                    <stop offset="100%" stopColor={st.to} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={status}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={92}
                paddingAngle={4}
                strokeWidth={2}
                stroke="#fff"
              >
                {status.map((x) => (
                  <Cell key={x.name} fill={`url(#${x.gradId})`} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 14,
                  border: "1px solid #e7eaf0",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  fontWeight: 600,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold pt-1">
          {status.map((x) => (
            <span key={x.name} className="flex items-center gap-2">
              <i
                className="h-2.5 w-2.5 rounded-full shadow-sm"
                style={{ background: `linear-gradient(135deg, ${x.from}, ${x.to})` }}
              />
              {x.name}: <strong className="text-gray-900">{x.value}</strong>
            </span>
          ))}
        </div>
      </section>

      <section className="card" style={{ padding: 22 }}>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-extrabold text-lg text-gray-900">Progress per Bulan</h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border border-red-100">
            Rata-rata {s.progress}%
          </span>
        </div>
        <p className="muted text-xs mb-3">Persentase capaian dan tren pengerjaan sepanjang tahun</p>
        <div style={{ height: 275 }}>
          <ResponsiveContainer>
            <BarChart data={monthly}>
              <defs>
                {MONTH_GRADIENTS.map((mg, i) => (
                  <linearGradient key={i} id={`colorMonth${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={mg.from} stopOpacity={1} />
                    <stop offset="100%" stopColor={mg.to} stopOpacity={0.88} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
              <XAxis
                dataKey="bulan"
                tickLine={false}
                axisLine={{ stroke: "#e7eaf0" }}
                tick={{ fill: "#667085", fontSize: 12, fontWeight: 600 }}
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#667085", fontSize: 12 }}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip
                cursor={{ fill: "rgba(128, 0, 0, 0.04)" }}
                contentStyle={{
                  borderRadius: 14,
                  border: "1px solid #e7eaf0",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  fontWeight: 600,
                }}
                formatter={(value) => [`${value}%`, "Progress"]}
              />
              <Bar dataKey="progress" name="Progress (%)" radius={[8, 8, 2, 2]}>
                {monthly.map((m) => (
                  <Cell
                    key={m.bulan}
                    fill={`url(#colorMonth${m.bulanIndex})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
