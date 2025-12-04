"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Settings,
  Plus,
  Package,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import {
  getPurchaseOrders,
  closePurchaseOrder,
} from "@/lib/actions/purchase-order-actions";
import { CreatePurchaseOrderForm } from "@/components/create-purchase-order-form";
import { POSettingsModal } from "@/components/po-settings-modal";
import { CreateInvoiceDraftModal } from "@/components/create-invoice-draft-modal";

const fmtDate = (d?: string | Date) =>
  d ? new Date(d).toISOString().slice(0, 10) : "";

const fmtAmount = (n: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

type LineItem = {
  line: number;
  description: string;
  ordered: number;
  received: number;
  remaining: number;
  lineTotal: number;
};

type ApprovalActivity = {
  event: string;
  date: string | Date;
  actor?: string;
};

type PurchaseOrder = {
  _id: string;
  poNumber: string;
  supplier: string;
  status: string;
  total: number;
  requester?: string;
  department?: string;
  linkedRequisition?: string;
  currency?: string;
  purpose?: string;
  paymentTerms?: string;
  keyDates?: { issued?: string | Date; requestedDelivery?: string | Date };
  lineItems: LineItem[];
  delivery?: { shipTo?: string; invoiceTo?: string };
  receiptStatus?: { status?: string; details?: string };
  invoiceStatus?: { status?: string; details?: string };
  approvalHistory?: ApprovalActivity[];
  notes?: string;
};

export default function PurchaseOrdersPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInvoiceDraft, setShowInvoiceDraft] = useState(false);
  const { user } = useUser();
  const [canCreatePO, setCanCreatePO] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getPurchaseOrders()
      .then((res) => {
        const data = res && (res as any).success ? (res as any).data : [];
        if (!mounted) return;
        setPurchaseOrders(data);
        setSelectedPO(data[0] || null);
      })
      .catch(() => {
        if (!mounted) return;
        setPurchaseOrders([]);
        setSelectedPO(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const md = (user?.publicMetadata || {}) as any;
    const rawRole = String(md.role || "");
    const normalized = rawRole.toLowerCase().replace(/[\s_-]/g, "");
    setCanCreatePO(["admin", "superadmin"].includes(normalized));
  }, [user]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleReceiveGoods = async () => {
    setActionLoading("receive");
    setTimeout(() => {
      showToast("Goods receipt recorded successfully", "success");
      setActionLoading(null);
    }, 1000);
  };

  const handleCreateInvoice = async () => {
    setShowInvoiceDraft(true);
  };

  const handleClosePO = async () => {
    if (!selectedPO) return;
    try {
      setActionLoading("close");
      const res: any = await closePurchaseOrder(selectedPO._id);
      if (res && res.success) {
        const list: any = await getPurchaseOrders();
        if (list && list.success) {
          setPurchaseOrders(list.data);
          const updated =
            list.data.find((p: any) => p._id === selectedPO._id) ||
            list.data[0] ||
            null;
          setSelectedPO(updated);
        }
        showToast("Purchase order closed", "success");
      } else {
        showToast(res?.error || "Failed to close purchase order", "error");
      }
    } catch (e) {
      showToast("Failed to close purchase order", "error");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {toast.message}
        </div>
      )}

      <div className="bg-white border-b">
        <div className=" px-4 sm:px-6 lg:px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Purchase Orders
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Track issuance, receipt, and invoicing status across your POs.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">PO settings</span>
              </button>
              {canCreatePO && (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => setShowCreate(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">New PO</span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">View:</span>{" "}
              <span className="font-medium">Open & partially received</span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>{" "}
              <span className="font-medium">
                Pending receipt, Pending invoice
              </span>
            </div>
            <div>
              <span className="text-gray-600">Supplier:</span>{" "}
              <span className="font-medium">Top 20 strategic</span>
            </div>
            <div>
              <span className="text-gray-600">Date:</span>{" "}
              <span className="font-medium">Last 90 days</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">
                {purchaseOrders.length}
              </div>
              <div className="text-sm text-blue-700">open POs</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-yellow-900">
                {
                  purchaseOrders.filter((po) =>
                    (po.status || "").toLowerCase().includes("pending receipt")
                  ).length
                }
              </div>
              <div className="text-sm text-yellow-700">awaiting receipt</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-purple-900">
                {
                  purchaseOrders.filter((po) =>
                    (po.status || "").toLowerCase().includes("pending invoice")
                  ).length
                }
              </div>
              <div className="text-sm text-purple-700">pending invoice</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">PO worklist</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Select a PO to review receipt and invoicing details.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Sorted by delivery date
                </p>
              </div>
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center text-gray-500">
                    Loading purchase orders...
                  </div>
                ) : purchaseOrders.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No purchase orders found.
                  </div>
                ) : (
                  purchaseOrders.map((po) => (
                    <button
                      key={po._id}
                      onClick={() => setSelectedPO(po)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        selectedPO?._id === po._id ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-gray-900">
                          {po.poNumber}
                        </div>
                        <StatusBadge status={po.status} />
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {po.supplier}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-900">
                          ${fmtAmount(po.total)}
                        </span>
                        <span className="text-gray-500">
                          {fmtDate(po.keyDates?.requestedDelivery)}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
              <div className="p-4 bg-blue-50 border-t">
                <p className="text-xs text-blue-800">
                  💡 Tip: Switch &quot;View&quot; to see only POs blocked by
                  invoice or receipt issues.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedPO && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedPO.poNumber} · {selectedPO.supplier}
                      </h2>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <span>Requester: {selectedPO.requester}</span>
                        <span>Department: {selectedPO.department}</span>
                      </div>
                    </div>
                    <StatusBadge status={selectedPO.status} />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">
                        {
                          selectedPO.lineItems.filter(
                            (li) => (li.received || 0) >= (li.ordered || 0)
                          ).length
                        }{" "}
                        of {selectedPO.lineItems.length} lines fully received
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>
                        Linked requisition: {selectedPO.linkedRequisition}
                      </span>
                      <span>Currency: {selectedPO.currency}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Summary & commercial terms
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Purpose</div>
                      <div className="text-gray-900">{selectedPO.purpose}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">PO value</div>
                      <div className="text-gray-900">
                        ${fmtAmount(selectedPO.total)} · Tax exclusive
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Payment terms
                      </div>
                      <div className="text-gray-900">
                        {selectedPO.paymentTerms}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Key dates
                      </div>
                      <div className="text-gray-900">
                        Issued: {fmtDate(selectedPO.keyDates?.issued)} ·
                        Delivery:{" "}
                        {fmtDate(selectedPO.keyDates?.requestedDelivery)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Line items & receipt status
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-3 font-medium text-gray-700">
                            Line
                          </th>
                          <th className="text-left p-3 font-medium text-gray-700">
                            Description
                          </th>
                          <th className="text-right p-3 font-medium text-gray-700">
                            Ordered
                          </th>
                          <th className="text-right p-3 font-medium text-gray-700">
                            Received
                          </th>
                          <th className="text-right p-3 font-medium text-gray-700">
                            Remaining
                          </th>
                          <th className="text-right p-3 font-medium text-gray-700">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {selectedPO.lineItems.map((item) => (
                          <tr key={item.line} className="hover:bg-gray-50">
                            <td className="p-3">{item.line}</td>
                            <td className="p-3">{item.description}</td>
                            <td className="p-3 text-right">{item.ordered}</td>
                            <td className="p-3 text-right">
                              <span
                                className={
                                  item.received === item.ordered
                                    ? "text-green-600 font-medium"
                                    : ""
                                }
                              >
                                {item.received}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <span
                                className={
                                  item.remaining > 0
                                    ? "text-yellow-600 font-medium"
                                    : ""
                                }
                              >
                                {item.remaining}
                              </span>
                            </td>
                            <td className="p-3 text-right font-medium">
                              ${fmtAmount(item.lineTotal)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-6 border-b">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Delivery & invoicing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Ship-to location
                      </div>
                      <div className="text-gray-900">
                        {selectedPO.delivery?.shipTo}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Invoice-to
                      </div>
                      <div className="text-gray-900">
                        {selectedPO.delivery?.invoiceTo}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Receipt status
                      </div>
                      <div className="flex items-center gap-2">
                        {(selectedPO.receiptStatus?.status || "")
                          .toLowerCase()
                          .includes("fully received") ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        )}
                        <span className="text-gray-900">
                          {selectedPO.receiptStatus?.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Invoice status
                      </div>
                      <div className="text-gray-900">
                        {selectedPO.invoiceStatus?.status}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Approval & change history
                  </h3>
                  <div className="space-y-4">
                    {(selectedPO.approvalHistory || []).map((activity, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          {i <
                            (selectedPO.approvalHistory || []).length - 1 && (
                            <div className="w-px h-full bg-gray-300 mt-1"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="font-medium text-gray-900">
                            {activity.event}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {fmtDate(activity.date)}
                            {activity.actor ? ` · ${activity.actor}` : ""}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border-b">
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-700">{selectedPO.notes}</p>
                </div>

                <div className="p-6 bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Next actions
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Record receipts and keep PO aligned with actual deliveries
                    and invoices.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleReceiveGoods}
                      disabled={actionLoading !== null}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {actionLoading === "receive" ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Package className="w-4 h-4" />
                          Receive goods
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCreateInvoice}
                      disabled={actionLoading !== null}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {actionLoading === "invoice" ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <FileText className="w-4 h-4" />
                          Create invoice draft
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleClosePO}
                      disabled={actionLoading !== null}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading === "close" ? "Processing..." : "Close PO"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showCreate && (
          <CreatePurchaseOrderForm
            onClose={() => setShowCreate(false)}
            onCreated={async () => {
              const res: any = await getPurchaseOrders();
              if (res && res.success) {
                setPurchaseOrders(res.data);
                setSelectedPO(res.data[0] || null);
              }
            }}
          />
        )}

        {showSettings && (
          <POSettingsModal
            onClose={() => setShowSettings(false)}
            onSave={(settings) => {
              console.log("Settings saved:", settings);
              showToast("Settings saved successfully", "success");
            }}
          />
        )}

        {showInvoiceDraft && selectedPO && (
          <CreateInvoiceDraftModal
            purchaseOrder={selectedPO}
            onClose={() => setShowInvoiceDraft(false)}
            onCreated={() => {
              showToast("Invoice draft created successfully", "success");
              setShowInvoiceDraft(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
