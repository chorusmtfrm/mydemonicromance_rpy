---
title: Tavern Room
category: Locations
route: vanilla
status: planned
order: 1
summary: The party's home base. Affection well, intimacy scenes, curse drama, side conversations.
tags: [hub, vanilla, intimacy]
---

## Function

The Tavern Room is the **affection well**. It's where the Vanilla route accumulates and where curse moments fire off-script. Visiting at night triggers one event from a context-aware pool.

## Event Selection

```python
label tavern_night:
    $ ev = pick_tavern_event()
    call expression ev
    $ night_action_taken = True
    jump sleep

init python:
    def pick_tavern_event():
        # priority cascade — first match wins
        if curse_severity > 0 and renpy.random.random() < 0.18:
            return "tavern_curse_moment"
        if pending_scene_flag("ryoka_offramp_offered") and ryoka_corruption >= 50:
            return "ryoka_offramp_scene"
        if pending_scene_flag("yuriko_offramp_offered") and yuriko_corruption >= 50:
            return "yuriko_offramp_scene"
        if ryoka_affection >= 70 and not flag("ryoka_iron_order_reveal"):
            return "ryoka_iron_order_reveal"
        if yuriko_affection >= 70 and not flag("yuriko_library_night"):
            return "yuriko_library_night"
        if suspicion >= 50:
            return "tavern_confrontation"  # corruption lock event
        return renpy.random.choice([
            "tavern_smalltalk_ryoka",
            "tavern_smalltalk_yuriko",
            "tavern_threeway_banter",
        ])
```

## Standard Banter Pool (Cordial → Warmed)

- Drinks with Ryoka. She loses an arm-wrestle on purpose. +1 affection.
- Yuriko reads to herself by the fire. The protagonist asks what — she shares the page. +1 affection.
- Three-way banter — Ryoka and Yuriko bicker, the protagonist mediates. +1 to whichever the player sided with.

## Tier-Gated Scenes

| Scene                          | Gate                                |
|--------------------------------|--------------------------------------|
| `ryoka_first_kiss`             | Aff ≥ 50 + curse_severity ≤ 4 (i.e. step 1 done) |
| `yuriko_library_night`         | Aff ≥ 70                             |
| `ryoka_iron_order_reveal`      | Aff ≥ 70 + Day ≥ 30                  |
| `tavern_confrontation`         | suspicion ≥ 50 — fires corruption lock |
| `harem_climax_finale`          | curse_severity == 0 + both Aff ≥ 75  |

## Curse Moment

A randomized event that fires at low severity. The point is to make the Vanilla route's progression *visible* outside of cure-quest cutscenes — the player feels the curse loosening week-to-week.

```python
label tavern_curse_moment:
    if curse_severity == 5:
        scene tavern_dim
        "It happens before [player_name] can apologize."
        # cuts to morning, +2 affection from the comforting line
    elif curse_severity == 3:
        # one held kiss, second beat, then a stutter
        ...
    elif curse_severity == 1:
        # near-full; affection +6
        ...
    return
```

## Layout Notes

- Two beds and a shared common area. Cheap inn, not a manor — keeps the party feeling like adventurers, not nobility.
- Single window facing the alley. Foreshadowing.
- Yuriko's notebook lives on the desk by the window. Players can interact with it at high `yuriko_corruption` — that's the leak point for the bully.
