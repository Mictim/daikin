import { auth } from "@/lib/auth";
import { getUserWithRole } from "@/lib/user-helpers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Package, Clock, CheckCircle, Truck } from "lucide-react";

export default async function OrdersPage() {
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

  // Mock order data
  const orders = [
    {
      id: "2024-001",
      title: "Laptop Computer",
      status: "Delivered",
      date: "Oct 15, 2024",
      amount: "$1,299.00",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "2024-002",
      title: "Office Chair",
      status: "In Transit",
      date: "Oct 20, 2024",
      amount: "$459.00",
      icon: Truck,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "2024-003",
      title: "Monitor Stand",
      status: "Processing",
      date: "Oct 22, 2024",
      amount: "$89.00",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  const getPageTitle = () => {
    switch (user.role) {
      case "USER":
        return "My Orders";
      case "EMPLOYEE":
        return "View Orders";
      case "ADMIN":
        return "All Orders";
      default:
        return "Orders";
    }
  };

  const getPageDescription = () => {
    switch (user.role) {
      case "USER":
        return "Track and manage your personal orders";
      case "EMPLOYEE":
        return "Monitor orders created by your team";
      case "ADMIN":
        return "View and manage all orders in the system";
      default:
        return "Order management";
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
          {getPageTitle()}
        </h1>
        <p className="text-gray-600 mt-2">
          {getPageDescription()}
        </p>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">21</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.map((order) => {
            const Icon = order.icon;
            return (
              <div key={order.id} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${order.bgColor}`}>
                      <Icon className={`h-5 w-5 ${order.color}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {order.title}
                      </h3>
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                      <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "Delivered" 
                        ? "bg-green-100 text-green-800"
                        : order.status === "In Transit"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {order.amount}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}