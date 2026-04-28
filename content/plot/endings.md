---
title: Endings Matrix
category: Plot
route: shared
status: drafted
summary: Six endings across three routes. Resolved by route_locked, cure_quest_step, pact_tier, the Day 85 choice, and the Day 90 hard cap.
order: 4
---

# Endings Matrix

Six endings, not two. Splitting `party_corruption` per-girl makes the Bittersweet/Rescue/Tragedy trio a real outcome class. The Day 90 hard cap defaults uncommitted players to Tragedy.

## Ending IDs

| ID | Name | Route | Gate |
|---|---|---|---|
| **V1** | True Vanilla | `vanilla` | `cure_quest_step == 4`, both `affection >= 70` |
| **V2** | Compromised Vanilla | `vanilla` | Vanilla locked but `cure_quest_step < 4` at Day 90 |
| **N1** | Inherit | `ntr` | `pact_tier == 3`, Confession path was *not* taken |
| **N2** | Break | `ntr` | `pact_tier >= 2`, `mark_etcher_used == False` at finale |
| **B1** | Rescue (Bittersweet) | `bittersweet` | Day 85 → invoke Cure Quest, `cure_quest_step >= 3` |
| **B2** | Tragedy | `bittersweet` | Day 85 → trade, OR Day 90 reached uncommitted |

## Per-ending notes

### V1 — True Vanilla

Both girls cured. Antagonist spared. Cycle broken via mercy. Tonal target: **Konosuba ending energy** — the Tavern, three years later, both girls bickering about who paid for dinner. Earned warmth.

### V2 — Compromised Vanilla

Routed Vanilla but didn't finish the Cure Quest. Mark suppressed but not removed. Implication: it returns. Tonal target: bittersweet domestic — happy *for now*. Most "realistic" ending.

### N1 — Inherit

Player became the next Antagonist. World-cycle continues. Final scene: a younger hero arrives at the Tavern. The protagonist watches from the Dark Alley. **This is the ending that earns its darkness only if the player put the work in to choose it.**

### N2 — Break

Player rejected the Pact's final tier. Mark destroyed but the girls are free *of him too*. Tavern is empty. Tonal target: scorched earth — won the principle, lost everyone. The lonely victory.

### B1 — Rescue

Hardest ending to unlock. One girl on each route, then *both* saved at Day 85 via Cure Quest invocation. The trade scene is the emotional climax. Tonal target: tearful relief, scars visible, but *together*.

### B2 — Tragedy

Day 85 trade accepted *or* Day 90 reached uncommitted. Both girls lost — one to the Antagonist, one to the trade (or to time itself, if uncommitted). Protagonist alone in the Tavern. Tonal target: silence. *No music in the final scene.*

## Ending compute (full)

```python
init python:
    def compute_ending():
        # Day 90 hard-cap default — fires before route checks if applicable
        if store.day_count >= 90 and store.route_locked is None:
            store.route_locked = "bittersweet"
            return "B2"

        if store.route_locked == "vanilla":
            if store.cure_quest_step == 4 \
               and store.ryoka_affection >= 70 \
               and store.yuriko_affection >= 70:
                return "V1"
            return "V2"

        if store.route_locked == "ntr":
            if store.pact_tier == 3 and not store.persistent_atonement_path:
                return "N1"
            if store.pact_tier >= 2 and not store.mark_etcher_used:
                return "N2"
            return "N2"  # default within NTR

        # bittersweet
        if store.day_85_choice == "invoke_cure" and store.cure_quest_step >= 3:
            return "B1"
        if store.day_85_choice == "trade":
            return "B2"
        return "B2"  # refusal also resolves to tragedy by default
```

> [!warning]
> The Day 90 hard cap is the *first* check in `compute_ending`. If the player drifted past Day 89 with `route_locked == None`, they go to B2 *before* any other branch evaluates. Drift = Tragedy. Document this expectation in the help screen at Day 1.

> [!dev]
> The B1 Rescue ending is the secret hardest-content prize. Don't telegraph it. Players who *care* enough to run Cure Quest while losing one girl deserve to discover B1 organically. If a wiki page or in-game hint reveals B1 before a player earns it, the ending loses its emotional payoff.

## Cross-references

- [Act III](/wiki/plot/act-3)
- [The Day 45 Crucible](/wiki/mechanics/route-lock)
- [Cure Quest](/wiki/mechanics/cure-quest)
- [Corruption mechanic](/wiki/mechanics/corruption)
