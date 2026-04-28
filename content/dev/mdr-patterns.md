---
title: "MDR / Andrealphus UI/UX Teardown"
description: "Screen-by-screen analysis of the reference game's interaction patterns, with adaptation notes for our project."
category: "Dev Reference"
order: 8
status: "canonical"
route: "neutral"
tags: ["reference", "ui", "ux", "patterns", "andrealphus"]
---

# MDR / Andrealphus UI/UX Teardown

LO's reference for our project is **My Demonic Romance** by **Andrealphus Games** (May 2024) — a succubus-romance VN with hand-drawn animation and stat-driven choice progression. MDR shares mechanical DNA with the studio's flagship *Love & Sex: Second Base* (the patterns documented here come from both, since the studio reuses systems heavily across titles).

This page is a screen-by-screen teardown of what makes that game's UI/UX work, why those choices matter, and how we adapt each pattern for our own game. It is **not** a copy directive — patterns are reimplemented in our visual language, never traced.

> [!proposal]
> **Naming convention.** When I refer to "MDR" below I mean the broader Andrealphus design language, including L&S:SB. When a pattern is unique to MDR specifically (succubus, demonic theme, single-LI focus) I'll call it out.

---

## 1. The Daily Hub

The hub is the screen the player sees more than any other. Andrealphus's hub is a **location-based action grid**, not a list of activities.

### What they do

- Background art is the location itself (kitchen, mall, park) — not a UI chrome over a flat color.
- Available actions appear as **icon buttons overlaid on the scene** in semantically reasonable spots (the fridge gives "eat," the bed gives "sleep").
- Hovering any action reveals a tooltip with **time cost in hours** and any prerequisite checks (energy, money, items).
- Time-of-day and season visibly change the art (lighting shift, snow vs. sunlight) without forcing the player to track it abstractly.
- Top of screen: clock, calendar date, money, weather indicator. Bottom or side: need bars (Energy / Hunger / Hygiene / Fun).

### Why it works

Player decisions feel **physical**. You're not selecting "Bedroom Action #3" from a menu — you're clicking the bed in your bedroom. This grounds the simulation. The tooltip-reveals-cost pattern lets the player plan turns without memorizing system rules; everything is queryable on hover.

The art-changes-with-time-and-season pattern does enormous work for free: players feel the passage of time in their eyes before they read the date in the corner. Snow falling outside the kitchen window is a more honest signal than "Day 67 of Winter."

### How we adapt

- **Keep:** Location-as-background, hover-tooltips on every action, top-bar clock/day/money, lighting shift between day/night.
- **Adapt:** Our locations (Tavern, Dark Alley, Night Market, Adventuring map) replace MDR's domestic spaces. Same pattern, fantasy-coded. The Adventuring node is the only "abstract menu" — every other location should be paintable.
- **Diverge:** MDR has ~15 locations; we plan ~6 for v1. Their hub-density makes sense for a sandbox; ours should feel curated. Quality over quantity.

> [!dev]
> **Ren'Py implementation.** This is a single `screen daily_hub:` with `imagebutton` actions positioned over a `Solid` or `Image` background. Each `imagebutton` has `idle`, `hover`, `action`, and `tooltip` properties. See `dev/renpy-implementation` for the exact code skeleton.

---

## 2. The Phone-as-Menu

Andrealphus's most underappreciated invention. The character's smartphone is the master menu.

### What they do

The phone is a screen-overlay panel with diegetic icons:

- **Profile** — character stats (libido, luck, sexperience, skills, name, birthday)
- **Contacts** — all met romance options as portrait cards; tap to view, call, or message
- **Calendar** — upcoming dates and appointments
- **Messages** — direct text-message UI for every LI
- **Settings** — services (cleaning, PI), audio config, etc.
- **Wiki** — link to the official wiki (yes, in-game, in the menu)
- **Achievements** — completed and locked

### Why it works

The phone solves the **VN menu problem**. Most VNs hide stats behind clunky pause-menu screens that feel like spreadsheets. Andrealphus diegetically justifies every menu by saying "you're looking at your phone" — and players accept it because that's how phones work in real life. The pause-menu becomes part of the fiction.

Secondarily, the contacts-as-portraits pattern doubles as a **roster the player feels protective of**. Seeing a girl's portrait in your contacts after meeting her is a low-effort attachment moment.

### How we adapt

- **Keep:** Diegetic menu container, contact cards as portraits, in-fiction calendar.
- **Diverge:** A smartphone in our fantasy setting is anachronistic. Our diegetic menu is a **leather-bound journal**. Same eight tabs, same pattern, different skin:
  - Profile → "Adventurer's Page"
  - Contacts → "Companions" (Ryoka, Yuriko, Elara, Brennan, the Antagonist when known)
  - Calendar → "Almanac" (week ahead with festival days, deadlines, the Day 45 Crucible warning at Day 40)
  - Messages → letters/notes (lower frequency than texts; written by NPCs, hand-illuminated)
  - Settings → in-fiction services (hire a courier, buy a household ward)
  - Wiki → omitted (we are the wiki)
  - Achievements → "Deeds & Records"

> [!proposal]
> **Inkwell affordance.** A leather journal opens with a feather-quill cursor on hover. Each tab is a ribbon bookmark protruding from the page edge. This is the single most distinctive UI signature we can have, and it's free design value.

---

## 3. Dialogue Box & Choice Menus

### What they do

- Dialogue box sits in the lower third of the screen — semi-translucent black with a subtle border, character name in a small label at top-left of the box.
- Character art is a static or lightly-animated sprite filling most of the screen.
- Choice menus appear as a vertical list of **full-width buttons** centered, semi-translucent, with hover state lightening the background.
- Some choices are gated by stat checks and **show the requirement inline**: `[Charm 25+] Compliment her dress` — fail-state shown grayed-out but still readable, so the player understands what they're missing.

### Why it works

The "show the gate, even if locked" pattern is genius design. It tells the player: "this game is consistent — your stats matter, and there are doors you haven't opened yet." It also functions as **soft questing** — the player sees a locked option and forms a goal to come back stronger. Compare to games that hide gated options entirely; those leave the player wondering if they exhausted the content.

Translucent dialogue boxes (vs. opaque) keep the character art breathing. Fully opaque boxes feel like television; translucent feels like comics.

### How we adapt

- **Keep:** Translucent dialogue box, inline stat-gate display on choices, character name label.
- **Adapt:** Our dialogue box uses the same parchment-and-ink language as the wiki — cream background, sepia border, illuminated drop-cap on the speaker's name.
- **Diverge:** MDR uses a single dialogue position. We add a **second mode** for fragment-vignettes (Antagonist POV memories from the Dark Alley): full-screen blackletter text on parchment, no character art, no speaker label. Visually quotes the *book within a book* trope — these aren't dialogue, they're reading.

> [!warning]
> **Don't gray-out gated choices that would spoil plot.** Andrealphus shows `[Charm 25+]` because Charm is meta-knowable. We should NOT show `[Memory Fragment 7+] Confront the Antagonist` because that telegraphs lore beats. Stat-gates: visible. Story-gates: invisible until earned.

---

## 4. Stat Display & Need Bars

### What they do

- Top-of-screen status strip: clock, day, season icon, money, current location.
- Bottom-of-screen (or behind a phone tab): four colored bars for the **Needs** — Energy, Hunger, Hygiene, Fun.
- Bars use **traffic-light states**, not numeric percentages: green (safe), yellow (warning, blocks some actions), red (critical, blocks most actions).
- Hovering any bar reveals exact numeric values for power-users.

### Why it works

Color states encode **what the value means for gameplay**, not just its magnitude. Yellow = "you should fix this soon," red = "you can't proceed without fixing this." Players make decisions on color, not number. Hover-for-numbers serves the optimizers without forcing the casual player to read math.

### How we adapt

- **Keep:** Traffic-light state bars, hover-for-numeric.
- **Diverge — and aggressively trim.** Four needs is too much for our action-economy. Andrealphus has 4 needs to support a 124-day open sandbox. We have a 90-day focused tragedy/romance with combat. Two needs:
  - **Stamina** — depleted by combat and intimate scenes; restored by sleep, tavern meals, healing items.
  - **Coin** — money. (Not technically a "need" but it lives in the same UI strip.)
- **Add a third bar that MDR doesn't have:** **Curse Severity** — visible to the player as a subtle red mist creeping into the status strip background as the value rises. This is the diegetic-stat overlay from `dev/renpy-implementation`.

> [!proposal]
> **Suspicion stays hidden.** Per the suspicion mechanic doc, we never show suspicion as a bar. Show it only through dialogue tells (Ryoka's narrowed eye, Yuriko's pointed question). Andrealphus does the same with Yandere — Kylie's mood is felt through scene tone, not a meter.

---

## 5. Character Cards (Profile Pages)

### What they do

Each romance option has a profile page accessible from the phone's contacts tab. The page shows:

- Portrait
- Name, age, occupation
- Relationship status (girlfriend, slave, mistress, etc.)
- Current Love / Girl / Kink stats
- "Last met" date
- Trait tags (Dominant, Bookworm, Geek, etc.)
- Liked/disliked activity icons
- Sexperience counter (per-character), gift history
- Mini-thumbnails of unlocked CGs from her route

### Why it works

The character card is **a roster, a scoreboard, and a memory aid in one panel**. New players use it to remember "wait, what did Sasha like?" Veterans use it to plan optimal dates. Completionists use the CG mini-thumbnails as a checklist. One screen serves three player types.

The trait-tag system is especially clever: Andrealphus uses tags like `Bookworm` and `Sportsy` to systematically affect what date activities give Love Points. The card surfaces those tags so the player can build outfits and plan activities to match. It's a Pokemon type-chart for romance.

### How we adapt

- **Keep:** Portrait, stats, trait tags, liked/disliked activities, scene thumbnails.
- **Adapt:** Five characters total (Ryoka, Yuriko, Elara, Antagonist, Brennan). Each gets a Companion Page. Cards include `corruption` and `affection` per girl, `suspicion` (visible only as a mood indicator: "watchful," "curious," "guarded" — not numeric), and `curse_severity` reflection where relevant.
- **Add:** Memory Fragments collected (count + list, only for the Antagonist's page). Doubles as the lore index.

> [!dev]
> **Ren'Py implementation.** Use `screen companion_card(char):` with `Image` for portrait, dynamic `Text` blocks pulling from per-character stat dicts, and `vbox`-stacked trait `Frame`s. Tag colors come from the trait's category (warm tones for affection-positive, cool for combat/utility, red for corruption-aligned).

---

## 6. Story Tracker

### What they do

Top-right of the screen is a small panel showing **active story threads** — what the player should do next to advance each LI's storyline. Each entry has:

- LI portrait + name
- Current goal in plain English ("Reach Charm 30 to be invited to the office party")
- Optional **Spoilers eye-icon** — clicking reveals exact stat thresholds and event triggers
- Filters: Active / Completed / Closed

### Why it works

This solves the **branching VN's worst problem**: players forgetting where they were in a route. The tracker is also the game's **honesty surface** — by showing exact requirements behind the spoiler-eye, Andrealphus tells players "we're not hiding the math, we're respecting your time."

The Closed filter (storylines that the player permanently locked out) doubles as a record of consequences. You see the closed entry and remember: that's the route I gave up.

### How we adapt

- **Keep:** Tracker panel position, portrait+goal pattern, spoiler-eye toggle, active/completed/closed filters.
- **Adapt:** Our trackers are written in the Antagonist's narrative voice when they relate to corruption goals ("She watches the kitchen door more often these days. Wait."), and in Elara's voice when they relate to the Cure Quest ("The fourth artifact lies beyond the Sundered Pass. Bring it before midwinter."). Diegetic copy makes the panel feel like character notes, not a quest log.
- **Diverge:** MDR has ~21 active threads at a time. We have at most ~6. The panel is **less dense, more readable, more lyrical**. Each entry can afford to be three lines instead of one.

---

## 7. Inventory / Backpack

### What they do

A backpack icon present on nearly every screen opens a four-tab inventory:

- **Gifts** — items to give to LIs, organized alphabetically with thumbnails
- **Clothes** — equippable, shows current outfit and accessory slot
- **Usable** — consumables (medicine, blue pill, books, food)
- **Items** — plot items (key, photograph, slave collar, etc.)

### Why it works

The four categories map to **player intent**: when I open the backpack, I already know roughly which tab I want. The mental cost of finding an item is near-zero. Andrealphus does NOT mix categories or require sorting — they pre-categorized at design time, so the player never has to.

### How we adapt

- **Keep:** Four-tab structure, pre-categorized at design time, thumbnails for every item.
- **Same four tabs, renamed:**
  - **Gifts** (same)
  - **Garb** (clothes/armor; we have fewer slots than MDR — main outfit only, no accessory slot in v1)
  - **Consumables** (potions, food, scrolls)
  - **Relics** (plot items: Memory Fragments, Cure Quest artifacts, the Marked Pendant)
- **New addition:** the **Shady** subcategory of consumables (aphrodisiacs, suspicion-suppressors). Under-the-counter. Visually styled differently in the inventory grid — drawn with a dog-eared label as if not officially catalogued.

> [!proposal]
> **Memory Fragments under Relics, not Lore.** We had `lore/fragments.md` as the design doc, but in-game the player collects fragments as physical items dropped at the Dark Alley. They live in the **Relics** tab, with a small icon that grows in detail as you collect more (a torn page → a bound bundle → a sealed grimoire by fragment 10). Visual progression for free.

---

## 8. Date Score Bar

This pattern is unique to Andrealphus and we should steal it outright.

### What they do

When on a date, a horizontal bar appears at the top of the screen showing the **Date Score** — how the date is going moment-to-moment. Choices and activities fill or deplete the bar. At the end of the date, threshold determines whether you get the after-date sex scene.

The bar:
- Updates in real-time as the player makes choices
- Has subtle particle/glow effects when filling rapidly
- Displays the threshold visually (dashed line at "successful date" mark)
- Goes red below a critical threshold (failed date warning)

### Why it works

It transforms a dialogue tree into a **gameplay feedback loop**. Every choice has visible consequence within seconds. Players learn the patterns of a girl's preferences not by reading a guide but by watching the bar respond. It's also tense in a good way — late in the date, when the bar is at 40 and you need 45 to clear the threshold, every choice matters.

### How we adapt

- **Keep:** Real-time date-score bar with threshold marker. **Use it for the Day 45 Crucible scene specifically.**
- **Repurpose:** During the Crucible, the bar represents `commitment_clarity` — does the protagonist know what they want? Ambiguous choices fill it slowly; decisive ones fill it fast. At the end, the bar's value picks which Crucible variant scene fires (Vanilla / NTR / Split / Tragedy).
- **Diverge:** Don't use this bar in normal scenes. It would be over-mechanizing romance dialogue, which we want to stay literary. The bar appears only at the four narrative crucibles: Day 45 Crucible, Cure Quest Final Ritual, Antagonist Confrontation, the Day 90 Endgame.

---

## 9. Save Slot Culture

### What they do

- Nine pages of hard saves × 6 slots per page = 54 save slots per page set, plus autosave and quicksave pages.
- Save filenames are user-editable strings.
- Save thumbnails are screenshots from the moment of save.
- Players are explicitly told in tutorials and the wiki: "save before any major decision."

### Why it works

Andrealphus's design philosophy is **branching is consequential, so saves are tools**. They actively encourage players to keep multiple saves rather than play through linearly. This serves the multi-route design — with 21 girls and dozens of branching events, "playing perfectly" is impossible without saves.

### How we adapt

- **Keep:** Multiple named save slots, screenshots-as-thumbnails, encourage saving before crucible events.
- **Add:** **Auto-save before the Day 45 Crucible and Day 90 Endgame.** These are the two highest-stakes choice points. An unrecoverable wrong choice without warning is bad design. Force-save with a clear "Crucible approaching" notification on Day 40 and Day 85.
- **Diverge:** Our route-lock at Day 45 is more committal than MDR's events. We owe the player a save warning.

---

## 10. The Built-In Avoidable NTR Mechanic

This is the most directly relevant pattern. **Andrealphus already invented this and players love it.**

### What they do

Several romance options in *Love & Sex: Second Base* have NTR scenes that are **avoidable through stat thresholds**:

- **Alexis's NTR with Ryan** — avoidable by raising Charm AND Fitness to 25+ before her first date call.
- **Sasha's NTR with Scottie** — avoidable by getting her Love Points over 50 before the trigger.
- **Audrey** — requires the protagonist to defend her in a fight, which fails if Fitness is too low.

Players who want the NTR content can simply not meet the thresholds. Players who want to avoid it have a clear, telegraphed system. Both player types are served by the same content.

### Why it works

This is the genre's central design problem solved elegantly. Hardcore NTR-lovers and NTR-avoiders are typically **opposing audiences** — most games pick one and lose the other. Andrealphus pleases both by **making avoidance a skill check**. The player who avoids feels rewarded for their stats. The player who triggers NTR feels rewarded for their narrative choice.

The genius detail: Andrealphus does **not** label these as "NTR avoidance opportunities." The thresholds are just regular stat thresholds. The player learns from playing, or from the wiki, or from forum culture. The game itself remains diegetic.

### How we adapt

- **This is canonical for our design.** Our existing systems already follow this pattern: per-girl `affection ≥ 50` at the Day 45 Crucible avoids the Vanilla→NTR drift. Per-girl `corruption < 50` at the Crucible avoids the locked NTR.
- **What we add that MDR doesn't have:** the **active-witness three-button choice** (Intervene / Watch / Walk away). MDR's NTR-avoidance is passive (high stats = scene doesn't fire). Ours is **active** — even when the scene fires, the player still chooses their stance. This is a step beyond the reference.

> [!warning]
> **The Andrealphus comment culture.** Read MDR/L&S:SB forum threads and you'll see players demanding more avoidable-NTR content from BOTH camps. Avoiders want robust avoidance. Indulgers want satisfying triggers. The shared demand is **mechanical clarity**. Players hate when avoidance feels like RNG. Make our thresholds documented and consistent — never random.

---

## What We Inherit vs. Diverge

| Pattern | Source | Our Choice |
| --- | --- | --- |
| Location-as-background hub | MDR | **Inherit** |
| Hover-tooltips on actions | MDR | **Inherit** |
| Diegetic phone-as-menu | MDR | **Adapt** (leather journal) |
| Translucent dialogue box | MDR | **Inherit** (parchment skin) |
| Inline stat-gate on choices | MDR | **Inherit** (with story-gate carveout) |
| Four needs system | MDR | **Diverge** — drop to one (Stamina) + Coin |
| Traffic-light status bars | MDR | **Inherit** |
| Character cards in contacts | MDR | **Inherit** + Memory Fragment counter |
| Trait-tag system on cards | MDR | **Inherit, simplified** (5 tags max per char) |
| Story tracker top-right | MDR | **Inherit** + lyrical voice |
| Spoiler-eye toggle | MDR | **Inherit** for stat-gates only |
| Four-tab backpack | MDR | **Inherit, renamed** (Gifts/Garb/Consumables/Relics) |
| Date Score bar | MDR | **Repurpose** for the four narrative crucibles only |
| Multi-save culture + autosave | MDR | **Inherit** + force-save before Day 45 / Day 90 |
| Avoidable-NTR via stat thresholds | MDR | **Inherit and extend** with active three-button choice |
| 21 LIs, 4-season sandbox | MDR | **Diverge** — 5 main characters, single 90-day arc |
| 4 hours per action × 24-hour days | MDR | **Diverge** — coarser day/night two-phase loop |

---

## Files to read next

- [`dev/renpy-implementation`](/wiki/dev/renpy-implementation) — code skeletons for each screen above
- [`dev/scope`](/wiki/dev/scope) — scope reality check; some MDR patterns we explicitly cut
- [`mechanics/route-lock`](/wiki/mechanics/route-lock) — where Date Score bar gets repurposed
- [`mechanics/suspicion`](/wiki/mechanics/suspicion) — why MDR's hidden-Yandere pattern is our reference
- [`lore/fragments`](/wiki/lore/fragments) — the Memory Fragment system, equivalent in role to MDR's CG gallery

> [!lore]
> **A note on tone.** MDR is sensual-comedic. Our game is sensual-tragic. Same chassis, different engine note. We can inherit Andrealphus's UI patterns wholesale because UI is genre-agnostic; what we must NOT inherit is their **comedic tone in copy**. Our tooltips, item descriptions, and tracker entries should read like a 1920s gothic romance, not a 2024 horny sitcom. Keep the structure. Replace the voice.
