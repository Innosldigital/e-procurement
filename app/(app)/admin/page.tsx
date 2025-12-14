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
  Clock,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

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

type UploadObject = {
  name?: string;
  size?: number;
  type?: string;
  url?: string;
};
type BankDetails = {
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  prefersCash?: boolean;
};
type OnboardingData = {
  contactPerson?: string;
  phone?: string;
  email?: string;
  goodsType?: string;
  productCategories?: string[];
  supplyAreas?: string[];
  deliveryTimeline?: string;
  priceListUploads?: UploadObject[];
  registrationCertificateUploads?: UploadObject[];
  businessRegistrationCertificateUploads?: UploadObject[];
  taxClearanceCertificateUploads?: UploadObject[];
  gstVatRegistrationCertificateUploads?: UploadObject[];
  businessLicenseUploads?: UploadObject[];
  nassitCertificateUploads?: UploadObject[];
  sectorSpecificCertificateUploads?: UploadObject[];
  businessDurationDocuments?: UploadObject[];
  paymentMethods?: string[];
  bankDetails?: BankDetails;
  vendorPaymentTerms?: string;
  businessLeadGender?: string;
  inBusinessMoreThan3Years?: boolean;
  dateOfIncorporation?: string;
  averageTurnover?: string;
  declarations?: { infoAccurate?: boolean; agreeRules?: boolean };
};
type Contact = { role?: string; name?: string; email?: string; phone?: string };
type Document = {
  name?: string;
  type?: string;
  size?: string;
  signedDate?: string;
  expiresDate?: string;
  owner?: string;
};
type SupplierOnboardingDetails = {
  supplierId?: string;
  name?: string;
  approved?: boolean;
  category?: string;
  region?: string;
  segment?: string;
  onboarding?: OnboardingData;
  contacts?: Contact[];
  documents?: Document[];
};

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
  const [userToView, setUserToView] = useState<any | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [onboardingDetails, setOnboardingDetails] =
    useState<SupplierOnboardingDetails | null>(null);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectReasonType, setRejectReasonType] = useState("");
  const [rejectNotes, setRejectNotes] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  // Check if user is an invitation (pending)
  const isInvitation = (userId: string) => userId.startsWith("invitation_");

  // Check if user has completed onboarding
  const hasCompletedOnboarding = (user: User | null) => {
    if (!user) return false;
    return user.onboarded === true || user.onboardingStatus === "approved";
  };

  const handleDelete = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    // Don't allow editing invitations
    if (isInvitation(user.id)) return;
    setUserToUpdate(user);
    setEditDialogOpen(true);
  };

  const handleViewDetails = (user: User) => {
    // Don't allow viewing details for invitations or users who haven't completed onboarding
    if (isInvitation(user.id) || !hasCompletedOnboarding(user)) {
      return;
    }
    setUserToView(user);
    setDetailsOpen(true);
  };

  const closeEditModal = () => {
    setEditDialogOpen(false);
    setUserToUpdate(null);
  };

  useEffect(() => {
    const load = async () => {
      if (!detailsOpen || !userToView?.id || isInvitation(userToView.id))
        return;

      // Only fetch onboarding details if user has completed onboarding
      if (!hasCompletedOnboarding(userToView)) {
        setOnboardingDetails(null);
        setDetailsLoading(false);
        return;
      }

      // Only fetch onboarding details for supplier role
      if (userToView.role?.toLowerCase() !== "supplier") {
        setOnboardingDetails(null);
        setDetailsLoading(false);
        return;
      }

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
    const type = rejectReasonType.trim();
    const notes = rejectNotes.trim();
    const reason = notes ? `${type}: ${notes}` : type;
    if (!sid || !type) return;
    try {
      setRejectLoading(true);
      const res: any = await rejectSupplierOnboarding(String(sid), reason);
      if (res && res.success) {
        setDetailsOpen(false);
        setRejectReason("");
        setRejectReasonType("");
        setRejectNotes("");
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

        // Handle invitation deletion differently
        if (isInvitation(userToDelete)) {
          // Extract invitation ID from the prefixed ID
          const invitationId = userToDelete.replace("invitation_", "");
          // You'll need to add a deleteInvitation action
          // await deleteInvitation(invitationId);
          console.log("Delete invitation:", invitationId);
        } else {
          await deleteUser(userToDelete);
        }

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

  const getStatusBadge = (user: User) => {
    if (user.onboardingStatus === "pending_invitation") {
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-300"
        >
          <Clock className="w-3 h-3 mr-1" />
          Pending Invitation
        </Badge>
      );
    }
    return <Badge variant="secondary">{user.role}</Badge>;
  };

  // Check if View Details should be available for a user
  const canViewDetails = (user: User | null) => {
    if (!user) return false;
    // Only suppliers can have onboarding details
    return (
      !isInvitation(user.id) &&
      hasCompletedOnboarding(user) &&
      user.role?.toLowerCase() === "supplier"
    );
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

                          <TableCell>{getStatusBadge(user)}</TableCell>

                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-8 h-8 p-0">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                {canViewDetails(user) && (
                                  <>
                                    <DropdownMenuItem
                                      className="cursor-pointer"
                                      onClick={() => handleViewDetails(user)}
                                    >
                                      <Pencil className="w-4 h-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                  </>
                                )}

                                {!isInvitation(user.id) && (
                                  <>
                                    <DropdownMenuItem
                                      className="cursor-pointer"
                                      onClick={() => handleEdit(user)}
                                    >
                                      <Pencil className="w-4 h-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                  </>
                                )}

                                <DropdownMenuItem
                                  onClick={() => handleDelete(user.id)}
                                  className="cursor-pointer text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  {isInvitation(user.id)
                                    ? "Revoke Invitation"
                                    : "Delete"}
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
              {userToDelete && isInvitation(userToDelete)
                ? "Are you sure you want to revoke this invitation?"
                : "Are you sure you want to delete this user?"}
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
              {isSubmiting
                ? "Processing..."
                : userToDelete && isInvitation(userToDelete)
                ? "Revoke"
                : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ---------------- USER DETAILS DIALOG ---------------- */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-5xl lg:max-w-6xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="sticky top-0 z-10 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 border-b bg-background/80 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-lg sm:text-xl font-bold">
                  User Onboarding Details
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm mt-1">
                  Review and manage supplier onboarding information
                </DialogDescription>
              </div>
              {onboardingDetails && (
                <Badge
                  variant={onboardingDetails.approved ? "default" : "secondary"}
                  className="shrink-0"
                >
                  {onboardingDetails.approved ? "Approved" : "Pending Review"}
                </Badge>
              )}
            </div>
          </DialogHeader>

          {/* <ScrollArea className="flex-1 px-4 sm:px-6 py-4"> */}
          <ScrollArea className="flex-1 px-4 sm:px-6 py-4">
            {detailsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground">
                    Loading details...
                  </p>
                </div>
              </div>
            ) : !userToView ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No user selected
                  </p>
                </CardContent>
              </Card>
            ) : !hasCompletedOnboarding(userToView) ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    This user has not completed onboarding yet.
                  </p>
                </CardContent>
              </Card>
            ) : userToView?.role?.toLowerCase() !== "supplier" ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Onboarding details are only available for supplier users.
                  </p>
                </CardContent>
              </Card>
            ) : onboardingDetails ? (
              <div className="space-y-6 h-[180px]">
                {/* User Info Section */}
                <Card className="border-2">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-14 h-14 sm:w-16 sm:h-16 ring-2 ring-offset-2 ring-primary/10">
                        <AvatarImage
                          src={userToView?.photo || "/placeholder.svg"}
                          alt={`${onboardingDetails?.onboarding
                            ?.contactPerson!}`}
                        />
                        <AvatarFallback className="text-lg font-semibold">
                          {onboardingDetails?.onboarding?.contactPerson!}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold">
                          {onboardingDetails?.onboarding?.contactPerson!}
                        </h3>
                        <p className="text-sm text-muted-foreground break-all">
                          {onboardingDetails?.onboarding?.email!}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {userToView?.role || "-"}
                          </Badge>
                          {onboardingDetails?.supplierId && (
                            <span className="text-xs text-muted-foreground">
                              ID: {onboardingDetails?.supplierId || "-"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Company Information */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full" />
                    Suppler Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Supplier Name
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.name || "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Category
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.category || "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Region
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.region || "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Segment
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.segment || "-"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Contacts Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full" />
                    Contact Information
                  </h4>
                  {(onboardingDetails?.contacts || []).length === 0 ? (
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          No contacts added
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(onboardingDetails.contacts || []).map(
                        (c: any, i: number) => (
                          <Card key={i}>
                            <CardContent className="p-3 sm:p-4">
                              <div className="flex flex-col gap-1">
                                <div className="text-sm font-semibold">
                                  {c.role || "Contact"}
                                </div>
                                <div className="text-xs text-muted-foreground space-y-0.5">
                                  {c.name && <div>{c.name}</div>}
                                  {c.email && (
                                    <div className="break-all">{c.email}</div>
                                  )}
                                  {c.phone && <div>{c.phone}</div>}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full" />
                    Onboarding Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Contact Person
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.contactPerson || "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Contact Phone
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.phone || "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Contact Email
                        </div>
                        <div className="text-sm font-medium break-all">
                          {onboardingDetails?.onboarding?.email || "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Goods Type
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.goodsType || "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Product Categories
                        </div>
                        <div className="text-sm font-medium">
                          {(() => {
                            const v = (
                              (onboardingDetails?.onboarding
                                ?.productCategories || []) as string[]
                            ).filter(Boolean);
                            return v.length ? v.join(", ") : "-";
                          })()}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Supply Areas
                        </div>
                        <div className="text-sm font-medium">
                          {(() => {
                            const v = (
                              (onboardingDetails?.onboarding?.supplyAreas ||
                                []) as string[]
                            ).filter(Boolean);
                            return v.length ? v.join(", ") : "-";
                          })()}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Delivery Timeline
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.deliveryTimeline ||
                            "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Date of Incorporation
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.dateOfIncorporation ||
                            "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          In Business &gt; 3 Years
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding
                            ?.inBusinessMoreThan3Years
                            ? "Yes"
                            : "No"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Average Turnover
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.averageTurnover ||
                            "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Business Lead Gender
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.businessLeadGender ||
                            "-"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full" />
                    Payment & Bank
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Payment Methods
                        </div>
                        <div className="text-sm font-medium">
                          {(() => {
                            const v = (
                              (onboardingDetails?.onboarding?.paymentMethods ||
                                []) as string[]
                            ).filter(Boolean);
                            return v.length ? v.join(", ") : "-";
                          })()}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Vendor Payment Terms
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.vendorPaymentTerms ||
                            "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Bank Name
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.bankDetails
                            ?.bankName || "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Account Name
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.bankDetails
                            ?.accountName || "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Account Number
                        </div>
                        <div className="text-sm font-medium break-all">
                          {onboardingDetails?.onboarding?.bankDetails
                            ?.accountNumber || "-"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Prefers Cash
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.bankDetails
                            ?.prefersCash
                            ? "Yes"
                            : "No"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full" />
                    Declarations
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Information Accurate
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.declarations
                            ?.infoAccurate
                            ? "Yes"
                            : "No"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Agrees to Rules
                        </div>
                        <div className="text-sm font-medium">
                          {onboardingDetails?.onboarding?.declarations
                            ?.agreeRules
                            ? "Yes"
                            : "No"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full" />
                    Uploaded Documents
                  </h4>
                  {(() => {
                    const o = onboardingDetails?.onboarding || {};
                    const uploads = [
                      {
                        name: "Price List",
                        uploads: o.priceListUploads || [],
                      },
                      {
                        name: "Registration Certificate",
                        uploads: o.registrationCertificateUploads || [],
                      },
                      {
                        name: "Business Registration Certificate",
                        uploads: o.businessRegistrationCertificateUploads || [],
                      },
                      {
                        name: "Tax Clearance Certificate",
                        uploads: o.taxClearanceCertificateUploads || [],
                      },
                      {
                        name: "GST VAT Registration Certificate",
                        uploads: o.gstVatRegistrationCertificateUploads || [],
                      },
                      {
                        name: "Business License",
                        uploads: o.businessLicenseUploads || [],
                      },
                      {
                        name: "NASSIT Certificate",
                        uploads: o.nassitCertificateUploads || [],
                      },
                      {
                        name: "Sector Specific Certificate",
                        uploads: o.sectorSpecificCertificateUploads || [],
                      },
                      {
                        name: "Business Duration Documents",
                        uploads: o.businessDurationDocuments || [],
                      },
                    ];
                    const docs = onboardingDetails?.documents || [];
                    const empty = uploads.length === 0 && docs.length === 0;

                    if (empty) {
                      return (
                        <Card>
                          <CardContent className="p-4 text-center">
                            <p className="text-sm text-muted-foreground">
                              No documents uploaded
                            </p>
                          </CardContent>
                        </Card>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {uploads.map((d: any, i: number) => (
                          <Card
                            key={`ud-${i}`}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <CardContent className="p-3 sm:p-4">
                              <div className="flex flex-col gap-1">
                                {/* {d.url ? (
                                  
                                ) : ( */}
                                <span className="text-sm font-medium break-all">
                                  {d.name || "Document"}
                                </span>
                                {d.uploads.length === 0 ? (
                                  <span className="text-xs text-muted-foreground">
                                    No documents uploaded
                                  </span>
                                ) : (
                                  d.uploads.map((u: any, i: number) => (
                                    <a
                                      href={u}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm font-medium text-primary hover:underline break-all inline-flex items-center gap-1"
                                    >
                                      {d.name || "Document"}
                                      <svg
                                        className="w-3 h-3 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                      </svg>
                                    </a>
                                  ))
                                )}

                                {/* // )} */}
                                <div className="text-xs text-muted-foreground">
                                  {d.type && <span>{d.type}</span>}
                                  {d.type && d.size && <span> • </span>}
                                  {d.size && <span>{d.size}</span>}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        {docs.map((d: any, i: number) => (
                          <Card
                            key={`dd-${i}`}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <CardContent className="p-3 sm:p-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium">
                                  {d.name || "Document"}
                                </span>
                                <div className="text-xs text-muted-foreground">
                                  {d.type && <span>{d.type}</span>}
                                  {d.type && d.size && <span> • </span>}
                                  {d.size && <span>{d.size}</span>}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No onboarding details found
                  </p>
                </CardContent>
              </Card>
            )}
          </ScrollArea>
          {/* Admin Actions Footer */}
          {onboardingDetails && !onboardingDetails.approved && (
            <div className="sticky bottom-0 border-t bg-background/80 backdrop-blur-sm px-4 sm:px-6 py-4">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Admin Actions</h4>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Select
                        value={rejectReasonType}
                        onValueChange={(v) => setRejectReasonType(v)}
                      >
                        <SelectTrigger aria-label="Rejection reason">
                          <SelectValue placeholder="Select rejection reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Non compliance">
                            Non compliance
                          </SelectItem>
                          <SelectItem value="Incomplete documentation">
                            Incomplete documentation
                          </SelectItem>
                          <SelectItem value="Not within the budget">
                            Not within the budget
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Textarea
                        placeholder="Add notes (optional)"
                        value={rejectNotes}
                        onChange={(e) => setRejectNotes(e.target.value)}
                        className="w-full"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                    <Button
                      onClick={handleRejectOnboarding}
                      variant="destructive"
                      disabled={
                        rejectLoading || !rejectReasonType || approveLoading
                      }
                      className="w-full sm:w-auto sm:min-w-[120px]"
                    >
                      {rejectLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
                          <span>Rejecting...</span>
                        </div>
                      ) : (
                        "Reject"
                      )}
                    </Button>
                    <Button
                      onClick={handleApproveOnboarding}
                      disabled={approveLoading || rejectLoading}
                      className="w-full sm:w-auto sm:min-w-[120px]"
                    >
                      {approveLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
                          <span>Approving...</span>
                        </div>
                      ) : (
                        "Approve"
                      )}
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
