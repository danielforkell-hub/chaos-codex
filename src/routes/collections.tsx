import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState, PageTitle } from "@/components/codex/AppShell";
import { CreationList } from "@/components/codex/CreationList";
import { actions, useCodex } from "@/lib/codex/store";

export const Route = createFileRoute("/collections")({
  validateSearch: (s: Record<string, unknown>): { c?: string; open?: string } => ({
    c: typeof s.c === "string" ? s.c : undefined, open: typeof s.open === "string" ? s.open : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Collections — CHAOS CODEX" },
      { name: "description", content: "Group creations into campaigns, sessions and themed sets." },
      { property: "og:title", content: "Collections — CHAOS CODEX" },
      { property: "og:description", content: "Organize your grimdark creations into campaigns." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Collections,
});

function Collections() {
  const { collections, items } = useCodex();
  const { c, open } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [name, setName] = useState("");
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState("");
  const [confirm, setConfirm] = useState<string | null>(null);
  const active = collections.find((x) => x.id === c);

  if (active) {
    const members = items.filter((i) => i.collectionIds.includes(active.id));
    return (
      <div>
        <Button variant="ghost" size="sm" className="mb-2" onClick={() => navigate({ search: {} })}><ArrowLeft /> All collections</Button>
        <PageTitle title={active.name} kicker={active.sample ? "Sample collection" : "Collection"}>{active.description}</PageTitle>
        <CreationList items={members} openId={open} onOpenChange={(id) => navigate({ search: { c: active.id, open: id }, replace: true })}
          emptyTitle="No creations here yet" emptyText="Open any creation in the Vault and use the Collections button to add it." />
      </div>
    );
  }

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim(); if (!n) return;
    actions.addCollection(n.slice(0, 60)); setName(""); toast.success(`Collection “${n}” created`);
  };

  return (
    <div>
      <PageTitle title="Collections" kicker="Bind your horrors">Group creations by campaign, session or theme.</PageTitle>
      <form onSubmit={create} className="mb-6 flex gap-2">
        <Input aria-label="New collection name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. The Drowned Crown campaign" />
        <Button type="submit" disabled={!name.trim()}><Plus /> Create</Button>
      </form>
      {collections.length === 0 ? (
        <EmptyState title="No collections yet">Create one above, then add creations from the Vault.</EmptyState>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {collections.map((col) => {
            const count = items.filter((i) => i.collectionIds.includes(col.id)).length;
            return (
              <li key={col.id} className="codex-card p-4">
                {renaming === col.id ? (
                  <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (renameVal.trim()) actions.updateCollection(col.id, { name: renameVal.trim() }); setRenaming(null); }}>
                    <Input autoFocus aria-label="Rename collection" value={renameVal} onChange={(e) => setRenameVal(e.target.value)} />
                    <Button type="submit" size="sm">Save</Button>
                  </form>
                ) : (
                  <button type="button" className="w-full text-left" onClick={() => navigate({ search: { c: col.id } })}>
                    <h2 className="font-heading text-lg hover:text-primary">{col.name}</h2>
                    <p className="text-sm text-muted-foreground">{count} creation{count === 1 ? "" : "s"}{col.sample ? " · sample" : ""}</p>
                  </button>
                )}
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setRenaming(col.id); setRenameVal(col.name); }}><Pencil /> Rename</Button>
                  {confirm === col.id ? (
                    <Button size="sm" variant="destructive" onClick={() => { actions.removeCollection(col.id); setConfirm(null); toast("Collection deleted (creations kept)"); }}>Confirm</Button>
                  ) : (
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setConfirm(col.id)}><Trash2 /> Delete</Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
