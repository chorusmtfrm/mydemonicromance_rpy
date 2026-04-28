---
title: Key Items
category: Items
route: shared
status: drafted
summary: Quest-critical items. Cannot be sold, dropped, or consumed except by their gating event.
---

# Key Items

Story-gated. Acquired only by progressing specific labels. Stored under `inventory["key_items"]` and excluded from the sell UI.

## Master list

| Item | Acquired | Gates | Removed by |
|---|---|---|---|
| **Memory Fragment I** | First Dark Alley visit | Antagonist backstory unlock #1 | — (persistent) |
| **Memory Fragment II** | Dark Alley, after Day 30 | Antagonist backstory unlock #2 | — |
| **Memory Fragment III** | Dark Alley, after NTR Mark applied | Antagonist backstory unlock #3, midpoint reveal | — |
| **Cure Quest: Tear of the Saint** | Vanilla route, complete church arc | Cure Quest step 2 | `cure_quest_step ≥ 3` |
| **Cure Quest: Sealed Sigil** | Vanilla route, dungeon clear | Cure Quest step 3 | `cure_quest_step ≥ 4` |
| **Cure Quest: Antagonist's Sigil** | Final confrontation | Cure Quest finale | Used in ending |
| **Antagonist's Sigil** | Optional steal action, Dark Alley | Alt ending branch | Used in ending |

## Memory Fragments

Three fragments. Each unlocks one flashback scene revealing the protagonist's shared past with the Antagonist. **This is your most under-used asset** — players love piecing together backstory, and it gives the Dark Alley mechanical reason to be visited beyond corruption-shopping.

> [!dev]
> Recommended: gate Fragment III behind `ntr_mark_applied == True`. The reveal lands hardest when the player is already feeling the curse's weight. If a Vanilla-pure player never triggers the mark, Fragment III is locked — and that's *fine*, it rewards the corruption-curious without punishing the pure run.

## Cure Quest chain

The three Cure Quest items must be collected in order. Each decrements `curse_severity` by 1 on acquisition:

```python
default curse_severity = 3  # set when ntr_mark_applied flips True

label cure_step_2_complete:
    $ inventory["key_items"].append("Tear of the Saint")
    $ curse_severity -= 1
    $ cure_quest_step = 3
    return
```

See [Cure Quest](/wiki/mechanics/cure-quest) for the full chain.

## Cross-references

- [Cure Quest](/wiki/mechanics/cure-quest)
- [NTR Mark](/wiki/mechanics/ntr-mark)
- [Antagonist](/wiki/characters/antagonist)
- [Dark Alley](/wiki/locations/dark-alley)
