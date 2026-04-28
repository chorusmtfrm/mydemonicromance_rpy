---
title: The Protagonist
category: Characters
route: both
status: planned
order: 1
summary: Weak healer, dynamically named, cursed with the NTR Mark. Player POV.
tags: [pc, healer, cursed]
---

## Concept

A bottom-of-the-class healer who somehow ended up leading two of the most overpowered women on the continent. He keeps the party alive between bouts of swinging-the-furniture damage from Ryoka and Yuriko. He is, by any objective measure, the *least* dangerous person in any room he walks into — and that helplessness is the engine the entire game runs on.

The protagonist's name is set by the player at game start and stored in `player_name`. Use it everywhere via Ren'Py string interpolation: `"[player_name]"`.

## Ren'Py Definition

```python
init python:
    player_name = ""

    class Protagonist:
        def __init__(self):
            self.level = 12
            self.hp = 180
            self.mp = 220
            self.atk = 14         # negligible
            self.heal_power = 95  # this is what you bring to the party
            self.endowment = "small"
            self.stamina = "fragile"
            self.curse = "ntr_mark"

    pc = Protagonist()

label start_intro:
    python:
        player_name = renpy.input(
            "What is the name of this useless little healer?",
            default="Hiro",
            length=16
        ).strip() or "Hiro"
    "[player_name], huh? ...Cute name. Try not to die."
    jump day_one_dawn
```

## The NTR Mark

The protagonist is cursed. See [the NTR Mark page](/wiki/mechanics/ntr-mark) for full mechanics — the short version is `curse_severity` (0–5) gates how badly intimate Vanilla scenes go off the rails. Every artifact found in the Cure Quest decrements it by one. At severity 0, the climax of the Vanilla route can actually *land*.

## Personality Notes

- Self-deprecating, but not whiny. Comedy comes from understatement, Konosuba-style.
- Genuine care for both party members — that's what *makes* the affection track plausible.
- On the Corruption side, his complicity has to be active, not passive. Players push the Sabotage button. The script never apologizes for that. The route exists because the player chose it.

## Combat Identity

He goes first every round. The whole battle screen is his agency — Ryoka and Yuriko do the actual damage.

| Action     | Effect                                                  |
|------------|---------------------------------------------------------|
| `Heal`     | Restores HP to one party member. Gentle affection bump. |
| `Buff`     | Defense or attack buff. Standard Support contribution.  |
| `Sabotage` | Aphrodisiac / Sensitivity Hex. Builds corruption.       |
| `Pray`     | Random low-impact effect. Lore tie-in to the curse.     |

> ENI Proposal: keep `Pray` even if it's mostly comedic — it's a free narrative hook for the goddess that placed the curse and a backdoor for late-game lore reveals.
