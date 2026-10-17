import { Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Home, Flame, Archive, FolderOpen, Settings } from "lucide-react";
import sigil from "@/assets/sigil.jpg";
import { useCodex } from "@/lib/codex/store";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/forge", label: "Forge", icon: Flame },
  { to: "/vault", label: "Vault", icon: Archive },
  { to: "/collections", label: "Collections", icon: FolderOpen },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { settings } = useCodex();
  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", settings.reduceMotion);
  }, [settings.reduceMotion]);

  return (
    <div className="min-h-dvh">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2" aria-label="Chaos Codex home">
            <img src={sigil} alt="" width={32} height={32} className="h-8 w-8 rounded-full" />
            <span className="font-display text-lg tracking-widest text-ember-gradient">CHAOS CODEX</span>
          </Link>
          <nav aria-label="Main" className="hidden gap-1 md:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className="rounded px-3 py-1.5 font-heading text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-primary">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-5xl px-4 pb-28 pt-6 md:pb-12">{children}</main>
      <nav aria-label="Main mobile" className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <ul className="grid grid-cols-5">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link to={n.to} activeOptions={{ exact: n.to === "/" }}
                className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-[0.7rem] font-heading text-muted-foreground data-[status=active]:text-primary">
                <n.icon className="h-5 w-5" aria-hidden />
                <span>{n.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function PageTitle({ title, kicker, children }: { title: string; kicker?: string; children?: ReactNode }) {
  return (
    <div className="mb-6">
      {kicker && <p className="font-heading text-xs uppercase tracking-[0.3em] text-violet">{kicker}</p>}
      <h1 className="font-display text-3xl text-ember-gradient sm:text-4xl">{title}</h1>
      {children && <div className="mt-2 max-w-2xl text-muted-foreground">{children}</div>}
      <div className="rune-divider mt-4" />
    </div>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="codex-card flex flex-col items-center gap-3 px-6 py-12 text-center">
      <span className="text-4xl animate-flicker" aria-hidden>🕯</span>
      <h2 className="font-heading text-lg">{title}</h2>
      {children && <p className="max-w-sm text-muted-foreground">{children}</p>}
      {action}
    </div>
  );
}
