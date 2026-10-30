import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getSession } from "@/lib/auth";
export default async function Layout({children}:{children:React.ReactNode}){const user=await getSession();if(!user)redirect("/login");if(user.role!=="ADMIN")redirect("/internal/dashboard");return <AppShell user={user} mode="admin">{children}</AppShell>}
