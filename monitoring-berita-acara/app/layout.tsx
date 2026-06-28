import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import { APP_NAME } from "@/lib/constants";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: { default: APP_NAME, template: "%s | Monitoring KPU Cirebon" },
  description: "Sistem monitoring tindak lanjut Berita Acara Pleno Rutin KPU Kota Cirebon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={plusJakartaSans.variable}>{children}</body>
    </html>
  );
}
