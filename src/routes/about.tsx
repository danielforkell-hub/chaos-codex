import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/codex/AppShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Privacy — CHAOS CODEX" },
      { name: "description", content: "Chaos Codex stores everything locally in your browser. No account, no analytics, no data sent anywhere." },
      { property: "og:title", content: "About & Privacy — CHAOS CODEX" },
      { property: "og:description", content: "Local-first privacy: your creations never leave your device." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="max-w-2xl space-y-6 leading-relaxed">
      <PageTitle title="About & Privacy" kicker="The fine print, in plain words" />
      <section className="space-y-2">
        <h2 className="font-heading text-lg text-primary">What this is</h2>
        <p>Chaos Codex is a grimdark fantasy content generator for tabletop roleplaying games. All content is original and system-agnostic; stat suggestions are loose guidance you translate to whatever rules you play. It is not affiliated with any game publisher.</p>
        <p>Generation runs entirely on your device from built-in word tables. Nothing uses a paid service or AI model.</p>
      </section>
      <section className="space-y-2">
        <h2 className="font-heading text-lg text-primary">Privacy</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>No account or sign-in is required.</li>
          <li>Your creations, collections and settings are stored in this browser's local storage on this device only.</li>
          <li>The app itself contains no analytics, ads, trackers, or code that sends your data anywhere. Fonts and icons are bundled with the app.</li>
          <li>Clearing your browser data, or using “Erase all data” in Settings, permanently deletes everything. Export a backup first if you want to keep it.</li>
          <li>Backup files you export are ordinary JSON files you control.</li>
          <li>The website host may keep standard server logs when the app is downloaded, as with any website; the app does not add to them.</li>
        </ul>
      </section>
      <section className="space-y-2">
        <h2 className="font-heading text-lg text-primary">Content</h2>
        <p>Content is dark fantasy but non-explicit. Mature language is off by default and only affects mild swearing in Chaos mode.</p>
      </section>
      <section className="space-y-2">
        <h2 className="font-heading text-lg text-primary">Install</h2>
        <p>Use your browser's “Install app” or “Add to Home Screen” option to launch Chaos Codex like an app.</p>
      </section>
    </div>
  );
}
