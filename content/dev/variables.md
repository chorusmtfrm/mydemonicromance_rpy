---
title: Variable Reference
category: Dev Reference
route: shared
status: canonical
summary: Every persistent variable, its type, default, range, and the labels that mutate it. Single source of truth — drift here causes save/load bugs at scale.
order: 1
---

# Variable Reference

This page is canonical. **If a label mutates a variable, that label MUST appear in the "mutated by" column.** Frontmatter status `canonical` means: review every change here against the live `.rpy` files at end of sprint.

## Per-girl progression

| Variable | Type | Default | Range | Mutated by |
|---|---|---|---|---|
| `ryoka_affection` | int | 0 | 0..100 | `tavern_*`, `gift_give_ryoka`, `combat_support_ryoka` |
| `ryoka_corruption` | int | 0 | 0..100 | `combat_sabotage_ryoka`, `pact_tier_*`, `cursed_charm_tick`, `ntr_witness_watch_ryoka` |
| `ryoka_suspicion` | int | 0 | 0..100 | `combat_sabotage_ryoka` (+5 per use), `shady_item_caught`, `confrontation_lie`, `day_advance` (decay -1) |
| `ryoka_mood` | str | "neutral" | enum | `tavern_dialogue_router`, `combat_aftermath`, `confrontation_*` |
| `ryoka_suspicion_lock_until` | int | 0 | day | set by suspicion threshold crossings |
| `yuriko_affection` | int | 0 | 0..100 | `tavern_*`, `gift_give_yuriko`, `combat_support_yuriko` |
| `yuriko_corruption` | int | 0 | 0..100 | `combat_sabotage_yuriko`, `pact_tier_*`, `whisper_stone_use`, `ntr_witness_watch_yuriko` |
| `yuriko_suspicion` | int | 0 | 0..100 | symmetric with Ryoka |
| `yuriko_mood` | str | "neutral" | enum | symmetric with Ryoka |
| `yuriko_suspicion_lock_until` | int | 0 | day | symmetric with Ryoka |

`mood` enum: `"neutral" | "elated" | "sulking" | "wary" | "broken"`. The last two are only reachable via specific corruption thresholds.

> [!dev]
> Per-girl `suspicion` is **hidden from the UI**. It surfaces only as dialogue tells (narrowed eyes, pointed questions). A visible bar kills the predator-fantasy tension. See [Suspicion](/wiki/mechanics/suspicion).

## Routing

| Variable | Type | Default | Range | Mutated by |
|---|---|---|---|---|
| `route_locked` | str/None | None | `"vanilla" \| "ntr" \| "bittersweet"` | `day_45_crucible` only |
| `vanilla_score` | int | 0 | derived | per-day from `cure_quest_step + (ryoka_affection + yuriko_affection)/2` |
| `ntr_score` | int | 0 | derived | per-day from `pact_tier * 25 + max(ryoka_corruption, yuriko_corruption)` |

> [!note]
> `vanilla_score` and `ntr_score` are *derived* values recomputed each day in `label day_advance`. Storing them as defaults means bug-free saves; recomputing means design tweaks don't require save migrations.

## Curse and Cure

| Variable | Type | Default | Range | Mutated by |
|---|---|---|---|---|
| `ntr_mark_applied` | bool | False | — | `act2_day22_mark` (one-shot) |
| `curse_severity` | int | 0 | 0..3 | `cure_step_*_complete` decrements; `ntr_witness_watch`, `corruption_threshold_50`, `antagonist_confrontation` increment |
| `cure_quest_step` | int | 0 | 0..4 | `cure_step_*_complete` |
| `curse_lifted` | bool | False | — | set True when `curse_severity == 0` and `cure_quest_step == 4` |

`curse_severity` stages: **0** = pristine · **1** = Marked · **2** = Corrupted · **3** = Bound. See [NTR Mark](/wiki/mechanics/ntr-mark).

## Corruption-route

| Variable | Type | Default | Range | Mutated by |
|---|---|---|---|---|
| `pact_signed` | bool | False | — | `dark_alley_pact_offer` |
| `pact_tier` | int | 0 | 0..3 | `dark_alley_pact_*_offer` |
| `mark_etcher_used` | bool | False | — | `mark_etcher_apply` |

## World

| Variable | Type | Default | Range | Mutated by |
|---|---|---|---|---|
| `day_count` | int | 1 | 1..90 | `day_advance` |
| `time_of_day` | str | "morning" | `"day" \| "night"` | `time_advance` |
| `gold` | int | 200 | 0..∞ | shop labels, quest rewards |
| `alley_visits` | int | 0 | counter | `dark_alley_enter` |
| `adventuring_count` | int | 0 | counter | `adventuring_select` (day-action) |
| `church_visited` | bool | False | — | `church_enter` |

> [!warning]
> **Day 90 is a hard cap.** If `day_count == 90` and `route_locked is None`, the engine forces `route_locked = "bittersweet"` and routes to the Tragedy ending (B2). See [Endings](/wiki/plot/endings).

## Lore

| Variable | Type | Default | Range | Mutated by |
|---|---|---|---|---|
| `memory_fragments` | list[str] | `[]` | append-only | `dark_alley_listen` |
| `seen_voyeur` | bool | False | — | first `ntr_witness_watch_*` |
| `antagonist_known` | bool | False | — | `act1_alley_reveal` |

The fragments list is append-only. Order matters for narrative payoff — see [Memory Fragments](/wiki/lore/fragments).

## Inventory

```python
default inventory = {
    "consumables": [],
    "gifts": [],
    "key_items": [],
    "shady": [],
}
```

Key items are *strings* keyed against the master list in [Key Items](/wiki/items/key-items). Don't store object references — Ren'Py rollback gets weird with mutable inner state.

## Endings

```python
default ending_id = None              # set by compute_ending() at Day 90 or scripted finale
default day_85_choice = None          # "invoke_cure" | "trade" | "refuse"
default lies_told = 0                 # tracked from confrontation outcomes; cosmetic but used in epilogue text
```

## Locked Design Decisions

This wiki reflects the following decisions. They are no longer up for debate; if you change one, update this page and grep the codebase for cascade effects.

| Decision | Resolution |
|---|---|
| Per-girl corruption | Yes — `ryoka_corruption` / `yuriko_corruption`. Shared `party_corruption` is removed. |
| Per-girl suspicion | Yes — soft-gating thresholds at 30/60/90, hidden from UI. |
| Memory Fragments | Yes — drip via `dark_alley_listen`, weighted by current corruption. |
| Curse stages | Four: 0/1/2/3 (Pristine, Marked, Corrupted, Bound). |
| Day cap | 90, hard. Default to Tragedy if uncommitted. |
| Encounter cadence | Story-gated bosses + 1–2 random encounters per `adventuring_select` day-action. |
| Cure Quest shape | Four steps: fetch · boss · dialogue gate · ritual. |
| NTR scene agency | Three buttons: Intervene · Watch · Walk away. |
| Route lock | Day 45 crucible event, not arithmetic at endgame. |

## Cross-references

- [Labels Reference](/wiki/dev/labels)
- [Scene Flags](/wiki/dev/scenes)
- [Suspicion](/wiki/mechanics/suspicion)
- [Day 45 Crucible](/wiki/mechanics/route-lock)
