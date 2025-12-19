"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TemplatesRulesModalProps {
  onClose: () => void;
}

export function TemplatesRulesModal({ onClose }: TemplatesRulesModalProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-semibold">Templates & Rules</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Standardize your tender process with reusable templates and
              company-wide evaluation rules.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="templates"
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="rules">Scoring & Rules</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-6">
            {/* Templates Tab */}
            <TabsContent value="templates" className="mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Available Templates
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        IT Services RFP
                        <Badge variant="secondary">RFP</Badge>
                      </CardTitle>
                      <CardDescription>
                        Standard template for software development, cloud
                        services, and IT support.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Includes sections: Scope, Technical Requirements, SLA,
                        Security, Pricing Model
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        Office Supplies RFQ
                        <Badge variant="secondary">RFQ</Badge>
                      </CardTitle>
                      <CardDescription>
                        Quick quote request for recurring office materials and
                        consumables.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Item list with quantities, delivery schedule, and unit
                        pricing
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        Construction Works RFP
                        <Badge variant="secondary">RFP</Badge>
                      </CardTitle>
                      <CardDescription>
                        For building, renovation, and infrastructure projects.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        BOQ, timeline, safety compliance, insurance, and
                        performance bonds
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:border-primary transition-colors cursor-pointer opacity-60">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        Marketing Services RFP
                        <Badge variant="secondary">RFP</Badge>
                      </CardTitle>
                      <CardDescription>
                        Agency selection for campaigns, branding, and digital
                        marketing.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Coming soon...
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <strong>Tip:</strong> When creating a new tender, select one
                    of these templates to pre-fill questions, scoring criteria,
                    and document requirements.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Rules Tab */}
            <TabsContent value="rules" className="mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Company-Wide Evaluation Rules
                </h3>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Default Scoring Weights
                    </CardTitle>
                    <CardDescription>
                      Automatically applied to all new tenders unless
                      overridden.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Price</span>
                      <Badge className="bg-blue-500/10 text-blue-700">
                        40%
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        Technical Quality & Capability
                      </span>
                      <Badge className="bg-purple-500/10 text-purple-700">
                        30%
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Delivery Timeline</span>
                      <Badge className="bg-amber-500/10 text-amber-700">
                        15%
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        Compliance & Commercial Terms
                      </span>
                      <Badge className="bg-green-500/10 text-green-700">
                        15%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Mandatory Requirements
                    </CardTitle>
                    <CardDescription>
                      Bids missing these are automatically disqualified.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>
                          Valid business registration and tax clearance
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Signed NDA (if applicable)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Priced bill of quantities (for RFQs)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Bid submitted before closing date</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Governance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • Tenders above Nle 5,000,000 require dual approval
                      </li>
                      <li>• Evaluation team must have at least 3 members</li>
                      <li>
                        • All awards recorded in timeline with justification
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    These rules ensure consistency, fairness, and compliance
                    across all sourcing activities in your organization.
                  </p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
