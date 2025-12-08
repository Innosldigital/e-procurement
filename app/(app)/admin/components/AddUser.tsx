"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, User } from "lucide-react";
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

      toast({
        title: "Success",
        description: "User created successfully",
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
        className="flex items-center gap-2 font-medium"
        size="default"
      >
        <Plus className="w-4 h-4" />
        Add New User
      </Button>

      <Sheet open={addLawyerModalOpen} onOpenChange={setAddLawyerModalOpen}>
        <SheetContent
          side="right"
          className="w-full sm:w-[440px] md:w-[500px] lg:w-[560px] xl:w-[600px] flex flex-col p-0"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <SheetHeader className="px-4 pt-6 pb-4 space-y-2 sm:px-6 sm:pb-6 sm:space-y-3">
            <div className="flex items-start gap-3 sm:items-center">
              <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <SheetTitle className="text-base font-semibold sm:text-lg lg:text-xl">
                  Add New User
                </SheetTitle>
                <SheetDescription className="text-xs sm:text-sm text-muted-foreground">
                  Create a new user account and assign their role in the system.
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 min-h-0"
          >
            <ScrollArea className="flex-1 px-4 sm:px-6">
              <div className="pb-4 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      placeholder="Enter first name"
                      autoComplete="given-name"
                      autoFocus
                      aria-invalid={!!form.formState.errors.firstName}
                      className="h-10 text-sm sm:text-base"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-xs text-destructive">
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
                      {...form.register("lastName")}
                      placeholder="Enter last name"
                      autoComplete="family-name"
                      aria-invalid={!!form.formState.errors.lastName}
                      className="h-10 text-sm sm:text-base"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-xs text-destructive">
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
                    {...form.register("email")}
                    placeholder="Enter email address"
                    autoComplete="email"
                    aria-invalid={!!form.formState.errors.email}
                    className="h-10 text-sm sm:text-base"
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive">
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
                    <SelectTrigger className="h-10 text-sm sm:text-base">
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
                    <p className="text-xs text-destructive">
                      {form.formState.errors.role.message}
                    </p>
                  )}
                </div>
              </div>
            </ScrollArea>

            <div className="flex flex-col-reverse gap-3 p-4 border-t sm:flex-row sm:justify-end sm:px-6 bg-background/50 backdrop-blur-sm">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddLawyerModalOpen(false)}
                className="w-full text-sm sm:w-auto sm:min-w-[100px]"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-sm sm:w-auto sm:min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
                    <span>Adding...</span>
                  </div>
                ) : (
                  "Add User"
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
