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
  contactEmail?: string;
  contactPhone?: string;
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

  function fmtBytes(n: number) {
    const s = Math.max(0, Number(n || 0));
    if (s < 1024) return `${s} B`;
    const kb = s / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  }

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
            <div className="text-muted-foreground mb-1">Supplier contact</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <div className="text-muted-foreground">Email</div>
                <div className="font-medium wrap-break-words">
                  {bid?.contactEmail || "—"}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Phone</div>
                <div className="font-medium wrap-break-words">
                  {bid?.contactPhone || "—"}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-muted-foreground mb-1">Compliance</div>
            <div className="whitespace-pre-wrap wrap-break-words">
              {bid?.compliance || "—"}
            </div>
          </div>

          <div>
            <div className="text-muted-foreground mb-1">Highlights</div>
            <div className="whitespace-pre-wrap wrap-break-words">
              {bid?.highlights || "—"}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-muted-foreground">Documents</div>
              <div className="font-medium">{docsCount}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-muted-foreground mb-1">
                Technical documents
              </div>
              <div className="space-y-2">
                {(bid?.technicalDocuments || []).length === 0 ? (
                  <div className="text-xs text-muted-foreground">None</div>
                ) : (
                  (bid?.technicalDocuments || []).map((d, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="truncate pr-2">{d.name}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{fmtBytes(Number(d.size || 0))}</span>
                        {d.url ? (
                          <Button asChild variant="ghost" size="sm">
                            <Link href={String(d.url)} target="_blank">
                              Open
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">
                Financial documents
              </div>
              <div className="space-y-2">
                {(bid?.financialDocuments || []).length === 0 ? (
                  <div className="text-xs text-muted-foreground">None</div>
                ) : (
                  (bid?.financialDocuments || []).map((d, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="truncate pr-2">{d.name}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{fmtBytes(Number(d.size || 0))}</span>
                        {d.url ? (
                          <Button asChild variant="ghost" size="sm">
                            <Link href={String(d.url)} target="_blank">
                              Open
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
              </div>
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
