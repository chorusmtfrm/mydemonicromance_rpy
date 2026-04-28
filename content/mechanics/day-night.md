---
title: Day / Night Cycle
category: Mechanics
route: shared
status: planned
order: 6
summary: Day phase for plot, quests, and adventuring. Night for hub navigation. One action per phase. Day 90 hard cap.
tags: [loop, hub, time, deadline]
---

# Day / Night Cycle

```
Dawn  →  Day Phase (1 action)  →  Dusk  →  Night Phase (1 hub action)  →  Sleep  →  Dawn (day_count += 1)
```

One major action per phase. **No grinding multiple actions per day** — that's how meters get inflated and routes get blurry.

## State

```python
default day_count = 1
default time_of_day = "day"

default day_action_taken = False
default night_action_taken = False
```

## Day Phase Actions

The day phase is a menu of mutually exclusive actions:

| Action | Effect | Notes |
|---|---|---|
| **Story beat** | Whatever the active main thread requires | Always available when a story flag fires |
| **Cure Quest step** | Advances `cure_quest_step` if conditions met | Vanilla path engine |
| **Adventuring** (`adventuring_select`) | 1–2 random combat encounters | Sabotage windows live here |
| **Side quest** | Affection +5 with the lead character | Resolves in one phase |
| **Rest day** | HP/MP refill, suspicion -1 per girl | The patience tax pressure-valve |

> [!dev]
> Combat is **only available** through `adventuring_select` (or scripted story beats). The other day-actions don't fire combat. This is what makes sabotage scarce-by-design — see [Combat — Encounter Cadence](/wiki/mechanics/combat).

```python
label dawn:
    $ time_of_day = "day"
    $ day_action_taken = False
    $ check_route_lock()
    $ check_curse_advance()
    if day_count == 45 and route_locked is None:
        jump day_45_crucible
    if day_count == 90:
        jump finale_resolve
    call screen day_action_select
```

## Night Phase

```python
label dusk:
    $ time_of_day = "night"
    $ night_action_taken = False
    call screen night_hub
```

Three hub destinations — see linked location pages:

- [Tavern Room](/wiki/locations/tavern) — affection, rest, intimacy scenes
- [Night Market](/wiki/locations/night-market) — gifts (Vanilla) or shady items (NTR)
- [Dark Alley](/wiki/locations/dark-alley) — corruption faucet, fragment drip

```python
screen night_hub():
    modal True
    frame:
        background "ui/parchment_panel.png"
        vbox:
            text "Day [day_count] · Night" style "hub_header"
            textbutton "Tavern Room"  action [Hide("night_hub"), Jump("tavern_night")]
            textbutton "Night Market" action [Hide("night_hub"), Jump("market_night")]
            textbutton "Dark Alley":
                action [Hide("night_hub"), Jump("alley_night")]
                sensitive day_count >= 7
            textbutton "Sleep through it":
                action [Hide("night_hub"), Jump("sleep")]
```

The Alley is **gated before Day 7** — it would be tonally wrong as a Day 1 option. The protagonist has to actually meet his current life before relapsing into his old one.

## Sleep & Day Rollover

```python
label sleep:
    if not night_action_taken:
        # The "skip night" option is itself a quiet beat — Tavern dialogue acknowledges it.
        pass
    "[player_name] dreams of nothing in particular."
    jump dawn
```

## The Day 90 Hard Cap

Day 90 is the wall. Every meaningful resolution funnels through it:

```python
label finale_resolve:
    if route_locked is None:
        $ route_locked = "bittersweet"
        jump finale_tragedy   # B2 — default Tragedy ending
    if route_locked == "vanilla":
        jump finale_vanilla
    if route_locked == "ntr":
        jump finale_ntr
    jump finale_bittersweet
```

> [!warning]
> The cap is **hard**. There is no Day 91. If the player dawdles, the engine commits them to Bittersweet → Tragedy. This is the deadline that prevents pacing collapse — without it, players grind both meters indefinitely and the character roleplay dissolves into score-grinding.

## Decay & ticks at `day_advance`

Per-day passive effects, in order:

1. `day_count += 1`
2. Per-girl suspicion decay: `-1` (floored at 0)
3. Recompute `vanilla_score`, `ntr_score`
4. Check `mark_stage` advance (curse stages)
5. Check Day 45 / Day 85 / Day 90 triggers
6. Render dawn screen

> [!dev]
> Keep the cycle strict. One day action, one night action. If the player ever gets two of either, it breaks the meter pacing and the deadline math.

## Cross-references

- [Combat](/wiki/mechanics/combat)
- [The Day 45 Crucible](/wiki/mechanics/route-lock)
- [NTR Mark — Day 90 cap math](/wiki/mechanics/ntr-mark)
- [Endings — default Tragedy](/wiki/plot/endings)
