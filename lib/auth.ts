import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { Role, SessionUser } from "@/types";
const COOKIE_NAME="kpu_session";
const secret=()=>new TextEncoder().encode(process.env.AUTH_SECRET||"development-secret-change-before-production");
export async function createSession(user:SessionUser) {
  const token=await new SignJWT({...user}).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("8h").sign(secret());
  (await cookies()).set(COOKIE_NAME,token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:28800});
}
export async function getSession():Promise<SessionUser|null> {
  const token=(await cookies()).get(COOKIE_NAME)?.value; if(!token)return null;
  try {const {payload}=await jwtVerify(token,secret()); return {id:String(payload.id),name:String(payload.name),email:String(payload.email),role:payload.role as Role};}
  catch{return null;}
}
export async function destroySession(){(await cookies()).delete(COOKIE_NAME);}
export async function requireRole(roles:Role[]){const user=await getSession(); if(!user||!roles.includes(user.role))return null; return user;}
