import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Sidebar } from "@/components/dashboard/sidebar";
import { auth } from "@/lib/auth";
import { getUserWithRole } from "@/lib/user-helpers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const user = await getUserWithRole(session.user.id);

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar user={user} />
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <MobileNav user={user} />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-6 pt-16 lg:pt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}