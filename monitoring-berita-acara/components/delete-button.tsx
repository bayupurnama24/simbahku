"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function DeleteButton({url,redirectTo,label="Hapus"}:{url:string;redirectTo?:string;label?:string}){const [busy,setBusy]=useState(false);const router=useRouter();async function remove(){if(!confirm("Yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan."))return;setBusy(true);const r=await fetch(url,{method:"DELETE"});if(!r.ok){alert("Data gagal dihapus.");setBusy(false);return}if(redirectTo)router.push(redirectTo);router.refresh()}return <button disabled={busy} onClick={remove} className="btn btn-danger">{busy?"Menghapus...":label}</button>}
