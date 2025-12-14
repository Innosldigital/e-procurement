"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  X,
  Upload,
  Save,
  ArrowLeft,
  FileText,
  Users,
  TrendingUp,
  Shield,
  DollarSign,
} from "lucide-react";

interface SupplierEditFormProps {
  supplierId: string;
}

export function SupplierEditForm({ supplierId }: SupplierEditFormProps) {
  const [contacts, setContacts] = useState([
    { role: "Primary Contact", name: "", email: "", phone: "" },
  ]);

  const [documents, setDocuments] = useState<
    Array<{
      name: string;
      type: string;
      size: string;
      signedDate: string;
      expiresDate: string;
      owner: string;
    }>
  >([]);

  const addContact = () => {
    setContacts([...contacts, { role: "", name: "", email: "", phone: "" }]);
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Edit Supplier
                </h1>
                <p className="text-sm text-muted-foreground">
                  ID: {supplierId}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">Cancel</Button>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="basic" className="gap-2">
              <FileText className="h-4 w-4" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="gap-2">
              <Users className="h-4 w-4" />
              Onboarding
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="compliance" className="gap-2">
              <Shield className="h-4 w-4" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="commercial" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Commercial
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Information</CardTitle>
                <CardDescription>
                  Core details about the supplier
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="supplierId">Supplier ID</Label>
                    <Input id="supplierId" defaultValue={supplierId} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Supplier Name</Label>
                    <Input id="name" placeholder="Enter supplier name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="segment">Segment</Label>
                    <Select>
                      <SelectTrigger id="segment">
                        <SelectValue placeholder="Select segment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="distribution">
                          Distribution
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tier1">Tier 1</SelectItem>
                        <SelectItem value="tier2">Tier 2</SelectItem>
                        <SelectItem value="tier3">Tier 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input id="region" placeholder="Enter region" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryCategory">Primary Category</Label>
                    <Input
                      id="primaryCategory"
                      placeholder="Enter primary category"
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="approved">Approved Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable if supplier is approved
                    </p>
                  </div>
                  <Switch id="approved" />
                </div>
              </CardContent>
            </Card>

            {/* Contacts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Contacts</CardTitle>
                    <CardDescription>
                      Manage supplier contact persons
                    </CardDescription>
                  </div>
                  <Button onClick={addContact} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Contact
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {contacts.map((contact, index) => (
                  <Card key={index} className="border-muted">
                    <CardContent className="pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`role-${index}`}>Role</Label>
                          <Input
                            id={`role-${index}`}
                            placeholder="e.g. Primary Contact"
                            defaultValue={contact.role}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`name-${index}`}>Name</Label>
                          <Input
                            id={`name-${index}`}
                            placeholder="Contact name"
                            defaultValue={contact.name}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`email-${index}`}>Email</Label>
                          <Input
                            id={`email-${index}`}
                            type="email"
                            placeholder="email@example.com"
                            defaultValue={contact.email}
                          />
                        </div>
                        <div className="space-y-2 relative">
                          <Label htmlFor={`phone-${index}`}>Phone</Label>
                          <div className="flex gap-2">
                            <Input
                              id={`phone-${index}`}
                              placeholder="+1 (555) 000-0000"
                              defaultValue={contact.phone}
                            />
                            {contacts.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeContact(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onboarding Tab */}
          <TabsContent value="onboarding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact & Business Information</CardTitle>
                <CardDescription>
                  Onboarding details and business setup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input id="contactPerson" placeholder="Full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@supplier.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goodsType">Goods Type</Label>
                    <Input
                      id="goodsType"
                      placeholder="Type of goods supplied"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryTimeline">Delivery Timeline</Label>
                    <Input id="deliveryTimeline" placeholder="e.g. 7-14 days" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessLeadGender">
                      Business Lead Gender
                    </Label>
                    <Select>
                      <SelectTrigger id="businessLeadGender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfIncorporation">
                      Date of Incorporation
                    </Label>
                    <Input id="dateOfIncorporation" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="averageTurnover">Average Turnover</Label>
                    <Input id="averageTurnover" placeholder="$1,000,000" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inBusinessMoreThan3Years">
                        In Business More Than 3 Years
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Indicates business maturity
                      </p>
                    </div>
                    <Switch id="inBusinessMoreThan3Years" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product & Supply Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Categories</Label>
                  <div className="flex flex-wrap gap-2 p-3 border border-input rounded-md">
                    <Badge variant="secondary">Electronics</Badge>
                    <Badge variant="secondary">Hardware</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 gap-1 bg-transparent"
                    >
                      <Plus className="h-3 w-3" />
                      Add
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Supply Areas</Label>
                  <div className="flex flex-wrap gap-2 p-3 border border-input rounded-md">
                    <Badge variant="secondary">North America</Badge>
                    <Badge variant="secondary">Europe</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 gap-1 bg-transparent"
                    >
                      <Plus className="h-3 w-3" />
                      Add
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Payment Methods</Label>
                  <div className="flex flex-wrap gap-2 p-3 border border-input rounded-md">
                    <Badge variant="secondary">Wire Transfer</Badge>
                    <Badge variant="secondary">Credit Card</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 gap-1 bg-transparent"
                    >
                      <Plus className="h-3 w-3" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" placeholder="Bank name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input id="accountName" placeholder="Account holder name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input id="accountNumber" placeholder="Account number" />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Switch id="prefersCash" />
                      <Label htmlFor="prefersCash" className="font-normal">
                        Prefers Cash
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendorPaymentTerms">
                    Vendor Payment Terms
                  </Label>
                  <Textarea
                    id="vendorPaymentTerms"
                    placeholder="Describe payment terms..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Uploads</CardTitle>
                <CardDescription>
                  Upload required certificates and documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Price List",
                  "Registration Certificate",
                  "Business Registration Certificate",
                  "Tax Clearance Certificate",
                  "GST/VAT Registration Certificate",
                  "Business License",
                  "NASSIT Certificate",
                  "Sector Specific Certificate",
                  "Business Duration Documents",
                ].map((docType) => (
                  <div
                    key={docType}
                    className="flex items-center justify-between p-4 border border-border rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{docType}</p>
                        <p className="text-xs text-muted-foreground">
                          No file uploaded
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                    >
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Declarations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="infoAccurate">
                      Information is Accurate
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Supplier confirms information accuracy
                    </p>
                  </div>
                  <Switch id="infoAccurate" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="agreeRules">Agrees to Rules</Label>
                    <p className="text-sm text-muted-foreground">
                      Supplier agrees to terms and conditions
                    </p>
                  </div>
                  <Switch id="agreeRules" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Track supplier performance and reliability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="onTimePerformance">
                      On-Time Performance (%)
                    </Label>
                    <Input
                      id="onTimePerformance"
                      type="number"
                      placeholder="0-100"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="performanceScore">Performance Score</Label>
                    <Input
                      id="performanceScore"
                      type="number"
                      placeholder="0-100"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fy24Spend">FY24 Spend ($)</Label>
                    <Input id="fy24Spend" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalSpend">Total Spend ($)</Label>
                    <Input id="totalSpend" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="riskStatus">Risk Status</Label>
                    <Input id="riskStatus" placeholder="e.g. Active" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="riskRating">Risk Rating</Label>
                    <Select>
                      <SelectTrigger id="riskRating">
                        <SelectValue placeholder="Select risk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Under review">
                          Under Review
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="onTime">On Time Deliveries</Label>
                    <Input id="onTime" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avgLeadTime">Avg Lead Time (days)</Label>
                    <Input id="avgLeadTime" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lateDeliveries">Late Deliveries</Label>
                    <Input id="lateDeliveries" type="number" placeholder="0" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="returnRate">Return Rate (%)</Label>
                    <Input
                      id="returnRate"
                      type="number"
                      placeholder="0-100"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualityIncidents">Quality Incidents</Label>
                    <Input
                      id="qualityIncidents"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="criticalEvents">Critical Events</Label>
                    <Input id="criticalEvents" type="number" placeholder="0" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="externalRating">External Rating</Label>
                    <Input id="externalRating" placeholder="e.g. AAA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creditLimit">Credit Limit ($)</Label>
                    <Input id="creditLimit" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentAge">Payment Age (days)</Label>
                    <Input id="paymentAge" type="number" placeholder="0" />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Switch id="overdueInvoices" />
                      <Label htmlFor="overdueInvoices" className="font-normal">
                        Has Overdue Invoices
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>
                  Track regulatory and compliance requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="kyc">KYC Status</Label>
                    <Select>
                      <SelectTrigger id="kyc">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aml">AML Status</Label>
                    <Select>
                      <SelectTrigger id="aml">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sanctions">Sanctions Status</Label>
                    <Select>
                      <SelectTrigger id="sanctions">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Clear">Clear</SelectItem>
                        <SelectItem value="Under Review">
                          Under Review
                        </SelectItem>
                        <SelectItem value="Flagged">Flagged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Switch id="insuranceCerts" />
                      <Label htmlFor="insuranceCerts" className="font-normal">
                        Insurance Certificates Valid
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commercial Tab */}
          <TabsContent value="commercial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Commercial Terms</CardTitle>
                <CardDescription>
                  Define payment and business terms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select>
                      <SelectTrigger id="paymentTerms">
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net30">Net 30</SelectItem>
                        <SelectItem value="net60">Net 60</SelectItem>
                        <SelectItem value="net90">Net 90</SelectItem>
                        <SelectItem value="immediate">Immediate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diversityStatus">Diversity Status</Label>
                    <Select>
                      <SelectTrigger id="diversityStatus">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="women-owned">Women-Owned</SelectItem>
                        <SelectItem value="minority-owned">
                          Minority-Owned
                        </SelectItem>
                        <SelectItem value="veteran-owned">
                          Veteran-Owned
                        </SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  Manage supplier documents and contracts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border border-border">
                  <div className="p-4 bg-muted/30 border-b border-border">
                    <div className="grid grid-cols-6 gap-4 text-sm font-medium">
                      <div className="col-span-2">Name</div>
                      <div>Type</div>
                      <div>Signed Date</div>
                      <div>Expires</div>
                      <div>Owner</div>
                    </div>
                  </div>
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    No documents added yet
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full gap-2 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                  Add Document
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Track changes and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="font-medium">
                        Supplier information updated
                      </p>
                      <p className="text-muted-foreground">
                        2 hours ago • John Smith
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-muted mt-2" />
                    <div className="flex-1">
                      <p className="font-medium">Document uploaded</p>
                      <p className="text-muted-foreground">
                        1 day ago • Sarah Johnson
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-muted mt-2" />
                    <div className="flex-1">
                      <p className="font-medium">Compliance check completed</p>
                      <p className="text-muted-foreground">
                        3 days ago • System
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
