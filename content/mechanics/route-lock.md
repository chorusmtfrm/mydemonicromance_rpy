---
title: The Day 45 Crucible
category: Mechanics
route: shared
status: planned
order: 8
summary: Route lock fires at Day 45 via a scripted event, not endgame arithmetic. Player choice + accumulated state determines route_locked.
tags: [routing, midpoint, crucible]
---

# The Day 45 Crucible

Routes don't lock by silently summing variables at Day 89. They lock at Day 45 in a **scripted event** the player feels happen. The state-arithmetic determines *which* event fires — but the lock itself is narrative.

## Why a Crucible

A scalar comparison ("if vanilla_score > ntr_score, lock vanilla") is bad design twice:

1. **Players can't roleplay commitment.** They make their choice through play and the game silently agrees with itself.
2. **Bittersweet feels like a draw.** It's not — it's the *most expensive* outcome, but a sum-comparison gives it the weakest framing.

The crucible fixes both. The player walks into a scene at Day 45 and walks out *committed*.

## State Math (which event fires)

```python
label day_45_crucible:
    if route_locked is not None:
        return  # already locked via Confrontation come-clean or Pact tier 3
    $ rc, yc = ryoka_corruption, yuriko_corruption
    $ ra, ya = ryoka_affection, yuriko_affection
    if rc >= 50 and yc >= 50:
        jump crucible_dual_fall
    elif (rc >= 50) != (yc >= 50):
        jump crucible_split
    elif ra >= 60 and ya >= 60:
        jump crucible_vanilla
    else:
        jump crucible_drift
```

`!=` between two booleans is XOR — exactly one girl past 50. Cleanest way to express "asymmetric corruption."

## The four crucibles

### `crucible_dual_fall` — both girls past 50 corruption

Antagonist invites the protagonist to the Alley with both girls already there, half-laughing, half-leaning into him. The player chooses to either *join* (commit NTR) or *flee* (force the bittersweet rescue arc, which now starts down 30 affection on both girls).

```python
label crucible_dual_fall:
    menu:
        "Join them.":
            $ route_locked = "ntr"
            $ pact_tier = max(pact_tier, 1)
            jump act2_close_ntr
        "Run.":
            $ route_locked = "bittersweet"
            $ ryoka_affection -= 15
            $ yuriko_affection -= 15
            jump act2_close_bittersweet
```

### `crucible_split` — exactly one girl past 50 corruption

The hardest crucible to write well. The "kept" girl confronts the protagonist about the "lost" girl. Three-way menu — keep, switch, refuse-to-choose:

```python
label crucible_split:
    $ fallen = "ryoka" if ryoka_corruption >= 50 else "yuriko"
    $ kept   = "yuriko" if fallen == "ryoka" else "ryoka"
    menu:
        "Hold the line with [kept]. We'll come back for [fallen].":
            $ route_locked = "bittersweet"
            jump act2_close_rescue_setup
        "Cut [kept] loose. Follow [fallen] under.":
            $ route_locked = "ntr"
            jump act2_close_ntr_late
        "Refuse to choose.":
            # Refusing IS choosing. Hard locks bittersweet with worse starting state.
            $ route_locked = "bittersweet"
            $ getattr(store, kept + "_affection") - 10  # placeholder; set via setattr
            jump act2_close_rescue_compromised
```

### `crucible_vanilla` — both girls past 60 affection, neither past 50 corruption

Tavern scene. The girls confront the protagonist together about the curse — they've noticed. The protagonist either accepts the Cure Quest (locks Vanilla) or deflects (locks Bittersweet, both affections drop).

```python
label crucible_vanilla:
    menu:
        "Tell them everything. Take the cure.":
            $ route_locked = "vanilla"
            $ cure_quest_started = True
            jump act2_close_vanilla
        "Tell them nothing. Manage it alone.":
            $ route_locked = "bittersweet"
            $ ryoka_affection -= 8
            $ yuriko_affection -= 8
            jump act2_close_bittersweet
```

### `crucible_drift` — none of the above

Player who hasn't committed. Antagonist appears at the Tavern door uninvited. Choice: throw him out (locks Vanilla but at -20 to whichever girl had higher corruption) or invite him in (locks NTR at base).

This is the *uncommitted player's* crucible — a forced commitment scene that punishes drift gently. The exit is real, the cost is real, but the ending doesn't go straight to Tragedy.

```python
label crucible_drift:
    menu:
        "Throw him out.":
            $ route_locked = "vanilla"
            $ higher = "ryoka" if ryoka_corruption > yuriko_corruption else "yuriko"
            # apply -20 to higher's affection
            jump act2_close_vanilla_late
        "Invite him in.":
            $ route_locked = "ntr"
            $ pact_tier = max(pact_tier, 1)
            jump act2_close_ntr_late
```

> [!dev]
> If the player has *already* locked (via the Suspicion 90+ confrontation come-clean or via accepting Pact Tier 3), `day_45_crucible` is a no-op. Don't fire a crucible event after the player has already committed — it'd feel like the game forgot.

## Pre-lock escape hatches

The route can lock *before* Day 45 via two narrative gates. Both are the player choosing aggressively:

| Trigger | Outcome |
|---|---|
| Suspicion 90+ confrontation, "Come clean" branch | locks `vanilla` |
| Pact Tier 3 acceptance at Dark Alley | locks `ntr` |

Both fire a one-shot scene, lock immediately, and the Day 45 crucible is skipped. This is the prize for committed players — they earn the crucible's omission.

## Anti-patterns

- ❌ Don't compute the lock silently. The lock must always coincide with a scene the player remembers.
- ❌ Don't allow `route_locked` to mutate after Day 45. Once locked, locked.
- ❌ Don't write the crucible scenes shorter than ten minutes of playtime each. They're the load-bearing midpoints.
- ✅ Do let players brute-force the Vanilla lock via the come-clean confrontation. It's the strongest commitment beat in the game and rewards careful play.

## Cross-references

- [Suspicion — Confrontation outcomes](/wiki/mechanics/suspicion)
- [Dark Alley — Pact Tiers](/wiki/locations/dark-alley)
- [Act II](/wiki/plot/act-2)
- [Endings](/wiki/plot/endings)
