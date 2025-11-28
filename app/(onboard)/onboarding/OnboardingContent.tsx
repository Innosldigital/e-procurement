"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/status-badge"
import { submitCompanyOnboarding, submitSupplierOnboarding } from "@/lib/actions/onboarding-actions"
import { useRouter } from "next/navigation"
import { Building2, Package, Upload, CheckCircle2 } from "lucide-react"

export default function OnboardingContent() {
  const [role, setRole] = useState<"company" | "supplier" | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const [companyName, setCompanyName] = useState("")
  const [industry, setIndustry] = useState("")
  const [size, setSize] = useState("")
  const [organizationType, setOrganizationType] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [companyOfficialEmail, setCompanyOfficialEmail] = useState("")
  const [companyPhone, setCompanyPhone] = useState("")
  const [website, setWebsite] = useState("")
  const [primaryContactName, setPrimaryContactName] = useState("")
  const [businessDescription, setBusinessDescription] = useState("")
  const [hasBranches, setHasBranches] = useState(false)
  const [numberOfBranches, setNumberOfBranches] = useState<number>(0)
  const [branchLocations, setBranchLocations] = useState("")
  const [projectLead, setProjectLead] = useState("")
  const [trainingOfficer, setTrainingOfficer] = useState("")
  const [registrationUploads, setRegistrationUploads] = useState<FileList | null>(null)
  const [logoUploads, setLogoUploads] = useState<FileList | null>(null)
  const [declCompanyInfoAccurate, setDeclCompanyInfoAccurate] = useState(false)
  const [declCompanyAgree, setDeclCompanyAgree] = useState(false)

  const [supplierName, setSupplierName] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [productCategories, setProductCategories] = useState<string[]>([])
  const [supplyAreasText, setSupplyAreasText] = useState("")
  const [deliveryTimeline, setDeliveryTimeline] = useState<string>("")
  const [businessRegCertFiles, setBusinessRegCertFiles] = useState<FileList | null>(null)
  const [taxClearanceFiles, setTaxClearanceFiles] = useState<FileList | null>(null)
  const [gstVatFiles, setGstVatFiles] = useState<FileList | null>(null)
  const [businessLicenseFiles, setBusinessLicenseFiles] = useState<FileList | null>(null)
  const [nassitFiles, setNassitFiles] = useState<FileList | null>(null)
  const [sectorCertFiles, setSectorCertFiles] = useState<FileList | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<string[]>([])
  const [prefersCash, setPrefersCash] = useState(false)
  const [declInfoAccurate, setDeclInfoAccurate] = useState(false)
  const [declAgreeRules, setDeclAgreeRules] = useState(false)

  const submitCompany = async () => {
    setLoading("company")
    const regUploads = registrationUploads
      ? Array.from(registrationUploads).map((f) => ({ name: f.name, size: f.size, type: f.type }))
      : []
    const logos = logoUploads ? Array.from(logoUploads).map((f) => ({ name: f.name, size: f.size, type: f.type })) : []
    const res = await submitCompanyOnboarding({
      companyName,
      industry,
      size,
      organizationType,
      address: businessAddress,
      officialEmail: companyOfficialEmail,
      companyPhone,
      website,
      contactPersonName: primaryContactName,
      businessDescription,
      hasBranches,
      numberOfBranches,
      branchLocations,
      projectLead,
      trainingOfficer,
      registrationUploads: regUploads,
      logoUploads: logos,
      declarationInfoAccurate: declCompanyInfoAccurate,
      declarationAgreeOnboarding: declCompanyAgree,
    })
    setLoading(null)
    if (res && (res as any).success) router.push("/onboarding/submitted?type=company")
  }

  const submitSupplier = async () => {
    setLoading("supplier")
    const businessRegistrationCertificateUploads = businessRegCertFiles
      ? Array.from(businessRegCertFiles).map((f) => ({ name: f.name, size: f.size, type: f.type }))
      : []
    const taxClearanceCertificateUploads = taxClearanceFiles
      ? Array.from(taxClearanceFiles).map((f) => ({ name: f.name, size: f.size, type: f.type }))
      : []
    const gstVatRegistrationCertificateUploads = gstVatFiles
      ? Array.from(gstVatFiles).map((f) => ({ name: f.name, size: f.size, type: f.type }))
      : []
    const businessLicenseUploads = businessLicenseFiles
      ? Array.from(businessLicenseFiles).map((f) => ({ name: f.name, size: f.size, type: f.type }))
      : []
    const nassitCertificateUploads = nassitFiles
      ? Array.from(nassitFiles).map((f) => ({ name: f.name, size: f.size, type: f.type }))
      : []
    const sectorSpecificCertificateUploads = sectorCertFiles
      ? Array.from(sectorCertFiles).map((f) => ({ name: f.name, size: f.size, type: f.type }))
      : []
    const registrationCertificateUploads = [
      businessRegCertFiles,
      taxClearanceFiles,
      gstVatFiles,
      businessLicenseFiles,
      nassitFiles,
      sectorCertFiles,
    ].flatMap((list) => (list ? Array.from(list).map((f) => ({ name: f.name, size: f.size, type: f.type })) : []))
    const supplyAreas = supplyAreasText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
    const res = await submitSupplierOnboarding({
      name: supplierName,
      contactPerson,
      phone,
      email,
      productCategories,
      supplyAreas,
      deliveryTimeline,
      registrationCertificateUploads,
      businessRegistrationCertificateUploads,
      taxClearanceCertificateUploads,
      gstVatRegistrationCertificateUploads,
      businessLicenseUploads,
      nassitCertificateUploads,
      sectorSpecificCertificateUploads,
      paymentMethods,
      bankDetails: { prefersCash },
      declarations: { infoAccurate: declInfoAccurate, agreeRules: declAgreeRules },
    })
    setLoading(null)
    if (res && (res as any).success) router.push("/onboarding/submitted?type=supplier")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 via-background to-muted/20 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        <Card className="shadow-lg border-border/50">
         
<CardHeader>
<div className="flex items-center justify-between">
             
<div>                
<CardTitle className ="text-base">
Welcome </CardTitle>
                
<CardDescription className="text-xs">
Select your role and complete onboarding. </CardDescription>

</div>

<StatusBadge status={role?role:"Select role"}/>
</div>         
</CardHeader>
         
<CardContent> {!role ? ( <div className ="grid grid-cols-1 sm:grid-cols-2 gap-3">
               
<Button variant="outline"onClick={()=>setRole("company")}>I am a company</Button>

<Button variant ="outline" onClick ={()=>setRole("supplier")}>I am a supplier</Button>
</div>

            
): role === "company" ? (
              <div className="space-y-8">
                {/* Company Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Company Information</h3>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Acme Corporation"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyLogo">Company Logo</Label>
                      <div className="flex items-center gap-3 p-4 border border-dashed border-border rounded-lg hover:border-primary/50 transition-colors">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <Input
                          id="companyLogo"
                          type="file"
                          multiple
                          accept="image/*,.pdf,.svg,.png,.jpg"
                          onChange={(e) => setLogoUploads(e.target.files)}
                          className="border-0 p-0 h-auto file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Accepted formats: PNG, JPG, SVG, PDF</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizationType">Type of Organization *</Label>
                      <Select value={organizationType} onValueChange={setOrganizationType}>
                        <SelectTrigger id="organizationType">
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sole Proprietor">Sole Proprietor</SelectItem>
                          <SelectItem value="Limited Company">Limited Company</SelectItem>
                          <SelectItem value="NGO">NGO</SelectItem>
                           <SelectItem value="ESO">ESO</SelectItem>
                          <SelectItem value="Government">Government</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessAddress">Business Address *</Label>
                      <Textarea
                        id="businessAddress"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                        placeholder="Enter complete business address"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyEmail">Official Email Address *</Label>
                        <Input
                          id="companyEmail"
                          type="email"
                          value={companyOfficialEmail}
                          onChange={(e) => setCompanyOfficialEmail(e.target.value)}
                          placeholder="info@company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyPhone">Company Phone / WhatsApp *</Label>
                        <Input
                          id="companyPhone"
                          type="tel"
                          value={companyPhone}
                          onChange={(e) => setCompanyPhone(e.target.value)}
                          placeholder="+232 76 123 456"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Official Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://www.yourcompany.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry *</Label>
                        <Select value={industry} onValueChange={setIndustry}>
                          <SelectTrigger id="industry">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Construction">Construction</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Hospitality">Hospitality</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="size">Company Size *</Label>
                        <Select value={size} onValueChange={setSize}>
                          <SelectTrigger id="size">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="500+">500+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="primaryContact">Primary Contact Person *</Label>
                      <Input
                        id="primaryContact"
                        value={primaryContactName}
                        onChange={(e) => setPrimaryContactName(e.target.value)}
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessDescription">Company Description *</Label>
                      <Textarea
                        id="businessDescription"
                        value={businessDescription}
                        onChange={(e) => setBusinessDescription(e.target.value)}
                        placeholder="Briefly describe what your company does..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Company Documents</h3>
                  </div>
                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="companyDocs">Upload Registration & Legal Documents</Label>
                    <div className="flex items-center gap-3 p-4 border border-dashed border-border rounded-lg hover:border-primary/50 transition-colors">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <Input
                        id="companyDocs"
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={(e) => setRegistrationUploads(e.target.files)}
                        className="border-0 p-0 h-auto file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upload business registration, certificates, licenses, etc.
                    </p>
                  </div>
                </div>

                {/* Branch Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Branch Information</h3>
                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border bg-muted/30">
                      <Checkbox
                        id="hasBranches"
                        checked={hasBranches}
                        onCheckedChange={(checked) => setHasBranches(checked as boolean)}
                      />
                      <Label htmlFor="hasBranches" className="text-sm font-medium cursor-pointer">
                        Our company has multiple branches
                      </Label>
                    </div>

                    {hasBranches && (
                      <div className="space-y-4 pl-4 border-l-2 border-primary/30">
                        <div className="space-y-2">
                          <Label htmlFor="numberOfBranches">Number of Branches *</Label>
                          <Input
                            id="numberOfBranches"
                            type="number"
                            min="0"
                            value={numberOfBranches}
                            onChange={(e) => setNumberOfBranches(Number(e.target.value))}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="branchLocations">Branch Locations *</Label>
                          <Textarea
                            id="branchLocations"
                            value={branchLocations}
                            onChange={(e) => setBranchLocations(e.target.value)}
                            placeholder="Enter branch locations separated by commas (e.g., Freetown, Bo, Kenema)"
                            rows={3}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Team Members Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Team Members</h3>
                  <Separator />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectLead">Project Lead</Label>
                      <Input
                        id="projectLead"
                        value={projectLead}
                        onChange={(e) => setProjectLead(e.target.value)}
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trainingOfficer">Training Officer / Supervisor</Label>
                      <Input
                        id="trainingOfficer"
                        value={trainingOfficer}
                        onChange={(e) => setTrainingOfficer(e.target.value)}
                        placeholder="Sarah Johnson"
                      />
                    </div>
                  </div>
                </div>

                {/* Declaration Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Declaration & Agreement</h3>
                  </div>
                  <Separator />

                  <div className="space-y-4 p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="declCompanyInfoAccurate"
                        checked={declCompanyInfoAccurate}
                        onCheckedChange={(checked) => setDeclCompanyInfoAccurate(checked as boolean)}
                      />
                      <Label
                        htmlFor="declCompanyInfoAccurate"
                        className="text-sm font-normal cursor-pointer leading-relaxed"
                      >
                        I confirm that all information provided is accurate and complete to the best of my knowledge.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="declCompanyAgree"
                        checked={declCompanyAgree}
                        onCheckedChange={(checked) => setDeclCompanyAgree(checked as boolean)}
                      />
                      <Label htmlFor="declCompanyAgree" className="text-sm font-normal cursor-pointer leading-relaxed">
                        I agree to onboard my company onto the e-Procurement platform and abide by all terms and
                        conditions.
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setRole(null)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={submitCompany}
                    className="flex-1"
                    disabled={!companyName || !declCompanyInfoAccurate || !declCompanyAgree || loading !== null}
                  >
                    {loading === "company" ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Supplier Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Supplier Information</h3>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="supplierName">Supplier Name *</Label>
                      <Input
                        id="supplierName"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        placeholder="Northwind Trading Co."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person Name *</Label>
                        <Input
                          id="contactPerson"
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone / WhatsApp *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+232 76 123 456"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="supplier@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Products & Services Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Products & Services</h3>
                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>Product / Service Categories *</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg border border-border bg-muted/30">
                        {[
                          "Food",
                          "Beverages",
                          "Cleaning",
                          "IT Equipment",
                          "Stationeries",
                          "Transport / Delivery",
                          "Telecom",
                        ].map((cat) => (
                          <div key={cat} className="flex items-center space-x-2">
                            <Checkbox
                              id={`cat-${cat}`}
                              checked={productCategories.includes(cat)}
                              onCheckedChange={(checked) => {
                                setProductCategories((prev) =>
                                  checked ? [...prev, cat] : prev.filter((c) => c !== cat),
                                )
                              }}
                            />
                            <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer">
                              {cat}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supplyAreas">Areas You Can Supply / Deliver To *</Label>
                      <Textarea
                        id="supplyAreas"
                        value={supplyAreasText}
                        onChange={(e) => setSupplyAreasText(e.target.value)}
                        placeholder="Enter delivery areas separated by commas (e.g., Freetown, Western Area, Bo)"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Delivery Timeline *</Label>
                      <RadioGroup value={deliveryTimeline} onValueChange={setDeliveryTimeline}>
                        <div className="space-y-2 p-4 rounded-lg border border-border bg-muted/30">
                          {["Same day", "24 hours", "2-3 days"].map((opt) => (
                            <div key={opt} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt} id={`delivery-${opt}`} />
                              <Label htmlFor={`delivery-${opt}`} className="text-sm font-normal cursor-pointer">
                                {opt}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Required Documents</h3>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    {[
                      {
                        label: "Business Registration Certificate",
                        state: businessRegCertFiles,
                        setter: setBusinessRegCertFiles,
                        id: "businessReg",
                      },
                      {
                        label: "Tax Clearance Certificate",
                        state: taxClearanceFiles,
                        setter: setTaxClearanceFiles,
                        id: "taxClearance",
                      },
                      {
                        label: "GST/VAT Registration Certificate",
                        state: gstVatFiles,
                        setter: setGstVatFiles,
                        id: "gstVat",
                      },
                      {
                        label: "Valid Business License",
                        state: businessLicenseFiles,
                        setter: setBusinessLicenseFiles,
                        id: "businessLicense",
                      },
                      { label: "NASSIT Certificate", state: nassitFiles, setter: setNassitFiles, id: "nassit" },
                      {
                        label: "Sector-Specific Certifications (ISO, Food Handling, Safety, etc.)",
                        state: sectorCertFiles,
                        setter: setSectorCertFiles,
                        id: "sectorCert",
                      },
                    ].map((doc) => (
                      <div key={doc.id} className="space-y-2">
                        <Label htmlFor={doc.id}>{doc.label}</Label>
                        <div className="flex items-center gap-3 p-3 border border-dashed border-border rounded-lg hover:border-primary/50 transition-colors">
                          <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <Input
                            id={doc.id}
                            type="file"
                            multiple
                            accept="image/*,.pdf"
                            onChange={(e) => doc.setter(e.target.files)}
                            className="border-0 p-0 h-auto text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Information</h3>
                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>Accepted Payment Methods *</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg border border-border bg-muted/30">
                        {["Card", "Mobile Money", "Bank"].map((method) => (
                          <div key={method} className="flex items-center space-x-2">
                            <Checkbox
                              id={`payment-${method}`}
                              checked={paymentMethods.includes(method)}
                              onCheckedChange={(checked) => {
                                setPaymentMethods((prev) =>
                                  checked ? [...prev, method] : prev.filter((m) => m !== method),
                                )
                              }}
                            />
                            <Label htmlFor={`payment-${method}`} className="text-sm font-normal cursor-pointer">
                              {method}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border bg-muted/30">
                      <Checkbox
                        id="prefersCash"
                        checked={prefersCash}
                        onCheckedChange={(checked) => setPrefersCash(checked as boolean)}
                      />
                      <Label htmlFor="prefersCash" className="text-sm font-medium cursor-pointer">
                        Vendor prefers cash payments
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Declaration Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Declaration & Agreement</h3>
                  </div>
                  <Separator />

                  <div className="space-y-4 p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="declInfoAccurate"
                        checked={declInfoAccurate}
                        onCheckedChange={(checked) => setDeclInfoAccurate(checked as boolean)}
                      />
                      <Label htmlFor="declInfoAccurate" className="text-sm font-normal cursor-pointer leading-relaxed">
                        I confirm that all information provided is accurate and complete to the best of my knowledge.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="declAgreeRules"
                        checked={declAgreeRules}
                        onCheckedChange={(checked) => setDeclAgreeRules(checked as boolean)}
                      />
                      <Label htmlFor="declAgreeRules" className="text-sm font-normal cursor-pointer leading-relaxed">
                        I agree to follow all procurement and delivery rules and regulations of the platform.
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setRole(null)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={submitSupplier}
                    className="flex-1"
                    disabled={!supplierName || !declInfoAccurate || !declAgreeRules || loading !== null}
                  >
                    {loading === "supplier" ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
