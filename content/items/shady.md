---
title: Shady Items
category: Items
route: ntr
status: drafted
summary: Corruption-route exclusive. Only sold in the Dark Alley and Night Market night-shift. Visible suspicion cost.
---

# Shady Items

Corruption-route exclusive inventory. Locked behind the Antagonist's Pact (`pact_signed == True`) plus location/time gating. **Carrying these has narrative weight** — Tavern dialogue references them if they're in the bag.

## Master list

| Item | Cost | Source | Effect | Suspicion |
|---|---|---|---|---|
| **Cursed Charm** | 1500g | Antagonist (Pact) | +1 corruption per day passively to chosen ally | +0 (gifted) |
| **Tainted Wine** | 800g | Dark Alley | Forces +15 corruption + drunken scene | +3 per use |
| **Soulbond Ribbon** | 2200g | Antagonist (Pact, late) | Locks chosen ally's route to NTR | +0 |
| **Whisper Stone** | 700g | Dark Alley | Eavesdrop on ally's private moment (lore + corruption) | +1 per use |
| **Mark Etcher** | special | Quest reward (corruption) | Player-applied NTR Mark variant | +5 |

## The Suspicion stat

```python
default suspicion = 0  # 0..10 scale
```

Suspicion accumulates per shady-item use and per obvious sabotage. At thresholds:

- **`suspicion ≥ 4`** — Tavern dialogue shifts. Girls ask where you've been. -2 affection per day.
- **`suspicion ≥ 7`** — Corruption gains halved for 5 in-game days. Girls actively investigate.
- **`suspicion ≥ 10`** — Forced confrontation scene. Either bluff (Charisma check), confess (route lock), or violently silence (locks the *worst* ending).

Decay: `-1 suspicion` per 3 days of clean (no shady) behavior. Cleansing Draught at the church removes 2 instantly but flags `church_visited` and may invalidate the Pact later.

> [!dev]
> Suspicion is the single most important addition to the original plan. Without it, sabotage has no friction and corruption runs become spreadsheet-grinding. With it, the player has to be *patient and clever* — which is exactly the predator fantasy this genre lives on.

## Cross-references

- [Corruption mechanic](/wiki/mechanics/corruption)
- [Antagonist](/wiki/characters/antagonist)
- [Dark Alley](/wiki/locations/dark-alley)
