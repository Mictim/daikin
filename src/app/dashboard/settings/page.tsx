import { auth } from "@/lib/auth";
import { getUserWithRole } from "@/lib/user-helpers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Settings as SettingsIcon, User, Shield, Bell, Palette } from "lucide-react";

export default async function SettingsPage() {
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

  const settingsCategories = [
    {
      title: "Profile Settings",
      description: "Manage your personal information and preferences",
      icon: User,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      items: [
        "Personal Information",
        "Contact Details",
        "Profile Picture",
        "Display Name"
      ]
    },
    {
      title: "Security",
      description: "Control your account security and privacy",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
      items: [
        "Change Password",
        "Two-Factor Authentication",
        "Login History",
        "Connected Devices"
      ]
    },
    {
      title: "Notifications",
      description: "Configure how you receive notifications",
      icon: Bell,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      items: [
        "Email Notifications",
        "Push Notifications",
        "SMS Alerts",
        "Notification Frequency"
      ]
    },
    {
      title: "Appearance",
      description: "Customize the look and feel of your dashboard",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      items: [
        "Theme Preference",
        "Color Scheme",
        "Layout Options",
        "Accessibility"
      ]
    }
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Current User Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {settingsCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${category.bgColor}`}>
                  <Icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button className="p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Export Data</div>
            <div className="text-sm text-gray-500">Download your account data</div>
          </button>
          <button className="p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Reset Preferences</div>
            <div className="text-sm text-gray-500">Restore default settings</div>
          </button>
          <button className="p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Contact Support</div>
            <div className="text-sm text-gray-500">Get help with your account</div>
          </button>
          <button className="p-3 text-left rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
            <div className="font-medium">Delete Account</div>
            <div className="text-sm text-red-500">Permanently delete account</div>
          </button>
        </div>
      </div>
    </div>
  );
}