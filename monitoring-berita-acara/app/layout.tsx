import type { Metadata } from "next";
import "@/app/globals.css";
import { APP_NAME } from "@/lib/constants";
export const metadata:Metadata={title:{default:APP_NAME,template:"%s | Monitoring KPU Cirebon"},description:"Sistem monitoring tindak lanjut Berita Acara Pleno Rutin KPU Kota Cirebon."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body>{children}</body></html>}
