---
title: Scene Flags
category: Dev Reference
route: shared
status: canonical
summary: Every gated scene, its trigger, and its image set. Use this to verify route coverage.
---

# Scene Flags

A "scene" is a CG-bearing event with persistent visibility flags. Player gallery uses these flags. Endings reference the count for completion percentages.

## Naming convention

`scene_{character}_{vanilla|ntr}_{slug}` — keeps the gallery tidy and makes route coverage at-a-glance.

## Flag table

| Flag | Route | Trigger | CG count | Notes |
|---|---|---|---|---|
| `scene_ryoka_vanilla_first` | vanilla | `ryoka_affection >= 40` + Tavern night | 3 | Curse-suppressed if `curse_severity >= 2` (mechanical fizzle). |
| `scene_ryoka_vanilla_cured` | vanilla | `cure_quest_step == 4`, post-finale | 4 | Full vanilla payoff. |
| `scene_ryoka_ntr_pact1` | ntr | `pact_tier >= 1`, `ryoka_corruption >= 30` | 3 | Antagonist + Ryoka, witnessed. |
| `scene_ryoka_ntr_pact2` | ntr | `pact_tier >= 2`, `ryoka_corruption >= 60` | 4 | Active sabotage required. |
| `scene_ryoka_ntr_finale` | ntr | `route_locked == "ntr"`, finale | 5 | Branches by `mark_etcher_used`. |
| `scene_yuriko_vanilla_first` | vanilla | `yuriko_affection >= 40` + Tavern night | 3 | Curse-suppressed mirror. |
| `scene_yuriko_vanilla_cured` | vanilla | `cure_quest_step == 4`, post-finale | 4 | |
| `scene_yuriko_ntr_pact1` | ntr | `pact_tier >= 1`, `yuriko_corruption >= 30` | 3 | |
| `scene_yuriko_ntr_pact2` | ntr | `pact_tier >= 2`, `yuriko_corruption >= 60` | 4 | |
| `scene_yuriko_ntr_finale` | ntr | `route_locked == "ntr"`, finale | 5 | |
| `scene_bittersweet_split` | bittersweet | `route_locked == "bittersweet"`, Day 70 | 4 | Two-panel composition mandatory. |
| `scene_bittersweet_rescue` | bittersweet | ending B1 | 6 | Highest-effort CG; reward for B1. |
| `scene_bittersweet_tragedy` | bittersweet | ending B2 | 3 | Sparse, deliberate. |

## Gallery

A scene becomes gallery-visible the moment its flag flips True. Gallery groups by route/character, with locked scenes shown as silhouettes including the trigger condition (helpful for completionists, no actual spoiler since the player has already finished a route).

> [!dev]
> Edge case: `scene_ryoka_ntr_pact1` and `scene_yuriko_ntr_pact1` can both fire if a player runs a corruption route on both girls *before* Day 45. The Bittersweet path requires only one girl flips. Make sure the gallery treats them as parallel CG sets, not as mutually exclusive — players who replay deserve to collect everything.

## Coverage check

| Route | Scenes | CG count |
|---|---|---|
| Vanilla | 4 | 14 |
| NTR | 6 | 24 |
| Bittersweet | 3 | 13 |
| **Total** | **13** | **51** |

Original plan implied ~30 CGs total. The split-corruption variable design pushes that to 51 — that's the cost of doing per-girl routes properly. Worth it; this is what gallery completionists pay for.

## Cross-references

- [Variables](/wiki/dev/variables)
- [Labels](/wiki/dev/labels)
- [Endings](/wiki/plot/endings)
