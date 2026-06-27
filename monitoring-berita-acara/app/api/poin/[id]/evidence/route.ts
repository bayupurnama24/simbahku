import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { evidenceSchema } from "@/lib/validations";
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){const user=await requireRole(["ADMIN"]);if(!user)return NextResponse.json({message:"Tidak berwenang"},{status:403});if(!process.env.DATABASE_URL)return NextResponse.json({message:"Mode demo bersifat hanya-baca."},{status:503});const parsed=evidenceSchema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({message:parsed.error.issues[0]?.message},{status:400});const {id}=await params;const row=await prisma.evidence.create({data:{...parsed.data,poinRencanaId:id}});return NextResponse.json({id:row.id},{status:201})}
