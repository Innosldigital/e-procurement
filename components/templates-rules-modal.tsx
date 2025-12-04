"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Trash2, Edit2, Copy } from "lucide-react";
import {
  getTenderTemplates,
  getEvaluationRules,
} from "@/lib/actions/tender-actions";

interface TemplatesRulesModalProps {
  onClose: () => void;
}

interface Template {
  id: string;
  name: string;
  type: "RFP" | "RFQ" | "RFI";
  category: string;
  description: string;
  scoringCriteria: ScoringCriterion[];
  mandatoryQuestions: string[];
  evaluationWeights: { [key: string]: number };
  usageCount: number;
}

interface ScoringCriterion {
  id: string;
  name: string;
  weight: number;
  description: string;
  scoreRange: { min: number; max: number };
}

interface EvaluationRule {
  id: string;
  name: string;
  description: string;
  type: "scoring" | "compliance" | "disqualification";
  condition: string;
  action: string;
  active: boolean;
}

export function TemplatesRulesModal({ onClose }: TemplatesRulesModalProps) {
  const [activeTab, setActiveTab] = useState<"templates" | "rules">(
    "templates"
  );
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [templates, setTemplates] = useState<Template[]>([]);
  const [rules, setRules] = useState<EvaluationRule[]>([]);
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [newRule, setNewRule] = useState<EvaluationRule>({
    id: "",
    name: "",
    description: "",
    type: "scoring",
    condition: "",
    action: "",
    active: true,
  });

  useEffect(() => {
    let mounted = true;
    Promise.all([getTenderTemplates(), getEvaluationRules()])
      .then(([tplRes, rulesRes]: any) => {
        const tpl = tplRes?.success ? tplRes.data : [];
        const rl = rulesRes?.success ? rulesRes.data : [];
        if (!mounted) return;
        setTemplates(tpl);
        setRules(rl);
        setSelectedTemplate(tpl[0] || null);
      })
      .catch(() => {
        if (!mounted) return;
        setTemplates([]);
        setRules([]);
        setSelectedTemplate(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Templates & Rules Library
            </h2>
            <p className="text-sm text-muted-foreground">
              Standardize your sourcing process with reusable templates and
              automated evaluation rules.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("templates")}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "templates"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Tender Templates ({templates.length})
            </button>
            <button
              onClick={() => setActiveTab("rules")}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "rules"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Evaluation Rules ({rules.filter((r) => r.active).length} active)
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "templates" ? (
            <div className="grid grid-cols-3 h-full divide-x divide-border">
              {/* Template List */}
              <div className="col-span-1 overflow-y-auto">
                <div className="p-4 border-b border-border">
                  <Button size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    New Template
                  </Button>
                </div>
                <div className="divide-y divide-border">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`w-full text-left p-4 hover:bg-accent/50 transition-colors ${
                        selectedTemplate?.id === template.id ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-medium text-sm">
                          {template.name}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {template.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {template.category}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Used {template.usageCount} times
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Details */}
              {selectedTemplate && (
                <div className="col-span-2 overflow-y-auto p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {selectedTemplate.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedTemplate.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Template Metadata */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">
                        Type
                      </div>
                      <Badge>{selectedTemplate.type}</Badge>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">
                        Category
                      </div>
                      <div className="text-sm font-medium">
                        {selectedTemplate.category}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">
                        Usage Count
                      </div>
                      <div className="text-sm font-medium">
                        {selectedTemplate.usageCount} tenders
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">
                        Last Updated
                      </div>
                      <div className="text-sm font-medium">2 weeks ago</div>
                    </div>
                  </div>

                  {/* Scoring Criteria */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3">
                      Scoring Criteria
                    </h4>
                    <div className="space-y-3">
                      {selectedTemplate.scoringCriteria.map((criterion) => (
                        <div
                          key={criterion.id}
                          className="border border-border rounded-lg p-3"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-medium text-sm">
                                {criterion.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {criterion.description}
                              </div>
                            </div>
                            <Badge className="bg-primary/10 text-primary">
                              {criterion.weight}%
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Score range: {criterion.scoreRange.min} -{" "}
                            {criterion.scoreRange.max}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mandatory Questions */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3">
                      Mandatory Questions (
                      {selectedTemplate.mandatoryQuestions.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedTemplate.mandatoryQuestions.map(
                        (question, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 text-sm p-2 rounded hover:bg-accent/30"
                          >
                            <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium mt-0.5">
                              {i + 1}
                            </div>
                            <div className="flex-1">{question}</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-border pt-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Apply to New Tender
                      </Button>
                      <Button variant="outline" size="sm">
                        Export Template
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive bg-transparent"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-y-auto p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      Evaluation Rules
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Automate scoring, compliance checks, and bid
                      disqualification criteria.
                    </p>
                  </div>
                  <Button size="sm" onClick={() => setShowRuleForm((v) => !v)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Rule
                  </Button>
                </div>
                {showRuleForm && (
                  <div className="border border-border rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Name
                        </div>
                        <Input
                          value={newRule.name}
                          onChange={(e) =>
                            setNewRule({ ...newRule, name: e.target.value })
                          }
                          placeholder="e.g. Minimum Score Threshold"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Type
                        </div>
                        <select
                          className="w-full rounded-md border border-border bg-background p-2 text-sm"
                          value={newRule.type}
                          onChange={(e) =>
                            setNewRule({
                              ...newRule,
                              type: e.target.value as any,
                            })
                          }
                        >
                          <option value="scoring">scoring</option>
                          <option value="compliance">compliance</option>
                          <option value="disqualification">
                            disqualification
                          </option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="text-xs text-muted-foreground mb-1">
                          Description
                        </div>
                        <textarea
                          className="w-full rounded-md border border-border bg-background p-2 text-sm"
                          rows={2}
                          value={newRule.description}
                          onChange={(e) =>
                            setNewRule({
                              ...newRule,
                              description: e.target.value,
                            })
                          }
                          placeholder="Short explanation of the rule"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Condition
                        </div>
                        <Input
                          value={newRule.condition}
                          onChange={(e) =>
                            setNewRule({
                              ...newRule,
                              condition: e.target.value,
                            })
                          }
                          placeholder="e.g. Total score < 60"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Action
                        </div>
                        <Input
                          value={newRule.action}
                          onChange={(e) =>
                            setNewRule({ ...newRule, action: e.target.value })
                          }
                          placeholder="e.g. Automatic disqualification"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          id="rule-active"
                          type="checkbox"
                          className="h-4 w-4"
                          checked={newRule.active}
                          onChange={(e) =>
                            setNewRule({ ...newRule, active: e.target.checked })
                          }
                        />
                        <label htmlFor="rule-active" className="text-sm">
                          Active
                        </label>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setNewRule({
                            id: "",
                            name: "",
                            description: "",
                            type: "scoring",
                            condition: "",
                            action: "",
                            active: true,
                          });
                          setShowRuleForm(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          const id = Date.now().toString();
                          const rule: EvaluationRule = { ...newRule, id };
                          setRules((prev) => [rule, ...prev]);
                          setSelectedTemplate((t) => t); // noop
                          setNewRule({
                            id: "",
                            name: "",
                            description: "",
                            type: "scoring",
                            condition: "",
                            action: "",
                            active: true,
                          });
                          setShowRuleForm(false);
                        }}
                      >
                        Save Rule
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Rules by Type */}
              {["scoring", "compliance", "disqualification"].map((type) => {
                const typeRules = rules.filter((r) => r.type === type);
                return (
                  <div key={type} className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 capitalize">
                      {type} Rules ({typeRules.length})
                    </h4>
                    <div className="space-y-3">
                      {typeRules.map((rule) => (
                        <div
                          key={rule.id}
                          className="border border-border rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-medium text-sm">
                                  {rule.name}
                                </div>
                                {rule.active ? (
                                  <Badge className="bg-success/20 text-success-foreground text-xs">
                                    Active
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-xs">
                                    Inactive
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {rule.description}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <div className="text-muted-foreground mb-1">
                                Condition
                              </div>
                              <div className="font-mono bg-muted/50 p-2 rounded">
                                {rule.condition}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground mb-1">
                                Action
                              </div>
                              <div className="font-mono bg-muted/50 p-2 rounded">
                                {rule.action}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {activeTab === "templates"
              ? "Templates help standardize tender creation and ensure consistent evaluation criteria."
              : "Rules automatically enforce compliance and scoring logic across all tenders."}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button size="sm">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
