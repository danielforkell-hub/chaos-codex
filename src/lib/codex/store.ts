import { useSyncExternalStore } from "react";
import { generate, type Category, type Creation, type Tier } from "./generator";

export interface Collection { id: string; name: string; description: string; sample?: boolean; createdAt: number }
export interface Settings { matureLanguage: boolean; defaultTier: Tier; reduceMotion: boolean }
export interface CodexState { items: Creation[]; collections: Collection[]; settings: Settings }

const KEY = "chaos-codex:v1";
export const DEFAULT_SETTINGS: Settings = { matureLanguage: false, defaultTier: 2, reduceMotion: false };
const EMPTY: CodexState = { items: [], collections: [], settings: DEFAULT_SETTINGS };

let state: CodexState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

export const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const SAMPLE_COLLECTION_ID = "sample-ashen-march";
const SAMPLES: { category: Category; seed: string; tier: Tier; chaos?: boolean }[] = [
  { category: "item", seed: "ash-moth-1313", tier: 2 },
  { category: "item", seed: "bell-bone-6660", tier: 3 },
  { category: "npc", seed: "crow-wick-2024", tier: 1 },
  { category: "npc", seed: "salt-veil-4471", tier: 2 },
  { category: "tavern", seed: "ember-rust-1888", tier: 1 },
  { category: "tavern", seed: "thorn-grave-3021", tier: 2, chaos: true },
  { category: "encounter", seed: "grave-ash-5150", tier: 2 },
  { category: "encounter", seed: "veil-crow-9001", tier: 3 },
  { category: "twist", seed: "moth-salt-7777", tier: 3 },
  { category: "monster", seed: "bone-ember-6061", tier: 4 },
];

export function buildSamples(now: number): CodexState {
  const items = SAMPLES.map((s, i) => {
    const c = generate({ ...s, chaos: !!s.chaos, mature: false }, now - i * 60000);
    return {
      ...c, id: `sample-${i + 1}`, sample: true, favorite: i === 0 || i === 9,
      tags: [...c.tags, "sample"], collectionIds: i % 2 === 0 ? [SAMPLE_COLLECTION_ID] : [],
    } satisfies Creation;
  });
  return {
    items,
    collections: [{ id: SAMPLE_COLLECTION_ID, name: "Sample: The Ashen March", description: "Example collection — delete it whenever you like.", sample: true, createdAt: now }],
    settings: DEFAULT_SETTINGS,
  };
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      state = { items: p.items ?? [], collections: p.collections ?? [], settings: { ...DEFAULT_SETTINGS, ...p.settings } };
    } else {
      state = buildSamples(Date.now());
      persist();
    }
  } catch {
    state = buildSamples(Date.now());
  }
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full or blocked */ }
}
function set(next: CodexState) {
  state = next;
  persist();
  listeners.forEach((l) => l());
}

export function useCodex(): CodexState {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => { load(); return state; },
    () => EMPTY,
  );
}
export function getState() { load(); return state; }

export const actions = {
  upsert(item: Creation) {
    const s = getState();
    const exists = s.items.some((i) => i.id === item.id);
    const next = { ...item, updatedAt: Date.now() };
    set({ ...s, items: exists ? s.items.map((i) => (i.id === item.id ? next : i)) : [next, ...s.items] });
  },
  remove(id: string) { const s = getState(); set({ ...s, items: s.items.filter((i) => i.id !== id) }); },
  toggleFavorite(id: string) {
    const s = getState();
    set({ ...s, items: s.items.map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i)) });
  },
  addCollection(name: string, description = "") {
    const s = getState(); const c: Collection = { id: newId(), name, description, createdAt: Date.now() };
    set({ ...s, collections: [...s.collections, c] }); return c;
  },
  updateCollection(id: string, patch: Partial<Collection>) {
    const s = getState(); set({ ...s, collections: s.collections.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  },
  removeCollection(id: string) {
    const s = getState();
    set({ ...s, collections: s.collections.filter((c) => c.id !== id), items: s.items.map((i) => ({ ...i, collectionIds: i.collectionIds.filter((x) => x !== id) })) });
  },
  updateSettings(patch: Partial<Settings>) { const s = getState(); set({ ...s, settings: { ...s.settings, ...patch } }); },
  removeSamples() {
    const s = getState();
    set({ ...s, items: s.items.filter((i) => !i.sample), collections: s.collections.filter((c) => !c.sample) });
  },
  restoreSamples() {
    const s = getState(); const smp = buildSamples(Date.now());
    const ids = new Set(s.items.map((i) => i.id)); const cids = new Set(s.collections.map((c) => c.id));
    set({ ...s, items: [...s.items, ...smp.items.filter((i) => !ids.has(i.id))], collections: [...s.collections, ...smp.collections.filter((c) => !cids.has(c.id))] });
  },
  eraseAll() { set({ items: [], collections: [], settings: getState().settings }); },
  exportJson(): string {
    const s = getState();
    return JSON.stringify({ app: "chaos-codex", version: 1, exportedAt: new Date().toISOString(), ...s }, null, 2);
  },
  importJson(text: string): { items: number; collections: number } {
    const p = JSON.parse(text);
    if (!p || p.app !== "chaos-codex" || !Array.isArray(p.items)) throw new Error("This file isn't a Chaos Codex backup.");
    const valid = (p.items as Creation[]).filter((i) => i && typeof i.id === "string" && typeof i.title === "string" && typeof i.category === "string");
    const cols = (Array.isArray(p.collections) ? p.collections : []).filter((c: Collection) => c && typeof c.id === "string" && typeof c.name === "string");
    const s = getState();
    const items = new Map(s.items.map((i) => [i.id, i]));
    valid.forEach((i) => items.set(i.id, { tags: [], collectionIds: [], stats: [], notes: "", favorite: false, ...i }));
    const collections = new Map(s.collections.map((c) => [c.id, c]));
    cols.forEach((c: Collection) => collections.set(c.id, c));
    set({ ...s, items: [...items.values()], collections: [...collections.values()] });
    return { items: valid.length, collections: cols.length };
  },
};
