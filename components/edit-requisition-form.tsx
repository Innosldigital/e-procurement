"use client";

import { useEffect, useState, useTransition } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateRequisition } from "@/lib/actions/requisition-actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface EditRequisitionFormProps {
  requisition: any;
  onClose: () => void;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
}

export function EditRequisitionForm({
  requisition,
  onClose,
}: EditRequisitionFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [requesterName, setRequesterName] = useState("");
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [neededBy, setNeededBy] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (requisition) {
      setRequesterName(requisition.requester || "");
      setBranch(requisition.branch || "");
      setCategory(requisition.category || "");
      setPriority(requisition.priority || "medium");
      setNeededBy(
        requisition.neededBy
          ? new Date(requisition.neededBy).toISOString().split("T")[0]
          : ""
      );
      setDescription(requisition.description || "");

      // Parse line items
      const items = requisition.lineItems || [];
      setLineItems(
        items.length > 0
          ? items.map((item: any, index: number) => ({
              id: item.id || index.toString(),
              description: item.description || "",
              quantity: item.quantity || 1,
              unit: item.unit || "Unit",
            }))
          : [{ id: "1", description: "", quantity: 1, unit: "Unit" }]
      );
    }
  }, [requisition]);

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unit: "Unit",
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.set("requisitionId", requisition.requisitionId);
    formData.set("requester", requesterName);
    formData.set("branch", branch);
    formData.set("category", category);
    formData.set("priority", priority);
    formData.set("neededBy", neededBy);
    formData.set("description", description);
    formData.set(
      "lineItems",
      JSON.stringify(
        lineItems.map((i) => ({
          description: i.description,
          quantity: i.quantity,
          unit: i.unit,
        }))
      )
    );

    startTransition(async () => {
      const result = await updateRequisition(
        requisition.requisitionId,
        formData
      );

      if (result.success) {
        toast({
          title: "Success",
          description: "Requisition updated successfully",
        });
        router.refresh();
        onClose();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update requisition",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">
              Edit Requisition
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Update requisition details
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requester">Requester Name *</Label>
                  <Input
                    id="requester"
                    required
                    placeholder="Enter requester name"
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch *</Label>
                  <Select value={branch} onValueChange={setBranch} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Global HQ">InnoSL HQ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Facility">Facility</SelectItem>
                      <SelectItem value="Catering services">
                        Catering services
                      </SelectItem>
                      <SelectItem value="Logistics">Logistics</SelectItem>
                      <SelectItem value="Merchandise and Stationery">
                        Merchandise and Stationery
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select value={priority} onValueChange={setPriority} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neededBy">Needed By Date *</Label>
                  <Input
                    id="neededBy"
                    type="date"
                    required
                    value={neededBy}
                    onChange={(e) => setNeededBy(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide additional context or justification for this requisition"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Line Items</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLineItem}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row gap-3 items-start p-3 md:p-4 border rounded-lg"
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
                      <div className="col-span-1 sm:col-span-2 lg:col-span-5 space-y-2">
                        <Label className="text-xs">Description</Label>
                        <Input
                          placeholder="Item description"
                          value={item.description}
                          onChange={(e) =>
                            updateLineItem(
                              item.id,
                              "description",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateLineItem(
                              item.id,
                              "quantity",
                              Number(e.target.value)
                            )
                          }
                          required
                        />
                      </div>
                    </div>

                    {lineItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLineItem(item.id)}
                        className="md:mt-7"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 p-4 md:p-6 border-t bg-muted/50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? "Updating..." : "Update Requisition"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
