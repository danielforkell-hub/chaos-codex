import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CreationCard } from "@/components/codex/CreationCard";
import { EmptyState, PageTitle } from "@/components/codex/AppShell";
import { CATEGORIES, TIERS, generate, randomSeed, type Category, type Creation, type Tier } from "@/lib/codex/generator";
import { actions, newId, useCodex } from "@/lib/codex/store";

type Search = { category?: Category; auto?: "random" | "chaos" | "category" };
const CAT_IDS = CATEGORIES.map((c) => c.id) as string[];

export const Route = createFileRoute("/forge")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: CAT_IDS.includes(s.category as string) ? (s.category as Category) : undefined,
    auto: s.auto === "random" || s.auto === "chaos" || s.auto === "category" ? s.auto : undefined,
  }),
  head: () => ({
    meta: [
      { title: "The Forge — CHAOS CODEX" },
      { name: "description", content: "Generate cursed items, NPCs, taverns, encounters, plot twists and monsters with seeds and difficulty tiers." },
      { property: "og:title", content: "The Forge — CHAOS CODEX" },
      { property: "og:description", content: "Seeded grimdark generators for any tabletop RPG." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Forge,
});

function Forge() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { settings, items } = useCodex();
  const [category, setCategory] = useState<Category>(search.category ?? "item");
  const [tier, setTier] = useState<Tier>(settings.defaultTier);
  const [seed, setSeed] = useState("");
  const [chaos, setChaos] = useState(false);
  const [current, setCurrent] = useState<Creation | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const saved = !!current && items.some((i) => i.id === current.id);

  const run = (opts: { category?: Category; seed?: string; chaos?: boolean; tier?: Tier } = {}) => {
    const cat = opts.category ?? category, t = opts.tier ?? tier, ch = opts.chaos ?? chaos;
    const sd = opts.seed ?? (seed.trim() || randomSeed());
    const c: Creation = { ...generate({ category: cat, seed: sd, tier: t, chaos: ch, mature: settings.matureLanguage }, Date.now()), id: newId() };
    setCurrent(c); setSeed(""); 
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  useEffect(() => {
    if (!search.auto) return;
    if (search.auto === "random") {
      const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id;
      setCategory(cat); run({ category: cat });
    } else if (search.auto === "chaos") {
      setChaos(true); run({ chaos: true, category: search.category ?? category });
    } else run({ category: search.category ?? category });
    navigate({ search: {}, replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.auto]);

  const onChange = (c: Creation) => { setCurrent(c); if (saved) actions.upsert(c); };
  const chaosLabel = settings.matureLanguage ? "Fuck Up My Campaign" : "F*ck Up My Campaign";

  return (
    <div>
      <PageTitle title="The Forge" kicker="Strike the anvil">Pick a category, set the danger, and hammer out something terrible.</PageTitle>

      <div className="codex-card space-y-5 p-4 sm:p-6">
        <fieldset>
          <legend className="mb-2 font-heading text-sm uppercase tracking-widest text-muted-foreground">Category</legend>
          <div role="radiogroup" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIES.map((c) => (
              <button key={c.id} type="button" role="radio" aria-checked={category === c.id} onClick={() => setCategory(c.id)}
                className="flex min-h-11 items-center gap-2 rounded-md border border-border px-3 py-2 text-left font-heading text-sm transition-colors hover:border-primary aria-checked:border-primary aria-checked:bg-secondary aria-checked:text-primary">
                <span aria-hidden>{c.glyph}</span>{c.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-heading text-sm uppercase tracking-widest text-muted-foreground">Difficulty tier</legend>
          <div role="radiogroup" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TIERS.map((t) => (
              <button key={t.id} type="button" role="radio" aria-checked={tier === t.id} onClick={() => setTier(t.id)}
                className="rounded-md border border-border px-3 py-2 text-left transition-colors hover:border-primary aria-checked:border-primary aria-checked:bg-secondary">
                <span className="block font-heading text-sm">{t.id}. {t.label}</span>
                <span className="block text-xs text-muted-foreground">{t.desc}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="seed" className="font-heading text-sm uppercase tracking-widest text-muted-foreground">Seed (optional)</Label>
            <Input id="seed" value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="e.g. ash-moth-1313" className="mt-2" />
            <p className="mt-1 text-xs text-muted-foreground">Same seed + settings = same result. Leave blank for random.</p>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-md border border-blood/60 p-3">
            <div>
              <Label htmlFor="chaos" className="font-heading">{chaosLabel}</Label>
              <p className="text-xs text-muted-foreground">Adds absurd escalations and extra pain.</p>
            </div>
            <Switch id="chaos" checked={chaos} onCheckedChange={setChaos} />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="btn-unleash h-14 flex-1 rounded-full text-base" onClick={() => run()}>UNLEASH CHAOS</Button>
          <Button size="lg" variant="outline" className="h-14 rounded-full" onClick={() => {
            const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id; setCategory(cat); run({ category: cat });
          }}><Dices /> Surprise category</Button>
        </div>
      </div>

      <div ref={resultRef} className="mt-8 scroll-mt-20" aria-live="polite">
        {current ? (
          <CreationCard
            key={current.id}
            creation={current}
            saved={saved}
            onChange={onChange}
            onSave={() => { actions.upsert(current); toast.success("Sealed in the Vault"); }}
            onRegenerate={() => run({ category: current.category, tier: current.tier, chaos: current.chaos })}
            onDeleted={() => setCurrent(null)}
          />
        ) : (
          <EmptyState title="The anvil is cold">Press UNLEASH CHAOS to forge your first horror.</EmptyState>
        )}
      </div>
    </div>
  );
}
