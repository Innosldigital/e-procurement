"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createUser } from "@/lib/actions/user-actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const lawyerFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  role: z.string().min(1, { message: "User role is required" }),
});

interface AddUserProps {
  onSubmitComplete?: () => void;
  currentUserRole?: string;
}

export function AddUser({ onSubmitComplete, currentUserRole }: AddUserProps) {
  const [addLawyerModalOpen, setAddLawyerModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  // Debug log to check what role is being received
  console.log("Current User Role:", currentUserRole);

  const form = useForm<z.infer<typeof lawyerFormSchema>>({
    resolver: zodResolver(lawyerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    },
  });

  const router = useRouter();

  const getAvailableRoles = () => {
    if (currentUserRole === "superadmin") {
      return [
        { value: "Super Admin", label: "Superadmin" },
        { value: "Admin", label: "Admin" },
        { value: "Financial Controller", label: "Financial Controller" },
        { value: "Financial Accountant", label: "Financial Accountant" },
        { value: "Procurement Officer", label: "Procurement Officer" },
        { value: "Project Lead", label: "Project Lead" },
        { value: "Supplier", label: "Supplier" },
      ];
    } else if (currentUserRole === "admin") {
      // Admin can only assign these 4 specific roles
      return [
        { value: "Financial Controller", label: "Financial Controller" },
        { value: "Financial Accountant", label: "Financial Accountant" },
        { value: "Procurement Officer", label: "Procurement Officer" },
        { value: "Project Lead", label: "Project Lead" },
      ];
    }
    return [];
  };

  const availableRoles = getAvailableRoles();

  const onSubmit = async (data: z.infer<typeof lawyerFormSchema>) => {
    try {
      setIsSubmitting(true);
      const result = await createUser(
        data.firstName,
        data.lastName,
        data.email,
        data.role!
      );

      if (!result.success) {
        toast({
          title: "Error",
          description: result.error || "Failed to create user",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Show success with invitation URL
      toast({
        title: "Success",
        description: (
          <div className="space-y-2">
            <p>User invitation sent successfully!</p>
            {result.invitationUrl && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-1">
                  If email doesn't arrive, copy this link:
                </p>
                <code className="text-xs bg-muted p-1 rounded block break-all">
                  {result.invitationUrl}
                </code>
              </div>
            )}
          </div>
        ),
        duration: 10000,
      });

      setAddLawyerModalOpen(false);
      form.reset();
      setIsSubmitting(false);
      if (onSubmitComplete) {
        onSubmitComplete();
      }
      router.refresh();
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setAddLawyerModalOpen(true)}
        className="flex items-center gap-2 font-medium text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 h-9 sm:h-10"
        size="default"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden xs:inline">Add New User</span>
        <span className="xs:hidden">Add User</span>
      </Button>

      <Sheet open={addLawyerModalOpen} onOpenChange={setAddLawyerModalOpen}>
        <SheetContent
          side="right"
          className="w-full sm:w-[440px] md:w-[500px] lg:w-[560px] xl:w-[600px] flex flex-col p-0 max-w-full"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <SheetHeader className="px-4 pt-4 pb-3 space-y-2 sm:px-6 sm:pt-6 sm:pb-4 sm:space-y-3 border-b">
            <div className="flex items-start gap-3 sm:items-center">
              <div className="flex-shrink-0">
                <Avatar className="w-10 h-10 sm:w-11 sm:h-11 ring-2 ring-offset-2 ring-primary/10">
                  <AvatarImage
                    src={user?.imageUrl || "/placeholder.svg"}
                    alt={
                      `${user?.firstName || ""} ${
                        user?.lastName || ""
                      }`.trim() || "Current user"
                    }
                  />
                  <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
                    {`${(user?.firstName || "").charAt(0)}${(
                      user?.lastName || ""
                    ).charAt(0)}` || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <SheetTitle className="text-lg font-bold tracking-tight sm:text-xl lg:text-2xl text-foreground">
                  Add New User
                </SheetTitle>
                <SheetDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Create a new user account and assign their role in the system.
                </SheetDescription>
                {user && (
                  <div className="mt-1.5 text-xs font-medium text-muted-foreground/80 truncate">
                    Created by{" "}
                    {`${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                      user.emailAddresses?.[0]?.emailAddress ||
                      "Current user"}
                  </div>
                )}
              </div>
            </div>
          </SheetHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 min-h-0"
          >
            <ScrollArea className="flex-1 px-4 sm:px-6">
              <div className="py-4 space-y-5 sm:py-6 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-semibold text-foreground"
                    >
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      placeholder="Enter first name"
                      autoComplete="given-name"
                      autoFocus
                      aria-invalid={!!form.formState.errors.firstName}
                      className="h-10 text-sm sm:text-base transition-all focus:ring-2 focus:ring-primary/20"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-xs font-medium text-destructive flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-semibold text-foreground"
                    >
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      placeholder="Enter last name"
                      autoComplete="family-name"
                      aria-invalid={!!form.formState.errors.lastName}
                      className="h-10 text-sm sm:text-base transition-all focus:ring-2 focus:ring-primary/20"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-xs font-medium text-destructive flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-foreground"
                  >
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="user@example.com"
                    autoComplete="email"
                    aria-invalid={!!form.formState.errors.email}
                    className="h-10 text-sm sm:text-base transition-all focus:ring-2 focus:ring-primary/20"
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs font-medium text-destructive flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="role"
                    className="text-sm font-semibold text-foreground"
                  >
                    User Role <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.watch("role")}
                    onValueChange={(value) => form.setValue("role", value)}
                  >
                    <SelectTrigger className="h-10 text-sm sm:text-base transition-all focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map((role) => (
                        <SelectItem
                          key={role.value}
                          value={role.value}
                          className="text-sm sm:text-base"
                        >
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.role && (
                    <p className="text-xs font-medium text-destructive flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                      {form.formState.errors.role.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 pb-1">
                  <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0"></span>
                    <span>
                      All fields marked with{" "}
                      <span className="text-destructive font-medium">*</span>{" "}
                      are required
                    </span>
                  </p>
                </div>
              </div>
            </ScrollArea>

            <div className="flex flex-col-reverse gap-2.5 p-4 border-t sm:flex-row sm:justify-end sm:px-6 sm:py-4 bg-muted/30 backdrop-blur-sm">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddLawyerModalOpen(false)}
                className="w-full text-sm font-medium sm:w-auto sm:min-w-[100px] h-10 transition-all hover:bg-muted"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-sm font-semibold sm:w-auto sm:min-w-[140px] h-10 transition-all shadow-sm hover:shadow-md"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
                    <span>Adding User...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AddUser;
