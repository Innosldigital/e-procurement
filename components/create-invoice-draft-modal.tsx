"use client";

import { useState } from "react";
import { X, FileText, Save } from "lucide-react";
import { createInvoice } from "@/lib/actions/invoice-actions";

type LineItem = {
  line: number;
  description: string;
  ordered: number;
  received: number;
  remaining: number;
  lineTotal: number;
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
  approvalHistory?: Array<{
    event: string;
    date: string | Date;
    actor?: string;
  }>;
  notes?: string;
};

type InvoiceDraftModalProps = {
  purchaseOrder: PurchaseOrder;
  onClose: () => void;
  onCreated?: () => void;
};

type InvoiceLineItem = {
  line: number;
  description: string;
  quantityReceived: number;
  quantityToInvoice: number;
  unitPrice: number;
  lineTotal: number;
  selected: boolean;
};

const fmtDate = (d?: string | Date) =>
  d ? new Date(d).toISOString().slice(0, 10) : "";

const fmtAmount = (n: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

export function CreateInvoiceDraftModal({
  purchaseOrder,
  onClose,
  onCreated,
}: InvoiceDraftModalProps) {
  const [saving, setSaving] = useState(false);
  const [invoiceFiles, setInvoiceFiles] = useState<FileList | null>(null);

  // Generate initial invoice number
  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `INV-${year}${month}-${random}`;
  };

  // Calculate due date based on payment terms
  const calculateDueDate = () => {
    const today = new Date();
    const terms = purchaseOrder.paymentTerms || "Net 30";
    const daysMatch = terms.match(/\d+/);
    const days = daysMatch ? Number.parseInt(daysMatch[0]) : 30;

    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + days);
    return dueDate.toISOString().slice(0, 10);
  };

  // Initialize invoice line items from PO
  const initializeLineItems = (): InvoiceLineItem[] => {
    return purchaseOrder.lineItems.map((item) => ({
      line: item.line,
      description: item.description,
      quantityReceived: item.received,
      quantityToInvoice: item.received,
      unitPrice: item.received > 0 ? item.lineTotal / item.received : 0,
      lineTotal: item.lineTotal,
      selected: item.received > 0,
    }));
  };

  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber());
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [dueDate, setDueDate] = useState(calculateDueDate());
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>(
    initializeLineItems()
  );

  // Calculate totals
  const subtotal = lineItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.unitPrice * item.quantityToInvoice, 0);

  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const handleQuantityChange = (line: number, quantity: number) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.line === line) {
          const newQuantity = Math.max(
            0,
            Math.min(quantity, item.quantityReceived)
          );
          return {
            ...item,
            quantityToInvoice: newQuantity,
          };
        }
        return item;
      })
    );
  };

  const handleToggleItem = (line: number) => {
    setLineItems(
      lineItems.map((item) =>
        item.line === line ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      async function uploadFiles(list: FileList | null, folder: string) {
        if (!list || list.length === 0)
          return [] as Array<{
            name: string;
            size: number;
            type: string;
            url: string;
          }>;
        const fd = new FormData();
        Array.from(list).forEach((f) => fd.append("files", f));
        fd.append("folder", folder);
        const resp = await fetch("/api/upload", { method: "POST", body: fd });
        const json = await resp.json();
        return (json && json.success ? json.data : []) as Array<{
          name: string;
          size: number;
          type: string;
          url: string;
        }>;
      }

      const uploads = await uploadFiles(
        invoiceFiles,
        `invoices/${String(invoiceNumber || purchaseOrder.poNumber)}`
      );

      const selected = lineItems.filter((li) => li.selected);
      const mapped = selected.map((li) => {
        const base = li.unitPrice * li.quantityToInvoice;
        const tax = base * (taxRate / 100);
        return {
          description: li.description,
          qty: li.quantityToInvoice,
          unitPrice: li.unitPrice,
          tax,
          lineTotal: base + tax,
        };
      });

      const res = await createInvoice({
        invoiceNumber: String(invoiceNumber),
        supplier: String(purchaseOrder.supplier || ""),
        amount: Number(total),
        poNumber: String(purchaseOrder.poNumber || ""),
        dueDate: new Date(dueDate),
        invoiceDate: new Date(invoiceDate),
        entity: String(purchaseOrder.department || ""),
        currency: String(purchaseOrder.currency || "USD"),
        lineItems: mapped,
        notes,
        documents: uploads,
      });

      if (res && (res as any).success) {
        onCreated?.();
        onClose();
      }
    } catch (e) {
    } finally {
      setSaving(false);
    }
  };

  const selectedItemCount = lineItems.filter((item) => item.selected).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Create Invoice Draft
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                PO: {purchaseOrder.poNumber} · {purchaseOrder.supplier}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Invoice Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">
              Invoice Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Date
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Payment Terms</div>
                <div className="text-gray-900 font-medium">
                  {purchaseOrder.paymentTerms}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Currency</div>
                <div className="text-gray-900 font-medium">
                  {purchaseOrder.currency}
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Line Items ({selectedItemCount} of {lineItems.length} selected)
              </h3>
              <div className="text-sm text-gray-600">
                Only received items can be invoiced
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700 w-12">
                        <input
                          type="checkbox"
                          checked={lineItems.every(
                            (item) =>
                              item.selected || item.quantityReceived === 0
                          )}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setLineItems(
                              lineItems.map((item) =>
                                item.quantityReceived > 0
                                  ? { ...item, selected: checked }
                                  : item
                              )
                            );
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </th>
                      <th className="text-left p-3 font-medium text-gray-700">
                        Line
                      </th>
                      <th className="text-left p-3 font-medium text-gray-700">
                        Description
                      </th>
                      <th className="text-right p-3 font-medium text-gray-700">
                        Received
                      </th>
                      <th className="text-right p-3 font-medium text-gray-700">
                        Qty to Invoice
                      </th>
                      <th className="text-right p-3 font-medium text-gray-700">
                        Unit Price
                      </th>
                      <th className="text-right p-3 font-medium text-gray-700">
                        Line Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {lineItems.map((item) => {
                      const isDisabled = item.quantityReceived === 0;
                      return (
                        <tr
                          key={item.line}
                          className={`${
                            isDisabled
                              ? "bg-gray-50 opacity-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={item.selected}
                              onChange={() => handleToggleItem(item.line)}
                              disabled={isDisabled}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
                            />
                          </td>
                          <td className="p-3 text-gray-900">{item.line}</td>
                          <td className="p-3 text-gray-900">
                            {item.description}
                          </td>
                          <td className="p-3 text-right text-gray-900">
                            {item.quantityReceived}
                          </td>
                          <td className="p-3 text-right">
                            <input
                              type="number"
                              value={item.quantityToInvoice}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.line,
                                  Number.parseInt(e.target.value) || 0
                                )
                              }
                              disabled={isDisabled || !item.selected}
                              min={0}
                              max={item.quantityReceived}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-right focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                          </td>
                          <td className="p-3 text-right text-gray-900">
                            ${fmtAmount(item.unitPrice)}
                          </td>
                          <td className="p-3 text-right font-medium text-gray-900">
                            $
                            {fmtAmount(
                              item.selected
                                ? item.unitPrice * item.quantityToInvoice
                                : 0
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="max-w-md ml-auto space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-medium">
                  ${fmtAmount(subtotal)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Tax Rate (%)</span>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) =>
                      setTaxRate(Number.parseFloat(e.target.value) || 0)
                    }
                    step="0.01"
                    min={0}
                    max={100}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-right focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <span className="text-gray-900 font-medium">
                  ${fmtAmount(taxAmount)}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${fmtAmount(total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invoice Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any additional notes or instructions..."
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Invoice Document
            </label>
            <input
              type="file"
              multiple
              accept="application/pdf,image/*,.pdf"
              onChange={(e) => setInvoiceFiles(e.target.files)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {invoiceFiles && (
              <div className="text-xs text-gray-600 mt-1">
                {invoiceFiles.length} file(s) selected
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900">Invoice Summary</div>
                <div className="text-sm text-blue-800 mt-1">
                  Invoice {invoiceNumber} will be created for{" "}
                  {selectedItemCount} line item
                  {selectedItemCount !== 1 ? "s" : ""} totaling $
                  {fmtAmount(total)} {purchaseOrder.currency}. Due date:{" "}
                  {fmtDate(dueDate)}.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || selectedItemCount === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Invoice Draft
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
