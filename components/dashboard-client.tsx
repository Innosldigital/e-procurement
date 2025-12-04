"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { CreateTenderForm } from "@/components/create-tender-form";
import { CreateRequisitionForm } from "@/components/create-requisition-form";

export function DashboardClient() {
  const [showTenderForm, setShowTenderForm] = useState(false);
  const [showRequisitionForm, setShowRequisitionForm] = useState(false);
  const { user } = useUser();
  const [canCreateRequisition, setCanCreateRequisition] = useState(false);

  useEffect(() => {
    const md = (user?.publicMetadata || {}) as any;
    const rawRole = String(md.role || "");
    const normalized = rawRole.toLowerCase().replace(/[\s_-]/g, "");
    setCanCreateRequisition(
      normalized === "admin" || normalized === "company" || normalized === "superadmin"
    );
  }, [user]);

  return (
    <>
      <div className="flex gap-2 md:gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none bg-transparent"
          onClick={() => setShowTenderForm(true)}
        >
          Create tender
        </Button>
        {canCreateRequisition && (
          <Button
            size="sm"
            className="flex-1 sm:flex-none"
            onClick={() => setShowRequisitionForm(true)}
          >
            Create requisition
          </Button>
        )}
      </div>

      {showTenderForm && (
        <CreateTenderForm onClose={() => setShowTenderForm(false)} />
      )}

      {showRequisitionForm && (
        <CreateRequisitionForm onClose={() => setShowRequisitionForm(false)} />
      )}
    </>
  );
}

export default DashboardClient;
