"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/status-badge";
import { submitSupplierOnboarding } from "@/lib/actions/onboarding-actions";
import { useRouter } from "next/navigation";
import { Package, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEdgeStore } from "@/lib/edgestore";

export default function OnboardingContent() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const [supplierName, setSupplierName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [supplyAreas, setSupplyAreas] = useState<string[]>([]);
  const [leadTime, setLeadTime] = useState<string>("");
  const [businessRegCertFiles, setBusinessRegCertFiles] =
    useState<FileList | null>(null);
  const [taxClearanceFiles, setTaxClearanceFiles] = useState<FileList | null>(
    null
  );
  const [gstVatFiles, setGstVatFiles] = useState<FileList | null>(null);
  const [businessLicenseFiles, setBusinessLicenseFiles] =
    useState<FileList | null>(null);
  const [nassitFiles, setNassitFiles] = useState<FileList | null>(null);
  const [sectorCertFiles, setSectorCertFiles] = useState<FileList | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [vendorPaymentTerms, setVendorPaymentTerms] = useState("");
  const [declVendorUpfront20, setDeclVendorUpfront20] = useState(false);
  const [businessLeadGender, setBusinessLeadGender] = useState("");
  const [inBusinessMoreThan3Years, setInBusinessMoreThan3Years] =
    useState(false);
  const [businessDurationFiles, setBusinessDurationFiles] =
    useState<FileList | null>(null);
  const [dateOfIncorporation, setDateOfIncorporation] = useState("");
  const [averageTurnover, setAverageTurnover] = useState("");
  const [declInfoAccurate, setDeclInfoAccurate] = useState(false);
  const [declAgreeRules, setDeclAgreeRules] = useState(false);
  const { edgestore } = useEdgeStore();
  // Validation function
  const validateForm = () => {
    const errors: string[] = [];

    // Only validate truly essential fields
    if (!supplierName.trim()) errors.push("Vendor Name");
    if (!contactPerson.trim()) errors.push("Contact Person Name");
    if (!email.trim()) errors.push("Email Address");
    if (!declInfoAccurate) errors.push("Information Accuracy Declaration");
    if (!declAgreeRules) errors.push("Rules Agreement Declaration");

    return errors;
  };

  const isFormValid = () => {
    return validateForm().length === 0;
  };

  // const submitSupplier = async () => {
  //   try {
  //     setError("");

  //     // Validate before submission
  //     const validationErrors = validateForm();
  //     if (validationErrors.length > 0) {
  //       setError(
  //         `Please complete the following required fields: ${validationErrors.join(
  //           ", "
  //         )}`
  //       );
  //       return;
  //     }

  //     setLoading("vendor");

  //     async function uploadFiles(list: FileList | null, folder: string) {
  //       if (!list || list.length === 0) return [];
  //       const fd = new FormData();
  //       Array.from(list).forEach((f) => fd.append("files", f));
  //       fd.append("folder", folder);
  //       const resp = await fetch("/api/upload", { method: "POST", body: fd });
  //       const json = await resp.json();
  //       // Return the actual array, not stringified
  //       return json && json.success ? json.data : [];
  //     }

  //     const businessRegistrationCertificateUploads = await uploadFiles(
  //       businessRegCertFiles,
  //       "onboarding/business_registration"
  //     );
  //     const taxClearanceCertificateUploads = await uploadFiles(
  //       taxClearanceFiles,
  //       "onboarding/tax_clearance"
  //     );
  //     const gstVatRegistrationCertificateUploads = await uploadFiles(
  //       gstVatFiles,
  //       "onboarding/gst_vat"
  //     );
  //     const businessLicenseUploads = await uploadFiles(
  //       businessLicenseFiles,
  //       "onboarding/business_license"
  //     );
  //     const nassitCertificateUploads = await uploadFiles(
  //       nassitFiles,
  //       "onboarding/nassit"
  //     );
  //     const sectorSpecificCertificateUploads = await uploadFiles(
  //       sectorCertFiles,
  //       "onboarding/sector_specific"
  //     );
  //     const businessDurationDocuments = await uploadFiles(
  //       businessDurationFiles,
  //       "onboarding/business_duration"
  //     );

  //     const registrationCertificateUploads = [
  //       ...businessRegistrationCertificateUploads,
  //       ...taxClearanceCertificateUploads,
  //       ...gstVatRegistrationCertificateUploads,
  //       ...businessLicenseUploads,
  //       ...nassitCertificateUploads,
  //       ...sectorSpecificCertificateUploads,
  //     ];

  //     // Pass actual arrays, not stringified versions
  //     const res = await submitSupplierOnboarding({
  //       name: supplierName,
  //       contactPerson,
  //       phone,
  //       email,
  //       productCategories,
  //       supplyAreas,
  //       deliveryTimeline: leadTime,
  //       registrationCertificateUploads,
  //       businessRegistrationCertificateUploads,
  //       taxClearanceCertificateUploads,
  //       gstVatRegistrationCertificateUploads,
  //       businessLicenseUploads,
  //       nassitCertificateUploads,
  //       sectorSpecificCertificateUploads,
  //       paymentMethods,
  //       vendorPaymentTerms,
  //       businessLeadGender,
  //       inBusinessMoreThan3Years,
  //       businessDurationDocuments,
  //       dateOfIncorporation,
  //       averageTurnover,
  //       declarations: {
  //         infoAccurate: declInfoAccurate,
  //         agreeRules: declAgreeRules,
  //       },
  //     });

  //     setLoading(null);
  //     if (res && (res as any).success) {
  //       const id = (res as any).data?._id || (res as any).data?.id;
  //       if (id) {
  //         router.push(`/onboarding/supplier/${id}`);
  //       } else {
  //         router.push("/onboarding/support");
  //       }
  //     } else {
  //       setError("Submission failed. Please try again or contact support.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setError("An error occurred during submission. Please try again.");
  //   } finally {
  //     setLoading(null);
  //   }
  // };
  const submitSupplier = async () => {
    try {
      setError("");

      // Validate before submission
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        setError(
          `Please complete the following required fields: ${validationErrors.join(
            ", "
          )}`
        );
        return; // This was already here but make sure it actually stops execution
      }

      setLoading("vendor");

      async function uploadFiles(list: FileList | null, folder: string) {
        if (!list || list.length === 0) return [];
        const fd = new FormData();
        Array.from(list).forEach((f) => fd.append("files", f));
        fd.append("folder", folder);
        const resp = await fetch("/api/upload", { method: "POST", body: fd });
        if (!resp.ok) {
          throw new Error(`Upload failed: ${resp.statusText}`);
        }
        const json = await resp.json();
        return json && json.success ? json.data : [];
      }

      async function uploadFilesWithEdgeStore(list: FileList | null) {
        if (!list || list.length === 0) return [];

        const uploads = [];

        for (const file of Array.from(list)) {
          const res = await edgestore.publicFiles.upload({
            file,
            onProgressChange: (progress) => {
              console.log(`${file.name}: ${progress}%`);
            },
          });

          uploads.push({
            url: res.url,
            size: file.size,
            type: file.type,
            name: file.name,
          });
        }

        return uploads;
      }

      const businessRegistrationCertificateUploads =
        await uploadFilesWithEdgeStore(businessRegCertFiles);

      const taxClearanceCertificateUploads = await uploadFilesWithEdgeStore(
        taxClearanceFiles
      );
      const gstVatRegistrationCertificateUploads =
        await uploadFilesWithEdgeStore(gstVatFiles);

      const businessLicenseUploads = await uploadFilesWithEdgeStore(
        businessLicenseFiles
      );

      const nassitCertificateUploads = await uploadFilesWithEdgeStore(
        nassitFiles
      );

      const sectorSpecificCertificateUploads = await uploadFilesWithEdgeStore(
        sectorCertFiles
      );
      const businessDurationDocumentsUploads = await uploadFilesWithEdgeStore(
        businessDurationFiles
      );

      // const businessRegistrationCertificateUploads = await uploadFiles(
      //   businessRegCertFiles,
      //   "onboarding/business_registration"
      // );
      // const taxClearanceCertificateUploads = await uploadFiles(
      //   taxClearanceFiles,
      //   "onboarding/tax_clearance"
      // );
      // const gstVatRegistrationCertificateUploads = await uploadFiles(
      //   gstVatFiles,
      //   "onboarding/gst_vat"
      // );
      // const businessLicenseUploads = await uploadFiles(
      //   businessLicenseFiles,
      //   "onboarding/business_license"
      // );
      // const nassitCertificateUploads = await uploadFiles(
      //   nassitFiles,
      //   "onboarding/nassit"
      // );
      // const sectorSpecificCertificateUploads = await uploadFiles(
      //   sectorCertFiles,
      //   "onboarding/sector_specific"
      // );
      // const businessDurationDocuments = await uploadFiles(
      //   businessDurationFiles,
      //   "onboarding/business_duration"
      // );

      const registrationCertificateUploads = [
        ...businessRegistrationCertificateUploads,
        ...taxClearanceCertificateUploads,
        ...gstVatRegistrationCertificateUploads,
        ...businessLicenseUploads,
        ...nassitCertificateUploads,
        ...sectorSpecificCertificateUploads,
      ];

      console.log("Submitting onboarding data...");

      const res = await submitSupplierOnboarding({
        name: supplierName,
        contactPerson,
        phone,
        email,
        productCategories,
        supplyAreas,
        deliveryTimeline: leadTime,
        registrationCertificateUploads,
        businessRegistrationCertificateUploads,
        taxClearanceCertificateUploads,
        gstVatRegistrationCertificateUploads,
        businessLicenseUploads,
        nassitCertificateUploads,
        sectorSpecificCertificateUploads,
        paymentMethods,
        vendorPaymentTerms,
        businessLeadGender,
        inBusinessMoreThan3Years,
        businessDurationDocumentsUploads,
        dateOfIncorporation,
        averageTurnover,
        declarations: {
          infoAccurate: declInfoAccurate,
          agreeRules: declAgreeRules,
        },
      });

      console.log("Submission response:", res);

      if (res && res.success) {
        console.log("Success! Supplier created:", res.data);
        // Change to success state
        setLoading("success");

        // Redirect after showing success
        setTimeout(() => {
          const supplierId = res.data?._id || res.data?.id;
          if (supplierId) {
            router.push(`/onboarding/supplier/${supplierId}`);
          } else {
            router.push("/onboarding");
          }
        }, 1000);
      } else {
        setLoading(null);
        const errorMsg =
          res?.error ||
          "Submission failed. Please try again or contact support.";
        console.error("Submission failed:", errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setLoading(null);
      setError(
        error instanceof Error
          ? `An error occurred: ${error.message}`
          : "An error occurred during submission. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Welcome</CardTitle>
                <CardDescription className="text-xs">
                  Complete vendor onboarding.
                </CardDescription>
              </div>
              <StatusBadge status={"Vendor"} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-8">
                {/* Vendor Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">
                      Vendor Information
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="supplierName">Business Name *</Label>
                      <Input
                        id="supplierName"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        placeholder="Two Brother's Enterprise."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">
                          Contact Person Name *
                        </Label>
                        <Input
                          id="contactPerson"
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
                          placeholder="Ngevao Sesay"
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
                        placeholder="vendor@example.com"
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
                          "Catering & Consumables",
                          "Merchandise & Stationeres",
                          "Facilitators",
                          "Venue",
                          "Cleaning",
                          "​Logistics",
                          "​Facilities​",
                        ].map((cat) => (
                          <div
                            key={cat}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`cat-${cat}`}
                              checked={productCategories.includes(cat)}
                              onCheckedChange={(checked) => {
                                setProductCategories((prev) =>
                                  checked
                                    ? [...prev, cat]
                                    : prev.filter((c) => c !== cat)
                                );
                              }}
                            />
                            <Label
                              htmlFor={`cat-${cat}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {cat}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>Areas You Can Supply *</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg border border-border bg-muted/30">
                        {[
                          "Western Area Urban",
                          "Western Area Rural",
                          "Eastern Province",
                          "Southern Province",
                          "Northern Province",
                        ].map((area) => (
                          <div
                            key={area}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`area-${area}`}
                              checked={supplyAreas.includes(area)}
                              onCheckedChange={(checked) => {
                                setSupplyAreas((prev) =>
                                  checked
                                    ? [...prev, area]
                                    : prev.filter((a) => a !== area)
                                );
                              }}
                            />
                            <Label
                              htmlFor={`area-${area}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {area}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>Lead Time *</Label>
                      <RadioGroup value={leadTime} onValueChange={setLeadTime}>
                        <div className="space-y-2 p-4 rounded-lg border border-border bg-muted/30">
                          {[
                            "1 day",
                            "2 days",
                            "3 days",
                            "4 days",
                            "1 week",
                            "2 weeks",
                            "1 month",
                          ].map((opt) => (
                            <div
                              key={opt}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={opt}
                                id={`leadtime-${opt}`}
                              />
                              <Label
                                htmlFor={`leadtime-${opt}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {opt}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Business Information
                  </h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfIncorporation">
                        Date of Incorporation *
                      </Label>
                      <Input
                        id="dateOfIncorporation"
                        type="date"
                        value={dateOfIncorporation}
                        onChange={(e) => setDateOfIncorporation(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>
                        Is your business a male or female lead business? *
                      </Label>
                      <RadioGroup
                        value={businessLeadGender}
                        onValueChange={setBusinessLeadGender}
                      >
                        <div className="space-y-2 p-4 rounded-lg border border-border bg-muted/30">
                          {["Male", "Female"].map((opt) => (
                            <div
                              key={opt}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={opt}
                                id={`gender-${opt}`}
                              />
                              <Label
                                htmlFor={`gender-${opt}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {opt}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border bg-muted/30">
                        <Checkbox
                          id="inBusinessMoreThan3Years"
                          checked={inBusinessMoreThan3Years}
                          onCheckedChange={(checked) =>
                            setInBusinessMoreThan3Years(checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="inBusinessMoreThan3Years"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Have you been in business for more than 3 years?
                        </Label>
                      </div>
                      {inBusinessMoreThan3Years && (
                        <div className="space-y-2 pl-4 border-l-2 border-primary/30">
                          <Label htmlFor="businessDurationDocs">
                            Provide Supporting Documents *
                          </Label>
                          <div className="flex items-center gap-3 p-3 border border-dashed border-border rounded-lg hover:border-primary/50 transition-colors">
                            <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <Input
                              id="businessDurationDocs"
                              type="file"
                              multiple
                              accept="image/*,.pdf"
                              onChange={(e) =>
                                setBusinessDurationFiles(e.target.files)
                              }
                              className="border-0 p-0 h-auto text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Upload business history documents, annual reports,
                            etc.
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="averageTurnover">
                        Vendor Average Turnover in Two Years *
                      </Label>
                      <Input
                        id="averageTurnover"
                        type="text"
                        value={averageTurnover}
                        onChange={(e) => setAverageTurnover(e.target.value)}
                        placeholder="e.g., SLE 50,000,000"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the average annual turnover for the past two years
                      </p>
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">
                      Required Documents
                    </h3>
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
                        label: "NASSIT Certificate",
                        state: nassitFiles,
                        setter: setNassitFiles,
                        id: "nassit",
                      },
                      {
                        label:
                          "Sector-Specific Certifications (ISO, Food Handling, Safety, etc.)",
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
                        {["Cheque", "Mobile Money", "Bank"].map((method) => (
                          <div
                            key={method}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`payment-${method}`}
                              checked={paymentMethods.includes(method)}
                              onCheckedChange={(checked) => {
                                setPaymentMethods((prev) =>
                                  checked
                                    ? [...prev, method]
                                    : prev.filter((m) => m !== method)
                                );
                              }}
                            />
                            <Label
                              htmlFor={`payment-${method}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {method}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Declaration Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">
                      Declaration & Agreement
                    </h3>
                  </div>
                  <Separator />
                  <div className="space-y-4 p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="declInfoAccurate"
                        checked={declInfoAccurate}
                        onCheckedChange={(checked) =>
                          setDeclInfoAccurate(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="declInfoAccurate"
                        className="text-sm font-normal cursor-pointer leading-relaxed"
                      >
                        I confirm that all information provided is accurate and
                        complete to the best of my knowledge.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="declAgreeRules"
                        checked={declAgreeRules}
                        onCheckedChange={(checked) =>
                          setDeclAgreeRules(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="declAgreeRules"
                        className="text-sm font-normal cursor-pointer leading-relaxed"
                      >
                        I agree to follow all procurement and delivery rules and
                        regulations of the platform.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="declVendorUpfront20"
                        checked={declVendorUpfront20}
                        onCheckedChange={(checked) => {
                          const v = Boolean(checked);
                          setDeclVendorUpfront20(v);
                          setVendorPaymentTerms(
                            v ? "Company will pay 40% part payment" : ""
                          );
                        }}
                      />
                      <Label
                        htmlFor="declVendorUpfront20"
                        className="text-sm font-normal cursor-pointer leading-relaxed"
                      >
                        Payment terms: 40% part payment and 60% upon delivery.
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  {/* <Button
                    onClick={submitSupplier}
                    className="flex-1"
                    disabled={!isFormValid() || loading !== null}
                  >
                    {loading === "vendor"
                      ? "Submitting..."
                      : "Submit Application"}
                  </Button> */}
                  <Button
                    onClick={submitSupplier}
                    className="flex-1"
                    disabled={!isFormValid() || loading !== null}
                  >
                    {loading === "vendor" && "Submitting..."}
                    {loading === "success" && "Success! Redirecting..."}
                    {loading === null && "Submit Application"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
