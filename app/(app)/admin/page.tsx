// "use client";

// import type React from "react";
// import { useEffect, useState } from "react";
// import {
//   MoreHorizontal,
//   Pencil,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   Search,
//   Clock,
//   CheckCircle2,
//   Shield,
//   FileText,
//   ExternalLink,
//   Building2,
//   User,
//   Phone,
//   Mail,
//   MapPin,
//   Icon,
//   PiIcon,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Textarea } from "@/components/ui/textarea";

// import { deleteUser, getUsers } from "@/lib/actions/user-actions";
// import { getSupplierOnboardingByUserId } from "@/lib/actions/supplier-actions";
// import {
//   approveSupplierOnboarding,
//   rejectSupplierOnboarding,
// } from "@/lib/actions/admin-approval-actions";

// type User = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   photo?: string;
//   onboarded?: boolean;
//   onboardingStatus?: string;
//   createdAt?: number;
//   lastSignInAt?: number;
// };

// import AddUser from "./components/AddUser";
// import EditUser from "./components/EditUser";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";

// type UploadObject = {
//   name?: string;
//   size?: number;
//   type?: string;
//   url?: string;
// };
// type BankDetails = {
//   bankName?: string;
//   accountName?: string;
//   accountNumber?: string;
//   prefersCash?: boolean;
// };
// type OnboardingData = {
//   contactPerson?: string;
//   phone?: string;
//   email?: string;
//   goodsType?: string;
//   productCategories?: string[];
//   supplyAreas?: string[];
//   deliveryTimeline?: string;
//   priceListUploads?: UploadObject[];
//   registrationCertificateUploads?: UploadObject[];
//   businessRegistrationCertificateUploads?: UploadObject[];
//   taxClearanceCertificateUploads?: UploadObject[];
//   gstVatRegistrationCertificateUploads?: UploadObject[];
//   businessLicenseUploads?: UploadObject[];
//   nassitCertificateUploads?: UploadObject[];
//   sectorSpecificCertificateUploads?: UploadObject[];
//   businessDurationDocuments?: UploadObject[];
//   paymentMethods?: string[];
//   bankDetails?: BankDetails;
//   vendorPaymentTerms?: string;
//   businessLeadGender?: string;
//   inBusinessMoreThan3Years?: boolean;
//   dateOfIncorporation?: string;
//   averageTurnover?: string;
//   declarations?: { infoAccurate?: boolean; agreeRules?: boolean };
// };
// type Contact = { role?: string; name?: string; email?: string; phone?: string };
// type Document = {
//   name?: string;
//   type?: string;
//   size?: string;
//   signedDate?: string;
//   expiresDate?: string;
//   owner?: string;
// };
// type SupplierOnboardingDetails = {
//   supplierId?: string;
//   name?: string;
//   approved?: boolean;
//   category?: string;
//   region?: string;
//   segment?: string;
//   onboarding?: OnboardingData;
//   contacts?: Contact[];
//   documents?: Document[];
// };

// export default function UsersTable() {
//   const { user } = useUser();
//   const currentUserRole = String((user?.publicMetadata as any)?.role || "")
//     .toLowerCase()
//     .replace(/[\s_-]/g, "");

//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isSubmiting, setIsSubmiting] = useState(false);
//   const [submited, setSubmited] = useState(false);
//   const [userToDelete, setUserToDelete] = useState<string | null>(null);
//   const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
//   const [users, setUsers] = useState<any[]>([]);
//   const [detailsOpen, setDetailsOpen] = useState(false);
//   const [userToView, setUserToView] = useState<any | null>(null);
//   const [detailsLoading, setDetailsLoading] = useState(false);
//   const [onboardingDetails, setOnboardingDetails] =
//     useState<SupplierOnboardingDetails | null>(null);
//   const [approveLoading, setApproveLoading] = useState(false);
//   const [rejectLoading, setRejectLoading] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [rejectReasonType, setRejectReasonType] = useState("");
//   const [rejectNotes, setRejectNotes] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState("");

//   const router = useRouter();

//   // Check if user is an invitation (pending)
//   const isInvitation = (userId: string) => userId.startsWith("invitation_");

//   // Check if user has completed onboarding
//   const hasCompletedOnboarding = (user: User | null) => {
//     if (!user) return false;
//     return user.onboarded === true || user.onboardingStatus === "approved";
//   };

//   const handleDelete = (userId: string) => {
//     setUserToDelete(userId);
//     setDeleteDialogOpen(true);
//   };

//   const handleEdit = (user: User) => {
//     // Don't allow editing invitations
//     if (isInvitation(user.id)) return;
//     setUserToUpdate(user);
//     setEditDialogOpen(true);
//   };

//   const handleViewDetails = (user: User) => {
//     // Don't allow viewing details for invitations or users who haven't completed onboarding
//     if (isInvitation(user.id) || !hasCompletedOnboarding(user)) {
//       return;
//     }
//     setUserToView(user);
//     setDetailsOpen(true);
//   };

//   const closeEditModal = () => {
//     setEditDialogOpen(false);
//     setUserToUpdate(null);
//   };

//   useEffect(() => {
//     const load = async () => {
//       if (!detailsOpen || !userToView?.id || isInvitation(userToView.id))
//         return;

//       // Only fetch onboarding details if user has completed onboarding
//       if (!hasCompletedOnboarding(userToView)) {
//         setOnboardingDetails(null);
//         setDetailsLoading(false);
//         return;
//       }

//       // Only fetch onboarding details for supplier role
//       if (userToView.role?.toLowerCase() !== "supplier") {
//         setOnboardingDetails(null);
//         setDetailsLoading(false);
//         return;
//       }

//       try {
//         setDetailsLoading(true);
//         const res: any = await getSupplierOnboardingByUserId(userToView.id);
//         const data = res && res.success ? res.data : null;

//         setOnboardingDetails(data);
//       } catch {
//         setOnboardingDetails(null);
//       } finally {
//         setDetailsLoading(false);
//       }
//     };
//     load();
//   }, [detailsOpen, userToView?.id]);

//   const handleApproveOnboarding = async () => {
//     const sid = onboardingDetails?.supplierId;
//     if (!sid) return;
//     try {
//       setApproveLoading(true);
//       const res: any = await approveSupplierOnboarding(String(sid));
//       if (res && res.success) {
//         setDetailsOpen(false);
//         setRejectReason("");
//         setSubmited(!submited);
//         router.refresh();
//       }
//     } finally {
//       setApproveLoading(false);
//     }
//   };

//   const handleRejectOnboarding = async () => {
//     const sid = onboardingDetails?.supplierId;
//     const type = rejectReasonType.trim();
//     const notes = rejectNotes.trim();
//     const reason = notes ? `${type}: ${notes}` : type;
//     if (!sid || !type) return;
//     try {
//       setRejectLoading(true);
//       const res: any = await rejectSupplierOnboarding(String(sid), reason);
//       if (res && res.success) {
//         setDetailsOpen(false);
//         setRejectReason("");
//         setRejectReasonType("");
//         setRejectNotes("");
//         setSubmited(!submited);
//         router.refresh();
//       }
//     } finally {
//       setRejectLoading(false);
//     }
//   };

//   const onSubmit = () => {
//     setSubmited(!submited);
//   };

//   const confirmDelete = async () => {
//     if (userToDelete) {
//       try {
//         setIsSubmiting(true);

//         // Handle invitation deletion differently
//         if (isInvitation(userToDelete)) {
//           // Extract invitation ID from the prefixed ID
//           const invitationId = userToDelete.replace("invitation_", "");
//           // You'll need to add a deleteInvitation action
//           // await deleteInvitation(invitationId);
//           console.log("Delete invitation:", invitationId);
//         } else {
//           await deleteUser(userToDelete);
//         }

//         setUserToDelete(null);
//         setDeleteDialogOpen(false);
//         setIsSubmiting(false);
//         setSubmited(!submited);
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         setIsSubmiting(false);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const result = await getUsers();

//         const allUsers = result.users || [];

//         // Admin should not see superadmin
//         const filtered =
//           currentUserRole === "admin"
//             ? allUsers.filter(
//                 (u: any) => u.role?.toLowerCase() !== "superadmin"
//               )
//             : allUsers;

//         setUsers(filtered);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [submited, currentUserRole]);

//   // Filter users based on search
//   const filteredUsers = users.filter((user) => {
//     const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
//     const email = user.email.toLowerCase();
//     const query = searchQuery.toLowerCase();

//     return fullName.includes(query) || email.includes(query);
//   });

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentUsers = filteredUsers.slice(startIndex, endIndex);

//   const handlePageChange = (page: number) => setCurrentPage(page);
//   const handleItemsPerPageChange = (value: string) => {
//     setItemsPerPage(Number.parseInt(value));
//     setCurrentPage(1);
//   };
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   const getStatusBadge = (user: User) => {
//     if (user.onboardingStatus === "pending_invitation") {
//       return (
//         <Badge
//           variant="outline"
//           className="bg-yellow-50 text-yellow-700 border-yellow-300"
//         >
//           <Clock className="w-3 h-3 mr-1" />
//           Pending Invitation
//         </Badge>
//       );
//     }
//     return <Badge variant="secondary">{user.role}</Badge>;
//   };

//   // Check if View Details should be available for a user
//   const canViewDetails = (user: User | null) => {
//     if (!user) return false;
//     // Only suppliers can have onboarding details
//     return (
//       !isInvitation(user.id) &&
//       hasCompletedOnboarding(user) &&
//       user.role?.toLowerCase() === "supplier"
//     );
//   };

//   return (
//     <>
//       {/* ---------------- PAGE HEADER ---------------- */}
//       <div className="p-4 space-y-6 ">
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="text-3xl font-bold tracking-tight">Users</h2>
//             <p className="text-muted-foreground">
//               Manage your team members and their roles
//             </p>
//           </div>

//           <AddUser
//             currentUserRole={String(
//               (user?.publicMetadata as any)?.role || "admin"
//             )
//               .toLowerCase()
//               .replace(/[\s_-]/g, "")}
//             onSubmitComplete={onSubmit}
//           />
//         </div>

//         {/* ---------------- SEARCH ---------------- */}
//         <div className="relative w-full sm:max-w-sm">
//           <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
//           <Input
//             type="text"
//             placeholder="Search users by name or email..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="pl-10"
//           />
//         </div>

//         {/* ---------------- EDIT MODAL ---------------- */}
//         {userToUpdate && (
//           <EditUser
//             userData={userToUpdate}
//             isOpen={editDialogOpen}
//             onClose={closeEditModal}
//             currentUserRole={String(
//               (user?.publicMetadata as any)?.role || "admin"
//             )
//               .toLowerCase()
//               .replace(/[\s_-]/g, "")}
//             onSubmitComplete={onSubmit}
//           />
//         )}

//         {/* ---------------- USERS TABLE ---------------- */}
//         <div className="hidden md:block">
//           <Card>
//             <CardContent className="p-0">
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="hover:bg-transparent">
//                       <TableHead className="w-[80px]">Avatar</TableHead>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Email</TableHead>
//                       <TableHead>Role</TableHead>
//                       <TableHead className="text-right w-[100px]">
//                         Actions
//                       </TableHead>
//                     </TableRow>
//                   </TableHeader>

//                   <TableBody>
//                     {!loading &&
//                       currentUsers.map((user) => (
//                         <TableRow key={user.id} className="hover:bg-muted/50">
//                           <TableCell>
//                             <Avatar className="w-10 h-10">
//                               <AvatarImage
//                                 src={user.photo || "/placeholder.svg"}
//                                 alt={user.firstName + " " + user.lastName}
//                               />
//                               <AvatarFallback>
//                                 {user.firstName?.[0]}
//                                 {user.lastName?.[0]}
//                               </AvatarFallback>
//                             </Avatar>
//                           </TableCell>

//                           <TableCell className="font-medium">
//                             {user.firstName + " " + user.lastName}
//                           </TableCell>

//                           <TableCell className="text-muted-foreground">
//                             {user.email}
//                           </TableCell>

//                           <TableCell>{getStatusBadge(user)}</TableCell>

//                           <TableCell className="text-right">
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button variant="ghost" className="w-8 h-8 p-0">
//                                   <MoreHorizontal className="w-4 h-4" />
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>

//                                 {canViewDetails(user) && (
//                                   <>
//                                     <DropdownMenuItem
//                                       className="cursor-pointer"
//                                       onClick={() => handleViewDetails(user)}
//                                     >
//                                       <Pencil className="w-4 h-4 mr-2" />
//                                       View Details
//                                     </DropdownMenuItem>
//                                     <DropdownMenuSeparator />
//                                   </>
//                                 )}

//                                 {!isInvitation(user.id) && (
//                                   <>
//                                     <DropdownMenuItem
//                                       className="cursor-pointer"
//                                       onClick={() => handleEdit(user)}
//                                     >
//                                       <Pencil className="w-4 h-4 mr-2" />
//                                       Edit
//                                     </DropdownMenuItem>
//                                     <DropdownMenuSeparator />
//                                   </>
//                                 )}

//                                 <DropdownMenuItem
//                                   onClick={() => handleDelete(user.id)}
//                                   className="cursor-pointer text-destructive"
//                                 >
//                                   <Trash2 className="w-4 h-4 mr-2" />
//                                   {isInvitation(user.id)
//                                     ? "Revoke Invitation"
//                                     : "Delete"}
//                                 </DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* ---------------- PAGINATION SECTION ---------------- */}
//         {!loading && filteredUsers.length > 0 && (
//           <div className="flex flex-cols items-start justify-between gap-4 pt-4 lg:flex-row lg:items-center">
//             <div className="flex items-center space-x-2">
//               <p className="text-sm text-muted-foreground">
//                 Showing {startIndex + 1} to{" "}
//                 {Math.min(endIndex, filteredUsers.length)} of{" "}
//                 {filteredUsers.length} users
//               </p>
//             </div>

//             <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center sm:justify-end">
//               <div className="flex items-center gap-2">
//                 <p className="text-sm font-medium">Rows per page</p>
//                 <Select
//                   value={itemsPerPage.toString()}
//                   onValueChange={handleItemsPerPageChange}
//                 >
//                   <SelectTrigger className="h-8 w-[70px]">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent side="top">
//                     {[5, 10, 20, 30, 50].map((v) => (
//                       <SelectItem key={v} value={v.toString()}>
//                         {v}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="w-8 h-8 p-0"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </Button>

//                 <div className="flex items-center space-x-1">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1)
//                     .filter((page) => {
//                       return (
//                         page === 1 ||
//                         page === totalPages ||
//                         (page >= currentPage - 1 && page <= currentPage + 1)
//                       );
//                     })
//                     .map((page, index, array) => (
//                       <div key={page} className="flex items-center">
//                         {index > 0 && array[index - 1] !== page - 1 && (
//                           <span className="px-1 text-muted-foreground">
//                             ...
//                           </span>
//                         )}
//                         <Button
//                           variant={currentPage === page ? "default" : "outline"}
//                           size="sm"
//                           onClick={() => handlePageChange(page)}
//                           className="w-8 h-8 p-0"
//                         >
//                           {page}
//                         </Button>
//                       </div>
//                     ))}
//                 </div>

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="w-8 h-8 p-0"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ---------------- DELETE DIALOG ---------------- */}
//       <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>
//               {userToDelete && isInvitation(userToDelete)
//                 ? "Are you sure you want to revoke this invitation?"
//                 : "Are you sure you want to delete this user?"}
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>

//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <Button
//               onClick={confirmDelete}
//               variant="destructive"
//               disabled={isSubmiting}
//             >
//               {isSubmiting
//                 ? "Processing..."
//                 : userToDelete && isInvitation(userToDelete)
//                 ? "Revoke"
//                 : "Delete"}
//             </Button>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       /* ---------------- USER DETAILS DIALOG ---------------- */
//      const InfoCard = ({ icon: Icon, label, value, className = "" }) => (
//   <Card className={`border border-gray-200 hover:border-primary/50 transition-all duration-200 ${className}`}>
//     <CardContent className="p-4">
//       <div className="flex items-start gap-3">
//         <div className="p-2 rounded-lg bg-primary/10 text-primary">
//           <PiIcon className="w-4 h-4" />
//         </div>
//         <div className="flex-1 min-w-0">
//           <div className="text-xs font-medium text-muted-foreground mb-1">{label}</div>
//           <div className="text-sm font-semibold text-foreground break-words">{value || '-'}</div>
//         </div>
//       </div>
//     </CardContent>
//   </Card>
// );

// const SectionHeader = ({ title }) => (
//   <div className="flex items-center gap-3 mb-4">
//     <div className="h-6 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
//     <h4 className="text-base font-semibold text-foreground">{title}</h4>
//   </div>
// );

// {/* ---------------- USER DETAILS DIALOG ---------------- */}
// <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
//   <DialogContent className="sm:max-w-6xl max-h-[95vh] flex flex-col p-0 overflow-hidden gap-0 bg-gradient-to-br from-background via-background to-muted/20">
//     <DialogHeader className="sticky top-0 z-10 px-6 pt-6 pb-4 border-b bg-background/95 backdrop-blur-xl">
//       <div className="flex items-start justify-between gap-4">
//         <div className="flex-1 min-w-0">
//           <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
//             Supplier Onboarding Review
//           </DialogTitle>
//           <DialogDescription className="text-sm mt-1.5 text-muted-foreground">
//             Comprehensive supplier information and documentation review
//           </DialogDescription>
//         </div>
//         {onboardingDetails && (
//           <Badge
//             variant={onboardingDetails.approved ? "default" : "secondary"}
//             className={`shrink-0 px-3 py-1 ${onboardingDetails.approved ? 'bg-green-500/10 text-green-700 border-green-200' : 'bg-amber-500/10 text-amber-700 border-amber-200'}`}
//           >
//             <div className="w-2 h-2 rounded-full bg-current mr-2" />
//             {onboardingDetails.approved ? "Approved" : "Pending Review"}
//           </Badge>
//         )}
//       </div>
//     </DialogHeader>

//     <ScrollArea className="flex-1 px-6 py-6">
//       {detailsLoading ? (
//         <div className="flex items-center justify-center py-20">
//           <div className="flex flex-col items-center gap-4">
//             <div className="relative">
//               <div className="w-12 h-12 border-4 border-primary/20 rounded-full" />
//               <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin absolute inset-0" />
//             </div>
//             <p className="text-sm font-medium text-muted-foreground">Loading details...</p>
//           </div>
//         </div>
//       ) : !userToView ? (
//         <Card className="border-2 border-dashed">
//           <CardContent className="p-12 text-center">
//             <User className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
//             <p className="text-sm text-muted-foreground">No user selected</p>
//           </CardContent>
//         </Card>
//       ) : !hasCompletedOnboarding(userToView) ? (
//         <Card className="border-2 border-dashed">
//           <CardContent className="p-12 text-center">
//             <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
//             <p className="text-sm text-muted-foreground">This user has not completed onboarding yet.</p>
//           </CardContent>
//         </Card>
//       ) : userToView?.role?.toLowerCase() !== "supplier" ? (
//         <Card className="border-2 border-dashed">
//           <CardContent className="p-12 text-center">
//             <Shield className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
//             <p className="text-sm text-muted-foreground">Onboarding details are only available for supplier users.</p>
//           </CardContent>
//         </Card>
//       ) : onboardingDetails ? (
//         <div className="space-y-8">
//           {/* Profile Header Card */}
//           <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
//             <div className="h-24 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
//             <CardContent className="p-6 -mt-12">
//               <div className="flex items-start gap-6">
//                 <Avatar className="w-24 h-24 ring-4 ring-background shadow-xl">
//                   <AvatarImage src={userToView?.photo || "/placeholder.svg"} alt={onboardingDetails?.onboarding?.contactPerson} />
//                   <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
//                     {onboardingDetails?.onboarding?.contactPerson?.charAt(0) || 'U'}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1 min-w-0 mt-12">
//                   <h3 className="text-2xl font-bold mb-1">{onboardingDetails?.onboarding?.contactPerson}</h3>
//                   <p className="text-sm text-muted-foreground mb-3 break-all">{onboardingDetails?.onboarding?.email}</p>
//                   <div className="flex items-center gap-3">
//                     <Badge variant="outline" className="font-medium">{userToView?.role || '-'}</Badge>
//                     {onboardingDetails?.supplierId && (
//                       <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
//                         ID: {onboardingDetails?.supplierId}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Company Information */}
//           <div>
//             <SectionHeader title="Supplier Information" />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <InfoCard icon={Building2} label="Supplier Name" value={onboardingDetails?.name} />
//               <InfoCard icon={FileText} label="Category" value={onboardingDetails?.category} />
//               <InfoCard icon={MapPin} label="Region" value={onboardingDetails?.region} />
//               <InfoCard icon={Shield} label="Segment" value={onboardingDetails?.segment} />
//             </div>
//           </div>

//           {/* Contacts Section */}
//           <div>
//             <SectionHeader title="Contact Information" />
//             {(onboardingDetails?.contacts || []).length === 0 ? (
//               <Card className="border-2 border-dashed">
//                 <CardContent className="p-8 text-center">
//                   <Phone className="w-10 h-10 mx-auto mb-2 text-muted-foreground/50" />
//                   <p className="text-sm text-muted-foreground">No contacts added</p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {(onboardingDetails.contacts || []).map((c: any, i: number) => (
//                   <Card key={i} className="border hover:shadow-md transition-shadow">
//                     <CardContent className="p-5">
//                       <div className="flex items-start gap-3 mb-3">
//                         <div className="p-2 rounded-full bg-primary/10">
//                           <User className="w-4 h-4 text-primary" />
//                         </div>
//                         <div className="font-semibold text-sm">{c.role || "Contact"}</div>
//                       </div>
//                       <div className="space-y-2 text-sm text-muted-foreground ml-11">
//                         {c.name && <div className="flex items-center gap-2"><User className="w-3 h-3" /> {c.name}</div>}
//                         {c.email && <div className="flex items-center gap-2 break-all"><Mail className="w-3 h-3" /> {c.email}</div>}
//                         {c.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {c.phone}</div>}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Onboarding Details */}
//           <div>
//             <SectionHeader title="Onboarding Details" />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <InfoCard icon={User} label="Contact Person" value={onboardingDetails?.onboarding?.contactPerson} />
//               <InfoCard icon={Phone} label="Contact Phone" value={onboardingDetails?.onboarding?.phone} />
//               <InfoCard icon={Mail} label="Contact Email" value={onboardingDetails?.onboarding?.email} />
//               <InfoCard icon={FileText} label="Goods Type" value={onboardingDetails?.onboarding?.goodsType} />
//               <InfoCard
//                 icon={Building2}
//                 label="Product Categories"
//                 value={(() => {
//                   const v = ((onboardingDetails?.onboarding?.productCategories || []) as string[]).filter(Boolean);
//                   return v.length ? v.join(", ") : "-";
//                 })()}
//               />
//               <InfoCard
//                 icon={MapPin}
//                 label="Supply Areas"
//                 value={(() => {
//                   const v = ((onboardingDetails?.onboarding?.supplyAreas || []) as string[]).filter(Boolean);
//                   return v.length ? v.join(", ") : "-";
//                 })()}
//               />
//               <InfoCard icon={Calendar} label="Delivery Timeline" value={onboardingDetails?.onboarding?.deliveryTimeline} />
//               <InfoCard icon={Calendar} label="Date of Incorporation" value={onboardingDetails?.onboarding?.dateOfIncorporation} />
//               <InfoCard
//                 icon={CheckCircle2}
//                 label="In Business > 3 Years"
//                 value={onboardingDetails?.onboarding?.inBusinessMoreThan3Years ? "Yes" : "No"}
//               />
//               <InfoCard icon={DollarSign} label="Average Turnover" value={onboardingDetails?.onboarding?.averageTurnover} />
//               <InfoCard icon={User} label="Business Lead Gender" value={onboardingDetails?.onboarding?.businessLeadGender} />
//             </div>
//           </div>

//           {/* Payment & Bank */}
//           <div>
//             <SectionHeader title="Payment & Banking Information" />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <InfoCard
//                 icon={DollarSign}
//                 label="Payment Methods"
//                 value={(() => {
//                   const v = ((onboardingDetails?.onboarding?.paymentMethods || []) as string[]).filter(Boolean);
//                   return v.length ? v.join(", ") : "-";
//                 })()}
//               />
//               <InfoCard icon={Calendar} label="Vendor Payment Terms" value={onboardingDetails?.onboarding?.vendorPaymentTerms} />
//               <InfoCard icon={Building2} label="Bank Name" value={onboardingDetails?.onboarding?.bankDetails?.bankName} />
//               <InfoCard icon={User} label="Account Name" value={onboardingDetails?.onboarding?.bankDetails?.accountName} />
//               <InfoCard icon={FileText} label="Account Number" value={onboardingDetails?.onboarding?.bankDetails?.accountNumber} />
//               <InfoCard
//                 icon={DollarSign}
//                 label="Prefers Cash"
//                 value={onboardingDetails?.onboarding?.bankDetails?.prefersCash ? "Yes" : "No"}
//               />
//             </div>
//           </div>

//           {/* Declarations */}
//           <div>
//             <SectionHeader title="Declarations" />
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <InfoCard
//                 icon={CheckCircle2}
//                 label="Information Accurate"
//                 value={onboardingDetails?.onboarding?.declarations?.infoAccurate ? "Yes" : "No"}
//               />
//               <InfoCard
//                 icon={Shield}
//                 label="Agrees to Rules"
//                 value={onboardingDetails?.onboarding?.declarations?.agreeRules ? "Yes" : "No"}
//               />
//             </div>
//           </div>

//           {/* Documents Section */}
//           <div>
//             <SectionHeader title="Uploaded Documents" />
//             {(() => {
//               const o = onboardingDetails?.onboarding || {};
//               const uploads = [
//                 { name: "Price List", uploads: o.priceListUploads || [] },
//                 { name: "Registration Certificate", uploads: o.registrationCertificateUploads || [] },
//                 { name: "Business Registration Certificate", uploads: o.businessRegistrationCertificateUploads || [] },
//                 { name: "Tax Clearance Certificate", uploads: o.taxClearanceCertificateUploads || [] },
//                 { name: "GST VAT Registration Certificate", uploads: o.gstVatRegistrationCertificateUploads || [] },
//                 { name: "Business License", uploads: o.businessLicenseUploads || [] },
//                 { name: "NASSIT Certificate", uploads: o.nassitCertificateUploads || [] },
//                 { name: "Sector Specific Certificate", uploads: o.sectorSpecificCertificateUploads || [] },
//                 { name: "Business Duration Documents", uploads: o.businessDurationDocuments || [] }
//               ];
//               const docs = onboardingDetails?.documents || [];
//               const empty = uploads.every(u => u.uploads.length === 0) && docs.length === 0;

//               if (empty) {
//                 return (
//                   <Card className="border-2 border-dashed">
//                     <CardContent className="p-8 text-center">
//                       <FileText className="w-10 h-10 mx-auto mb-2 text-muted-foreground/50" />
//                       <p className="text-sm text-muted-foreground">No documents uploaded</p>
//                     </CardContent>
//                   </Card>
//                 );
//               }

//               return (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {uploads.map((d: any, i: number) => (
//                     <Card key={`ud-${i}`} className="border hover:shadow-md transition-all">
//                       <CardContent className="p-5">
//                         <div className="flex items-start gap-3 mb-3">
//                           <div className="p-2 rounded-lg bg-primary/10">
//                             <FileText className="w-4 h-4 text-primary" />
//                           </div>
//                           <span className="text-sm font-semibold flex-1">{d.name}</span>
//                         </div>
//                         <div className="ml-11 space-y-2">
//                           {d.uploads.length === 0 ? (
//                             <span className="text-xs text-muted-foreground">No documents uploaded</span>
//                           ) : (
//                             d.uploads.map((u: any, idx: number) => (
//                               <a
//                                 key={idx}
//                                 href={u}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
//                               >
//                                 <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
//                                 <span className="underline">View Document {idx + 1}</span>
//                               </a>
//                             ))
//                           )}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                   {docs.map((d: any, i: number) => (
//                     <Card key={`dd-${i}`} className="border hover:shadow-md transition-all">
//                       <CardContent className="p-5">
//                         <div className="flex items-start gap-3">
//                           <div className="p-2 rounded-lg bg-primary/10">
//                             <FileText className="w-4 h-4 text-primary" />
//                           </div>
//                           <div>
//                             <span className="text-sm font-semibold">{d.name || "Document"}</span>
//                             <div className="text-xs text-muted-foreground mt-1">
//                               {d.type && <span>{d.type}</span>}
//                               {d.type && d.size && <span> • </span>}
//                               {d.size && <span>{d.size}</span>}
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               );
//             })()}
//           </div>
//         </div>
//       ) : (
//         <Card className="border-2 border-dashed">
//           <CardContent className="p-12 text-center">
//             <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
//             <p className="text-sm text-muted-foreground">No onboarding details found</p>
//           </CardContent>
//         </Card>
//       )}
//     </ScrollArea>

//     {/* Admin Actions Footer */}
//     {onboardingDetails && !onboardingDetails.approved && (
//       <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur-xl px-6 py-5 shadow-2xl">
//         <div className="space-y-4">
//           <div className="flex items-center gap-2 mb-1">
//             <Shield className="w-4 h-4 text-primary" />
//             <h4 className="text-sm font-semibold">Admin Actions</h4>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-xs font-medium text-muted-foreground">Rejection Reason</label>
//               <Select value={rejectReasonType} onValueChange={(v) => setRejectReasonType(v)}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select a reason..." />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Non compliance">Non compliance</SelectItem>
//                   <SelectItem value="Incomplete documentation">Incomplete documentation</SelectItem>
//                   <SelectItem value="Not within the budget">Not within the budget</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <label className="text-xs font-medium text-muted-foreground">Additional Notes (Optional)</label>
//               <Textarea
//                 placeholder="Provide additional context..."
//                 value={rejectNotes}
//                 onChange={(e) => setRejectNotes(e.target.value)}
//                 className="w-full resize-none"
//                 rows={3}
//               />
//             </div>
//           </div>
//           <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-2">
//             <Button
//               onClick={handleRejectOnboarding}
//               variant="destructive"
//               disabled={rejectLoading || !rejectReasonType || approveLoading}
//               className="w-full sm:w-auto sm:min-w-[140px] font-medium"
//             >
//               {rejectLoading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
//                   <span>Rejecting...</span>
//                 </div>
//               ) : (
//                 "Reject Application"
//               )}
//             </Button>
//             <Button
//               onClick={handleApproveOnboarding}
//               disabled={approveLoading || rejectLoading}
//               className="w-full sm:w-auto sm:min-w-[140px] font-medium bg-green-600 hover:bg-green-700"
//             >
//               {approveLoading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
//                   <span>Approving...</span>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 className="w-4 h-4" />
//                   <span>Approve Supplier</span>
//                 </div>
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>
//     )}
//   </DialogContent>
// </Dialog>
//     </>
//   );
// }

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
  CheckCircle2,
  Shield,
  FileText,
  ExternalLink,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
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

import {
  deleteUser,
  getUsers,
  deleteInvitation,
} from "@/lib/actions/user-actions";
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
import { toast } from "@/components/ui/use-toast";

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

// Component definitions
const InfoCard = ({ icon: Icon, label, value, className = "" }: any) => (
  <Card
    className={`border border-gray-200 hover:border-primary/50 transition-all duration-200 ${className}`}
  >
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-muted-foreground mb-1">
            {label}
          </div>
          <div className="text-sm font-semibold text-foreground break-words">
            {value || "-"}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const SectionHeader = ({ title }: any) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="h-6 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
    <h4 className="text-base font-semibold text-foreground">{title}</h4>
  </div>
);

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

  // const confirmDelete = async () => {
  //   if (userToDelete) {
  //     try {
  //       setIsSubmiting(true);

  //       // Handle invitation deletion differently
  //       if (isInvitation(userToDelete)) {
  //         // Extract invitation ID from the prefixed ID
  //         const invitationId = userToDelete.replace("invitation_", "");
  //         // You'll need to add a deleteInvitation action
  //         // await deleteInvitation(invitationId);
  //         console.log("Delete invitation:", invitationId);
  //       } else {
  //         await deleteUser(userToDelete);
  //       }

  //       setUserToDelete(null);
  //       setDeleteDialogOpen(false);
  //       setIsSubmiting(false);
  //       setSubmited(!submited);
  //     } catch (error) {
  //       console.error("Error deleting user:", error);
  //       setIsSubmiting(false);
  //     }
  //   }
  // };
  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      setIsSubmiting(true);

      // Handle invitation deletion
      if (isInvitation(userToDelete)) {
        const invitationId = userToDelete.replace("invitation_", "");
        const result = await deleteInvitation(invitationId);

        if (!result.success) {
          toast({
            title: "Error",
            description: result.error || "Failed to revoke invitation",
            variant: "destructive",
          });
          setIsSubmiting(false);
          return;
        }

        toast({
          title: "Success",
          description: "Invitation revoked successfully",
        });
      } else {
        // Handle regular user or supplier deletion
        const result = await deleteUser(userToDelete);

        if (!result.success) {
          toast({
            title: "Error",
            description: result.error || "Failed to delete user",
            variant: "destructive",
          });
          setIsSubmiting(false);
          return;
        }

        toast({
          title: "Success",
          description: "User deleted successfully",
        });
      }

      setUserToDelete(null);
      setDeleteDialogOpen(false);
      setIsSubmiting(false);
      setSubmited(!submited);
      router.refresh();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsSubmiting(false);
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
      <div className="px-4 py-4 sm:px-6 lg:px-8 space-y-6">
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

        <div className="md:hidden space-y-4">
          {/* ---------------- MOBILE USERS LIST ---------------- */}
          <div className="md:hidden space-y-4">
            {!loading &&
              currentUsers.map((user) => (
                <Card key={user.id} className="border shadow-sm">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={user.photo || "/placeholder.svg"}
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                        <AvatarFallback>
                          {user.firstName?.[0]}
                          {user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      {getStatusBadge(user)}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>

                          {canViewDetails(user) && (
                            <>
                              <DropdownMenuItem
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
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {isInvitation(user.id)
                              ? "Revoke Invitation"
                              : "Delete"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* ---------------- PAGINATION SECTION ---------------- */}
        {!loading && filteredUsers.length > 0 && (
          <div className="flex flex-col items-start justify-between gap-4 pt-4 lg:flex-row lg:items-center">
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
        <DialogContent className="sm:max-w-6xl max-h-[95vh] flex flex-col p-0 overflow-hidden gap-0 bg-gradient-to-br from-background via-background to-muted/20 overflow-y-auto">
          <DialogHeader className="sticky top-0 z-10 px-6 pt-6 pb-4 border-b bg-background/95 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Supplier Onboarding Review
                </DialogTitle>
                <DialogDescription className="text-sm mt-1.5 text-muted-foreground">
                  Comprehensive supplier information and documentation review
                </DialogDescription>
              </div>
              {onboardingDetails && (
                <Badge
                  variant={onboardingDetails.approved ? "default" : "secondary"}
                  className={`shrink-0 px-3 py-1 ${
                    onboardingDetails.approved
                      ? "bg-green-500/10 text-green-700 border-green-200"
                      : "bg-amber-500/10 text-amber-700 border-amber-200"
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-current mr-2" />
                  {onboardingDetails.approved ? "Approved" : "Pending Review"}
                </Badge>
              )}
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 px-6 py-6">
            {detailsLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-primary/20 rounded-full" />
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin absolute inset-0" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Loading details...
                  </p>
                </div>
              </div>
            ) : !userToView ? (
              <Card className="border-2 border-dashed">
                <CardContent className="p-12 text-center">
                  <User className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No user selected
                  </p>
                </CardContent>
              </Card>
            ) : !hasCompletedOnboarding(userToView) ? (
              <Card className="border-2 border-dashed">
                <CardContent className="p-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    This user has not completed onboarding yet.
                  </p>
                </CardContent>
              </Card>
            ) : userToView?.role?.toLowerCase() !== "supplier" ? (
              <Card className="border-2 border-dashed">
                <CardContent className="p-12 text-center">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    Onboarding details are only available for supplier users.
                  </p>
                </CardContent>
              </Card>
            ) : onboardingDetails ? (
              <div className="space-y-8">
                {/* Profile Header Card */}
                <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
                  <CardContent className="p-6 -mt-12">
                    <div className="flex items-start gap-6">
                      <Avatar className="w-24 h-24 ring-4 ring-background shadow-xl">
                        <AvatarImage
                          src={userToView?.photo || "/placeholder.svg"}
                          alt={onboardingDetails?.onboarding?.contactPerson}
                        />
                        <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                          {onboardingDetails?.onboarding?.contactPerson?.charAt(
                            0
                          ) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0 mt-12">
                        <h3 className="text-2xl font-bold mb-1">
                          {onboardingDetails?.onboarding?.contactPerson}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 break-all">
                          {onboardingDetails?.onboarding?.email}
                        </p>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-medium">
                            {userToView?.role || "-"}
                          </Badge>
                          {onboardingDetails?.supplierId && (
                            <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                              ID: {onboardingDetails?.supplierId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Company Information */}
                <div>
                  <SectionHeader title="Supplier Information" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <InfoCard
                      icon={Building2}
                      label="Supplier Name"
                      value={onboardingDetails?.name}
                    />
                    <InfoCard
                      icon={FileText}
                      label="Category"
                      value={onboardingDetails?.category}
                    />
                    <InfoCard
                      icon={MapPin}
                      label="Region"
                      value={onboardingDetails?.region}
                    />
                    <InfoCard
                      icon={Shield}
                      label="Segment"
                      value={onboardingDetails?.segment}
                    />
                  </div>
                </div>

                {/* Contacts Section */}
                <div>
                  <SectionHeader title="Contact Information" />
                  {(onboardingDetails?.contacts || []).length === 0 ? (
                    <Card className="border-2 border-dashed">
                      <CardContent className="p-8 text-center">
                        <Phone className="w-10 h-10 mx-auto mb-2 text-muted-foreground/50" />
                        <p className="text-sm text-muted-foreground">
                          No contacts added
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(onboardingDetails.contacts || []).map(
                        (c: any, i: number) => (
                          <Card
                            key={i}
                            className="border hover:shadow-md transition-shadow"
                          >
                            <CardContent className="p-5">
                              <div className="flex items-start gap-3 mb-3">
                                <div className="p-2 rounded-full bg-primary/10">
                                  <User className="w-4 h-4 text-primary" />
                                </div>
                                <div className="font-semibold text-sm">
                                  {c.role || "Contact"}
                                </div>
                              </div>
                              <div className="space-y-2 text-sm text-muted-foreground ml-11">
                                {c.name && (
                                  <div className="flex items-center gap-2">
                                    <User className="w-3 h-3" /> {c.name}
                                  </div>
                                )}
                                {c.email && (
                                  <div className="flex items-center gap-2 break-all">
                                    <Mail className="w-3 h-3" /> {c.email}
                                  </div>
                                )}
                                {c.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-3 h-3" /> {c.phone}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Onboarding Details */}
                <div>
                  <SectionHeader title="Onboarding Details" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoCard
                      icon={User}
                      label="Contact Person"
                      value={onboardingDetails?.onboarding?.contactPerson}
                    />
                    <InfoCard
                      icon={Phone}
                      label="Contact Phone"
                      value={onboardingDetails?.onboarding?.phone}
                    />
                    <InfoCard
                      icon={Mail}
                      label="Contact Email"
                      value={onboardingDetails?.onboarding?.email}
                    />
                    <InfoCard
                      icon={FileText}
                      label="Goods Type"
                      value={onboardingDetails?.onboarding?.goodsType}
                    />
                    <InfoCard
                      icon={Building2}
                      label="Product Categories"
                      value={(() => {
                        const v = (
                          (onboardingDetails?.onboarding?.productCategories ||
                            []) as string[]
                        ).filter(Boolean);
                        return v.length ? v.join(", ") : "-";
                      })()}
                    />
                    <InfoCard
                      icon={MapPin}
                      label="Supply Areas"
                      value={(() => {
                        const v = (
                          (onboardingDetails?.onboarding?.supplyAreas ||
                            []) as string[]
                        ).filter(Boolean);
                        return v.length ? v.join(", ") : "-";
                      })()}
                    />
                    <InfoCard
                      icon={Calendar}
                      label="Delivery Timeline"
                      value={onboardingDetails?.onboarding?.deliveryTimeline}
                    />
                    <InfoCard
                      icon={Calendar}
                      label="Date of Incorporation"
                      value={onboardingDetails?.onboarding?.dateOfIncorporation}
                    />
                    <InfoCard
                      icon={CheckCircle2}
                      label="In Business > 3 Years"
                      value={
                        onboardingDetails?.onboarding?.inBusinessMoreThan3Years
                          ? "Yes"
                          : "No"
                      }
                    />
                    <InfoCard
                      icon={DollarSign}
                      label="Average Turnover"
                      value={onboardingDetails?.onboarding?.averageTurnover}
                    />
                    <InfoCard
                      icon={User}
                      label="Business Lead Gender"
                      value={onboardingDetails?.onboarding?.businessLeadGender}
                    />
                  </div>
                </div>

                {/* Payment & Bank */}
                <div>
                  <SectionHeader title="Payment & Banking Information" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoCard
                      icon={DollarSign}
                      label="Payment Methods"
                      value={(() => {
                        const v = (
                          (onboardingDetails?.onboarding?.paymentMethods ||
                            []) as string[]
                        ).filter(Boolean);
                        return v.length ? v.join(", ") : "-";
                      })()}
                    />
                    <InfoCard
                      icon={Calendar}
                      label="Vendor Payment Terms"
                      value={onboardingDetails?.onboarding?.vendorPaymentTerms}
                    />
                    <InfoCard
                      icon={Building2}
                      label="Bank Name"
                      value={
                        onboardingDetails?.onboarding?.bankDetails?.bankName
                      }
                    />
                    <InfoCard
                      icon={User}
                      label="Account Name"
                      value={
                        onboardingDetails?.onboarding?.bankDetails?.accountName
                      }
                    />
                    <InfoCard
                      icon={FileText}
                      label="Account Number"
                      value={
                        onboardingDetails?.onboarding?.bankDetails
                          ?.accountNumber
                      }
                    />
                    <InfoCard
                      icon={DollarSign}
                      label="Prefers Cash"
                      value={
                        onboardingDetails?.onboarding?.bankDetails?.prefersCash
                          ? "Yes"
                          : "No"
                      }
                    />
                  </div>
                </div>

                {/* Declarations */}
                <div>
                  <SectionHeader title="Declarations" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoCard
                      icon={CheckCircle2}
                      label="Information Accurate"
                      value={
                        onboardingDetails?.onboarding?.declarations
                          ?.infoAccurate
                          ? "Yes"
                          : "No"
                      }
                    />
                    <InfoCard
                      icon={Shield}
                      label="Agrees to Rules"
                      value={
                        onboardingDetails?.onboarding?.declarations?.agreeRules
                          ? "Yes"
                          : "No"
                      }
                    />
                  </div>
                </div>

                {/* Documents Section */}
                <div>
                  <SectionHeader title="Uploaded Documents" />
                  {(() => {
                    const o = onboardingDetails?.onboarding || {};
                    const uploads = [
                      { name: "Price List", uploads: o.priceListUploads || [] },
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
                    const empty =
                      uploads.every((u) => u.uploads.length === 0) &&
                      docs.length === 0;

                    if (empty) {
                      return (
                        <Card className="border-2 border-dashed">
                          <CardContent className="p-8 text-center">
                            <FileText className="w-10 h-10 mx-auto mb-2 text-muted-foreground/50" />
                            <p className="text-sm text-muted-foreground">
                              No documents uploaded
                            </p>
                          </CardContent>
                        </Card>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {uploads.map((d: any, i: number) => (
                          <Card
                            key={`ud-${i}`}
                            className="border hover:shadow-md transition-all"
                          >
                            <CardContent className="p-5">
                              <div className="flex items-start gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                  <FileText className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm font-semibold flex-1">
                                  {d.name}
                                </span>
                              </div>
                              <div className="ml-11 space-y-2">
                                {d.uploads.length === 0 ? (
                                  <span className="text-xs text-muted-foreground">
                                    No documents uploaded
                                  </span>
                                ) : (
                                  d.uploads.map((u: any, idx: number) => (
                                    <a
                                      key={idx}
                                      href={u}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                                    >
                                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                      <span className="underline">
                                        View Document {idx + 1}
                                      </span>
                                    </a>
                                  ))
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        {docs.map((d: any, i: number) => (
                          <Card
                            key={`dd-${i}`}
                            className="border hover:shadow-md transition-all"
                          >
                            <CardContent className="p-5">
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                  <FileText className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <span className="text-sm font-semibold">
                                    {d.name || "Document"}
                                  </span>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {d.type && <span>{d.type}</span>}
                                    {d.type && d.size && <span> • </span>}
                                    {d.size && <span>{d.size}</span>}
                                  </div>
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
              <Card className="border-2 border-dashed">
                <CardContent className="p-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No onboarding details found
                  </p>
                </CardContent>
              </Card>
            )}
          </ScrollArea>

          {/* Admin Actions Footer */}
          {onboardingDetails && !onboardingDetails.approved && (
            <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur-xl px-6 py-5 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-primary" />
                  <h4 className="text-sm font-semibold">Admin Actions</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Rejection Reason
                    </label>
                    <Select
                      value={rejectReasonType}
                      onValueChange={(v) => setRejectReasonType(v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a reason..." />
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
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Additional Notes (Optional)
                    </label>
                    <Textarea
                      placeholder="Provide additional context..."
                      value={rejectNotes}
                      onChange={(e) => setRejectNotes(e.target.value)}
                      className="w-full resize-none"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-2">
                  <Button
                    onClick={handleRejectOnboarding}
                    variant="destructive"
                    disabled={
                      rejectLoading || !rejectReasonType || approveLoading
                    }
                    className="w-full sm:w-auto sm:min-w-[140px] font-medium"
                  >
                    {rejectLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
                        <span>Rejecting...</span>
                      </div>
                    ) : (
                      "Reject Application"
                    )}
                  </Button>
                  <Button
                    onClick={handleApproveOnboarding}
                    disabled={approveLoading || rejectLoading}
                    className="w-full sm:w-auto sm:min-w-[140px] font-medium bg-green-600 hover:bg-green-700"
                  >
                    {approveLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
                        <span>Approving...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve Supplier</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
