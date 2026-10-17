import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import sigil from "@/assets/sigil.jpg";
import { CATEGORIES } from "@/lib/codex/generator";
import { useCodex } from "@/lib/codex/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHAOS CODEX — Grimdark Tabletop RPG Generator" },
      { name: "description", content: "Unleash cursed relics, bizarre NPCs, haunted taverns and campaign-wrecking twists. Free, offline-minded, no account." },
      { property: "og:title", content: "CHAOS CODEX — Grimdark Tabletop RPG Generator" },
      { property: "og:description", content: "Forge grimdark fantasy content for any tabletop system. Local-first and private." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const { items } = useCodex();
  const recent = items.slice(0, 3);
  return (
    <div className="space-y-10">
      <section className="flex flex-col items-center pt-4 text-center">
        <img src={sigil} alt="Chaos Codex sigil: a horned skull fused with a d20 and moth wings" width={512} height={512}
          className="h-40 w-40 rounded-full shadow-[var(--shadow-ember)] animate-flicker sm:h-52 sm:w-52" />
        <p className="mt-6 font-heading text-xs uppercase tracking-[0.35em] text-violet">Grimoire of Ruin</p>
        <h1 className="mt-2 font-display text-4xl leading-none text-ember-gradient sm:text-6xl">CHAOS CODEX</h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          Cursed relics, wretched strangers and twists that break campaigns. For any tabletop system.
        </p>
        <Button size="lg" className="btn-unleash mt-8 h-16 rounded-full px-10 text-lg"
          onClick={() => navigate({ to: "/forge", search: { auto: "random" } })}>
          UNLEASH CHAOS
        </Button>
        <Link to="/forge" search={{ auto: "chaos" }} className="mt-4 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          or try F*ck Up My Campaign mode →
        </Link>
      </section>

      <section aria-labelledby="cats">
        <h2 id="cats" className="mb-3 font-heading text-lg">Choose your poison</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to="/forge" search={{ category: c.id, auto: "category" }}
              className="codex-card group p-4 transition-transform hover:-translate-y-0.5 hover:border-primary">
              <span className="text-2xl" aria-hidden>{c.glyph}</span>
              <h3 className="mt-2 font-heading text-base group-hover:text-primary">{c.label}</h3>
              <p className="text-sm text-muted-foreground">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {recent.length > 0 && (
        <section aria-labelledby="recent">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 id="recent" className="font-heading text-lg">From your Vault</h2>
            <Link to="/vault" className="text-sm text-primary hover:underline">See all</Link>
          </div>
          <ul className="space-y-2">
            {recent.map((i) => (
              <li key={i.id}>
                <Link to="/vault" search={{ open: i.id }} className="codex-card block p-3 hover:border-primary">
                  <span className="font-heading">{i.title}</span>
                  {i.sample && <span className="ml-2 rounded-sm border border-violet px-1 text-xs text-violet">Sample</span>}
                  <p className="truncate text-sm text-muted-foreground">{i.subtitle}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <Link to="/pro" className="hover:text-foreground">Free vs Pro</Link>
        <Link to="/about" className="hover:text-foreground">About & Privacy</Link>
      </footer>
    </div>
  );
}
