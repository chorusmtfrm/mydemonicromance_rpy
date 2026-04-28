---
title: Consumables
category: Items
route: shared
status: drafted
summary: Single-use items purchased or found. Includes the potions that drive the Sabotage combat economy.
---

# Consumables

Single-use items consumed on activation. The corruption-route economy lives here — sabotage potions are the gold sink that keeps a corruption playthrough from feeling free.

## Inventory category key

```python
default inventory = {
    "consumables": [],
    "gifts": [],
    "key_items": [],
    "shady": [],
}
```

`consumables` and `shady` overlap visually but split by *purpose*: consumables are mid-combat tools, shady items are corruption-route currency. A potion can live in both lists — the category determines which UI surface shows it.

## Master list

| Item | Cost | Source | Effect | Used in |
|---|---|---|---|---|
| **Mana Potion** | 50g | Tavern, Day shops | Restore 100 MP | Combat |
| **Health Potion** | 80g | Tavern, Day shops | Restore 250 HP | Combat |
| **Aphrodisiac (Mild)** | 200g | Night Market (Day) | +5 corruption to chosen ally next combat | Sabotage |
| **Aphrodisiac (Strong)** | 600g | Night Market (Night), req. corruption ≥ 20 | +12 corruption, applies *flushed* status | Sabotage |
| **Sensitivity Hex Vial** | 350g | Dark Alley | Sabotage substitute for low-MP runs (no MP cost, gold cost instead) | Sabotage |
| **Lust Smoke Bomb** | 500g | Night Market (Night) | AoE: +6 corruption to all allies, alerts no enemies | Sabotage |
| **Cleansing Draught** | 400g | Tavern (Vanilla flag) | -3 corruption from chosen ally | Vanilla recovery |
| **Holy Water** | 1000g | Cure Quest reward | Decrement `curse_severity` by 1 | Cure Quest |

## Sabotage economy

A full corruption run on one girl needs roughly **20 sabotage actions** to hit the ending threshold (corruption ≥ 80). Mixing potions with free MP-cost hexes, that's ~`200g × 8 + 350g × 12 = 5800g` minimum. Tune the gold drop rate so this is reachable but not free — should require selling Vanilla-route consumables you skipped.

> [!dev]
> **Open question:** should *Cleansing Draught* be available on the corruption route? Argument for: lets a player dial back if they overshoot. Argument against: removes consequence. Recommend hiding it behind the Vanilla route flag (`route_locked == "vanilla"`).

## Status effects applied

| Status | Source | Effect | Duration |
|---|---|---|---|
| `flushed` | Strong Aphrodisiac | +50% corruption gain from next sabotage | 3 turns |
| `sensitive` | Sensitivity Hex | Sabotage cost halved next use | 1 use |
| `clouded` | Lust Smoke Bomb | -10 ATK, +20% corruption gain | 5 turns |

## Cross-references

- [Combat → Sabotage](/wiki/mechanics/combat)
- [Night Market](/wiki/locations/night-market)
- [Corruption mechanic](/wiki/mechanics/corruption)
