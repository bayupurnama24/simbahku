import { NextRequest,NextResponse } from "next/server";
import { jwtVerify } from "jose";
const secret=()=>new TextEncoder().encode(process.env.AUTH_SECRET||"development-secret-change-before-production");
export async function proxy(req:NextRequest){const path=req.nextUrl.pathname;const isAdmin=path.startsWith("/admin");const isInternal=path.startsWith("/internal");if(!isAdmin&&!isInternal)return NextResponse.next();const token=req.cookies.get("kpu_session")?.value;if(!token)return NextResponse.redirect(new URL("/login",req.url));try{const {payload}=await jwtVerify(token,secret());if(isAdmin&&payload.role!=="ADMIN")return NextResponse.redirect(new URL("/internal/dashboard",req.url));if(isInternal&&!["ADMIN","INTERNAL"].includes(String(payload.role)))return NextResponse.redirect(new URL("/login",req.url));return NextResponse.next()}catch{return NextResponse.redirect(new URL("/login",req.url))}}
export const config={matcher:["/admin/:path*","/internal/:path*"]};
