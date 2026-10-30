export type Role = "INTERNAL" | "ADMIN";
export type StatusPoin = "SUDAH_DILAKSANAKAN" | "DALAM_PROSES" | "BELUM_DILAKSANAKAN";
export type PenanggungJawab = "KEUANGAN_UMUM_LOGISTIK" | "TEKNIS_PEMILU_HUKUM" | "PERENCANAAN_DATA_INFORMASI" | "PARTISIPASI_MASYARAKAT_SDM";

export interface EvidenceData {
  id: string; judul: string; evidenceUrl: string; keterangan?: string | null; createdAt: string;
}
export interface PoinData {
  id: string; detailPoin: string; targetPelaksanaan: string; status: StatusPoin;
  penanggungJawab: PenanggungJawab; indikatorOutput: string; catatan?: string | null;
  evidence?: EvidenceData[]; updatedAt: string;
}
export interface BeritaAcaraData {
  id: string; nomor: string; nama: string; tanggal: string; bulan: number; tahun: number;
  deskripsi?: string | null; dokumenUrl?: string; poinRencana: PoinData[]; createdAt: string;
}
export interface SessionUser { id: string; name: string; email: string; role: Role; }
