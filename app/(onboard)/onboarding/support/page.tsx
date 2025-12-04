"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitSupportTicket } from "@/lib/actions/support-actions";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function SupportPage() {
  const router = useRouter();
  const { user } = useUser();
  const onboarded = (user?.publicMetadata as any)?.onboarded === true;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async () => {
    setLoading(true);
    setStatus("idle");
    const res = await submitSupportTicket({ name, email, subject, message });
    setLoading(false);
    setStatus(res && (res as any).success ? "success" : "error");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            onClick={() => router.push(onboarded ? "/" : "/onboarding")}
          >
            Back to onboarding
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Support</CardTitle>
              <CardDescription className="text-xs">
                Submit your issue or question and our team will reach out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief summary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or request"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    onClick={onSubmit}
                    disabled={
                      !name || !email || !subject || !message || loading
                    }
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </div>

                {status === "success" && (
                  <div className="text-xs text-green-600">
                    Your request has been submitted. We will contact you
                    shortly.
                  </div>
                )}
                {status === "error" && (
                  <div className="text-xs text-red-600">
                    Failed to submit request. Please try again later.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Support Contact Details
              </CardTitle>
              <CardDescription className="text-xs">
                Reach us directly using the details below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <div>
                  Email:{" "}
                  <a
                    className="text-primary hover:underline"
                    href="mailto:support@eprocurement.local"
                  >
                    support@eprocurement.local
                  </a>
                </div>
                <div>
                  Phone:{" "}
                  <a
                    className="text-primary hover:underline"
                    href="tel:+23276000000"
                  >
                    +232 76 000 000
                  </a>
                </div>
                <div>Hours: Mon–Fri, 9:00–17:00 GMT</div>
                <div>Address: 123 Signal Hill Rd, Freetown, Sierra Leone</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
