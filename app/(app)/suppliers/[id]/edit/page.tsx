"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getSupplierById,
  updateSupplier,
} from "@/lib/actions/supplier-actions";

export default function EditSupplierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const router = useRouter();
  const { user } = useUser();
  const role =
    String((user?.publicMetadata as any)?.role || "")
      .toLowerCase()
      .replace(/[\s_-]/g, "") || "";
  const currentUserId = String(user?.id || "");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [supplier, setSupplier] = useState<any | null>(null);
  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    goodsType: "",
    deliveryTimeline: "",
    vendorPaymentTerms: "",
    paymentMethods: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getSupplierById(id)
      .then((res: any) => {
        const data = res && res.success ? res.data : null;
        if (!mounted) return;
        if (
          role === "supplier" &&
          String(data?.ownerUserId || "") !== currentUserId
        ) {
          router.push("/suppliers");
          return;
        }
        setSupplier(data);
        const o = (data?.onboarding || {}) as any;
        setForm({
          name: String(data?.name || ""),
          contactPerson: String(o?.contactPerson || ""),
          email: String(o?.email || ""),
          phone: String(o?.phone || ""),
          goodsType: String(o?.goodsType || ""),
          deliveryTimeline: String(o?.deliveryTimeline || ""),
          vendorPaymentTerms: String(o?.vendorPaymentTerms || ""),
          paymentMethods: ((o?.paymentMethods || []) as string[]).join(", "),
          bankName: String(o?.bankDetails?.bankName || ""),
          accountName: String(o?.bankDetails?.accountName || ""),
          accountNumber: String(o?.bankDetails?.accountNumber || ""),
        });
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id, role, currentUserId, router]);

  const setField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!supplier?._id) return;
    setSaving(true);
    const updates = {
      name: form.name,
      onboarding: {
        contactPerson: form.contactPerson,
        email: form.email,
        phone: form.phone,
        goodsType: form.goodsType,
        deliveryTimeline: form.deliveryTimeline,
        vendorPaymentTerms: form.vendorPaymentTerms,
        paymentMethods: form.paymentMethods
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        bankDetails: {
          bankName: form.bankName,
          accountName: form.accountName,
          accountNumber: form.accountNumber,
        },
      },
    };
    const res = await updateSupplier(String(supplier._id), updates);
    setSaving(false);
    if (res && res.success) {
      router.push("/suppliers");
    }
  };

  return (
    <div className="p-4 md:p-6 mx-auto w-full max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Edit Supplier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : !supplier ? (
            <div className="text-sm text-muted-foreground">
              Supplier not found
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Supplier name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Primary contact</Label>
                  <Input
                    id="contactPerson"
                    value={form.contactPerson}
                    onChange={(e) => setField("contactPerson", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goodsType">Goods type</Label>
                  <Input
                    id="goodsType"
                    value={form.goodsType}
                    onChange={(e) => setField("goodsType", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryTimeline">Delivery timeline</Label>
                  <Input
                    id="deliveryTimeline"
                    value={form.deliveryTimeline}
                    onChange={(e) =>
                      setField("deliveryTimeline", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorPaymentTerms">Payment terms</Label>
                <Input
                  id="vendorPaymentTerms"
                  value={form.vendorPaymentTerms}
                  onChange={(e) =>
                    setField("vendorPaymentTerms", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethods">Payment methods</Label>
                <Textarea
                  id="paymentMethods"
                  placeholder="Comma-separated, e.g., Bank transfer, Cash"
                  value={form.paymentMethods}
                  onChange={(e) => setField("paymentMethods", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank name</Label>
                  <Input
                    id="bankName"
                    value={form.bankName}
                    onChange={(e) => setField("bankName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account name</Label>
                  <Input
                    id="accountName"
                    value={form.accountName}
                    onChange={(e) => setField("accountName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account number</Label>
                  <Input
                    id="accountNumber"
                    value={form.accountNumber}
                    onChange={(e) => setField("accountNumber", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/suppliers")}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
