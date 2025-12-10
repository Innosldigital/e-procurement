"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { deleteUser, getUsers } from "@/lib/actions/user-actions";
import { getSupplierOnboardingByUserId } from "@/lib/actions/supplier-actions";
import {
  approveSupplierOnboarding,
  rejectSupplierOnboarding,
} from "@/lib/actions/admin-approval-actions";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  photo?: string;
  onboarded?: boolean;
  onboardingStatus?: string;
  createdAt?: number;
  lastSignInAt?: number;
};

import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function UsersTable() {
  const { user } = useUser();
  const currentUserRole = String((user?.publicMetadata as any)?.role || "")
    .toLowerCase()
    .replace(/[\s_-]/g, "");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [userToView, setUserToView] = useState<User | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [onboardingDetails, setOnboardingDetails] = useState<any | null>(null);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const handleDelete = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setUserToUpdate(user);
    setEditDialogOpen(true);
  };

  const handleViewDetails = (user: User) => {
    setUserToView(user);
    setDetailsOpen(true);
  };

  const closeEditModal = () => {
    setEditDialogOpen(false);
    setUserToUpdate(null);
  };

  useEffect(() => {
    const load = async () => {
      if (!detailsOpen || !userToView?.id) return;
      try {
        setDetailsLoading(true);
        const res: any = await getSupplierOnboardingByUserId(userToView.id);
        const data = res && res.success ? res.data : null;
        setOnboardingDetails(data);
      } catch {
        setOnboardingDetails(null);
      } finally {
        setDetailsLoading(false);
      }
    };
    load();
  }, [detailsOpen, userToView?.id]);

  const handleApproveOnboarding = async () => {
    const sid = onboardingDetails?.supplierId;
    if (!sid) return;
    try {
      setApproveLoading(true);
      const res: any = await approveSupplierOnboarding(String(sid));
      if (res && res.success) {
        setDetailsOpen(false);
        setRejectReason("");
        setSubmited(!submited);
        router.refresh();
      }
    } finally {
      setApproveLoading(false);
    }
  };

  const handleRejectOnboarding = async () => {
    const sid = onboardingDetails?.supplierId;
    const reason = rejectReason.trim();
    if (!sid || !reason) return;
    try {
      setRejectLoading(true);
      const res: any = await rejectSupplierOnboarding(String(sid), reason);
      if (res && res.success) {
        setDetailsOpen(false);
        setRejectReason("");
        setSubmited(!submited);
        router.refresh();
      }
    } finally {
      setRejectLoading(false);
    }
  };

  const onSubmit = () => {
    setSubmited(!submited);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        setIsSubmiting(true);
        await deleteUser(userToDelete);
        setUserToDelete(null);
        setDeleteDialogOpen(false);
        setIsSubmiting(false);
        setSubmited(!submited);
      } catch (error) {
        console.error("Error deleting user:", error);
        setIsSubmiting(false);
      }
    }
  };

  // --------------------------------------------------------------
  // APPLY FILTER HERE: Admin should NOT see superadmin users
  // --------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const result = await getUsers();

        const allUsers = result.users || [];

        // Admin should not see superadmin
        const filtered =
          currentUserRole === "admin"
            ? allUsers.filter(
                (u: any) => u.role?.toLowerCase() !== "superadmin"
              )
            : allUsers;

        setUsers(filtered);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [submited, currentUserRole]);
  // --------------------------------------------------------------

  // Filter users based on search
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();

    return fullName.includes(query) || email.includes(query);
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number.parseInt(value));
    setCurrentPage(1);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      {/* ---------------- PAGE HEADER ---------------- */}
      <div className="p-4 space-y-6 ">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Users</h2>
            <p className="text-muted-foreground">
              Manage your team members and their roles
            </p>
          </div>

          <AddUser
            currentUserRole={String(
              (user?.publicMetadata as any)?.role || "admin"
            )
              .toLowerCase()
              .replace(/[\s_-]/g, "")}
            onSubmitComplete={onSubmit}
          />
        </div>

        {/* ---------------- SEARCH ---------------- */}
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        {/* ---------------- EDIT MODAL ---------------- */}
        {userToUpdate && (
          <EditUser
            userData={userToUpdate}
            isOpen={editDialogOpen}
            onClose={closeEditModal}
            currentUserRole={String(
              (user?.publicMetadata as any)?.role || "admin"
            )
              .toLowerCase()
              .replace(/[\s_-]/g, "")}
            onSubmitComplete={onSubmit}
          />
        )}

        {/* ---------------- USERS TABLE ---------------- */}
        <div className="hidden md:block">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[80px]">Avatar</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right w-[100px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {!loading &&
                      currentUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-muted/50">
                          <TableCell>
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={user.photo || "/placeholder.svg"}
                                alt={user.firstName + " " + user.lastName}
                              />
                              <AvatarFallback>
                                {user.firstName?.[0]}
                                {user.lastName?.[0]}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>

                          <TableCell className="font-medium">
                            {user.firstName + " " + user.lastName}
                          </TableCell>

                          <TableCell className="text-muted-foreground">
                            {user.email}
                          </TableCell>

                          <TableCell>
                            <Badge variant="secondary">{user.role}</Badge>
                          </TableCell>

                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-8 h-8 p-0">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() => handleViewDetails(user)}
                                >
                                  <Pencil className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() => handleEdit(user)}
                                >
                                  <Pencil className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  onClick={() => handleDelete(user.id)}
                                  className="cursor-pointer text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ---------------- PAGINATION SECTION ---------------- */}
        {!loading && filteredUsers.length > 0 && (
          <div className="flex flex-cols items-start justify-between gap-4 pt-4 lg:flex-row lg:items-center">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </p>
            </div>

            <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center sm:justify-end">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[5, 10, 20, 30, 50].map((v) => (
                      <SelectItem key={v} value={v.toString()}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-1 text-muted-foreground">
                            ...
                          </span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      </div>
                    ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ---------------- DELETE DIALOG ---------------- */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              variant="destructive"
              disabled={isSubmiting}
            >
              {isSubmiting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">User onboarding</DialogTitle>
            <DialogDescription className="text-xs">
              Details from supplier onboarding
            </DialogDescription>
          </DialogHeader>
          {detailsLoading ? (
            <div className="text-sm text-muted-foreground">Loading…</div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm">
                <div className="font-medium">
                  {userToView?.firstName} {userToView?.lastName}
                </div>
                <div className="text-muted-foreground">{userToView?.email}</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Supplier ID: {onboardingDetails?.supplierId || "-"}
              </div>
              <div className="space-y-2 text-xs">
                <div className="font-medium">Company</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded border p-2">
                    <div className="text-muted-foreground">Name</div>
                    <div className="font-medium">
                      {onboardingDetails?.name || "-"}
                    </div>
                  </div>
                  <div className="rounded border p-2">
                    <div className="text-muted-foreground">Category</div>
                    <div className="font-medium">
                      {onboardingDetails?.category || "-"}
                    </div>
                  </div>
                  <div className="rounded border p-2">
                    <div className="text-muted-foreground">Region</div>
                    <div className="font-medium">
                      {onboardingDetails?.region || "-"}
                    </div>
                  </div>
                  <div className="rounded border p-2">
                    <div className="text-muted-foreground">Segment</div>
                    <div className="font-medium">
                      {onboardingDetails?.segment || "-"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="font-medium">Contacts</div>
                <div className="space-y-2">
                  {(onboardingDetails?.contacts || []).length === 0 ? (
                    <div className="text-muted-foreground">None</div>
                  ) : (
                    (onboardingDetails?.contacts || []).map(
                      (c: any, i: number) => (
                        <div key={i} className="rounded border p-2">
                          <div className="font-medium">
                            {c.role || "Contact"}
                          </div>
                          <div className="text-muted-foreground">
                            {c.name || ""} • {c.email || ""} • {c.phone || ""}
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="font-medium">Documents</div>
                <div className="space-y-2">
                  {(() => {
                    const o = onboardingDetails?.onboarding || {};
                    const uploads = [
                      ...(o.priceListUploads || []),
                      ...(o.registrationCertificateUploads || []),
                      ...(o.businessRegistrationCertificateUploads || []),
                      ...(o.taxClearanceCertificateUploads || []),
                      ...(o.gstVatRegistrationCertificateUploads || []),
                      ...(o.businessLicenseUploads || []),
                      ...(o.nassitCertificateUploads || []),
                      ...(o.sectorSpecificCertificateUploads || []),
                    ];
                    const docs = onboardingDetails?.documents || [];
                    const empty = uploads.length === 0 && docs.length === 0;
                    if (empty)
                      return <div className="text-muted-foreground">None</div>;
                    return (
                      <div className="space-y-2">
                        {uploads.map((d: any, i: number) => (
                          <div
                            key={`ud-${i}`}
                            className="flex items-center justify-between p-2 rounded border"
                          >
                            {d.url ? (
                              <a
                                href={d.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium hover:underline break-all"
                              >
                                {d.name || "Document"}
                              </a>
                            ) : (
                              <span className="font-medium break-all">
                                {d.name || "Document"}
                              </span>
                            )}
                            <div className="text-muted-foreground">
                              {d.type || ""} • {d.size || ""}
                            </div>
                          </div>
                        ))}
                        {docs.map((d: any, i: number) => (
                          <div
                            key={`dd-${i}`}
                            className="flex items-center justify-between p-2 rounded border"
                          >
                            <span className="font-medium">
                              {d.name || "Document"}
                            </span>
                            <div className="text-muted-foreground">
                              {d.type || ""} • {d.size || ""}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="font-medium">Admin Actions</div>
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <Input
                    placeholder="Rejection reason"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="sm:max-w-xs"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleApproveOnboarding}
                      disabled={approveLoading}
                    >
                      {approveLoading ? "Approving..." : "Approve"}
                    </Button>
                    <Button
                      onClick={handleRejectOnboarding}
                      variant="destructive"
                      disabled={rejectLoading || !rejectReason.trim()}
                    >
                      {rejectLoading ? "Rejecting..." : "Reject"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
