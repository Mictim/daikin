"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Loader2, Save, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useUserRole } from "@/hooks/use-user-role";

type Product = {
  id: string;
  productId: string;
  productDescription: string;
  warranty: string;
  price: number;
  quantity: number;
  totalPrice: number;
  daikinCoins: number;
};

export default function NewOrderPage() {
  const t = useTranslations("dashboard.orders");
  const router = useRouter();
  const userRole = useUserRole();
  const [saving, setSaving] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  // Redirect USER role to orders list page
  useEffect(() => {
    if (userRole === "USER") {
      router.replace("/dashboard/orders");
    }
  }, [userRole, router]);
  
  const [orderData, setOrderData] = useState({
    orderId: "",
    customerEmail: "",
    dateOfPurchase: new Date().toISOString().split("T")[0],
    nextDateOfService: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  
  const [newProduct, setNewProduct] = useState({
    productId: "",
    productDescription: "",
    warranty: "",
    price: 0,
    quantity: 1,
    daikinCoins: 0,
  });

  const calculateProductTotal = () => {
    return newProduct.price * newProduct.quantity;
  };

  const calculateOrderTotal = () => {
    return products.reduce((sum, product) => sum + product.totalPrice, 0);
  };

  const handleAddProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      totalPrice: calculateProductTotal(),
    };

    setProducts([...products, product]);
    setNewProduct({
      productId: "",
      productDescription: "",
      warranty: "",
      price: 0,
      quantity: 1,
      daikinCoins: 0,
    });
    setIsProductDialogOpen(false);
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSave = async () => {
    if (!orderData.orderId || !orderData.customerEmail || products.length === 0) {
      alert("Please fill in Order ID, customer email and add at least one product");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...orderData,
          products: products.map(({ id, ...product }) => product),
        }),
      });

      if (response.ok) {
        alert("Order created successfully");
        router.push("/dashboard/orders");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">{t("createNewOrder")}</h1>
      </div>

      {/* Order Information */}
      <Card>
        <CardHeader>
          <CardTitle>{t("orderInformation")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="orderId">{t("orderId")} *</Label>
            <Input
              id="orderId"
              type="text"
              value={orderData.orderId}
              onChange={(e) =>
                setOrderData({ ...orderData, orderId: e.target.value })
              }
              placeholder={t("orderIdPlaceholder")}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="customerEmail">{t("customerEmail")} *</Label>
            <Input
              id="customerEmail"
              type="email"
              value={orderData.customerEmail}
              onChange={(e) =>
                setOrderData({ ...orderData, customerEmail: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dateOfPurchase">{t("dateOfPurchase")}</Label>
              <Input
                id="dateOfPurchase"
                type="date"
                value={orderData.dateOfPurchase}
                onChange={(e) =>
                  setOrderData({ ...orderData, dateOfPurchase: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nextDateOfService">{t("nextDateOfService")}</Label>
              <Input
                id="nextDateOfService"
                type="date"
                value={orderData.nextDateOfService}
                onChange={(e) =>
                  setOrderData({ ...orderData, nextDateOfService: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t("products")}</CardTitle>
            <Button onClick={() => setIsProductDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              {t("addProduct")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {t("noProductsYet")}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("productId")}</TableHead>
                  <TableHead>{t("productDescription")}</TableHead>
                  <TableHead>{t("warranty")}</TableHead>
                  <TableHead>{t("price")}</TableHead>
                  <TableHead>{t("quantity")}</TableHead>
                  <TableHead>{t("total")}</TableHead>
                  <TableHead>{t("daikinCoins")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.productId}</TableCell>
                    <TableCell>{product.productDescription}</TableCell>
                    <TableCell>{product.warranty || "N/A"}</TableCell>
                    <TableCell>{product.price.toFixed(2)} zł</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.totalPrice.toFixed(2)} zł</TableCell>
                    <TableCell>{product.daikinCoins}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} className="text-right font-bold">
                    {t("totalPrice")}:
                  </TableCell>
                  <TableCell className="font-bold">
                    {calculateOrderTotal().toFixed(2)} zł
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          {t("cancel")}
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("creating")}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {t("createOrder")}
            </>
          )}
        </Button>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("addProduct")}</DialogTitle>
            <DialogDescription>
              {t("addProductDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="productId">{t("productId")} *</Label>
              <Input
                id="productId"
                value={newProduct.productId}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, productId: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="productDescription">{t("productDescription")} *</Label>
              <Input
                id="productDescription"
                value={newProduct.productDescription}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    productDescription: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="warranty">{t("warranty")}</Label>
              <Input
                id="warranty"
                value={newProduct.warranty}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, warranty: e.target.value })
                }
                placeholder="e.g., 2 years"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">{t("price")} *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="quantity">{t("quantity")} *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      quantity: parseInt(e.target.value) || 1,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="totalPrice">{t("totalPrice")}</Label>
                <Input
                  id="totalPrice"
                  type="number"
                  value={calculateProductTotal().toFixed(2)}
                  disabled
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="daikinCoins">{t("daikinCoins")}</Label>
                <Input
                  id="daikinCoins"
                  type="number"
                  min="0"
                  value={newProduct.daikinCoins}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      daikinCoins: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsProductDialogOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleAddProduct}
              disabled={
                !newProduct.productId ||
                !newProduct.productDescription ||
                newProduct.price <= 0
              }
            >
              {t("addProduct")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
