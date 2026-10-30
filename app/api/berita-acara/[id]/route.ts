import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { beritaSchema } from "@/lib/validations";
import { getBeritaAcara } from "@/lib/data";
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const user=await requireRole(["ADMIN","INTERNAL"]);return NextResponse.json(await getBeritaAcara(id,!!user))}
export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){const user=await requireRole(["ADMIN"]);if(!user)return NextResponse.json({message:"Tidak berwenang"},{status:403});if(!process.env.DATABASE_URL)return NextResponse.json({message:"Mode demo bersifat hanya-baca."},{status:503});const parsed=beritaSchema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({message:parsed.error.issues[0]?.message},{status:400});const {id}=await params;const tanggal=new Date(parsed.data.tanggal);const row=await prisma.beritaAcara.update({where:{id},data:{...parsed.data,tanggal,bulan:tanggal.getUTCMonth()+1,tahun:tanggal.getUTCFullYear()}});return NextResponse.json({id:row.id})}
export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){const user=await requireRole(["ADMIN"]);if(!user)return NextResponse.json({message:"Tidak berwenang"},{status:403});if(!process.env.DATABASE_URL)return NextResponse.json({message:"Mode demo bersifat hanya-baca."},{status:503});const {id}=await params;await prisma.beritaAcara.delete({where:{id}});return NextResponse.json({ok:true})}
