import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/codex/AppShell";
import { CreationList } from "@/components/codex/CreationList";
import { useCodex } from "@/lib/codex/store";

export const Route = createFileRoute("/vault")({
  validateSearch: (s: Record<string, unknown>): { open?: string } => ({ open: typeof s.open === "string" ? s.open : undefined }),
  head: () => ({
    meta: [
      { title: "The Vault — CHAOS CODEX" },
      { name: "description", content: "Search, filter, tag, favorite and edit every creation you've saved — stored only on this device." },
      { property: "og:title", content: "The Vault — CHAOS CODEX" },
      { property: "og:description", content: "Your saved grimdark creations, stored locally." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Vault,
});

function Vault() {
  const { items } = useCodex();
  const { open } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <div>
      <PageTitle title="The Vault" kicker="Everything you've sealed away">Saved on this device only. Items marked Sample are examples you can delete.</PageTitle>
      <CreationList items={items} openId={open} onOpenChange={(id) => navigate({ search: id ? { open: id } : {}, replace: true })}
        emptyTitle="The Vault is empty" emptyText="Forge something wicked and press Save to Vault."
        emptyAction={<Button asChild><Link to="/forge">Go to the Forge</Link></Button>} />
    </div>
  );
}
