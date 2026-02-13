"use client";

import { Glass } from "@/components/ui/glass";

interface ProspectFormProps {
  prospect: string;
  valueProps: string;
  context: string;
  onProspectChange: (value: string) => void;
  onValuePropsChange: (value: string) => void;
  onContextChange: (value: string) => void;
  onSubmit: () => void;
}

export function ProspectForm({
  prospect,
  valueProps,
  context,
  onProspectChange,
  onValuePropsChange,
  onContextChange,
  onSubmit,
}: ProspectFormProps) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  }

  return (
    <Glass depth={1} className="p-5 sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="prospect" className="mb-1.5 block text-sm font-medium text-t1">
            About the Prospect
            <span className="ml-1 text-red">*</span>
          </label>
          <p className="mb-2 text-xs text-t4">
            Paste LinkedIn, company info, or describe them
          </p>
          <textarea
            id="prospect"
            rows={5}
            value={prospect}
            onChange={(e) => onProspectChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={"Sarah Chen, VP of Sales at TechFlow (Series B, 120 employees)\nStack: Salesforce, Outreach, ZoomInfo\nRecently posted about scaling their SDR team from 5 to 15\nCompany just raised $18M, expanding into enterprise"}
            className="w-full rounded-xl border border-glass-border px-4 py-3 text-sm text-t1 placeholder:text-t5 transition-all duration-200 focus:border-accent-border focus:outline-none"
            style={{ backgroundColor: "var(--theme-input-bg)" }}
          />
        </div>

        <div>
          <label htmlFor="valueProps" className="mb-1.5 block text-sm font-medium text-t1">
            Your Value Proposition
            <span className="ml-1 text-red">*</span>
          </label>
          <p className="mb-2 text-xs text-t4">
            What you offer + key results
          </p>
          <textarea
            id="valueProps"
            rows={3}
            value={valueProps}
            onChange={(e) => onValuePropsChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="We help B2B SaaS companies book 40% more meetings through AI-personalized outbound. Average client sees 3x reply rates in 30 days."
            className="w-full rounded-xl border border-glass-border px-4 py-3 text-sm text-t1 placeholder:text-t5 transition-all duration-200 focus:border-accent-border focus:outline-none"
            style={{ backgroundColor: "var(--theme-input-bg)" }}
          />
        </div>

        <div>
          <label htmlFor="context" className="mb-1.5 block text-sm font-medium text-t1">
            Additional Context
            <span className="ml-1.5 text-xs text-t4">(optional)</span>
          </label>
          <p className="mb-2 text-xs text-t4">
            Mutual connections, trigger events, etc.
          </p>
          <textarea
            id="context"
            rows={2}
            value={context}
            onChange={(e) => onContextChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="We both attended SaaStr Annual. Her SDR lead liked our latest case study on LinkedIn."
            className="w-full rounded-xl border border-glass-border px-4 py-3 text-sm text-t1 placeholder:text-t5 transition-all duration-200 focus:border-accent-border focus:outline-none"
            style={{ backgroundColor: "var(--theme-input-bg)" }}
          />
        </div>
      </div>
    </Glass>
  );
}
