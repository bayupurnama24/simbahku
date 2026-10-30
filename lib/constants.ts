import type { PenanggungJawab, StatusPoin } from "@/types";
export const APP_NAME = "Monitoring Berita Acara Pleno Rutin KPU Kota Cirebon";
export const BULAN = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
export const STATUS_LABEL: Record<StatusPoin,string> = {
  SUDAH_DILAKSANAKAN: "Sudah Dilaksanakan", DALAM_PROSES: "Dalam Proses", BELUM_DILAKSANAKAN: "Belum Dilaksanakan"
};
export const STATUS_PROGRESS: Record<StatusPoin,number> = {
  SUDAH_DILAKSANAKAN: 100, DALAM_PROSES: 50, BELUM_DILAKSANAKAN: 0
};
export const PJ_LABEL: Record<PenanggungJawab,string> = {
  KEUANGAN_UMUM_LOGISTIK: "Subbagian Keuangan, Umum & Logistik",
  TEKNIS_PEMILU_HUKUM: "Subbagian Teknis Penyelenggara Pemilu & Hukum",
  PERENCANAAN_DATA_INFORMASI: "Subbagian Perencanaan, Data & Informasi",
  PARTISIPASI_MASYARAKAT_SDM: "Subbagian Partisipasi Masyarakat & SDM"
};
