"use client";
import { LogOut } from "lucide-react";
export function LogoutButton(){return <button className="side-link w-full" onClick={async()=>{await fetch("/api/auth/logout",{method:"POST"});location.href="/login"}}><LogOut size={17}/>Keluar</button>}
