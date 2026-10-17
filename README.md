# Chaos Codex

Build a polished, working mobile-first PWA named CHAOS CODEX — a grimdark fantasy tabletop RPG generator and creation vault, intended for Android/Google Play packaging later. Visual identity: obsidian, aged parchment, desaturated violet, ember gold, exquisite gothic typography, skull/d20/moth ornamentation; cinematic but fast, accessible and responsive 360px to desktop. No copyrighted D&D branding; system-agnostic original fantasy content. Implement functional navigation: Home, Forge, Vault, Collections, Settings; bottom mobile nav. Forge has generator categories: cursed magic items, bizarre NPCs, taverns, encounters, plot twists, monsters. Use extensive curated combinatorial data arrays and seeded/random generation with coherent descriptive outputs, gameable hooks and optional difficulty tier; no paid API required. Each generation can be edited, copied, regenerated, bookmarked/saved into localStorage, tagged, favorited, searched, filtered, deleted, and organized into collections; import/export JSON backup. Add 10 example generated creations for first-run exploration but make them distinguishable sample data. Add a 'UNLEASH CHAOS' prominently animated button and a playful 'Fuck Up My Campaign' mode (optional mature-language toggle in Settings default OFF); output remains non-explicit and broadly Play-compatible. Elegant results cards with sections for narrative, encounter hook, gameplay guidance, and twist, plus simple stat suggestions system-agnostic. Monetization: show Free vs Pro feature distinctions, clear nonfunctional Pro upgrade screen with price proposal $9.99 lifetime and explicitly labeled 'Coming soon — no purchase available'; do not use fake payment flow, do not gate core features that cannot actually be unlocked; avoid misleading claims. Local-first privacy with no account requirement, no analytics, no outbound network. Add About/Privacy statement accurate to client-local data. Implement PWA installability manifest, icons if possible, offline support if feasible. Add keyboard/accessibility, toasts, helpful empty states and careful small-screen UX. Please actually implement all code and validate build, not just design mockups.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4d1dc5fa-6de7-4a48-8ead-2be3a752c659).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
