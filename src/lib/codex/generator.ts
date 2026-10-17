import * as D from "./data";

export type Category = "item" | "npc" | "tavern" | "encounter" | "twist" | "monster";
export type Tier = 1 | 2 | 3 | 4;

export interface Stat { label: string; value: string }

export interface Creation {
  id: string;
  category: Category;
  seed: string;
  tier: Tier;
  chaos: boolean;
  title: string;
  subtitle: string;
  narrative: string;
  hook: string;
  guidance: string;
  twist: string;
  stats: Stat[];
  tags: string[];
  favorite: boolean;
  collectionIds: string[];
  notes: string;
  sample?: boolean;
  createdAt: number;
  updatedAt: number;
}

export const CATEGORIES: { id: Category; label: string; short: string; blurb: string; glyph: string }[] = [
  { id: "item", label: "Cursed Items", short: "Item", blurb: "Relics with a price", glyph: "🗝" },
  { id: "npc", label: "Bizarre NPCs", short: "NPC", blurb: "Strangers with secrets", glyph: "☠" },
  { id: "tavern", label: "Taverns", short: "Tavern", blurb: "Ale, rumor, and rot", glyph: "🕯" },
  { id: "encounter", label: "Encounters", short: "Encounter", blurb: "Trouble on the road", glyph: "⚔" },
  { id: "twist", label: "Plot Twists", short: "Twist", blurb: "Pull the rug out", glyph: "☾" },
  { id: "monster", label: "Monsters", short: "Monster", blurb: "Things in the dark", glyph: "🦇" },
];

export const TIERS: { id: Tier; label: string; desc: string }[] = [
  { id: 1, label: "Whisper", desc: "Low stakes, early adventures" },
  { id: 2, label: "Dread", desc: "Seasoned heroes, real danger" },
  { id: 3, label: "Ruin", desc: "Veterans; failure scars the world" },
  { id: 4, label: "Apocalypse", desc: "Legendary; kingdoms fall" },
];

export function categoryLabel(c: Category) {
  return CATEGORIES.find((x) => x.id === c)?.short ?? c;
}
export function tierLabel(t: Tier) {
  return TIERS.find((x) => x.id === t)?.label ?? String(t);
}

// --- seeded RNG (cyrb128 + mulberry32) ---
function hashSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^= h >>> 16) >>> 0;
}
export function makeRng(seed: string) {
  let a = hashSeed(seed);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
type Rng = ReturnType<typeof makeRng>;
const pick = <T,>(r: Rng, arr: readonly T[]): T => arr[Math.floor(r() * arr.length)];
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

const SEED_WORDS = ["ash", "moth", "bell", "bone", "ember", "salt", "wick", "crow", "thorn", "grave", "veil", "rust"];
export function randomSeed(): string {
  const r = makeRng(String(Date.now()) + Math.random());
  return `${pick(r, SEED_WORDS)}-${pick(r, SEED_WORDS)}-${Math.floor(r() * 9000 + 1000)}`;
}

// --- system-agnostic stat scaffolding ---
const THREAT = ["Minor", "Dangerous", "Deadly", "Catastrophic"];
const DIFF = ["Routine (easy)", "Hard", "Very hard", "Near impossible"];
const DAMAGE = ["Light — a die like d6", "Solid — d8 or 2d4", "Heavy — 2d8-ish", "Brutal — 3d10-ish"];
const TOUGH = ["Fragile (falls in ~2 solid hits)", "Sturdy (~4 hits)", "Hulking (~7 hits)", "Titanic (~12 hits, plus phases)"];

function statsFor(cat: Category, tier: Tier, r: Rng): Stat[] {
  const i = tier - 1;
  switch (cat) {
    case "monster":
      return [
        { label: "Threat", value: `${THREAT[i]} (${tier}/4)` },
        { label: "Toughness", value: TOUGH[i] },
        { label: "Damage", value: DAMAGE[i] },
        { label: "Resist checks", value: DIFF[i] },
        { label: "Morale", value: pick(r, ["Flees when bloodied", "Fights to the end", "Bargains when cornered", "Retreats to lair"]) },
      ];
    case "encounter":
      return [
        { label: "Difficulty", value: `${THREAT[i]} (${tier}/4)` },
        { label: "Foes", value: `${tier + 1 + Math.floor(r() * 3)} per hero-ish, scale to taste` },
        { label: "Foe damage", value: DAMAGE[i] },
        { label: "Skill checks", value: DIFF[i] },
      ];
    case "item":
      return [
        { label: "Power level", value: `${["Trinket", "Relic", "Artifact", "Legendary"][i]} (${tier}/4)` },
        { label: "Uses", value: `${5 - tier} per day before strain` },
        { label: "Resist curse", value: DIFF[i] },
        { label: "Value", value: ["A purse of silver", "A small estate", "A noble's ransom", "Priceless — and hunted"][i] },
      ];
    case "npc":
      return [
        { label: "Influence", value: ["Local nobody", "Known in town", "Regional power", "Kingdom-shaking"][i] },
        { label: "Combat", value: ["Avoids fights", "Capable", "Dangerous", "Legendary"][i] },
        { label: "Persuade", value: DIFF[Math.min(3, Math.floor(r() * tier) + 0)] },
        { label: "Disposition", value: pick(r, ["Wary", "Friendly", "Scheming", "Desperate", "Amused"]) },
      ];
    case "tavern":
      return [
        { label: "Danger", value: `${THREAT[i]} (${tier}/4)` },
        { label: "Room", value: ["A copper and lice", "A few silver", "Costly", "Payment in favors only"][i] },
        { label: "Rumor quality", value: pick(r, ["Mostly true", "Half lies", "Dangerously true", "Prophetic"]) },
      ];
    case "twist":
      return [
        { label: "Impact", value: ["A wrinkle", "A turning point", "Campaign-altering", "World-breaking"][i] },
        { label: "Reveal when", value: pick(r, ["Mid-session cliffhanger", "After a victory", "During a rest", "At the villain's defeat"]) },
      ];
  }
}

export interface GenOptions { category: Category; seed: string; tier: Tier; chaos: boolean; mature: boolean }
type Body = Pick<Creation, "title" | "subtitle" | "narrative" | "hook" | "guidance" | "twist">;

function genItem(r: Rng): Body {
  const adj = pick(r, D.ADJ), base = pick(r, D.ITEM_BASE), noun = pick(r, D.NOUN_DARK);
  const power = pick(r, D.ITEM_POWER), curse = pick(r, D.ITEM_CURSE), origin = pick(r, D.ITEM_ORIGIN);
  return {
    title: `The ${adj} ${base} of the ${noun}`,
    subtitle: `Cursed ${base.toLowerCase()} · ${pick(r, D.FACTIONS)} want it back`,
    narrative: `Crafted from ${pick(r, D.ITEM_MATERIAL)}, this ${base.toLowerCase()} was ${origin}. It ${power}.`,
    hook: `It turns up in ${pick(r, D.PLACES)}, wrapped in a shroud bearing the sigil of ${pick(r, D.FACTIONS)} — who are already searching for whoever took it.`,
    guidance: `Curse: ${curse} Reveal the curse slowly — describe its first sign after the second use, and let the player decide whether the power is worth it.`,
    twist: `The item is not cursed; it is lonely. Its last owner ${pick(r, D.NPC_SECRET)}, and the item wants them found.`,
  };
}
function genNpc(r: Rng): Body {
  const name = `${pick(r, D.NPC_FIRST)} ${pick(r, D.NPC_LAST)}`, role = pick(r, D.NPC_ROLE);
  return {
    title: name,
    subtitle: `A ${role}`,
    narrative: `${name} is a ${role} found in ${pick(r, D.PLACES)}. They ${pick(r, D.NPC_QUIRK)}.`,
    hook: `${name.split(" ")[0]} ${pick(r, D.NPC_WANT)}, and has decided the party is the only help available.`,
    guidance: `Play them with warmth that curdles under pressure. Give one useful truth for free, charge for the second. They owe a debt to ${pick(r, D.FACTIONS)}.`,
    twist: `Secret: ${name.split(" ")[0]} ${pick(r, D.NPC_SECRET)}.`,
  };
}
function genTavern(r: Rng): Body {
  const name = `The ${pick(r, D.TAVERN_A)} ${pick(r, D.TAVERN_B)}`;
  return {
    title: name,
    subtitle: `Tavern in ${pick(r, D.PLACES)}`,
    narrative: `${name} is ${pick(r, D.TAVERN_LOOK)}. It is run by ${pick(r, D.TAVERN_KEEPER)}. House special: ${pick(r, D.TAVERN_DRINK)}.`,
    hook: `Rumor at the bar: ${pick(r, D.TAVERN_RUMOR)}. In the corner sits ${pick(r, D.TAVERN_PATRON)}.`,
    guidance: `Use as a safe haven that isn't quite safe. Notable patron: ${pick(r, D.TAVERN_PATRON)}. Roll a die each night; on a 1, trouble comes knocking.`,
    twist: `The tavern's cellar connects to the hideout of ${pick(r, D.FACTIONS)}, and the keeper pays rent to them in guests.`,
  };
}
function genEncounter(r: Rng): Body {
  const foe = pick(r, D.ENC_FOE);
  return {
    title: `${pick(r, D.ADJ)} ${pick(r, D.NOUN_DARK)}`,
    subtitle: `Encounter · ${foe}`,
    narrative: pick(r, D.ENC_SETUP),
    hook: `Soon after, ${foe} attack amid ${pick(r, D.ENC_TERRAIN)}.`,
    guidance: `Complication: ${pick(r, D.ENC_COMPLICATION)}. Offer a non-violent way out for clever players — the foes can be bargained with if their fear is addressed.`,
    twist: `The attackers serve ${pick(r, D.FACTIONS)}, who staged this to test the party for recruitment.`,
  };
}
function genTwist(r: Rng): Body {
  const subj = pick(r, D.TWIST_SUBJECT), rev = pick(r, D.TWIST_REVEAL);
  return {
    title: `${subj}… ${rev.split(" ").slice(0, 3).join(" ")}…`,
    subtitle: "Plot twist",
    narrative: `${subj} ${rev}.`,
    hook: `Foreshadow it now: a stray detail in ${pick(r, D.PLACES)} that won't make sense until later.`,
    guidance: `Plant three clues over two sessions. Let players guess early — reward them. Consequence: ${pick(r, D.TWIST_CONSEQUENCE)}`,
    twist: `And deeper still: ${lower(pick(r, D.TWIST_SUBJECT))} knew all along, and is working for ${pick(r, D.FACTIONS)}.`,
  };
}
function genMonster(r: Rng): Body {
  const name = `${pick(r, D.MON_PREFIX)} ${pick(r, D.MON_SUFFIX)}`;
  return {
    title: `The ${name}`,
    subtitle: `Monster haunting ${pick(r, D.PLACES)}`,
    narrative: `The ${name} is ${pick(r, D.MON_BODY)}. It ${pick(r, D.MON_HABIT)}.`,
    hook: `Villagers leave offerings at the edge of ${pick(r, D.PLACES)}. Last night the offerings were returned, untouched, with a name carved into them.`,
    guidance: `Signature ability — ${pick(r, D.MON_ABILITY)} Secondary — ${pick(r, D.MON_ABILITY)} Weakness: ${pick(r, D.MON_WEAKNESS)}; let lore checks reveal it.`,
    twist: `The ${name} was once a protector of the region; ${pick(r, D.FACTIONS)} corrupted it, and it still remembers.`,
  };
}

const GEN: Record<Category, (r: Rng) => Body> = {
  item: genItem, npc: genNpc, tavern: genTavern, encounter: genEncounter, twist: genTwist, monster: genMonster,
};

export function generate(opts: GenOptions, now = 0): Omit<Creation, "id"> {
  const r = makeRng(`${opts.category}:${opts.seed}:${opts.tier}:${opts.chaos ? 1 : 0}`);
  const body = GEN[opts.category](r);
  const stats = statsFor(opts.category, opts.tier, r);
  if (opts.chaos) {
    const curse = pick(r, opts.mature ? D.SALTY_CURSES : D.MILD_CURSES);
    body.title = `${body.title} (the ${curse} version)`;
    body.twist = `${body.twist} CHAOS: ${pick(r, D.CHAOS_ESCALATION)} And because things are ${curse} enough already — ${lower(pick(r, D.CHAOS_ESCALATION))}`;
    stats.push({ label: "Chaos", value: opts.mature ? "Absolutely fucked (tier +1, at your discretion)" : "Thoroughly wrecked (tier +1, at your discretion)" });
  }
  return {
    category: opts.category, seed: opts.seed, tier: opts.tier, chaos: opts.chaos, ...body, stats,
    tags: [opts.category, tierLabel(opts.tier).toLowerCase(), ...(opts.chaos ? ["chaos"] : [])],
    favorite: false, collectionIds: [], notes: "", createdAt: now, updatedAt: now,
  };
}

export function toPlainText(c: Creation): string {
  return [
    `${c.title}`, c.subtitle, `[${categoryLabel(c.category)} · ${tierLabel(c.tier)} · seed ${c.seed}]`, "",
    `NARRATIVE\n${c.narrative}`, "", `ENCOUNTER HOOK\n${c.hook}`, "", `GAMEPLAY GUIDANCE\n${c.guidance}`, "", `TWIST\n${c.twist}`, "",
    `STATS\n${c.stats.map((s) => `- ${s.label}: ${s.value}`).join("\n")}`,
    c.notes ? `\nNOTES\n${c.notes}` : "",
    c.tags.length ? `\nTags: ${c.tags.join(", ")}` : "",
  ].join("\n").trim();
}
