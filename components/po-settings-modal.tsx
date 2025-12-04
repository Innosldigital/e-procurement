"use client";

import { useState } from "react";
import { X, Save, Settings } from "lucide-react";

type POSettingsModalProps = {
  onClose: () => void;
  onSave?: (settings: POSettings) => void;
};

type POSettings = {
  numberingPrefix: string;
  startingNumber: number;
  autoApprovalThreshold: number;
  defaultPaymentTerms: string;
  defaultCurrency: string;
  requireApprovalForAll: boolean;
  enableEmailNotifications: boolean;
  notifyOnApproval: boolean;
  notifyOnReceipt: boolean;
  notifyOnInvoice: boolean;
  defaultTaxRate: number;
  allowPartialReceipts: boolean;
  requireReceiptBeforeInvoice: boolean;
};

const DEFAULT_SETTINGS: POSettings = {
  numberingPrefix: "PO",
  startingNumber: 1000,
  autoApprovalThreshold: 5000,
  defaultPaymentTerms: "Net 30",
  defaultCurrency: "USD",
  requireApprovalForAll: false,
  enableEmailNotifications: true,
  notifyOnApproval: true,
  notifyOnReceipt: true,
  notifyOnInvoice: false,
  defaultTaxRate: 0,
  allowPartialReceipts: true,
  requireReceiptBeforeInvoice: false,
};

export function POSettingsModal({ onClose, onSave }: POSettingsModalProps) {
  const [settings, setSettings] = useState<POSettings>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave?.(settings);
      setSaving(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-bold text-gray-900">
              Purchase Order Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* General Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              General Settings
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PO Number Prefix
                  </label>
                  <input
                    type="text"
                    value={settings.numberingPrefix}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        numberingPrefix: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="PO"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Starting Number
                  </label>
                  <input
                    type="number"
                    value={settings.startingNumber}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        startingNumber: Number.parseInt(e.target.value) || 1000,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Currency
                  </label>
                  <select
                    value={settings.defaultCurrency}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        defaultCurrency: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="NLE">NLE - Sierra Leonean Leone</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Payment Terms
                  </label>
                  <select
                    value={settings.defaultPaymentTerms}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        defaultPaymentTerms: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Net 15">Net 15</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 60">Net 60</option>
                    <option value="Net 90">Net 90</option>
                    <option value="Due on Receipt">Due on Receipt</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.defaultTaxRate}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultTaxRate: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Approval Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Approval Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-Approval Threshold ($)
                </label>
                <input
                  type="number"
                  value={settings.autoApprovalThreshold}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      autoApprovalThreshold:
                        Number.parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  POs below this amount will be auto-approved
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="requireApproval"
                  checked={settings.requireApprovalForAll}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      requireApprovalForAll: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="requireApproval"
                  className="text-sm text-gray-700"
                >
                  Require approval for all purchase orders
                </label>
              </div>
            </div>
          </div>

          {/* Receipt & Invoice Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Receipt & Invoice Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="allowPartialReceipts"
                  checked={settings.allowPartialReceipts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      allowPartialReceipts: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="allowPartialReceipts"
                  className="text-sm text-gray-700"
                >
                  Allow partial receipts for line items
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="requireReceipt"
                  checked={settings.requireReceiptBeforeInvoice}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      requireReceiptBeforeInvoice: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="requireReceipt"
                  className="text-sm text-gray-700"
                >
                  Require goods receipt before creating invoice
                </label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Notification Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="enableNotifications"
                  checked={settings.enableEmailNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      enableEmailNotifications: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="enableNotifications"
                  className="text-sm font-medium text-gray-700"
                >
                  Enable email notifications
                </label>
              </div>

              {settings.enableEmailNotifications && (
                <div className="ml-7 space-y-3 border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="notifyApproval"
                      checked={settings.notifyOnApproval}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifyOnApproval: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="notifyApproval"
                      className="text-sm text-gray-700"
                    >
                      Notify when PO is approved
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="notifyReceipt"
                      checked={settings.notifyOnReceipt}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifyOnReceipt: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="notifyReceipt"
                      className="text-sm text-gray-700"
                    >
                      Notify when goods are received
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="notifyInvoice"
                      checked={settings.notifyOnInvoice}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifyOnInvoice: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="notifyInvoice"
                      className="text-sm text-gray-700"
                    >
                      Notify when invoice is created
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
