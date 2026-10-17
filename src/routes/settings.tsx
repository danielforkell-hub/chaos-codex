import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageTitle } from "@/components/codex/AppShell";
import { TIERS, type Tier } from "@/lib/codex/generator";
import { actions, useCodex } from "@/lib/codex/store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CHAOS CODEX" },
      { name: "description", content: "Language, difficulty defaults, motion, and JSON backup import/export." },
      { property: "og:title", content: "Settings — CHAOS CODEX" },
      { property: "og:description", content: "Configure Chaos Codex and back up your vault." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function Row({ id, label, desc, checked, onChange }: { id: string; label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div><Label htmlFor={id} className="font-heading">{label}</Label><p className="text-sm text-muted-foreground">{desc}</p></div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function SettingsPage() {
  const { settings, items, collections } = useCodex();
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmErase, setConfirmErase] = useState(false);

  const exportBackup = () => {
    const blob = new Blob([actions.exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `chaos-codex-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded");
  };
  const importBackup = async (f: File) => {
    try {
      const r = actions.importJson(await f.text());
      toast.success(`Imported ${r.items} creations and ${r.collections} collections`);
    } catch (e) { toast.error(e instanceof Error ? e.message : "Import failed"); }
    if (fileRef.current) fileRef.current.value = "";
  };
  const hasSamples = items.some((i) => i.sample) || collections.some((c) => c.sample);

  return (
    <div className="space-y-6">
      <PageTitle title="Settings" kicker="Rites & rituals" />

      <section className="codex-card divide-y divide-border px-4 sm:px-6">
        <Row id="mature" label="Mature language" desc="Off by default. When on, Chaos mode uses salty (non-explicit) swearing." checked={settings.matureLanguage} onChange={(v) => actions.updateSettings({ matureLanguage: v })} />
        <Row id="motion" label="Reduce motion" desc="Disable glowing, pulsing and rising animations." checked={settings.reduceMotion} onChange={(v) => actions.updateSettings({ reduceMotion: v })} />
        <div className="py-3">
          <Label htmlFor="tier" className="font-heading">Default difficulty tier</Label>
          <select id="tier" className="mt-2 block h-10 w-full rounded-md border border-input bg-background px-2" value={settings.defaultTier}
            onChange={(e) => actions.updateSettings({ defaultTier: Number(e.target.value) as Tier })}>
            {TIERS.map((t) => <option key={t.id} value={t.id}>{t.id}. {t.label} — {t.desc}</option>)}
          </select>
        </div>
      </section>

      <section className="codex-card space-y-3 p-4 sm:p-6">
        <h2 className="font-heading text-lg">Backup</h2>
        <p className="text-sm text-muted-foreground">Your data lives only in this browser. Export a JSON file to keep it safe or move it to another device. Import merges with what's here.</p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={exportBackup}><Download /> Export JSON</Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}><Upload /> Import JSON</Button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" aria-label="Import backup file"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) importBackup(f); }} />
        </div>
      </section>

      <section className="codex-card space-y-3 p-4 sm:p-6">
        <h2 className="font-heading text-lg">Sample data</h2>
        <div className="flex flex-wrap gap-2">
          {hasSamples
            ? <Button variant="outline" onClick={() => { actions.removeSamples(); toast("Sample creations removed"); }}>Remove samples</Button>
            : <Button variant="outline" onClick={() => { actions.restoreSamples(); toast.success("Samples restored"); }}>Restore samples</Button>}
          {confirmErase ? (
            <>
              <Button variant="destructive" onClick={() => { actions.eraseAll(); setConfirmErase(false); toast("Vault erased"); }}>Yes, erase everything</Button>
              <Button variant="ghost" onClick={() => setConfirmErase(false)}>Cancel</Button>
            </>
          ) : <Button variant="ghost" className="text-destructive" onClick={() => setConfirmErase(true)}>Erase all data</Button>}
        </div>
      </section>

      <nav className="flex flex-wrap gap-3">
        <Button asChild variant="outline"><Link to="/pro">Free vs Pro</Link></Button>
        <Button asChild variant="outline"><Link to="/about">About & Privacy</Link></Button>
      </nav>
    </div>
  );
}
