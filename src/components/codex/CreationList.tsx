import { useMemo, useState } from "react";
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CATEGORIES, categoryLabel, tierLabel, type Category, type Creation } from "@/lib/codex/generator";
import { actions } from "@/lib/codex/store";
import { CreationCard } from "./CreationCard";
import { EmptyState } from "./AppShell";

export function CreationList({ items, openId, onOpenChange, emptyTitle, emptyText, emptyAction }: {
  items: Creation[]; openId?: string; onOpenChange: (id?: string) => void;
  emptyTitle: string; emptyText: string; emptyAction?: React.ReactNode;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [favOnly, setFavOnly] = useState(false);
  const [tag, setTag] = useState<string>("");
  const [sort, setSort] = useState<"new" | "old" | "az">("new");

  const allTags = useMemo(() => [...new Set(items.flatMap((i) => i.tags))].sort(), [items]);
  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const r = items.filter((i) =>
      (cat === "all" || i.category === cat) && (!favOnly || i.favorite) && (!tag || i.tags.includes(tag)) &&
      (!ql || [i.title, i.subtitle, i.narrative, i.hook, i.guidance, i.twist, i.notes, i.tags.join(" ")].join(" ").toLowerCase().includes(ql)));
    return r.sort((a, b) => sort === "az" ? a.title.localeCompare(b.title) : sort === "old" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt);
  }, [items, q, cat, favOnly, tag, sort]);
  const open = items.find((i) => i.id === openId);

  if (items.length === 0) return <EmptyState title={emptyTitle} action={emptyAction}>{emptyText}</EmptyState>;

  const selectCls = "h-10 rounded-md border border-input bg-background px-2 text-sm";
  return (
    <div>
      <div className="mb-4 space-y-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input aria-label="Search creations" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles, text, tags…" className="h-10 pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          <select aria-label="Filter by category" className={selectCls} value={cat} onChange={(e) => setCat(e.target.value as Category | "all")}>
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <select aria-label="Filter by tag" className={selectCls} value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="">Any tag</option>
            {allTags.map((t) => <option key={t} value={t}>#{t}</option>)}
          </select>
          <select aria-label="Sort" className={selectCls} value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
            <option value="new">Newest</option><option value="old">Oldest</option><option value="az">A–Z</option>
          </select>
          <button type="button" aria-pressed={favOnly} onClick={() => setFavOnly(!favOnly)}
            className="inline-flex h-10 items-center gap-1 rounded-md border border-input px-3 text-sm aria-pressed:border-primary aria-pressed:text-primary">
            <Star className="h-4 w-4" aria-hidden /> Favorites
          </button>
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">{filtered.length} of {items.length} shown</p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Nothing stirs">No creations match these filters. Try clearing the search or tag.</EmptyState>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {filtered.map((i) => (
            <li key={i.id} className="codex-card relative flex flex-col p-4 hover:border-primary">
              <div className="flex items-start justify-between gap-2">
                <p className="font-heading text-xs uppercase tracking-widest text-primary">
                  {categoryLabel(i.category)} · {tierLabel(i.tier)}
                  {i.sample && <span className="ml-2 rounded-sm border border-violet px-1 text-violet">Sample</span>}
                </p>
                <button type="button" aria-label={i.favorite ? `Unfavorite ${i.title}` : `Favorite ${i.title}`} aria-pressed={i.favorite}
                  onClick={() => actions.toggleFavorite(i.id)} className="relative z-10 -m-2 p-2">
                  <Star className={`h-5 w-5 ${i.favorite ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                </button>
              </div>
              <button type="button" onClick={() => onOpenChange(i.id)} className="mt-1 text-left after:absolute after:inset-0">
                <h3 className="font-heading text-base leading-snug">{i.title}</h3>
              </button>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{i.narrative}</p>
              <p className="mt-2 truncate text-xs text-muted-foreground">{i.tags.map((t) => `#${t}`).join(" ")}</p>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={!!open} onOpenChange={(o) => !o && onOpenChange(undefined)}>
        <DialogContent className="max-h-[92dvh] w-[calc(100vw-1rem)] max-w-3xl overflow-y-auto border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{open?.title ?? "Creation"}</DialogTitle>
          <DialogDescription className="sr-only">View and edit this creation</DialogDescription>
          {open && <CreationCard key={open.id} creation={open} saved onChange={(c) => actions.upsert(c)} onDeleted={() => onOpenChange(undefined)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
