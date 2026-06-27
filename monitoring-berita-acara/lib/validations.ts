import { z } from "zod";
export const loginSchema=z.object({email:z.email("Format email tidak valid"),password:z.string().min(8,"Password minimal 8 karakter")});
export const beritaSchema=z.object({
  nomor:z.string().trim().min(5,"Nomor berita acara wajib diisi"),
  nama:z.string().trim().min(5,"Nama berita acara wajib diisi"),
  tanggal:z.string().refine(v=>!Number.isNaN(Date.parse(v)),"Tanggal tidak valid"),
  dokumenUrl:z.url("URL dokumen tidak valid"),
  deskripsi:z.string().trim().max(1000).optional().or(z.literal(""))
});
export const poinSchema=z.object({
  detailPoin:z.string().trim().min(10,"Detail poin minimal 10 karakter"),
  targetPelaksanaan:z.string().refine(v=>!Number.isNaN(Date.parse(v)),"Target tidak valid"),
  status:z.enum(["SUDAH_DILAKSANAKAN","DALAM_PROSES","BELUM_DILAKSANAKAN"]),
  penanggungJawab:z.enum(["KEUANGAN_UMUM_LOGISTIK","TEKNIS_PEMILU_HUKUM","PERENCANAAN_DATA_INFORMASI","PARTISIPASI_MASYARAKAT_SDM"]),
  indikatorOutput:z.string().trim().min(5,"Indikator output wajib diisi"),
  catatan:z.string().trim().max(2000).optional().or(z.literal(""))
});
export const evidenceSchema=z.object({judul:z.string().trim().min(3),evidenceUrl:z.url("URL evidence tidak valid"),keterangan:z.string().trim().max(1000).optional().or(z.literal(""))});
