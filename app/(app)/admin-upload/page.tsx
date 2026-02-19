import { auth, clerkClient } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getSuppliers } from "@/lib/actions/supplier-actions";
import { getRequisitions } from "@/lib/actions/requisition-actions";
import { SupplierCategorizedUpload } from "@/components/supplier-categorized-upload";
import { SupplierQuotationUpload } from "@/components/supplier-quotation-upload";
import { Building2, FileUp, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminUploadPage() {
  const { userId } = await auth();
  let allowed = false;

  if (userId) {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const md = (user?.publicMetadata || {}) as any;
      const normalized = String(md.role || "")
        .toLowerCase()
        .replace(/[\s_-]/g, "");
      allowed = ["admin", "superadmin"].includes(normalized);
    } catch {
      allowed = false;
    }
  }

  if (!allowed) {
    return (
      <div className="p-4 md:p-6">
        <Card className="border-destructive/50 bg-destructive/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-destructive" />
              <CardTitle className="text-base">Access Denied</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Only Admin and Superadmin can access supplier document uploads.
          </CardContent>
        </Card>
      </div>
    );
  }

  const res = await getSuppliers();
  const suppliers: any[] = res && res.success ? (res as any).data || [] : [];
  const reqRes = await getRequisitions();
  const requisitions: any[] =
    reqRes && (reqRes as any).success ? (reqRes as any).data || [] : [];

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          <h1 className="text-lg sm:text-xl font-semibold">
            Supplier Document Upload
          </h1>
        </div>
        <Badge variant="secondary" className="text-xs">
          Approved suppliers: {suppliers.length}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Approved Suppliers</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Supplier ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-sm text-muted-foreground"
                    >
                      No approved suppliers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  suppliers.map((s: any) => (
                    <TableRow key={String(s?._id || s?.supplierId)}>
                      <TableCell className="font-medium">
                        {s?.name || "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {s?.supplierId || "-"}
                      </TableCell>
                      <TableCell>
                        {s?.primaryCategory || s?.category || "-"}
                      </TableCell>
                      <TableCell>{s?.region || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="gap-2"
                              suppressHydrationWarning
                            >
                              <FileUp className="w-4 h-4" />
                              Upload
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>
                                Upload documents for {s?.name || "Supplier"}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="text-xs text-muted-foreground mb-2">
                              Note: Files are saved to the supplier’s document
                              list.
                            </div>
                            {s?._id ? (
                              <SupplierCategorizedUpload
                                supplierId={String(s._id)}
                              />
                            ) : (
                              <div className="text-xs text-muted-foreground">
                                Missing supplier identifier.
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">
            Supplier Quotation Documents Uploads
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Supplier ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-sm text-muted-foreground"
                    >
                      No approved suppliers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  suppliers.map((s: any) => (
                    <TableRow key={`quote-${String(s?._id || s?.supplierId)}`}>
                      <TableCell className="font-medium">
                        {s?.name || "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {s?.supplierId || "-"}
                      </TableCell>
                      <TableCell>
                        {s?.primaryCategory || s?.category || "-"}
                      </TableCell>
                      <TableCell>{s?.region || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="gap-2"
                              suppressHydrationWarning
                            >
                              <FileUp className="w-4 h-4" />
                              Upload Quotation
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>
                                Upload quotation documents for{" "}
                                {s?.name || "Supplier"}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="text-xs text-muted-foreground mb-2">
                              Select the requisition and upload PDFs/images up
                              to 20MB per file.
                            </div>
                            <SupplierQuotationUpload
                              requisitions={requisitions.map((r: any) => ({
                                requisitionId: r.requisitionId,
                                amount: r.amount,
                                requester: r.requester,
                                date: r.date,
                              }))}
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
