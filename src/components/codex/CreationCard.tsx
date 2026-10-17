import { useState } from "react";
import { toast } from "sonner";
import { Bookmark, BookmarkCheck, Copy, Pencil, RefreshCw, Star, Trash2, FolderPlus, X, Check, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categoryLabel, tierLabel, toPlainText, type Creation } from "@/lib/codex/generator";
import { actions, useCodex } from "@/lib/codex/store";

interface Props {
  creation: Creation;
  saved: boolean;
  onChange: (c: Creation) => void;
  onSave?: () => void;
  onRegenerate?: () => void;
  onDeleted?: () => void;
}

const SECTIONS = [
  { key: "narrative", label: "Narrative" },
  { key: "hook", label: "Encounter Hook" },
  { key: "guidance", label: "Gameplay Guidance" },
  { key: "twist", label: "Twist" },
] as const;

export function CreationCard({ creation: c, saved, onChange, onSave, onRegenerate, onDeleted }: Props) {
  const { collections } = useCodex();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(c);
  const [tagInput, setTagInput] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const startEdit = () => { setDraft(c); setEditing(true); };
  const commitEdit = () => { onChange(draft); setEditing(false); toast.success("Changes inscribed"); };

  const copy = async () => {
    try { await navigator.clipboard.writeText(toPlainText(c)); toast.success("Copied to clipboard"); }
    catch { toast.error("Clipboard unavailable in this browser"); }
  };
  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, "-").slice(0, 24);
    if (!t || c.tags.includes(t)) { setTagInput(""); return; }
    onChange({ ...c, tags: [...c.tags, t] }); setTagInput("");
  };
  const toggleCollection = (id: string) => {
    const has = c.collectionIds.includes(id);
    onChange({ ...c, collectionIds: has ? c.collectionIds.filter((x) => x !== id) : [...c.collectionIds, id] });
  };

  return (
    <article className="codex-card animate-rise overflow-hidden" aria-labelledby={`t-${c.id}`}>
      <header className="relative border-b border-border p-4 sm:p-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground font-heading">
          <span className="text-primary">{categoryLabel(c.category)}</span>
          <span aria-hidden>✦</span>
          <span>Tier {c.tier} · {tierLabel(c.tier)}</span>
          {c.chaos && <span className="rounded-sm bg-blood/40 px-1.5 py-0.5 text-foreground">Chaos</span>}
          {c.sample && <span className="rounded-sm border border-violet px-1.5 py-0.5 text-violet">Sample</span>}
        </div>
        {editing ? (
          <div className="space-y-2">
            <Input aria-label="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="font-heading text-lg" />
            <Input aria-label="Subtitle" value={draft.subtitle} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} />
          </div>
        ) : (
          <>
            <h2 id={`t-${c.id}`} className="font-heading text-xl font-bold leading-tight text-foreground sm:text-2xl">{c.title}</h2>
            <p className="mt-1 italic text-muted-foreground">{c.subtitle}</p>
          </>
        )}
      </header>

      <div className="space-y-5 p-4 sm:p-6">
        {SECTIONS.map((s) => (
          <section key={s.key} aria-label={s.label}>
            <h3 className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Skull className="h-3.5 w-3.5" aria-hidden /> {s.label}
            </h3>
            {editing ? (
              <Textarea aria-label={s.label} rows={3} value={draft[s.key]} onChange={(e) => setDraft({ ...draft, [s.key]: e.target.value })} />
            ) : (
              <p className="leading-relaxed">{c[s.key]}</p>
            )}
          </section>
        ))}

        <section aria-label="Stat suggestions" className="parchment-panel p-4">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.2em]">Stat Suggestions · system-agnostic</h3>
          <dl className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
            {c.stats.map((s) => (
              <div key={s.label} className="flex flex-wrap gap-x-2 text-[0.98rem]">
                <dt className="font-semibold">{s.label}:</dt><dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {(editing || c.notes) && (
          <section aria-label="Notes">
            <h3 className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">Your Notes</h3>
            {editing ? (
              <Textarea aria-label="Notes" rows={2} value={draft.notes} placeholder="Table notes, names, adjustments…" onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
            ) : <p className="whitespace-pre-wrap leading-relaxed">{c.notes}</p>}
          </section>
        )}

        <section aria-label="Tags">
          <div className="flex flex-wrap items-center gap-1.5">
            {c.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-0.5 text-sm">
                #{t}
                <button type="button" aria-label={`Remove tag ${t}`} className="opacity-60 hover:opacity-100" onClick={() => onChange({ ...c, tags: c.tags.filter((x) => x !== t) })}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <form className="flex items-center gap-1" onSubmit={(e) => { e.preventDefault(); addTag(); }}>
              <Input aria-label="Add tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="+ tag" className="h-7 w-24 text-sm" />
            </form>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Seed: <code>{c.seed}</code></p>
        </section>
      </div>

      <footer className="flex flex-wrap gap-2 border-t border-border bg-muted/40 p-3 sm:p-4">
        {editing ? (
          <>
            <Button size="sm" onClick={commitEdit}><Check /> Save edits</Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
          </>
        ) : (
          <>
            {!saved && onSave && <Button size="sm" onClick={onSave}><Bookmark /> Save to Vault</Button>}
            {saved && <span className="inline-flex items-center gap-1 px-2 text-sm text-primary"><BookmarkCheck className="h-4 w-4" /> In Vault</span>}
            <Button size="sm" variant="outline" onClick={() => onChange({ ...c, favorite: !c.favorite })} aria-pressed={c.favorite}>
              <Star className={c.favorite ? "fill-primary text-primary" : ""} /> {c.favorite ? "Favorited" : "Favorite"}
            </Button>
            <Button size="sm" variant="outline" onClick={startEdit}><Pencil /> Edit</Button>
            <Button size="sm" variant="outline" onClick={copy}><Copy /> Copy</Button>
            {onRegenerate && <Button size="sm" variant="outline" onClick={onRegenerate}><RefreshCw /> Regenerate</Button>}
            {saved && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button size="sm" variant="outline"><FolderPlus /> Collections</Button></DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Add to collection</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {collections.length === 0 && <p className="px-2 py-1.5 text-sm text-muted-foreground">No collections yet — create one in Collections.</p>}
                  {collections.map((col) => (
                    <DropdownMenuCheckboxItem key={col.id} checked={c.collectionIds.includes(col.id)} onCheckedChange={() => toggleCollection(col.id)} onSelect={(e) => e.preventDefault()}>
                      {col.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {saved && (confirmDelete ? (
              <span className="inline-flex gap-1">
                <Button size="sm" variant="destructive" onClick={() => { actions.remove(c.id); toast("Burned from the Vault"); onDeleted?.(); }}>Confirm delete</Button>
                <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(false)}>Keep</Button>
              </span>
            ) : (
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setConfirmDelete(true)}><Trash2 /> Delete</Button>
            ))}
          </>
        )}
      </footer>
    </article>
  );
}
