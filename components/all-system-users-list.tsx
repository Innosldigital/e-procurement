"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { UserDetailModal } from "@/components/user-detail-modal";

interface SystemUser {
  _id: string;
  userId: string;
  email: string;
  name: string;
  role: string;
  approved: boolean;
  createdAt: number;
  lastSignInAt?: number;
  onboarding?: any;
  contact?: any;
}

interface AllSystemUsersListProps {
  users: SystemUser[];
}

export function AllSystemUsersList({ users }: AllSystemUsersListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "approved" | "pending"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debug: Log users when component mounts or users change
  useEffect(() => {
    console.log("AllSystemUsersList - Users received:", users);
    console.log("AllSystemUsersList - Users count:", users?.length || 0);
  }, [users]);

  // Ensure users is an array
  const safeUsers = Array.isArray(users) ? users : [];

  const filteredUsers = safeUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "approved" && user.approved) ||
      (statusFilter === "pending" && !user.approved);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // Get unique roles for filter dropdown
  const uniqueRoles = Array.from(
    new Set(safeUsers.map((u) => String(u.role || "").trim()))
  )
    .filter(Boolean)
    .sort();

  // Format role for display
  const formatRole = (role: string) => {
    return role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatDate = (ms: number) => {
    try {
      return new Date(ms).toISOString().slice(0, 10);
    } catch {
      return "";
    }
  };

  // Check if user has detailed information
  const hasDetailedInfo = (user: SystemUser) => {
    return (
      user.onboarding ||
      user.contact ||
      user.role === "company" ||
      user.role === "supplier"
    );
  };

  if (safeUsers.length === 0) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">
            Debug Info:
          </h3>
          <div className="text-xs text-yellow-700 space-y-1">
            <p>Users prop: {JSON.stringify(users)}</p>
            <p>Users type: {typeof users}</p>
            <p>Is Array: {Array.isArray(users) ? "Yes" : "No"}</p>
            <p>Length: {users?.length || 0}</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground py-4 text-center">
          No users data received. Check server-side data fetching.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search by name, email, or ID..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleFilterChange();
          }}
          className="flex-1"
        />
        <div className="flex gap-2">
          <Select
            value={roleFilter}
            onValueChange={(value: string) => {
              setRoleFilter(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {uniqueRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {formatRole(role)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(value: any) => {
              setStatusFilter(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        {paginatedUsers.length === 0 ? (
          <div className="text-sm text-muted-foreground py-4 text-center">
            No users found matching your filters.
          </div>
        ) : (
          paginatedUsers.map((u) => (
            <div
              key={u.userId || u._id || u.email || `${u.name}-${u.createdAt}`}
              className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-muted/50 transition-colors"
            >
              <div className="text-left flex-1">
                <div className="text-sm font-medium">{u.name}</div>
                <div className="text-xs text-muted-foreground">
                  {formatRole(u.role)} • {u.email}
                </div>
                <div className="text-xs text-muted-foreground">
                  ID: {u.userId}
                </div>
                {u.lastSignInAt && (
                  <div className="text-xs text-muted-foreground">
                    Last sign in: {formatDate(u.lastSignInAt)}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={u.approved ? "Approved" : "Pending"} />
                {hasDetailedInfo(u) && (
                  <UserDetailModal
                    user={{
                      ...u,
                      entityId: u.userId,
                    }}
                  >
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </UserDetailModal>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)}{" "}
            of {filteredUsers.length} users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
