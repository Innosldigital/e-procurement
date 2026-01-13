"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type BidDetails = {
  tenderObjectId: string;
  tenderId: string;
  tenderTitle: string;
  type: string;
  category: string;
  stage: string;
  supplier: string;
  supplierId?: string;
  totalPrice: number;
  score?: number;
  compliance?: string;
  highlights?: string;
  technicalDocCount: number;
  financialDocCount: number;
  createdAt: string | Date;
  technicalDocuments?: Array<{
    name: string;
    size: number;
    type: string;
    url?: string;
  }>;
  financialDocuments?: Array<{
    name: string;
    size: number;
    type: string;
    url?: string;
  }>;
};

function fmtAmount(n: number) {
  try {
    return new Intl.NumberFormat("en-SL", {
      style: "currency",
      currency: "SLE",
      maximumFractionDigits: 0,
    }).format(Number(n || 0));
  } catch {
    return `Nle ${Number(n || 0).toLocaleString()}`;
  }
}

export default function BidDetailsModal({
  bid,
  closeHref,
}: {
  bid: BidDetails | null;
  closeHref: string;
}) {
  const open = !!bid;
  if (!open) return null;

  const docsCount =
    (bid?.technicalDocCount || 0) + (bid?.financialDocCount || 0);

  return (
    <Dialog open onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bid Details</DialogTitle>
          <DialogDescription>
            {bid?.tenderTitle} · {bid?.tenderId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-muted-foreground">Supplier</div>
              <div className="font-medium">{bid?.supplier || "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Amount</div>
              <div className="font-medium">
                {fmtAmount(Number(bid?.totalPrice || 0))}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Status</div>
              <div className="font-medium">{bid?.stage || "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Submitted</div>
              <div className="font-medium">
                {new Date(bid?.createdAt || new Date()).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="text-muted-foreground mb-1">Compliance</div>
            <div className="whitespace-pre-wrap break-words">
              {bid?.compliance || "—"}
            </div>
          </div>

          <div>
            <div className="text-muted-foreground mb-1">Highlights</div>
            <div className="whitespace-pre-wrap break-words">
              {bid?.highlights || "—"}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-muted-foreground">Documents</div>
              <div className="font-medium">{docsCount}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button asChild variant="outline" size="sm">
            <Link href={closeHref}>Close</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
