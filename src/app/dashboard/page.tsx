import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { auth } from "@/lib/auth";
import { getUserWithRole } from "@/lib/user-helpers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function DashboardPage() {
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
    <div className="space-y-4 lg:space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <DashboardStats userRole={user.role} />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <RecentActivity userRole={user.role} />
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            {user.role === "USER" && (
              <>
                <a
                  href="/dashboard/orders"
                  className="block p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">View My Orders</div>
                  <div className="text-sm text-gray-500">
                    Check the status of your recent orders
                  </div>
                </a>
                <a
                  href="/dashboard/benefits"
                  className="block p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">My Benefits</div>
                  <div className="text-sm text-gray-500">
                    Explore your available benefits
                  </div>
                </a>
              </>
            )}
            
            {user.role === "EMPLOYEE" && (
              <>
                <a
                  href="/dashboard/create-order"
                  className="block p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Create New Order</div>
                  <div className="text-sm text-gray-500">
                    Start a new order process
                  </div>
                </a>
                <a
                  href="/dashboard/messages"
                  className="block p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Messages</div>
                  <div className="text-sm text-gray-500">
                    Check your recent messages
                  </div>
                </a>
              </>
            )}
            
            {user.role === "ADMIN" && (
              <>
                <a
                  href="/dashboard/users"
                  className="block p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Manage Users</div>
                  <div className="text-sm text-gray-500">
                    View and manage user accounts
                  </div>
                </a>
                <a
                  href="/dashboard/events"
                  className="block p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Events</div>
                  <div className="text-sm text-gray-500">
                    Manage company events
                  </div>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}