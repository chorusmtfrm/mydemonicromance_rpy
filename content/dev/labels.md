---
title: Label Reference
category: Dev Reference
route: shared
status: canonical
order: 2
summary: Every named Ren'Py label, its caller, its callees, and the variables it mutates. Pair with Variable Reference.
---

# Label Reference

Naming convention: `{act}_{location_or_system}_{verb}`. Examples: `act1_tavern_intro`, `combat_sabotage_ryoka`, `dark_alley_pact_offer`.

## Entry points

| Label | Called by | Purpose |
|---|---|---|
| `start` | engine | Splash, save-load wiring, jump to `act1_intro` |
| `dawn` | `sleep` | Day phase entry. Calls `day_advance`, fires Day 45/85/90 triggers |
| `dusk` | day-action handlers | Night phase entry |
| `day_advance` | dawn | Increments `day_count`, decays per-girl suspicion, recomputes scores, checks deadline triggers |
| `time_advance` | location screens | Cycles morning → afternoon → evening → night |
| `compute_ending` | `act3_finale` | Pure function. Reads state, sets `ending_id` |

## Act I

| Label | Mutates | Notes |
|---|---|---|
| `act1_intro` | sets `day = 1` | Cold open, banter, victory |
| `act1_tavern_intro` | `ryoka_affection += 5`, `yuriko_affection += 5` | Tavern unlock |
| `act1_combat_tutorial` | nothing persistent | Teaches Sabotage *and* Support neutrally |
| `act1_alley_reveal` | `antagonist_known = True`, `memory_fragments += [fragment_01]`, `alley_visits += 1` | Day ~15 trigger |

## Act II

| Label | Mutates | Notes |
|---|---|---|
| `act2_day22_mark` | `ntr_mark_applied = True`, `curse_severity = 1` | Forced. Scripted loss |
| `act2_pact_offer` | `pact_signed`, `pact_tier = 1` (on accept) | Day 25. Refusal does NOT close the route |
| `act2_cure_quest_open` | `cure_quest_started = True` | Day 30. Vanilla engine starts |
| `day_45_crucible` | `route_locked` | The midpoint commitment scene. No-op if already locked |
| `crucible_dual_fall` | `route_locked`, affection deltas | Both girls past 50 corruption |
| `crucible_split` | `route_locked`, affection deltas | Exactly one girl past 50 corruption |
| `crucible_vanilla` | `route_locked`, optional `cure_quest_started` | Both girls past 60 affection |
| `crucible_drift` | `route_locked`, affection deltas | Uncommitted player path |
| `act2_memory_2` | `memory_fragments += [fragment_02]` | Routed flavor |

## Combat

| Label | Mutates | Notes |
|---|---|---|
| `adventuring_select` | `adventuring_count += 1`, fires 1–2 combats | Day-action; the only player-initiated combat trigger |
| `combat_support_ryoka` | `ryoka_affection += 1..3` | Standard buff |
| `combat_support_yuriko` | `yuriko_affection += 1..3` | Standard buff |
| `combat_sabotage_ryoka` | `ryoka_corruption`, `ryoka_suspicion` | Cost: MP or aphrodisiac |
| `combat_sabotage_yuriko` | `yuriko_corruption`, `yuriko_suspicion` | Cost: MP or aphrodisiac |
| `combat_aftermath` | per-girl `mood` | Sets mood from outcome + actions taken |

## NTR Witness Agency

| Label | Mutates | Notes |
|---|---|---|
| `ntr_witness_intervene` | combat call against Antagonist | On WIN: `*_corruption -= 10`, `*_suspicion += 20`. On LOSS: `*_corruption += 20`, `curse_severity += 1` |
| `ntr_witness_watch` | `*_corruption += 15`, `curse_severity += 1`, `seen_voyeur = True` (one-shot) | Voyeur dialogue tag unlocks |
| `ntr_witness_walk` | `*_corruption += 5`, `witnessed_silently_count += 1` | No curse advance. "You knew" flag |

## Suspicion confrontations

| Label | Mutates | Notes |
|---|---|---|
| `confrontation_ryoka` / `confrontation_yuriko` | dispatches to pass/fail/redirect/truth | Fires once per girl per playthrough |
| `confrontation_*_pass` | `*_suspicion -= 40`, `lies_told += 1` | Charisma success |
| `confrontation_*_fail` | force `route_locked = "bittersweet"` if unlocked | Caught lying |
| `confrontation_*_redirect` | `*_suspicion -= 30`, gift consumed, `mood = "sulking"` | Gift-bomb defuse |
| `confrontation_*_truth` | force `route_locked = "vanilla"` if unlocked, `*_suspicion = 0`, `*_affection += 8` | Come clean |

## Locations

| Label | Mutates | Notes |
|---|---|---|
| `tavern_enter` | unlocks gift/dialogue UI | Once per `time_of_day` |
| `gift_give_ryoka` | `ryoka_affection`, daily flag | Diminishing returns enforced |
| `gift_give_yuriko` | `yuriko_affection`, daily flag | Diminishing returns enforced |
| `dark_alley_enter` | `alley_visits += 1` | Gates: `time_of_day == "night"`, `day_count >= 7` |
| `alley_listen` | `memory_fragments.append(...)` | Calls `draw_fragment()` |
| `dark_alley_pact_offer` | `pact_tier` | Tier-gated by `pact_tier` and day |
| `dark_alley_pact_3_accept` | `route_locked = "ntr"` | Pre-Crucible NTR commit |
| `night_market_enter` | unlocks shop UI | Day vs Night inventory differs |
| `church_enter` | `church_visited = True` | Cleansing Draught available; flags Pact validity |

## Cure Quest

| Label | Mutates | Notes |
|---|---|---|
| `cure_step_1_complete` | `cure_quest_step = 1`, `curse_severity -= 1`, key item add | Pendant Half (Old Chapel) |
| `cure_step_2_complete` | `cure_quest_step = 2`, `curse_severity -= 1`, key item add | Salt-Forged Knife — boss fight |
| `cure_step_3_complete` | `cure_quest_step = 3`, sets atonement/refuge persistent | Confession dialogue gate |
| `cure_step_4_complete` | `cure_quest_step = 4`, `curse_severity = 0`, `curse_lifted = True` | Reforging ritual (Tavern Room) |

## Act III + Endings

| Label | Mutates | Notes |
|---|---|---|
| `act3_fragment_11` | `memory_fragments += [fragment_11]` | Route-conditional source |
| `act3_day_85_choice` | `day_85_choice` | Bittersweet only |
| `act3_finale` | calls `compute_ending`, sets `ending_id` | Day 90 |
| `finale_vanilla` / `finale_ntr` / `finale_bittersweet` / `finale_tragedy` | terminal | Branch dispatch |
| `ending_V1` … `ending_B2` | terminal | Six terminal labels |

## Cross-references

- [Variables](/wiki/dev/variables)
- [Scene Flags](/wiki/dev/scenes)
- [The Day 45 Crucible](/wiki/mechanics/route-lock)
