"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserDetailModal } from "@/components/user-detail-modal";
import { RejectModal } from "@/components/reject-modal";
import { Search, X } from "lucide-react";

type User = {
  _id: string;
  role: "supplier" | "admin";
  name: string;
  entityId: string;
  ownerUserId?: string;
  onboarding?: any;
  email?: string;
};

type PendingUsersListProps = {
  users: User[];
  onApprove?: (entityId: string, role: "supplier") => Promise<void>;
  onReject?: (
    entityId: string,
    userType: "supplier",
    reason: string
  ) => Promise<void>;
  onApproveAdmin?: (userId: string) => Promise<void>;
  onRejectAdmin?: (userId: string, reason: string) => Promise<void>;
};

export function PendingUsersList({
  users,
  onApprove,
  onReject,
  onApproveAdmin,
  onRejectAdmin,
}: PendingUsersListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "supplier" | "admin">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Determine which roles are present in the users list
  const availableRoles = useMemo(() => {
    const roles = new Set(users.map((u) => u.role));
    return {
      hasSupplier: roles.has("supplier"),
      hasAdmin: roles.has("admin"),
    };
  }, [users]);

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Role filter
      if (roleFilter !== "all" && user.role !== roleFilter) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const name = String(user.name || "");
        const entityId = String(user.entityId || "");
        const matchesName = name.toLowerCase().includes(term);
        const matchesEntityId = entityId.toLowerCase().includes(term);
        const matchesContact =
          user.role === "supplier"
            ? String(user.onboarding?.contactPerson || "")
                .toLowerCase()
                .includes(term) ||
              String(user.onboarding?.email || "")
                .toLowerCase()
                .includes(term) ||
              String(user.onboarding?.phone || "")
                .toLowerCase()
                .includes(term)
            : String(user.email || "")
                .toLowerCase()
                .includes(term);

        if (!matchesName && !matchesEntityId && !matchesContact) {
          return false;
        }
      }

      return true;
    });
  }, [users, searchTerm, roleFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {searchTerm && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md w-6 h-6 text-muted-foreground hover:bg-accent"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <Input
            placeholder="Search by name, ID, or contact..."
            aria-label="Search pending users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-9 bg-muted/50"
          />
        </div>
        <Select
          value={roleFilter}
          onValueChange={(value: any) => setRoleFilter(value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            {availableRoles.hasSupplier && (
              <SelectItem value="supplier">Supplier</SelectItem>
            )}
            {availableRoles.hasAdmin && (
              <SelectItem value="admin">Admin</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-xs text-muted-foreground">
        Showing {paginatedUsers.length} of {filteredUsers.length} pending user
        {filteredUsers.length !== 1 ? "s" : ""}
      </div>

      {/* User List */}
      {filteredUsers.length === 0 ? (
        <div className="text-xs text-muted-foreground">
          No pending users found.
        </div>
      ) : (
        <div className="space-y-2">
          {paginatedUsers.map((u: any) => (
            <div
              key={`${u.role}-${
                u._id || u.entityId || u.userId || u.email || u.name
              }`}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <UserDetailModal user={u}>
                <button className="text-left hover:opacity-70 transition-opacity">
                  <div className="text-sm font-medium">{u.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {u.role} • {u.entityId}
                  </div>
                  {u.role === "supplier" ? (
                    <div className="text-xs text-muted-foreground">
                      {u.onboarding?.contactPerson} • {u.onboarding?.phone} •{" "}
                      {u.onboarding?.email}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">
                      {u.email}
                    </div>
                  )}
                </button>
              </UserDetailModal>
              <div className="flex gap-2">
                {u.role === "admin" ? (
                  <>
                    <form
                      action={async () => {
                        if (onApproveAdmin)
                          await onApproveAdmin(String(u.entityId));
                      }}
                    >
                      <Button size="sm">Approve</Button>
                    </form>
                    <form
                      action={async (fd: FormData) => {
                        const reason = String(
                          fd.get("reason") || "Insufficient information"
                        );
                        if (onRejectAdmin)
                          await onRejectAdmin(String(u.entityId), reason);
                      }}
                    >
                      <input
                        type="hidden"
                        name="reason"
                        value="Insufficient information"
                      />
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <form
                      action={async () => {
                        if (onApprove)
                          await onApprove(String(u.entityId), u.role);
                      }}
                    >
                      <Button size="sm">Approve</Button>
                    </form>
                    <RejectModal
                      userType={u.role as any}
                      entityId={String(u.entityId)}
                      userName={u.name}
                      onReject={onReject as any}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-xs text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
