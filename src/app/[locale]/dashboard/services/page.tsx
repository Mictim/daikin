import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { use } from "react";

export default function ServicesPage({
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
          {t("sidebar.myServices")}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">View your active services</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
        <p className="text-sm sm:text-base text-gray-500">No active services</p>
      </div>
    </div>
  );
}
