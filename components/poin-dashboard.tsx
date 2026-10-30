"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BarChart3, CheckCircle2, Clock3, ExternalLink, FileCheck2, Search, UserRound, XCircle } from "lucide-react";
import { BULAN, PJ_LABEL, STATUS_LABEL } from "@/lib/constants";
import { averageProgress, deadlineState, formatDate } from "@/lib/utils";
import type { BeritaAcaraData, PenanggungJawab, PoinData, StatusPoin } from "@/types";
import { DeadlineBadge, StatusBadge } from "@/components/status-badge";
import { STAT_THEME } from "@/lib/theme";

type PoinRow = PoinData & {
  beritaAcaraId: string;
  beritaAcaraNama: string;
  beritaAcaraNomor: string;
  beritaAcaraTanggal: string;
};

const statusMeta = [
  ["total", "Total Poin", BarChart3, STAT_THEME.poin],
  ["selesai", "Sudah Dilaksanakan", CheckCircle2, STAT_THEME.selesai],
  ["proses", "Dalam Proses", Clock3, STAT_THEME.proses],
  ["belum", "Belum Dilaksanakan", XCircle, STAT_THEME.belum],
  ["evidence", "Evidence Terunggah", FileCheck2, STAT_THEME.evidence],
  ["perhatian", "Perlu Perhatian", Clock3, STAT_THEME.perhatian],
] as const;

function flattenPoin(items: BeritaAcaraData[]): PoinRow[] {
  return items.flatMap((item) =>
    item.poinRencana.map((point) => ({
      ...point,
      beritaAcaraId: item.id,
      beritaAcaraNama: item.nama,
      beritaAcaraNomor: item.nomor,
      beritaAcaraTanggal: item.tanggal,
    })),
  );
}

export function PoinDashboard({ items, mode }: { items: BeritaAcaraData[]; mode: "admin" | "internal" }) {
  const allPoin = useMemo(() => flattenPoin(items), [items]);
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [pj, setPj] = useState("");
  const [sort, setSort] = useState("target-nearest");
  const [page, setPage] = useState(1);

  const years = useMemo(
    () => [...new Set(allPoin.map((x) => new Date(x.targetPelaksanaan).getFullYear()))].sort((a, b) => b - a),
    [allPoin],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return allPoin
      .filter((point) => {
        const target = new Date(point.targetPelaksanaan);
        const haystack = [
          point.detailPoin,
          point.indikatorOutput,
          point.catatan || "",
          point.beritaAcaraNama,
          point.beritaAcaraNomor,
          PJ_LABEL[point.penanggungJawab],
        ]
          .join(" ")
          .toLowerCase();
        return (
          (!q || haystack.includes(q)) &&
          (!month || target.getMonth() + 1 === Number(month)) &&
          (!year || target.getFullYear() === Number(year)) &&
          (!status || point.status === (status as StatusPoin)) &&
          (!pj || point.penanggungJawab === (pj as PenanggungJawab))
        );
      })
      .sort((a, b) => {
        if (sort === "target-farthest") return b.targetPelaksanaan.localeCompare(a.targetPelaksanaan);
        if (sort === "status") return STATUS_LABEL[a.status].localeCompare(STATUS_LABEL[b.status]);
        if (sort === "evidence") return (b.evidence?.length || 0) - (a.evidence?.length || 0);
        return a.targetPelaksanaan.localeCompare(b.targetPelaksanaan);
      });
  }, [allPoin, query, month, year, status, pj, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / 8));
  const paged = filtered.slice((page - 1) * 8, page * 8);
  const stats = {
    total: filtered.length,
    selesai: filtered.filter((x) => x.status === "SUDAH_DILAKSANAKAN").length,
    proses: filtered.filter((x) => x.status === "DALAM_PROSES").length,
    belum: filtered.filter((x) => x.status === "BELUM_DILAKSANAKAN").length,
    evidence: filtered.reduce((sum, x) => sum + (x.evidence?.length || 0), 0),
    perhatian: filtered.filter((x) => Boolean(deadlineState(x))).length,
  };
  const progress = averageProgress(filtered);

  function reset() {
    setQuery("");
    setMonth("");
    setYear("");
    setStatus("");
    setPj("");
    setSort("target-nearest");
    setPage(1);
  }

  return (
    <div>
      <div className="grid-stats mb-5">
        {statusMeta.map(([key, label, Icon, theme]) => (
          <article
            className="card stat"
            key={key}
            style={
              {
                "--stat-color": theme.color,
                "--stat-grad-from": theme.from,
                "--stat-grad-to": theme.to,
                "--stat-rgb": theme.rgb,
              } as React.CSSProperties
            }
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="stat-label">{label}</span>
              <div
                className="stat-icon-wrap"
                style={{
                  background: `linear-gradient(135deg, ${theme.from}15, ${theme.to}26)`,
                  color: theme.color,
                  borderColor: `${theme.from}33`,
                }}
              >
                <Icon size={19} />
              </div>
            </div>
            <div className="stat-value">{stats[key]}</div>
          </article>
        ))}
      </div>

      <section className="card mb-5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="eyebrow">Progress poin rencana</span>
            <h2 className="mt-2 text-2xl font-black">{progress}% rata-rata penyelesaian</h2>
            <p className="muted mb-0 text-sm">Dihitung dari seluruh poin yang tampil setelah filter diterapkan.</p>
          </div>
          <div className="min-w-48 flex-1 sm:max-w-xs">
            <div className="mb-2 flex items-center justify-between text-sm font-bold">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="progress"><span style={{ width: progress + "%" }} /></div>
          </div>
        </div>
      </section>

      <section className="card p-5">
        <div className="mb-4">
          <h2 className="text-xl font-extrabold">Daftar Poin Rencana</h2>
          <p className="muted text-sm">Cari poin berdasarkan isi rencana, berita acara, penanggung jawab, status, target, dan evidence.</p>
        </div>

        <div className="filter-grid poin-filter-grid mb-5">
          <label className="relative">
            <Search size={17} className="absolute left-3 top-3.5 text-gray-400" />
            <input className="input pl-10" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Cari poin, BA, indikator, catatan..." />
          </label>
          <select className="input" value={month} onChange={(e) => { setMonth(e.target.value); setPage(1); }}>
            <option value="">Semua bulan target</option>
            {BULAN.map((x, i) => <option value={i + 1} key={x}>{x}</option>)}
          </select>
          <select className="input" value={year} onChange={(e) => { setYear(e.target.value); setPage(1); }}>
            <option value="">Semua tahun</option>
            {years.map((x) => <option key={x}>{x}</option>)}
          </select>
          <select className="input" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">Semua status</option>
            {Object.entries(STATUS_LABEL).map(([k, v]) => <option value={k} key={k}>{v}</option>)}
          </select>
          <select className="input" value={pj} onChange={(e) => { setPj(e.target.value); setPage(1); }}>
            <option value="">Semua penanggung jawab</option>
            {Object.entries(PJ_LABEL).map(([k, v]) => <option value={k} key={k}>{v.replace("Subbagian ", "")}</option>)}
          </select>
          <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="target-nearest">Target terdekat</option>
            <option value="target-farthest">Target terjauh</option>
            <option value="status">Urut status</option>
            <option value="evidence">Evidence terbanyak</option>
          </select>
          <button className="btn btn-secondary" onClick={reset}>Reset</button>
        </div>

        {paged.length ? (
          <>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Poin Rencana</th><th>Berita Acara</th><th>Target</th><th>Penanggung Jawab</th><th>Status</th><th>Evidence</th><th></th></tr></thead>
                <tbody>
                  {paged.map((point) => {
                    const detailHref = "/" + mode + "/berita-acara/" + point.beritaAcaraId;
                    return (
                      <tr key={point.id}>
                        <td><strong className="block leading-snug">{point.detailPoin}</strong><span className="muted text-xs">{point.indikatorOutput}</span></td>
                        <td><Link className="font-bold text-red-900" href={detailHref}>{point.beritaAcaraNama}</Link><span className="muted block text-xs">{point.beritaAcaraNomor}</span></td>
                        <td><span className="block font-bold">{formatDate(point.targetPelaksanaan)}</span><DeadlineBadge point={point} /></td>
                        <td className="text-sm">{PJ_LABEL[point.penanggungJawab]}</td>
                        <td><StatusBadge status={point.status} /></td>
                        <td><span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">{point.evidence?.length || 0} file/link</span></td>
                        <td>{mode === "admin" ? <Link className="btn btn-primary whitespace-nowrap" href={"/admin/poin/" + point.id + "/edit"}>Edit</Link> : <Link className="font-bold text-red-900" href={detailHref}>Lihat BA <ExternalLink size={14} className="inline" /></Link>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mobile-cards">
              {paged.map((point) => {
                const detailHref = "/" + mode + "/berita-acara/" + point.beritaAcaraId;
                return (
                  <article className="card p-4" key={point.id}>
                    <span className="eyebrow">{point.beritaAcaraNomor}</span>
                    <h3 className="mt-2 text-base leading-snug">{point.detailPoin}</h3>
                    <div className="my-3 flex flex-wrap gap-2"><StatusBadge status={point.status} /><DeadlineBadge point={point} /></div>
                    <div className="mb-3 grid gap-2 text-sm">
                      <span className="flex gap-2"><Clock3 size={16} /> Target {formatDate(point.targetPelaksanaan)}</span>
                      <span className="flex gap-2"><UserRound size={16} /> {PJ_LABEL[point.penanggungJawab]}</span>
                      <span className="flex gap-2"><FileCheck2 size={16} /> {point.evidence?.length || 0} evidence</span>
                    </div>
                    <Link className="btn btn-primary w-full" href={mode === "admin" ? "/admin/poin/" + point.id + "/edit" : detailHref}>{mode === "admin" ? "Edit poin" : "Lihat berita acara"}</Link>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="muted">{filtered.length} poin ditemukan</span>
              <div className="flex gap-2">
                <button disabled={page === 1} className="btn btn-secondary disabled:opacity-40" onClick={() => setPage((p) => p - 1)}>Sebelumnya</button>
                <span className="px-2 py-2">{page}/{pages}</span>
                <button disabled={page === pages} className="btn btn-secondary disabled:opacity-40" onClick={() => setPage((p) => p + 1)}>Berikutnya</button>
              </div>
            </div>
          </>
        ) : <div className="empty">Tidak ada poin rencana yang sesuai dengan filter.</div>}
      </section>
    </div>
  );
}
