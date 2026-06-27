import { PrismaClient,Role,StatusPoin,PenanggungJawab } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma=new PrismaClient();
async function main(){
 const admin=await prisma.user.upsert({where:{email:"admin@kpu-cirebon.go.id"},update:{},create:{name:"Operator KPU",email:"admin@kpu-cirebon.go.id",passwordHash:await hash("Admin123!",12),role:Role.ADMIN}});
 await prisma.user.upsert({where:{email:"internal@kpu-cirebon.go.id"},update:{},create:{name:"Pengguna Internal",email:"internal@kpu-cirebon.go.id",passwordHash:await hash("Internal123!",12),role:Role.INTERNAL}});
 await prisma.beritaAcara.upsert({where:{nomor:"001/BA.PLENO/KPU-KOTA-CIREBON/I/2026"},update:{},create:{
  nomor:"001/BA.PLENO/KPU-KOTA-CIREBON/I/2026",nama:"Berita Acara Pleno Rutin Minggu I Januari 2026",tanggal:new Date("2026-01-07"),bulan:1,tahun:2026,dokumenUrl:"https://example.com/dokumen-ba-001",deskripsi:"Rangkuman hasil pleno rutin dan tindak lanjut program kerja.",createdById:admin.id,
  poinRencana:{create:[
   {detailPoin:"Melaksanakan koordinasi pemutakhiran data pemilih berkelanjutan",targetPelaksanaan:new Date("2026-07-02"),status:StatusPoin.DALAM_PROSES,penanggungJawab:PenanggungJawab.PERENCANAAN_DATA_INFORMASI,indikatorOutput:"Tersusunnya laporan hasil koordinasi",catatan:"Menunggu jadwal koordinasi lanjutan",evidence:{create:[{judul:"Notula koordinasi awal",evidenceUrl:"https://example.com/evidence-koordinasi",keterangan:"Dokumentasi rapat awal"}]}},
   {detailPoin:"Menyusun laporan kegiatan partisipasi masyarakat",targetPelaksanaan:new Date("2026-07-15"),status:StatusPoin.BELUM_DILAKSANAKAN,penanggungJawab:PenanggungJawab.PARTISIPASI_MASYARAKAT_SDM,indikatorOutput:"Dokumen laporan kegiatan",catatan:"Perlu kompilasi data dari kegiatan sebelumnya"}
  ]}
 }});
 console.log("Seed selesai. Akun admin dan internal siap digunakan.");
}
main().finally(()=>prisma.$disconnect());
