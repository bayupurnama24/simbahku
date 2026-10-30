import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { beritaSchema } from "@/lib/validations";
import { getBeritaAcaraList } from "@/lib/data";
export async function GET(){return NextResponse.json(await getBeritaAcaraList(false))}
export async function POST(req:Request){const user=await requireRole(["ADMIN"]);if(!user)return NextResponse.json({message:"Tidak berwenang"},{status:403});if(!process.env.DATABASE_URL)return NextResponse.json({message:"Mode demo bersifat hanya-baca. Sambungkan database terlebih dahulu."},{status:503});const parsed=beritaSchema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({message:parsed.error.issues[0]?.message},{status:400});try{const tanggal=new Date(parsed.data.tanggal);const row=await prisma.beritaAcara.create({data:{...parsed.data,tanggal,bulan:tanggal.getUTCMonth()+1,tahun:tanggal.getUTCFullYear(),createdById:user.id}});return NextResponse.json({id:row.id},{status:201})}catch{return NextResponse.json({message:"Nomor berita acara mungkin sudah digunakan."},{status:409})}}
