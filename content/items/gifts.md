---
title: Gifts
category: Items
route: vanilla
status: drafted
summary: Affection-route items. Per-girl preferences create loadout decisions and prevent generic gift-spam.
---

# Gifts

Vanilla-route currency. Distinct preferences per girl are non-negotiable — generic gifts that boost both bars equally trivialize the system.

## Per-girl preference table

| Gift | Cost | Source | Ryoka | Yuriko |
|---|---|---|---|---|
| **Iron Bracer** | 300g | Day market | +8 affection | +1 affection |
| **Whetstone** | 150g | Day market | +5 affection | 0 |
| **Roasted Boar Skewer** | 80g | Tavern kitchen | +6 affection | +2 affection |
| **Arcane Tome (rare)** | 800g | Night Market (Day) | +1 affection | +12 affection |
| **Crystal Focus** | 450g | Day market | 0 | +9 affection |
| **Honeyed Tea Set** | 200g | Tavern | +3 affection | +7 affection |
| **Wildflower Bouquet** | 60g | Foraged (Day) | +4 affection | +4 affection |
| **Star Chart** | 350g | Night Market (Day) | +2 affection | +8 affection |

## Gift-giving rules

- **Once per day per girl.** Prevents gift-spam grinding affection in a single in-game day.
- **Diminishing returns on repeats.** Same gift twice in a row: second gift gives 50% affection. Third in a row: 0.
- **Wrong-girl penalty.** Giving Ryoka the Crystal Focus deals -2 affection ("I appreciate the thought, but...").

> [!dev]
> The wrong-girl penalty is a small but important *signal* — it teaches the player that the system has preferences. Without it, players brute-force without reading.

## Mood gates

A gift only lands at full value if the girl's mood permits:

```python
if ryoka_mood == "sulking" and gift != "Roasted Boar Skewer":
    affection_gain *= 0.3
```

Moods are set by recent battle outcomes and Tavern conversations. Lets you write reactive dialogue: *"Not now, [MC]. I lost three soldiers today."*

## Cross-references

- [Affection mechanic](/wiki/mechanics/affection)
- [Tavern](/wiki/locations/tavern)
- [Ryoka](/wiki/characters/ryoka) · [Yuriko](/wiki/characters/yuriko)
