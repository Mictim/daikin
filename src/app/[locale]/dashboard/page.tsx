'use client';

import { use } from "react";
import { useSession } from "@/lib/auth-client";
import { useTranslations } from "next-intl";

export default function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const { data: session } = useSession();

  const t = useTranslations("dashboard");

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t("welcome", { name: session?.user?.name || "User" })}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">{t("subtitle")}</p>
      </div>

      {/* Dashboard Content */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Quick Stats Cards */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">0</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500">Active Services</h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">0</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500">My Benefits</h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          {t("recentActivity")}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 text-center py-6 sm:py-8">No recent activity</p>
      </div>
    </div>
  );
}
