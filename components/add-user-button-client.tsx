"use client";

import { useEffect, useState } from "react";
import { AddUserModal } from "@/components/add-user-modal";

export function AddUserButtonClient({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <AddUserModal action={action} />;
}
