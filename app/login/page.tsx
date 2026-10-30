import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { getSession } from "@/lib/auth";

export const metadata = { title: "Login" };

export default async function Page() {
  const user = await getSession();
  if (user) redirect(user.role === "ADMIN" ? "/admin/dashboard" : "/internal/dashboard");

  return (
    <main className="login-page min-h-screen">
      <div className="container grid min-h-screen place-items-center py-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-5 inline-block font-bold text-red-950">
            ← Kembali ke halaman publik
          </Link>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
