"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type OrderProduct = {
  id: string;
  productId: string;
  productDescription: string;
  warranty: string | null;
  price: number;
  quantity: number;
  totalPrice: number;
};

type Service = {
  id: string;
  orderId: string;
  customerEmail: string;
  nextDateOfService: string;
  notificationSent30Days: boolean;
  notificationSent7Days: boolean;
  products: OrderProduct[];
};

export default function ServicesPage() {
  const t = useTranslations("dashboard.services");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sendingNotification, setSendingNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchServices("");
  }, []);

  const fetchServices = async (search: string) => {
    try {
      const response = await fetch(`/api/services?search=${encodeURIComponent(search)}`);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    fetchServices(searchQuery);
  };

  const handleSendNotification = async (serviceId: string, notificationType: "30days" | "7days") => {
    setSendingNotification(serviceId);
    try {
      const response = await fetch(`/api/services/${serviceId}/notify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationType }),
      });

      if (response.ok) {
        alert(t("notificationSentSuccess"));
        fetchServices(searchQuery);
      } else {
        const error = await response.json();
        alert(error.error || t("notificationSentError"));
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert(t("notificationSentError"));
    } finally {
      setSendingNotification(null);
    }
  };

  const getServiceStatus = (serviceDate: string, notificationSent30Days: boolean, notificationSent7Days: boolean) => {
    const now = new Date();
    const service = new Date(serviceDate);
    const daysUntil = Math.ceil((service.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) {
      return {
        status: "overdue",
        color: "bg-red-100 text-red-800 border-red-300",
        days: daysUntil,
        canSend: true,
        notificationType: "7days" as const,
        notificationSent: notificationSent7Days,
      };
    } else if (daysUntil < 7) {
      return {
        status: "dueSoon",
        color: "bg-orange-100 text-orange-800 border-orange-300",
        days: daysUntil,
        canSend: true,
        notificationType: "7days" as const,
        notificationSent: notificationSent7Days,
      };
    } else if (daysUntil < 30) {
      return {
        status: "upcoming",
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        days: daysUntil,
        canSend: !notificationSent30Days,
        notificationType: "30days" as const,
        notificationSent: notificationSent30Days,
      };
    } else {
      return {
        status: "scheduled",
        color: "bg-gray-100 text-gray-800 border-gray-300",
        days: daysUntil,
        canSend: false,
        notificationType: null,
        notificationSent: false,
      };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} variant="secondary">
              <Search className="h-4 w-4 mr-2" />
              {t("search")}
            </Button>
            {searchQuery && (
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setLoading(true);
                  fetchServices("");
                }}
                variant="outline"
              >
                {t("clear")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("allServices")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("orderId")}</TableHead>
                <TableHead>{t("customerEmail")}</TableHead>
                <TableHead>{t("productDescription")}</TableHead>
                <TableHead>{t("serviceDate")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    {t("noServicesFound")}
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => {
                  const statusInfo = getServiceStatus(
                    service.nextDateOfService,
                    service.notificationSent30Days,
                    service.notificationSent7Days
                  );

                  return (
                    <TableRow key={service.id} className={cn("border-l-4", statusInfo.color)}>
                      <TableCell className="font-medium">{service.orderId}</TableCell>
                      <TableCell>{service.customerEmail}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {service.products.map((p) => p.productDescription).join(", ")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {new Date(service.nextDateOfService).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {statusInfo.days < 0
                            ? `${Math.abs(statusInfo.days)} ${t("overdue")}`
                            : `${statusInfo.days} ${t("daysUntilService")}`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", statusInfo.color)}>
                          {statusInfo.status === "overdue" && t("statusOverdue")}
                          {statusInfo.status === "dueSoon" && t("statusDueSoon")}
                          {statusInfo.status === "upcoming" && t("statusUpcoming")}
                          {statusInfo.status === "scheduled" && t("statusScheduled")}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {statusInfo.canSend && statusInfo.notificationType && (
                          <Button
                            size="sm"
                            onClick={() => handleSendNotification(service.id, statusInfo.notificationType!)}
                            disabled={sendingNotification === service.id || statusInfo.notificationSent}
                          >
                            {sendingNotification === service.id ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                {t("sending")}
                              </>
                            ) : statusInfo.notificationSent ? (
                              <>
                                <Mail className="h-4 w-4 mr-2" />
                                {t("notificationSent")}
                              </>
                            ) : (
                              <>
                                <Mail className="h-4 w-4 mr-2" />
                                {t("sendNotification")}
                              </>
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
