import { NextResponse } from "next/server";
export function GET(){return NextResponse.json({status:"ok",database:process.env.DATABASE_URL?"configured":"demo"})}
