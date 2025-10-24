import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { use } from "react";

export default function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = use(getTranslations("dashboard"));

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t("sidebar.settings")}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">Manage your account settings</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
        <p className="text-sm sm:text-base text-gray-500">Settings page coming soon...</p>
      </div>
    </div>
  );
}
