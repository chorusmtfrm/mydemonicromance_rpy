---
title: Corruption Track
category: Mechanics
route: ntr
status: planned
order: 2
summary: Per-girl 0–100 sliders driving the NTR route. Slow poison, not flood damage. Brakes via per-girl Suspicion.
tags: [ntr, route, balance]
---

# Corruption Track

Two scalars, not one. Ryoka and Yuriko fall through *different* mechanisms at *different* speeds, and which one falls first is one of the route's only real strategic decisions. Splitting also unlocks the [Bittersweet ending tier](/wiki/plot/endings) — third real outcome from the same code.

```python
default ryoka_corruption = 0
default yuriko_corruption = 0

# Convenience for global checks (e.g. fragment forcing).
init python:
    def corruption_total():
        return store.ryoka_corruption + store.yuriko_corruption
```

## Sources of Gain

| Source | Ryoka | Yuriko |
|---|---|---|
| Aphrodisiac in combat | +6 | +5 |
| Sensitivity Hex | +4 | +6 |
| Whispered Suggestion | +1 | +1 |
| Twin Dose (both targets) | +8 each | +8 each |
| Dark Alley — give information about her | +5 to that target | +5 to that target |
| Dark Alley — accept "gift" used on her | +10 to that target | +10 to that target |
| NTR scene — Watch | +15 to that target | +15 to that target |
| NTR scene — Walk away | +5 to that target | +5 to that target |
| NTR scene — Intervene + LOSS | +20 to that target | +20 to that target |

Ryoka's vector skews physical (aphrodisiacs, items). Yuriko's skews magical (hexes, whispered suggestions). Same engine, different fuel — your sabotage strategy should differ between targets and that is the point.

## Brakes

- **Suspicion 60+ halving:** while a girl's `*_suspicion >= 60`, her corruption gains are halved. See [Suspicion](/wiki/mechanics/suspicion).
- **Affection drag:** corruption gains on a girl are halved if her `affection >= 60` (she's harder to break when she trusts you). Stacks multiplicatively with the suspicion brake. A girl at high affection AND high suspicion barely moves.
- **Vanilla off-ramp:** at exactly Cor 50, fire the one-shot off-ramp scene per girl. Player choice can lock her corruption for 20 days *and* gives a permanent -25% gain modifier if Vanilla is chosen.

## Tier Behavior

| Tier | Range | Dialogue Shift |
|---|---|---|
| Clean | 0–24 | Anger, suspicion, normal personality intact |
| Crack | 25–49 | Quiet noticing — she doesn't ask anymore. Body answers first. |
| Slip | 50–74 | Active seeking. Initiates contact w/ Antagonist offstage. |
| Break | 75–100 | Public surrender. Personality fully inverted. |

## Threshold side-effects

- Crossing `>= 50` for the first time: increments `curse_severity` by 1 (one-shot per girl). Sets the Vanilla off-ramp scene to fire next morning.
- Crossing `>= 75`: that girl's Tavern intimacy pool changes — she initiates differently, and her mood enum can hold `"broken"`.

## Trigger Logic

```python
label day_advance:
    $ day_count += 1
    $ check_pre_lock_triggers()
    if day_count == 45 and route_locked is None:
        jump day_45_crucible
    if day_count == 90 and not curse_lifted and route_locked is None:
        $ route_locked = "bittersweet"
        jump finale_tragedy
    if route_locked == "ntr" and ryoka_corruption >= 75 and not ryoka_breaking_done:
        jump ryoka_breaking_point
    if route_locked == "ntr" and yuriko_corruption >= 75 and not yuriko_breaking_done:
        jump yuriko_breaking_point
    jump morning_quest_select
```

The Day 45 crucible is the route lock. The arithmetic decides *which* crucible event fires; the player decides what locks. See [The Day 45 Crucible](/wiki/mechanics/route-lock).

## Anti-Pattern Checklist

- ❌ Don't gate Breaking Point at `corruption_total >= X`. Use per-girl thresholds. Otherwise one girl drags the other into an ending she didn't earn.
- ❌ Don't make sabotage cost-free. Suspicion is the gameplay.
- ❌ Don't write Crack-tier dialogue as Slip-tier dialogue. The slow burn IS the route.
- ✅ Do write the off-ramp scene — even if 90% of NTR-route players skip it, it's the difference between the route feeling chosen and the route feeling railroaded.

## Cross-references

- [Suspicion](/wiki/mechanics/suspicion)
- [The Day 45 Crucible](/wiki/mechanics/route-lock)
- [NTR Mark — scene agency](/wiki/mechanics/ntr-mark)
