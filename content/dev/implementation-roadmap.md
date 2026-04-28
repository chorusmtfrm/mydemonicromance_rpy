---
title: Implementation Roadmap
category: Dev Reference
route: shared
status: canonical
order: 2
summary: Ordered build queue. Each phase has a goal, the files it touches, the variables/labels it introduces, and the acceptance criteria that mark it done.
tags: [roadmap, plan, phases, acceptance]
---

The phases are ordered for **agent ergonomics** — each builds on the
previous, leaves the build in a runnable state, and has a single
clear acceptance criterion you can check by booting the game.

If you are an agent, work in order. Don't skip ahead. If you finish
a phase, run the acceptance check, commit, and *then* move on.

## Phase summary

| # | Phase | State | Acceptance |
| --- | --- | :---: | --- |
| 0 | Foundations: rebrand, content warning, Day 1 cold open | **DONE** | Game boots, splash → CW → Day 1 plays through to "End of build" placeholder. |
| 1 | Day-loop scaffold: name prompt, hub, persistent overlay | TODO | Player can name MC, see hub, watch counters update across days. |
| 2 | Day 2 + Tavern affection scene | TODO | Day 2 plays end-to-end with one Ryoka or Yuriko tavern scene reachable. |
| 3 | Combat system extension: sabotage submenu, suspicion gating | TODO | Three combat encounters exist; sabotage opens a four-option submenu; suspicion≥30 locks one option. |
| 4 | Locations: Dark Alley + Memory Fragments, Night Market shop | TODO | Both locations selectable from hub; Dark Alley drops one fragment per visit; Night Market sells gifts and shady items. |
| 5 | Milestone events: Day 30 mark advance, Day 45 Crucible, Day 90 cap | TODO | All three fire on schedule; route_locked is set by Day 45; Tragedy ending fires if uncommitted at Day 90. |
| 6 | Endings: six ending labels + ending selector | TODO | All six endings reachable via deterministic stat configurations; selector at Day 90 picks the right one. |
| 7 | Cure Quest: four steps, curse_severity decrement | TODO | Vanilla path can clear all four steps; final ritual ends in romantic climax scene. |
| 8 | Achievements migration | TODO | All six endings + first-fragment + first-cure-step grant achievements. |
| 9 | Asset passes: backgrounds, character sprites, music | OPEN | Replace `room.jpg` with three real bgs minimum; commission or generate Ryoka/Yuriko/Brennan sprites. |
| 10 | Polish: typo pass, scene re-read, balance pass on stat numbers | OPEN | Full play-through with one tester. No softlocks. |

---

## Phase 1 — Day-loop scaffold

**Goal.** A working day loop that survives across days and shows the
player what's happening.

**Files.**

- `game/systems/state.rpy` (new) — move the canonical `default` block
  here from `script.rpy`.
- `game/systems/hub.rpy` (new) — the hub screen and `label day_hub`.
- `game/systems/overlay.rpy` (new) — the persistent stats overlay.
- `game/chapters/day_01.rpy` (new) — extract Day 1 from `script.rpy`.
- `game/script.rpy` — slim down to splash + cast + entry point.

**Variables introduced.**

```python
default mc_name = "Kael"           # set via prompt before Day 1
default hub_actions_today = 1      # 1 morning + 1 night = 2 actions/day, but day 1 has 0
default show_stats_overlay = False # toggleable in prefs
```

**Labels introduced.**

- `label name_prompt` — fires before `start`.
- `label day_hub` — the four-choice picker (Tavern / Adventure /
  Market or Alley / Sleep).
- `label day_advance` — increments `day_count`, decays suspicion,
  checks milestone events.

**Acceptance.**

Boot the game. Name prompt appears, accept the default. Day 1 plays
through. After Day 1's combat, the player lands in the hub. Choose
Sleep. `day_count` increments to 2. Hub re-displays. Counters in
the overlay (if toggled on) reflect the changes from Day 1's
combat choice.

**Invariants.**

- Hub uses `screen day_hub_choice():` not a Ren'Py `menu:` so
  ENI's design with text-balance / icons is buildable later.
- Overlay is a `screen stats_overlay():` toggled by `show_stats_overlay`
  and pinned via `tag` so it survives transitions.

---

## Phase 2 — Day 2 + Tavern affection scene

**Goal.** Prove the day loop ships dialogue, not just plumbing. One
Tavern scene per girl is enough.

**Files.**

- `game/chapters/day_02.rpy` (new)
- `game/scenes/tavern_ryoka_01.rpy` (new) — first Ryoka tavern scene.
- `game/scenes/tavern_yuriko_01.rpy` (new) — first Yuriko tavern scene.
- `game/locations/tavern.rpy` (new) — `label go_tavern` and the
  scene picker (which girl, which scene number).

**Variables introduced.**

```python
default tavern_visits = 0
default tavern_ryoka_scenes_seen = []   # list of scene IDs
default tavern_yuriko_scenes_seen = []
```

**Acceptance.**

Day 2 boots. Player picks Tavern. Picks Ryoka. The first Ryoka
tavern scene plays. Affection +5. Returns to hub. Picks Sleep.
Day 3 starts.

**Notes.**

- Tavern scenes are 200-400 word vignettes. Don't go longer.
- Each scene must end with the girl's affection updated and a
  return to `day_hub`.
- Brennan can appear as a side beat in Tavern scenes; he doesn't
  need his own scene yet.

---

## Phase 3 — Combat system extension

**Goal.** Replace the three-button stub from Day 1 with a real combat
system: Support / Sabotage / Watch, with Sabotage opening a four-
option submenu, and suspicion soft-gating.

**Files.**

- `game/systems/combat.rpy` (new) — `label fight_encounter(enemy_id)`
  that any chapter can call.
- `game/data/enemies.rpy` (new) — enemy data dict.
- `game/data/combat_lines.rpy` (new) — the dialogue table for
  each (enemy × action × girl) cell. Big file. OK to start small.

**Variables introduced.**

```python
default combat_log = []                  # last N actions for tone callbacks
define ENEMY_TABLE = { ... }             # enemy_id → {hp, lines, defeat_xp}
define SABOTAGE_OPTIONS = [
    "drop_potion", "trip_partner", "loose_armor", "distract_focus"
]
```

**Acceptance.**

A second combat encounter exists (any chapter, doesn't need to be
plot). Player picks Sabotage. Submenu shows 4 options. Two of them
require items from inventory (gated). One is locked because Ryoka's
suspicion ≥ 30. Choosing an unlocked option plays the matching
dialogue line and updates corruption + suspicion correctly.

**Invariants.**

- Combat **never** has HP bars in UI. The girls always win after N
  rounds. The player's actions only change the *flavor* of the win
  and the *stats* afterward.
- Sabotage submenu must show locked options as disabled with a
  reason ("Ryoka is watching you carefully"), not hide them.

---

## Phase 4 — Locations: Dark Alley + Night Market

**Goal.** Two new hub destinations. Alley drips Memory Fragments;
Market sells gifts and shady items.

**Files.**

- `game/locations/dark_alley.rpy` (new)
- `game/locations/night_market.rpy` (new)
- `game/lore/fragments.rpy` (new) — fragment definitions (one
  Python dict, prose pulled from
  [Fragment Pool](/wiki/lore/fragment-pool)).

**Variables introduced.**

```python
default memory_fragments = []           # already declared in Phase 1
default fragment_pool = [               # ordered, not random — see wiki
    "fragment_01", "fragment_02", ...
]
default gold = 0
default inventory = {
    "consumables": {}, "key_items": [], "gifts": {}, "shady": {}
}
```

**Acceptance.**

From the hub, both Dark Alley and Night Market are selectable at
night. Visiting Alley drops the next unseen fragment from the pool
and shows it as a 200-word vignette. Visiting Market shows the
buy-list with gold cost; buying a gift increments
`inventory["gifts"][item_id]`.

**Invariants.**

- Fragments come from the pool **in order** (priority-ordered),
  not random. See [Memory Fragments](/wiki/lore/fragments).
- Buying shady items raises that girl's `_corruption` if used in a
  later sabotage. Don't apply corruption at *purchase* time.

---

## Phase 5 — Milestone events

**Goal.** Three scripted events fire on schedule.

**Files.**

- `game/events/day_30_mark.rpy` — NTR Mark advances to Stage 2 if
  any corruption ≥ 50.
- `game/events/day_45_crucible.rpy` — the route lock event. Four
  scripted variants per the wiki.
- `game/events/day_90_cap.rpy` — final day. Checks
  `route_locked` and jumps to the appropriate ending label.

**Labels introduced.**

- `label day_30_mark`
- `label day_45_crucible`
- `label day_45_dual_fall_lock`, `label day_45_split_crucible`,
  `label day_45_vanilla_lock`, `label day_45_uncommitted_lock`
- `label day_90_finale`

**Acceptance.**

Skip days (debug menu) until Day 30. Mark scene plays. Day 45.
Crucible fires with the variant matching current stats. Day 90.
Final scene plays and jumps to an ending label.

**Invariants.**

- Day 45 fires *after* the player's morning action, not before.
- Day 90 ignores the hub entirely — player wakes and the scene
  plays, no choice.

---

## Phase 6 — Endings

**Goal.** All six endings reachable.

**Files.**

- `game/endings/ending_vanilla_harem.rpy`
- `game/endings/ending_vanilla_one.rpy` (parameterized by girl)
- `game/endings/ending_ntr_total.rpy`
- `game/endings/ending_ntr_one.rpy` (parameterized by girl)
- `game/endings/ending_bittersweet.rpy` (parameterized by saved girl)
- `game/endings/ending_tragedy.rpy`
- `game/systems/ending_selector.rpy` — `label compute_ending` that
  computes the correct ending and jumps.

**Acceptance.**

Six debug entry points (one per ending) all play through to credits
without softlocking. `compute_ending` produces the correct ending
for each canonical end-of-game stat configuration documented in
[Endings](/wiki/plot/endings).

---

## Phase 7 — Cure Quest

**Goal.** The four-step quest that decrements `curse_severity`.

**Files.**

- `game/cure_quest/step_1_fetch.rpy`
- `game/cure_quest/step_2_boss.rpy`
- `game/cure_quest/step_3_dialogue.rpy`
- `game/cure_quest/step_4_ritual.rpy`
- `game/cure_quest/quest_state.rpy` — `cure_quest_step` counter
  and the gating logic.

**Acceptance.**

After Vanilla lock at Day 45, the four steps unlock one per ~10
days. Each completes and decrements `curse_severity`. Step 4 plays
the ritual scene with the chosen partner and ends in `ending_vanilla_*`.

---

## Phase 8 — Achievements

**Goal.** Migrate the AIO template's demo achievements to ours.

**Files.**

- `game/0bobcachievements.rpy` — replace `BOBCACHIEVEMENT_LIST` per
  [AIO Template Reference](/wiki/dev/aio-template).

**Acceptance.**

Reaching any of the six endings grants the matching achievement.
First fragment grants `first_fragment`. First cure step grants
`first_cure`. All achievements visible in the achievements screen
with proper names + descriptions.

---

## Phase 9 — Assets

**Goal.** Replace placeholder `room.jpg` with real backgrounds and
add character sprites.

**Suggested minimum.**

- `bg tavern_common`
- `bg tavern_room`
- `bg dark_alley`
- `bg night_market`
- `bg forest_path`
- `image ryoka` (3 expressions: neutral, smiling, suspicious)
- `image yuriko` (3 expressions)
- `image brennan` (1 expression)

Audio: keep the AIO template's music tracks for now. Add 3-5
custom tracks for tonal variety (cure-quest motif, NTR motif,
combat motif).

---

## Phase 10 — Polish

Typo sweep, balance pass on stat numbers (gut-check each transition
threshold), one full tester play-through.

After Phase 10, the build is a 0.5.0 release candidate.
