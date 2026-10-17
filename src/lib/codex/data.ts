// Curated combinatorial tables. Original, system-agnostic grimdark content.

export const ADJ = [
  "Ashen", "Weeping", "Hollow", "Gilded", "Carrion", "Moth-Eaten", "Bleeding", "Silent", "Drowned",
  "Thorned", "Pale", "Rusted", "Starving", "Velvet", "Bone-White", "Smoldering", "Unblessed", "Shivering",
  "Lantern-Lit", "Forgotten", "Crooked", "Sainted", "Sunken", "Grinning",
];

export const NOUN_DARK = [
  "Choir", "Ossuary", "Lantern", "Widow", "Covenant", "Tithe", "Mire", "Abbey", "Eclipse", "Gallows",
  "Hearth", "Reliquary", "Tide", "Bell", "Throne", "Moth", "Wound", "Archive", "Candle", "Crown",
];

export const PLACES = [
  "the salt-crusted marsh of Vellmoor", "the tilted city of Orrin Low", "a monastery built inside a dead whale",
  "the Ashfields where no birds sing", "the drowned bell-towers of Carrow", "a forest of petrified hands",
  "the Iron Pilgrim's Road", "a border fort that forgot which kingdom it serves", "the catacombs under the grain exchange",
  "a lighthouse that shines darkness", "the plague-quarter of Saint Hesk", "a frozen battlefield still mid-charge",
  "the moth-gardens of the Pale Duchess", "a toll bridge older than the river", "the Hanging Orchards",
];

export const FACTIONS = [
  "the Order of the Unlit Wick", "the Grey Tithe-Collectors", "the Moth Synod", "the Brotherhood of the Second Grave",
  "the Ninefold Usurers", "the Penitent Hounds", "the Cartographers of Ruin", "the Salt Widows",
  "the Choir That Does Not Breathe", "the Mercenary Company of the Broken Oath", "the Ember Heretics",
];

// ---------- Cursed items ----------
export const ITEM_BASE = [
  "Dagger", "Lantern", "Signet Ring", "Hourglass", "Gauntlet", "Prayer Book", "Music Box", "Mirror", "Crown",
  "Bone Flute", "Locket", "Censer", "Spyglass", "Quill", "Shield", "Tarot Deck", "Key", "Cloak", "Bell", "Mask",
];
export const ITEM_MATERIAL = [
  "black iron worn smooth by too many hands", "yellowed ivory carved with tiny screaming faces", "tarnished silver that never warms",
  "bog-oak that weeps resin", "stitched leather the color of old bruises", "glass filled with slow grey smoke",
  "gold leaf over something softer", "bronze green with verdigris shaped like veins", "obsidian veined with violet light",
  "bone, unmistakably human, delicately polished",
];
export const ITEM_POWER = [
  "lets the bearer hear the last thought of anything it touches", "turns one lie per day into temporary truth",
  "makes the wielder unseen by anyone who has ever loved them", "stores a single breath that can revive the dying for one minute",
  "points toward whatever the bearer fears most", "lets the bearer borrow a stranger's face until dawn",
  "freezes a moment of time for everyone except the bearer", "answers any question — in the voice of a dead parent",
  "burns away curses by transferring them to the nearest candle", "summons a moth swarm that devours light and sound",
  "lets the bearer walk through any door they have previously locked", "grants unerring aim against anyone owed a debt",
];
export const ITEM_CURSE = [
  "Each use erases one of the bearer's happy memories — chosen by the item.", "The bearer's shadow begins lagging a heartbeat behind, and others notice.",
  "It must be fed a drop of blood at midnight or it whispers the bearer's secrets aloud.", "Animals refuse to approach the bearer; children stare and will not blink.",
  "Every use ages a random nearby person by one year.", "The bearer slowly forgets their own name; others still remember it.",
  "It cannot be discarded — it returns at dawn, warmer than before.", "Whenever it is used, a stranger somewhere wakes screaming the bearer's name.",
  "The bearer's reflection begins to act independently, small gestures at first.", "Food tastes of ash to the bearer while the item is carried.",
];
export const ITEM_ORIGIN = [
  "forged as penance by a smith who murdered his apprentice", "pulled from the stomach of a drowned saint",
  "won in a card game against something wearing a priest's skin", "once the property of a queen who was never crowned",
  "made by a moth-cult to hold the soul of their founder", "left on an altar the morning after a plague ended",
  "bartered for a firstborn's laughter", "recovered from a battlefield where both armies vanished",
];

// ---------- NPCs ----------
export const NPC_FIRST = [
  "Ysolde", "Marrow", "Corvin", "Hesk", "Benedetta", "Tobiah", "Wrenna", "Aldous", "Sabine", "Quillon",
  "Morwen", "Ignatz", "Pellam", "Odile", "Gristle", "Severine", "Ambrose", "Nettle", "Lucan", "Thessaly",
];
export const NPC_LAST = [
  "Ashgrave", "Vantablack", "Mothwick", "Saltmere", "Hollowell", "Crane", "Duskbarrow", "Fennimore",
  "Gallowglass", "Rookwood", "Thistlemourn", "Underhill", "Wormley", "Blackthorn", "Candlemas",
];
export const NPC_ROLE = [
  "gravedigger who charges by the regret", "disgraced inquisitor", "traveling tooth-merchant", "plague doctor with no medical training",
  "retired executioner turned florist", "bell-ringer who has not slept in nine years", "bounty hunter who only hunts ghosts",
  "cartographer of places that don't exist yet", "debt collector for a dead god", "orphanage matron with suspiciously few orphans",
  "taxidermist of extinct beasts", "former hero living under a false name", "riverboat oracle", "candle-maker who uses unusual tallow",
];
export const NPC_QUIRK = [
  "speaks only in questions when nervous", "keeps a live moth in a locket and consults it", "laughs at funerals, weeps at weddings",
  "collects the last coin of everyone they meet", "wears gloves of a different person's skin color each day — no one asks",
  "refuses to say any word starting with 'S'", "counts everyone's teeth when they smile", "carries a tiny coffin and names it Gerald",
  "insists it is always Tuesday", "tastes every object before trusting it", "hums funeral hymns as lullabies", "has three shadows and pretends it's normal",
];
export const NPC_WANT = [
  "wants to be forgotten completely, by everyone", "wants revenge on a sibling who is now a saint", "needs a corpse — specific, fresh, and noble",
  "wants to buy back their stolen reflection", "wants to see the sun one last time from the top of a cursed tower",
  "wants the party to deliver a letter to their own grave", "wants to break a contract signed in someone else's blood",
  "wants to marry the river", "wants proof that their god is real — or proof that it isn't",
];
export const NPC_SECRET = [
  "has been dead for a decade and doesn't know", "is the true heir to a throne they despise", "sold the party's hometown to a devil years ago",
  "is two children stacked in a long coat — very competent ones", "is the informant the villains rely on, and hates it",
  "remembers the party from a life they never lived", "is slowly turning into a moth, and is at peace with it",
  "murdered the person they claim to be", "is writing the party into a prophecy, for profit",
];

// ---------- Taverns ----------
export const TAVERN_A = ["Drowned", "Hanged", "Grinning", "Last", "Crooked", "Weeping", "Burnt", "Toothless", "Sleeping", "Third", "Bleak", "Velvet"];
export const TAVERN_B = ["Rat", "Saint", "Widow", "Lantern", "Moth", "Goat", "Gallows", "Bishop", "Candle", "Hound", "Crow", "Kettle"];
export const TAVERN_LOOK = [
  "a crooked three-story building propped up by a ship's mast", "a converted chapel whose pews are now bar stools",
  "a sunken cellar reachable only by ladder from a well", "a hall built around a petrified giant's ribcage",
  "a barge chained to the riverbank that drifts slightly each night", "a former courthouse with the gallows still in the yard",
  "a narrow tower where each floor serves a different century's drinks",
];
export const TAVERN_KEEPER = [
  "a one-eyed matron who never blinks the remaining eye", "twin brothers who insist they are the same man",
  "a retired assassin who polishes glasses with dangerous precision", "a ghost who still takes payment, somehow",
  "an anxious alchemist who brews everything on tap", "a former nun with knuckle tattoos reading PRAY and PAY",
];
export const TAVERN_DRINK = [
  "Gravedigger's Stout — thick, black, faintly warm", "Widow's Kiss — violet wine that numbs the lips",
  "Ember Mead — swallowed embers rise as harmless sparks from the drinker's ears", "Moth Milk — sweet, pale, and it remembers you",
  "Penitent's Gin — tastes like whatever you most regret", "Bonebroth Ale — brewed in an ossuary, surprisingly pleasant",
];
export const TAVERN_RUMOR = [
  "the mayor has been replaced by something wearing his hat", "the bells of the drowned chapel rang at noon yesterday",
  "a mercenary company is paying triple for anyone who can read", "the new well water makes people sleepwalk toward the old mine",
  "someone keeps leaving fresh flowers on the executioner's door", "the moth-priests are buying up every mirror in town",
];
export const TAVERN_PATRON = [
  "a knight in rusted armor who refuses to remove her helm", "a child selling maps drawn in blood-ink", "three grim pilgrims sharing one bowl of soup",
  "a bard whose songs come true, poorly", "a smuggler with a coffin that knocks back", "a scholar weeping over a book with blank pages",
];

// ---------- Encounters ----------
export const ENC_SETUP = [
  "A funeral procession blocks the road; the coffin is far too heavy and singing softly.",
  "The party finds a campsite where the fire is still warm and every bedroll holds a skeleton.",
  "A toll-keeper demands payment in memories, not coin.",
  "Fog rolls in carrying the sound of a wedding — in the middle of a battlefield.",
  "A bridge has been built overnight from interlocked shields bearing the party's family crests.",
  "A wounded messenger collapses at the party's feet with a letter addressed to a party member, dated next year.",
  "A village greets the party with a feast; every villager has the same face.",
  "Bells ring from beneath the lake; the water level begins to drop rapidly.",
  "A caravan of masked merchants offers to trade any item for 'something you won't miss.'",
];
export const ENC_FOE = [
  "hollow-eyed penitents armed with flails", "a pack of ash-hounds that bark in human voices", "bandits wearing stolen inquisitor robes",
  "moth-swarms that coalesce into a towering figure", "drowned soldiers still loyal to a dead king", "a lone duelist with no shadow",
  "starving wolves led by a well-dressed old man", "animated statues of martyred saints",
];
export const ENC_TERRAIN = [
  "a collapsing graveyard on a cliff edge", "knee-deep black water with unseen currents", "a field of tall dead wheat that whispers locations",
  "a burning chapel with a fragile bell tower", "a frozen river cracking under weight", "a narrow mountain pass hung with wind-chimes of bone",
];
export const ENC_COMPLICATION = [
  "an innocent is trapped in the middle of the fight", "the foes are trying to flee from something worse", "every death on this field raises again in 1d4 rounds",
  "a storm extinguishes all lights at the worst moment", "a rival party arrives with a competing claim", "the ground itself is the true enemy — and hungry",
];

// ---------- Plot twists ----------
export const TWIST_SUBJECT = [
  "The quest-giver", "The party's most trusted ally", "The villain", "The kingdom's beloved saint", "The tavern cat",
  "The prophecy itself", "The map the party has been following", "The party's patron deity", "The innocent child they rescued",
  "The town they swore to protect",
];
export const TWIST_REVEAL = [
  "has been dead since the campaign began, kept walking by a contract", "is the same person, separated by a broken mirror",
  "was written by the villain as bait", "is a debt being paid off by the party, unknowingly",
  "is the party themselves, from a failed future", "never existed — it's a collective hallucination spread by spores",
  "is protecting the world from something the party is about to free", "wants to be stopped and has been leaving clues",
  "made a bargain that requires the party's success to be fatal",
];
export const TWIST_CONSEQUENCE = [
  "Every victory so far has strengthened the true enemy.", "The reward the party was promised is the bait for a larger trap.",
  "One player character's backstory is now a lie — they must choose which version to believe.", "The map is now wrong; the land has moved to avoid them.",
  "A faction they angered is now the only one able to help.", "The next session's villain is someone the party saved.",
];

// ---------- Monsters ----------
export const MON_PREFIX = ["Gallows", "Hollow", "Choir", "Ash", "Moth", "Grave", "Thorn", "Lantern", "Weeping", "Salt", "Marrow", "Bell"];
export const MON_SUFFIX = ["Wight", "Mother", "Hound", "Shepherd", "Wyrm", "Leech", "Saint", "Maw", "Weaver", "Knight", "Horror", "Gaunt"];
export const MON_BODY = [
  "a towering frame of stitched funeral shrouds over a cage of ribs", "a crawling cluster of hands wearing rings of former victims",
  "a stag-skulled giant whose antlers are hung with prayer bells", "a pale, eyeless thing that moves like falling silk",
  "a hound the size of a cart, its fur made of cold ash", "a beautiful, weeping statue whose tears are acid",
  "a swarm of moths pretending, convincingly, to be a person", "a bloated eel-like wyrm that sings in children's voices",
];
export const MON_HABIT = [
  "lairs in abandoned chapels and rings the bell before it hunts", "feeds on secrets and grows larger for each one it hears",
  "only hunts those who have broken a promise", "steals the voices of its victims and uses them as lures",
  "is drawn to warmth, light, and laughter", "builds nests from the possessions of the grieving",
];
export const MON_ABILITY = [
  "Mimic Grief — it imitates the voice of someone the target lost.", "Ash Breath — a choking cone that extinguishes flames and blinds.",
  "Bell Toll — everyone who hears it must resist or flee in terror.", "Unravel — tears a strand of memory from the target; it gains a skill they knew.",
  "Hungering Shadows — its shadow fights independently.", "Martyr's Return — the first time it falls, it rises at half strength.",
  "Moth Burst — scatters into a swarm, ignoring weapon blows for a round.", "Grave Grip — roots a target to the ground with clutching dead hands.",
];
export const MON_WEAKNESS = [
  "Silver bells, rung in mourning", "Honest confession spoken aloud in its presence", "Salt and running water",
  "Being called by its true name", "Sunlight through stained glass", "Fresh flowers laid on its lair",
  "Fire fueled by a cherished possession", "Laughter it cannot mimic",
];

// ---------- Chaos mode ----------
export const CHAOS_ESCALATION = [
  "Halfway through, the moon cracks and a second, smaller moon falls out.",
  "Every NPC in the region simultaneously remembers a grudge against the party.",
  "A god takes a personal, petty interest in the party's failures.",
  "The party's horses unionize and present a list of demands.",
  "All coins the party carries begin screaming when spent.",
  "The villain gets a promotion. Their new boss is worse.",
  "A cheerful bard begins narrating the party's actions aloud, accurately and loudly.",
  "Gravity forgets one direction for the rest of the session.",
];
export const MILD_CURSES = ["blasted", "wretched", "accursed", "infernal", "bloody-minded"];
export const SALTY_CURSES = ["damned", "godsdamned", "hell-spawned", "bastard", "bloody"];
