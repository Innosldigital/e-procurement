"use client";

import { useEffect, useState } from "react";
import { PendingUsersList } from "@/components/pending-users-list";

type User = any;

export function PendingUsersClient(props: {
  effectiveRole: "admin" | "super_admin";
  users: User[];
  onApprove?: (entityId: string, role: "company" | "supplier") => Promise<void>;
  onReject?: (
    entityId: string,
    userType: "company" | "supplier",
    reason: string
  ) => Promise<void>;
  onApproveAdmin?: (userId: string) => Promise<void>;
  onRejectAdmin?: (userId: string, reason: string) => Promise<void>;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PendingUsersList
      users={props.users}
      onApprove={
        props.effectiveRole === "admin" || props.effectiveRole === "super_admin"
          ? props.onApprove
          : undefined
      }
      onReject={
        props.effectiveRole === "admin" || props.effectiveRole === "super_admin"
          ? props.onReject
          : undefined
      }
      onApproveAdmin={
        props.effectiveRole === "super_admin" ? props.onApproveAdmin : undefined
      }
      onRejectAdmin={
        props.effectiveRole === "super_admin" ? props.onRejectAdmin : undefined
      }
    />
  );
}
