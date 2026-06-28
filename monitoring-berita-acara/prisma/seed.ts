import { PrismaClient,Role,StatusPoin,PenanggungJawab } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma=new PrismaClient();
function required(name:string){const value=process.env[name]?.trim();if(!value)throw new Error("Environment variable "+name+" wajib diisi untuk menjalankan seed.");return value}
async function main(){
 const adminEmail=required("SEED_ADMIN_EMAIL").toLowerCase();
 const adminUsername=required("SEED_ADMIN_USERNAME").toLowerCase();
 const adminPassword=required("SEED_ADMIN_PASSWORD");
 const internalEmail=required("SEED_INTERNAL_EMAIL").toLowerCase();
 const internalUsername=required("SEED_INTERNAL_USERNAME").toLowerCase();
 const internalPassword=required("SEED_INTERNAL_PASSWORD");
 const admin=await prisma.user.upsert({where:{email:adminEmail},update:{username:adminUsername},create:{name:"Operator KPU",username:adminUsername,email:adminEmail,passwordHash:await hash(adminPassword,12),role:Role.ADMIN}});
 await prisma.user.upsert({where:{email:internalEmail},update:{username:internalUsername},create:{name:"Pengguna Internal",username:internalUsername,email:internalEmail,passwordHash:await hash(internalPassword,12),role:Role.INTERNAL}});
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
