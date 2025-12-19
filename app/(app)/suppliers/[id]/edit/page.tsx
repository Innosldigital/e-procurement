// "use client";
// import * as React from "react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   getSupplierById,
//   updateSupplier,
// } from "@/lib/actions/supplier-actions";

// export default function EditSupplierPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = React.use(params);
//   const router = useRouter();
//   const { user } = useUser();
//   const role =
//     String((user?.publicMetadata as any)?.role || "")
//       .toLowerCase()
//       .replace(/[\s_-]/g, "") || "";
//   const currentUserId = String(user?.id || "");

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [supplier, setSupplier] = useState<any | null>(null);
//   const [form, setForm] = useState({
//     name: "",
//     contactPerson: "",
//     email: "",
//     phone: "",
//     goodsType: "",
//     deliveryTimeline: "",
//     vendorPaymentTerms: "",
//     paymentMethods: "",
//     bankName: "",
//     accountName: "",
//     accountNumber: "",
//   });

//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     getSupplierById(id)
//       .then((res: any) => {
//         const data = res && res.success ? res.data : null;
//         if (!mounted) return;
//         if (
//           role === "supplier" &&
//           String(data?.ownerUserId || "") !== currentUserId
//         ) {
//           router.push("/suppliers");
//           return;
//         }
//         setSupplier(data);
//         const o = (data?.onboarding || {}) as any;
//         setForm({
//           name: String(data?.name || ""),
//           contactPerson: String(o?.contactPerson || ""),
//           email: String(o?.email || ""),
//           phone: String(o?.phone || ""),
//           goodsType: String(o?.goodsType || ""),
//           deliveryTimeline: String(o?.deliveryTimeline || ""),
//           vendorPaymentTerms: String(o?.vendorPaymentTerms || ""),
//           paymentMethods: ((o?.paymentMethods || []) as string[]).join(", "),
//           bankName: String(o?.bankDetails?.bankName || ""),
//           accountName: String(o?.bankDetails?.accountName || ""),
//           accountNumber: String(o?.bankDetails?.accountNumber || ""),
//         });
//       })
//       .finally(() => {
//         if (!mounted) return;
//         setLoading(false);
//       });
//     return () => {
//       mounted = false;
//     };
//   }, [id, role, currentUserId, router]);

//   const setField = (field: string, value: string) =>
//     setForm((prev) => ({ ...prev, [field]: value }));

//   const handleSave = async () => {
//     if (!supplier?._id) return;
//     setSaving(true);
//     const updates = {
//       name: form.name,
//       onboarding: {
//         contactPerson: form.contactPerson,
//         email: form.email,
//         phone: form.phone,
//         goodsType: form.goodsType,
//         deliveryTimeline: form.deliveryTimeline,
//         vendorPaymentTerms: form.vendorPaymentTerms,
//         paymentMethods: form.paymentMethods
//           .split(",")
//           .map((s) => s.trim())
//           .filter(Boolean),
//         bankDetails: {
//           bankName: form.bankName,
//           accountName: form.accountName,
//           accountNumber: form.accountNumber,
//         },
//       },
//     };
//     const res = await updateSupplier(String(supplier._id), updates);
//     setSaving(false);
//     if (res && res.success) {
//       router.push("/suppliers");
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 mx-auto w-full ">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">Edit Supplier</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {loading ? (
//             <div className="text-sm text-muted-foreground">Loading...</div>
//           ) : !supplier ? (
//             <div className="text-sm text-muted-foreground">
//               Supplier not found
//             </div>
//           ) : (
//             <>
//               <div className="space-y-2">
//                 <Label htmlFor="name">Supplier name</Label>
//                 <Input
//                   id="name"
//                   value={form.name}
//                   onChange={(e) => setField("name", e.target.value)}
//                 />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="contactPerson">Primary contact</Label>
//                   <Input
//                     id="contactPerson"
//                     value={form.contactPerson}
//                     onChange={(e) => setField("contactPerson", e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={form.email}
//                     onChange={(e) => setField("email", e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone</Label>
//                   <Input
//                     id="phone"
//                     value={form.phone}
//                     onChange={(e) => setField("phone", e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="goodsType">Goods type</Label>
//                   <Input
//                     id="goodsType"
//                     value={form.goodsType}
//                     onChange={(e) => setField("goodsType", e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="deliveryTimeline">Delivery timeline</Label>
//                   <Input
//                     id="deliveryTimeline"
//                     value={form.deliveryTimeline}
//                     onChange={(e) =>
//                       setField("deliveryTimeline", e.target.value)
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="paymentMethods">Payment methods</Label>
//                 <Textarea
//                   id="paymentMethods"
//                   placeholder="Comma-separated, e.g., Bank transfer, Cash"
//                   value={form.paymentMethods}
//                   onChange={(e) => setField("paymentMethods", e.target.value)}
//                 />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="bankName">Bank name</Label>
//                   <Input
//                     id="bankName"
//                     value={form.bankName}
//                     onChange={(e) => setField("bankName", e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="accountName">Account name</Label>
//                   <Input
//                     id="accountName"
//                     value={form.accountName}
//                     onChange={(e) => setField("accountName", e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="accountNumber">Account number</Label>
//                   <Input
//                     id="accountNumber"
//                     value={form.accountNumber}
//                     onChange={(e) => setField("accountNumber", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="pt-2 border-t">
//                 <h3 className="text-sm font-medium mb-2">Uploaded documents</h3>
//                 <div className="space-y-2 text-xs">
//                   {(() => {
//                     const o = (supplier?.onboarding || {}) as any;
//                     const uploads = [
//                       ...(o.priceListUploads || []),
//                       ...(o.registrationCertificateUploads || []),
//                       ...(o.businessRegistrationCertificateUploads || []),
//                       ...(o.taxClearanceCertificateUploads || []),
//                       ...(o.gstVatRegistrationCertificateUploads || []),
//                       ...(o.businessLicenseUploads || []),
//                       ...(o.nassitCertificateUploads || []),
//                       ...(o.sectorSpecificCertificateUploads || []),
//                       ...(o.businessDurationDocuments || []),
//                     ];
//                     const docs = (supplier?.documents || []) as any[];
//                     const empty = uploads.length === 0 && docs.length === 0;
//                     if (empty) {
//                       return (
//                         <div className="text-muted-foreground">
//                           No documents uploaded
//                         </div>
//                       );
//                     }
//                     return (
//                       <>
//                         {uploads.map((d: any, i: number) => (
//                           <div
//                             key={`up-${i}`}
//                             className="flex items-center justify-between p-2 rounded border"
//                           >
//                             {d?.url ? (
//                               <a
//                                 href={d.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="font-medium hover:underline break-all"
//                               >
//                                 {d.name || "Document"}
//                               </a>
//                             ) : (
//                               <span className="font-medium break-all">
//                                 {d.name || "Document"}
//                               </span>
//                             )}
//                             <div className="flex items-center gap-2 text-muted-foreground">
//                               <span>
//                                 {(d.type || "") +
//                                   (d.size ? ` • ${d.size}` : "")}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                         {docs.map((d: any, i: number) => (
//                           <div
//                             key={`doc-${i}`}
//                             className="flex items-center justify-between p-2 rounded border"
//                           >
//                             <span className="font-medium">
//                               {d.name || "Document"}
//                             </span>
//                             <div className="flex items-center gap-2 text-muted-foreground">
//                               <span>
//                                 {(d.type || "") +
//                                   (d.size ? ` • ${d.size}` : "")}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </>
//                     );
//                   })()}
//                 </div>
//               </div>

//               <div className="flex gap-2 pt-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => router.push("/suppliers")}
//                   disabled={saving}
//                 >
//                   Cancel
//                 </Button>
//                 <Button onClick={handleSave} disabled={saving}>
//                   {saving ? "Saving..." : "Save changes"}
//                 </Button>
//               </div>
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

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
import {
  ArrowLeft,
  Save,
  X,
  FileText,
  Building2,
  CreditCard,
  User,
  Mail,
  Phone,
  Package,
  Clock,
} from "lucide-react";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-card border-b border-border shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/suppliers")}
                className="hover:bg-accent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Back to Suppliers</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div className="border-l border-border h-6"></div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                  Edit Supplier
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Update supplier information and bank details
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/suppliers")}
                disabled={saving}
                className="hidden sm:flex"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || loading}
                size="sm"
                className="shadow-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Loading supplier details...
                </p>
              </CardContent>
            </Card>
          ) : !supplier ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-muted-foreground mb-4">
                  <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Supplier not found</p>
                </div>
                <Button onClick={() => router.push("/suppliers")}>
                  Return to Suppliers
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card className="shadow-sm">
                <CardHeader className="bg-muted/30 border-b">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-base sm:text-lg">
                      Basic Information
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        Supplier Name
                      </Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        placeholder="Enter supplier name"
                        className="h-10"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="contactPerson"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <User className="w-4 h-4 text-muted-foreground" />
                          Primary Contact
                        </Label>
                        <Input
                          id="contactPerson"
                          value={form.contactPerson}
                          onChange={(e) =>
                            setField("contactPerson", e.target.value)
                          }
                          placeholder="Contact person name"
                          className="h-10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setField("email", e.target.value)}
                          placeholder="email@example.com"
                          className="h-10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                          placeholder="+232 XX XXX XXXX"
                          className="h-10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="goodsType"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Package className="w-4 h-4 text-muted-foreground" />
                          Goods Type
                        </Label>
                        <Input
                          id="goodsType"
                          value={form.goodsType}
                          onChange={(e) =>
                            setField("goodsType", e.target.value)
                          }
                          placeholder="Type of goods supplied"
                          className="h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="deliveryTimeline"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        Delivery Timeline
                      </Label>
                      <Input
                        id="deliveryTimeline"
                        value={form.deliveryTimeline}
                        onChange={(e) =>
                          setField("deliveryTimeline", e.target.value)
                        }
                        placeholder="e.g., 2-3 business days"
                        className="h-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="shadow-sm">
                <CardHeader className="bg-muted/30 border-b">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <CardTitle className="text-base sm:text-lg">
                      Payment Information
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="paymentMethods"
                        className="text-sm font-medium"
                      >
                        Payment Methods
                      </Label>
                      <Textarea
                        id="paymentMethods"
                        placeholder="Comma-separated, e.g., Bank transfer, Mobile Money, Cash"
                        value={form.paymentMethods}
                        onChange={(e) =>
                          setField("paymentMethods", e.target.value)
                        }
                        className="min-h-[80px] resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate multiple payment methods with commas
                      </p>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-4">
                        Bank Account Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="bankName"
                            className="text-sm font-medium"
                          >
                            Bank Name
                          </Label>
                          <Input
                            id="bankName"
                            value={form.bankName}
                            onChange={(e) =>
                              setField("bankName", e.target.value)
                            }
                            placeholder="e.g., Sierra Leone Commercial Bank"
                            className="h-10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="accountName"
                            className="text-sm font-medium"
                          >
                            Account Name
                          </Label>
                          <Input
                            id="accountName"
                            value={form.accountName}
                            onChange={(e) =>
                              setField("accountName", e.target.value)
                            }
                            placeholder="Account holder name"
                            className="h-10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="accountNumber"
                            className="text-sm font-medium"
                          >
                            Account Number
                          </Label>
                          <Input
                            id="accountNumber"
                            value={form.accountNumber}
                            onChange={(e) =>
                              setField("accountNumber", e.target.value)
                            }
                            placeholder="XXXX XXXX XXXX"
                            className="h-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Uploaded Documents */}
              <Card className="shadow-sm">
                <CardHeader className="bg-muted/30 border-b">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <CardTitle className="text-base sm:text-lg">
                      Uploaded Documents
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-2">
                    {(() => {
                      const o = (supplier?.onboarding || {}) as any;
                      const uploads = [
                        ...(o.priceListUploads || []),
                        ...(o.registrationCertificateUploads || []),
                        ...(o.businessRegistrationCertificateUploads || []),
                        ...(o.taxClearanceCertificateUploads || []),
                        ...(o.gstVatRegistrationCertificateUploads || []),
                        ...(o.businessLicenseUploads || []),
                        ...(o.nassitCertificateUploads || []),
                        ...(o.sectorSpecificCertificateUploads || []),
                        ...(o.businessDurationDocuments || []),
                      ];
                      const docs = (supplier?.documents || []) as any[];
                      const empty = uploads.length === 0 && docs.length === 0;
                      if (empty) {
                        return (
                          <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                            <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No documents uploaded</p>
                          </div>
                        );
                      }
                      return (
                        <div className="grid grid-cols-1 gap-2">
                          {uploads.map((d: any, i: number) => (
                            <div
                              key={`up-${i}`}
                              className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                            >
                              {d?.url ? (
                                <a
                                  href={d.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 font-medium hover:underline break-all flex-1 min-w-0"
                                >
                                  <FileText className="w-4 h-4 flex-shrink-0 text-primary" />
                                  <span className="truncate">
                                    {d.name || "Document"}
                                  </span>
                                </a>
                              ) : (
                                <div className="flex items-center gap-2 font-medium break-all flex-1 min-w-0">
                                  <FileText className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                                  <span className="truncate">
                                    {d.name || "Document"}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-xs text-muted-foreground ml-2 flex-shrink-0">
                                <span className="hidden sm:inline">
                                  {(d.type || "") +
                                    (d.size ? ` • ${d.size}` : "")}
                                </span>
                              </div>
                            </div>
                          ))}
                          {docs.map((d: any, i: number) => (
                            <div
                              key={`doc-${i}`}
                              className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                            >
                              <div className="flex items-center gap-2 font-medium flex-1 min-w-0">
                                <FileText className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                                <span className="truncate">
                                  {d.name || "Document"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground ml-2 flex-shrink-0">
                                <span className="hidden sm:inline">
                                  {(d.type || "") +
                                    (d.size ? ` • ${d.size}` : "")}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons - Mobile Only */}
              <div className="flex sm:hidden gap-2 pb-6">
                <Button
                  variant="outline"
                  onClick={() => router.push("/suppliers")}
                  disabled={saving}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
