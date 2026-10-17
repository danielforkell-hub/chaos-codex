import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/codex/AppShell";

export const Route = createFileRoute("/pro")({
  head: () => ({
    meta: [
      { title: "Free vs Pro — CHAOS CODEX" },
      { name: "description", content: "Everything in Chaos Codex is free today. A $9.99 lifetime Pro tier is proposed — coming soon, no purchase available." },
      { property: "og:title", content: "Free vs Pro — CHAOS CODEX" },
      { property: "og:description", content: "Pro is coming soon. No purchase is available yet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pro,
});

const FREE = [
  "All six generators with seeds and four difficulty tiers",
  "F*ck Up My Campaign mode",
  "Unlimited saving, editing, tags, favorites and collections",
  "JSON backup import and export",
  "No account, no ads, no tracking",
];
const PRO = [
  "Additional themed generator packs (planned)",
  "Printable PDF session sheets (planned)",
  "Custom tables: add your own words to the generators (planned)",
  "Supports continued development",
];

function Pro() {
  return (
    <div>
      <PageTitle title="Free vs Pro" kicker="Honest terms">Everything that works today is free and stays free. Pro is a proposal for future extras.</PageTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="codex-card p-5">
          <h2 className="font-heading text-xl">Free <span className="text-muted-foreground">· available now</span></h2>
          <ul className="mt-3 space-y-2">{FREE.map((f) => <li key={f} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{f}</li>)}</ul>
        </section>
        <section className="codex-card border-primary p-5">
          <h2 className="font-heading text-xl text-primary">Pro <span className="text-muted-foreground">· proposed $9.99 lifetime</span></h2>
          <ul className="mt-3 space-y-2">{PRO.map((f) => <li key={f} className="flex gap-2"><Clock className="mt-1 h-4 w-4 shrink-0 text-violet" aria-hidden />{f}</li>)}</ul>
          <div className="mt-5 rounded-md border border-violet/60 bg-secondary p-3 text-sm" role="note">
            <strong className="font-heading">Coming soon — no purchase available.</strong> The price is a proposal and may change. Nothing is charged, and no features are locked behind Pro today.
          </div>
          <Button className="mt-4 w-full" disabled aria-disabled>Coming soon — no purchase available</Button>
        </section>
      </div>
    </div>
  );
}
