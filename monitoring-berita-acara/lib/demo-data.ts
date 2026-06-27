import type { BeritaAcaraData } from "@/types";
export const demoData: BeritaAcaraData[] = [
  { id:"demo-ba-001", nomor:"001/BA.PLENO/KPU-KOTA-CIREBON/I/2026", nama:"Berita Acara Pleno Rutin Minggu I Januari 2026",
    tanggal:"2026-01-07T00:00:00.000Z", bulan:1, tahun:2026, dokumenUrl:"https://example.com/dokumen-ba-001",
    deskripsi:"Rangkuman hasil pleno rutin dan tindak lanjut program kerja pada minggu pertama Januari 2026.", createdAt:"2026-01-07T08:00:00.000Z",
    poinRencana:[
      {id:"demo-poin-001",detailPoin:"Melaksanakan koordinasi pemutakhiran data pemilih berkelanjutan",targetPelaksanaan:"2026-07-02T00:00:00.000Z",status:"DALAM_PROSES",penanggungJawab:"PERENCANAAN_DATA_INFORMASI",indikatorOutput:"Tersusunnya laporan hasil koordinasi",catatan:"Menunggu jadwal koordinasi lanjutan",updatedAt:"2026-06-26T09:00:00.000Z",evidence:[{id:"demo-ev-001",judul:"Notula koordinasi awal",evidenceUrl:"https://example.com/evidence-koordinasi",keterangan:"Dokumentasi rapat awal",createdAt:"2026-06-20T09:00:00.000Z"}]},
      {id:"demo-poin-002",detailPoin:"Menyusun laporan kegiatan partisipasi masyarakat",targetPelaksanaan:"2026-01-15T00:00:00.000Z",status:"BELUM_DILAKSANAKAN",penanggungJawab:"PARTISIPASI_MASYARAKAT_SDM",indikatorOutput:"Dokumen laporan kegiatan",catatan:"Perlu kompilasi data dari kegiatan sebelumnya",evidence:[],updatedAt:"2026-01-07T09:00:00.000Z"},
      {id:"demo-poin-003",detailPoin:"Finalisasi laporan realisasi anggaran bulanan",targetPelaksanaan:"2026-01-20T00:00:00.000Z",status:"SUDAH_DILAKSANAKAN",penanggungJawab:"KEUANGAN_UMUM_LOGISTIK",indikatorOutput:"Laporan realisasi anggaran tervalidasi",catatan:"Telah disampaikan kepada pimpinan",evidence:[{id:"demo-ev-002",judul:"Laporan final",evidenceUrl:"https://example.com/laporan-final",createdAt:"2026-01-18T09:00:00.000Z"}],updatedAt:"2026-01-18T09:00:00.000Z"}
    ]},
  { id:"demo-ba-002", nomor:"002/BA.PLENO/KPU-KOTA-CIREBON/II/2026", nama:"Berita Acara Pleno Rutin Februari 2026",
    tanggal:"2026-02-05T00:00:00.000Z", bulan:2, tahun:2026, dokumenUrl:"https://example.com/dokumen-ba-002",
    deskripsi:"Monitoring kesiapan kegiatan kelembagaan dan layanan informasi publik.", createdAt:"2026-02-05T08:00:00.000Z",
    poinRencana:[
      {id:"demo-poin-004",detailPoin:"Pemutakhiran daftar informasi publik pada laman resmi",targetPelaksanaan:"2026-02-14T00:00:00.000Z",status:"SUDAH_DILAKSANAKAN",penanggungJawab:"TEKNIS_PEMILU_HUKUM",indikatorOutput:"Daftar informasi publik terbaru tersedia",catatan:"Selesai diverifikasi",evidence:[{id:"demo-ev-003",judul:"Tangkapan layar publikasi",evidenceUrl:"https://example.com/publikasi",createdAt:"2026-02-13T09:00:00.000Z"}],updatedAt:"2026-02-13T09:00:00.000Z"},
      {id:"demo-poin-005",detailPoin:"Inventarisasi kebutuhan logistik perkantoran triwulan pertama",targetPelaksanaan:"2026-02-22T00:00:00.000Z",status:"DALAM_PROSES",penanggungJawab:"KEUANGAN_UMUM_LOGISTIK",indikatorOutput:"Daftar kebutuhan logistik tervalidasi",catatan:"Verifikasi kebutuhan tiap subbagian",evidence:[],updatedAt:"2026-02-16T09:00:00.000Z"}
    ]},
  { id:"demo-ba-003", nomor:"003/BA.PLENO/KPU-KOTA-CIREBON/III/2026", nama:"Berita Acara Pleno Rutin Maret 2026",
    tanggal:"2026-03-06T00:00:00.000Z", bulan:3, tahun:2026, dokumenUrl:"https://example.com/dokumen-ba-003",
    deskripsi:"Evaluasi pelaksanaan kegiatan dan agenda tindak lanjut bulan Maret.", createdAt:"2026-03-06T08:00:00.000Z",
    poinRencana:[{id:"demo-poin-006",detailPoin:"Evaluasi kanal pengaduan dan layanan masyarakat",targetPelaksanaan:"2026-03-18T00:00:00.000Z",status:"BELUM_DILAKSANAKAN",penanggungJawab:"PARTISIPASI_MASYARAKAT_SDM",indikatorOutput:"Rekomendasi perbaikan layanan masyarakat",catatan:"Menunggu rekap pengaduan",evidence:[],updatedAt:"2026-03-06T09:00:00.000Z"}]}
];
