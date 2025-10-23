import { auth } from "@/lib/auth";
import { getUserWithRole } from "@/lib/user-helpers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Gift, Heart, Briefcase, GraduationCap, Shield } from "lucide-react";

export default async function BenefitsPage() {
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

  // Mock benefits data
  const benefits = [
    {
      id: 1,
      title: "Health Insurance",
      description: "Comprehensive medical, dental, and vision coverage",
      status: "Active",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
      value: "$450/month",
      enrolled: true
    },
    {
      id: 2,
      title: "Retirement Plan",
      description: "401(k) with company matching up to 6%",
      status: "Active",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      value: "6% match",
      enrolled: true
    },
    {
      id: 3,
      title: "Professional Development",
      description: "Annual budget for courses, conferences, and certifications",
      status: "Available",
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-100",
      value: "$2,000/year",
      enrolled: false
    },
    {
      id: 4,
      title: "Life Insurance",
      description: "Basic life insurance coverage at no cost",
      status: "Active",
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      value: "2x salary",
      enrolled: true
    },
    {
      id: 5,
      title: "Wellness Program",
      description: "Gym membership reimbursement and wellness activities",
      status: "Available",
      icon: Gift,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      value: "$100/month",
      enrolled: false
    }
  ];

  const getPageTitle = () => {
    switch (user.role) {
      case "USER":
        return "My Benefits";
      case "ADMIN":
        return "Manage Benefits";
      default:
        return "Benefits";
    }
  };

  const getPageDescription = () => {
    switch (user.role) {
      case "USER":
        return "View and manage your employee benefits";
      case "ADMIN":
        return "Configure and manage company-wide benefits";
      default:
        return "Employee benefits overview";
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

      {/* Benefits Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enrolled</p>
              <p className="text-2xl font-bold text-gray-900">
                {benefits.filter(b => b.enrolled).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {benefits.filter(b => !b.enrolled).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">$3,550</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Benefits</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.id} className="p-4 lg:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${benefit.bgColor} flex-shrink-0`}>
                      <Icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {benefit.description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          benefit.enrolled 
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {benefit.enrolled ? "Enrolled" : benefit.status}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          Value: {benefit.value}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {benefit.enrolled ? (
                      <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                        Manage
                      </button>
                    ) : (
                      <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Enroll
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits Actions */}
      {user.role === "ADMIN" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Admin Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Add New Benefit</div>
              <div className="text-sm text-gray-500">Create a new benefit plan</div>
            </button>
            <button className="p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Enrollment Report</div>
              <div className="text-sm text-gray-500">View enrollment statistics</div>
            </button>
            <button className="p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Cost Analysis</div>
              <div className="text-sm text-gray-500">Analyze benefits costs</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}