"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateUser, getUserPhoto } from "@/lib/actions/user-actions";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const lawyerFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "firstName must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "lastName must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  role: z.string().min(2, { message: " user role is required" }),
});

const EditUser = ({
  userData,
  isOpen,
  onClose,
  onSubmitComplete,
  currentUserRole, // No default value
}: {
  userData: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmitComplete: () => void;
  currentUserRole: string; // Made required
}) => {
  const form = useForm<z.infer<typeof lawyerFormSchema>>({
    resolver: zodResolver(lawyerFormSchema),
    defaultValues: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(
    String(userData?.photo || userData?.imageUrl || "") || undefined
  );

  useEffect(() => {
    const run = async () => {
      try {
        if (!userData?.id) return;
        const res = await getUserPhoto(String(userData.id));
        if (res?.success && res.photo) {
          setPhotoUrl(res.photo);
        }
      } catch {}
    };
    if (isOpen) run();
  }, [isOpen, userData?.id]);

  const getAvailableRoles = () => {
    if (currentUserRole === "superadmin") {
      return [
        { value: "superadmin", label: "Superadmin" },
        { value: "admin", label: "Admin" },
        { value: "financial_controller", label: "Financial Controller" },
        { value: "financial_accountant", label: "Financial Accountant" },
        { value: "procurement_officer", label: "Procurement Officer" },
        { value: "project_lead", label: "Project Lead" },
        { value: "supplier", label: "Supplier" },
      ];
    } else if (currentUserRole === "admin") {
      // Admin can only assign these 4 specific roles
      return [
        { value: "financial_controller", label: "Financial Controller" },
        { value: "financial_accountant", label: "Financial Accountant" },
        { value: "procurement_officer", label: "Procurement Officer" },
        { value: "project_lead", label: "Project Lead" },
      ];
    }
    return [];
  };

  const availableRoles = getAvailableRoles();

  // Check if admin is trying to edit a superadmin or admin user
  const canEditUser = () => {
    if (currentUserRole === "superadmin") {
      return true; // Superadmin can edit anyone
    }

    if (currentUserRole === "admin") {
      // Admin cannot edit superadmin or admin users
      if (userData.role === "superadmin" || userData.role === "admin") {
        return false;
      }
      return true;
    }

    return false;
  };

  const onSubmit = async (data: z.infer<typeof lawyerFormSchema>) => {
    // Additional validation: prevent admin from assigning superadmin or admin roles
    if (
      currentUserRole === "admin" &&
      (data.role === "superadmin" || data.role === "admin")
    ) {
      toast({
        title: "Error",
        description:
          "You don't have permission to assign Superadmin or Admin roles",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await updateUser(
        userData.id,
        data.firstName,
        data.lastName,
        data.role
      );

      if (!result.success) {
        toast({
          title: "Error",
          description: result.error || "Failed to update user",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Success",
        description: "User updated successfully",
      });

      onClose();
      form.reset();
      setIsSubmitting(false);
      onSubmitComplete();
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  // Show message if admin tries to edit superadmin or admin
  if (!canEditUser()) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="right"
          className="w-full max-w-full px-4 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl sm:px-6"
        >
          <SheetHeader className="pb-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/10">
                <User className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <SheetTitle className="text-lg font-semibold sm:text-xl">
                  Access Denied
                </SheetTitle>
                <SheetDescription className="text-sm sm:text-base text-muted-foreground">
                  You don't have permission to edit this user.
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
          <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">
              Only Superadmins can edit Admin and Superadmin accounts.
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="right"
          className="w-full max-w-full px-4 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl sm:px-6"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <SheetHeader className="pb-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                {/* <User className="w-5 h-5 text-primary" /> */}
                <Avatar className="w-10 h-10 sm:w-11 sm:h-11 ring-2 ring-offset-2 ring-primary/10">
                  <AvatarImage
                    src={
                      photoUrl ||
                      userData?.photo ||
                      userData?.imageUrl ||
                      "/placeholder.svg"
                    }
                    alt={
                      `${form.watch("firstName") || ""} ${
                        form.watch("lastName") || ""
                      }`.trim() || "Current user"
                    }
                  />
                  <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
                    {`${(form.watch("firstName") || "").charAt(0)}${(
                      form.watch("lastName") || ""
                    ).charAt(0)}` || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <SheetTitle className="text-lg font-semibold sm:text-xl">
                  Update User
                </SheetTitle>
                <SheetDescription className="text-sm sm:text-base text-muted-foreground">
                  Modify account details and assign the correct role.
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            <ScrollArea className="h-[calc(100vh-220px)] pr-2 sm:pr-4 sm:mb-4">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      aria-invalid={!!form.formState.errors.firstName}
                      autoFocus
                      {...form.register("firstName")}
                      className="h-10"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      aria-invalid={!!form.formState.errors.lastName}
                      {...form.register("lastName")}
                      className="h-10"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    aria-invalid={!!form.formState.errors.email}
                    {...form.register("email")}
                    className="h-10"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    User Role
                  </Label>
                  <Select
                    value={form.watch("role")}
                    onValueChange={(value) => form.setValue("role", value)}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.role && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.role.message}
                    </p>
                  )}
                </div>
              </div>
            </ScrollArea>

            {/* Buttons */}
            <div className="flex flex-col-reverse justify-end gap-3  sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
                    Updating...
                  </div>
                ) : (
                  "Update User"
                )}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditUser;
