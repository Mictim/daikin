"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  User,
  ShoppingBag,
  Gift,
  Plus,
  Eye,
  MessageSquare,
  Users,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: "USER" | "EMPLOYEE" | "ADMIN";
    image?: string | null;
  };
}

const roleNavItems = {
  USER: [
    {
      title: "User Information",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "My Orders",
      href: "/dashboard/orders",
      icon: ShoppingBag,
    },
    {
      title: "My Benefits",
      href: "/dashboard/benefits",
      icon: Gift,
    },
  ],
  EMPLOYEE: [
    {
      title: "Create Order",
      href: "/dashboard/create-order",
      icon: Plus,
    },
    {
      title: "View Orders",
      href: "/dashboard/orders",
      icon: Eye,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
  ],
  ADMIN: [
    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingBag,
    },
    {
      title: "Events",
      href: "/dashboard/events",
      icon: Calendar,
    },
    {
      title: "Benefits",
      href: "/dashboard/benefits",
      icon: Gift,
    },
  ],
};

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const navItems = roleNavItems[user.role];

  return (
    <div className="fixed left-0 top-0 h-full w-64 border-r border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-xl font-bold text-gray-900">Daikin Dashboard</h1>
        <div className="mt-4 flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
            <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        <Link
          href="/dashboard/settings"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <form action="/api/auth/signout" method="POST">
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start px-3 py-2 h-auto text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
}