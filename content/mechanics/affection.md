---
title: Affection Track
category: Mechanics
route: vanilla
status: planned
order: 3
summary: Per-girl 0–100 sliders driving the Vanilla / Harem route. Earned, not bought.
tags: [vanilla, route, balance]
---

# Affection Track

## Sources of Gain

| Source | Ryoka | Yuriko |
|---|---|---|
| Heal her in combat | +1 | +1 |
| Buff her in combat | +1 | +1 |
| Tavern Room conversation | +2 | +2 |
| Tavern Room — share a worry | +3 | +3 |
| Night Market gift — generic | +2 | +2 |
| Night Market gift — *her* taste | +5 | +5 |
| Side quest completed with her in the lead | +6 | +6 |
| Curse moment handled gently | +8 | +8 |
| Cure Quest step — lead character | +6 | +6 |
| Confrontation — Come clean (Suspicion 90+) | +8 | +8 |

## Taste Hooks

Each girl has a taste table that scales gift effectiveness. Generics give +2; matched gifts give +5; mismatched gifts give 0 and a flavor line.

```python
init python:
    gift_taste = {
        "ryoka": {
            "loved": ["whetstone", "iron_order_pin", "dried_jerky"],
            "liked": ["leather_strap", "spiced_ale"],
        },
        "yuriko": {
            "loved": ["rare_grimoire_page", "owl_feather_quill", "cinder_tea"],
            "liked": ["bookmark", "ink_set"],
        }
    }

    def give_gift(target, item):
        loved = gift_taste[target]["loved"]
        liked = gift_taste[target]["liked"]
        if item.id in loved:
            change_affection(target, 5)
        elif item.id in liked:
            change_affection(target, 2)
        else:
            change_affection(target, 0)
        inventory["gifts"].remove(item)
```

## Tier Behavior

| Tier | Range | What Unlocks |
|---|---|---|
| Cordial | 0–24 | Standard banter. Tavern small talk. |
| Warmed | 25–49 | First major one-on-one scene per character. |
| Trust | 50–74 | Curse-disclosure scene available. Cure Quest step 1 unlocks. |
| Devoted | 75–100 | Pre-finale intimacy scenes. Full personal arc closed. |

## Curse Resolution Table

This is the Vanilla route's mechanical anchor. Until the curse is reduced, intimate scenes pay out short and stuttering. Players feel progress every time `curse_severity` ticks down. See [NTR Mark](/wiki/mechanics/ntr-mark) for stage definitions.

| `curse_severity` | Stage | Intimate Scene Behavior |
|---|---|---|
| 3 | Bound | Cuts to morning. Implied failure. Comforting line from partner. |
| 2 | Corrupted | One held kiss, one stutter, one tender deflection. |
| 1 | Marked | Reaches the second beat. Stutter, then recovery. Affection +5 on resolve. |
| 0 | Pristine | Full scene. Harem climax can fire. Affection +8. |

## Trigger Snippet

```python
init python:
    def change_affection(target, delta):
        if target == "ryoka":
            store.ryoka_affection = max(0, min(100, store.ryoka_affection + delta))
            # high affection halves corruption gains; see corruption.md
        else:
            store.yuriko_affection = max(0, min(100, store.yuriko_affection + delta))
```

> [!dev]
> Affection should never *decrement* from a Sabotage decision alone — the per-girl Suspicion system is the punishment. Decrementing affection too freely turns the player into a save-scummer instead of a roleplayer. Affection only drops on the few scripted moments listed below.

## Affection drops

There are exactly four ways for affection to decrease:

1. **Suspicion 90 confrontation, lie caught.** Mood drifts to `"wary"`; affection drops only if the route force-locks bittersweet.
2. **`crucible_dual_fall` "Run".** -15 to both girls.
3. **`crucible_split` "Refuse to choose".** -10 to the kept girl.
4. **`crucible_vanilla` "Tell them nothing".** -8 to both girls.

Outside these four, only *upward* mutations are valid. If you find another decrement in the script, it's a bug.

## Cross-references

- [NTR Mark — curse stages](/wiki/mechanics/ntr-mark)
- [Tavern Room](/wiki/locations/tavern)
- [Night Market — gift economy](/wiki/locations/night-market)
- [Suspicion](/wiki/mechanics/suspicion)
