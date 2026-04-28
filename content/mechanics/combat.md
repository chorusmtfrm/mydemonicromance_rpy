---
title: Combat — Sabotage vs Support
category: Mechanics
route: shared
status: planned
order: 1
summary: Pseudo-RPG battle screen. Protagonist acts first. Player chooses to help or harm. Encounters are scarce by design.
tags: [combat, screen-language, sabotage, support]
---

# Combat

## The Loop

1. Battle starts → `combat_screen` shown.
2. **Protagonist turn** — player picks `Heal`, `Buff`, `Sabotage`, or `Pray`.
3. **Ryoka's turn** — if `aroused_state["ryoka"]`, she skips and a vulnerability beat plays. Else she crushes a target for 9999.
4. **Yuriko's turn** — same pattern, with AoE.
5. **Enemy turn** — if both girls are aroused, enemies *grope* instead of attacking. Damage is low; corruption gain is high.
6. Loop until one side empty.

The whole point of the battle screen is that **the player chooses who suffers**. Damage was never the design question.

## Encounter Cadence

Combat is scarce by design. If sabotage was available every day, the corruption ratchet would dominate the loop and the protagonist's *non-combat* life would feel vestigial. The cadence:

- **Story-gated boss fights:** scripted. Always the spine of an Act. Cure Quest step 2, Pact tier check fights, and the Act III finale.
- **Random encounters via `adventuring_select`:** the player explicitly chooses "Go adventuring" as a day-action. Each adventuring day fires 1–2 random combats from the day's region pool.

```python
default adventuring_count = 0

label adventuring_select:
    $ adventuring_count += 1
    $ encounter_count = renpy.random.randint(1, 2)
    repeat encounter_count:
        $ enemy_pool = pick_pool_for_region(current_region)
        call combat_screen
    "You return as the sun starts to dip."
    $ time_of_day = "night"
```

> [!dev]
> Sabotage opportunities are scarce *by intent*. A patient player who picks `adventuring_select` ~3 times per week gets 3–6 sabotage windows per week. That's enough for the corruption track to advance meaningfully without making every day a battle screen.

The other day-actions (cure quest step, side quest, rest day, story beat) **do not** carry random encounters. Adventuring is the explicit "I want a fight" button.

## Screen Skeleton

```python
default party = ["ryoka", "yuriko"]
default aroused_state = {"ryoka": False, "yuriko": False}
default enemy_pool = []

screen combat_screen():
    modal True

    frame:
        background "ui/parchment_panel.png"
        xalign 0.5 yalign 0.92
        xpadding 30 ypadding 20

        vbox:
            spacing 8
            text "[player_name]'s turn" style "battle_header"

            hbox:
                spacing 12
                textbutton "Heal"   action Function(player_heal)
                textbutton "Buff"   action Function(player_buff)
                textbutton "Sabotage":
                    action ShowMenu("sabotage_menu")
                    sensitive has_sabotage_options()
                textbutton "Pray"   action Function(player_pray)

screen sabotage_menu():
    modal True
    frame:
        background "ui/parchment_panel.png"
        vbox:
            text "Choose your method." style "battle_subhead"
            for item in inventory["shady"]:
                textbutton "[item.name]":
                    action [Function(use_sabotage_item, item), Hide("sabotage_menu")]
            textbutton "Cast Sensitivity Hex":
                action [Function(cast_sensitivity_hex), Hide("sabotage_menu")]
                sensitive pc.mp >= 30
            textbutton "Back" action Hide("sabotage_menu")
```

## Sabotage Costs

If sabotage is free, it's the only button. Apply real costs:

| Method | Cost | Effect |
|---|---|---|
| Aphrodisiac (item) | Gold + consumable, 1/battle limit | Aroused state on chosen target |
| Sensitivity Hex | 30 MP | Aroused state on chosen target |
| Whispered Suggestion | +1 to that girl's `suspicion` | Mild — small corruption tick, no skip |
| Twin Dose | 2 aphrodisiacs | Both aroused. Enemy turn becomes grope-only. |

Per-girl `suspicion` is hidden — it surfaces as dialogue tells. At thresholds (30 / 60 / 90) it soft-gates that girl's corruption. See [Suspicion](/wiki/mechanics/suspicion).

## Support Side

| Action | Cost | Effect |
|---|---|---|
| Heal | 20 MP | +HP target, +1 affection w/ target, +0 corruption |
| Buff | 25 MP | +ATK or +DEF target, +1 affection w/ target |
| Pray | Free | RNG: small heal / random buff / lore line / nothing |

Affection trickles up *during combat* if the player supports — that's how a player who never visits the Night Market can still hit Vanilla thresholds.

## Variable Touchpoints

```python
def use_sabotage_item(item):
    target = item.target
    aroused_state[target] = True
    if target == "ryoka":
        store.ryoka_corruption += item.corruption
        store.ryoka_suspicion += (1 if item.subtle else 5)
    else:
        store.yuriko_corruption += item.corruption
        store.yuriko_suspicion += (1 if item.subtle else 5)
    inventory["shady"].remove(item)

def cast_sensitivity_hex():
    pc.mp -= 30
    target = renpy.call_screen("pick_party_member")
    aroused_state[target] = True
    if target == "ryoka":
        store.ryoka_corruption += 4
        store.ryoka_suspicion += 2
    else:
        store.yuriko_corruption += 6   # she's more sensitive to magic
        store.yuriko_suspicion += 2
```

## Cross-references

- [Suspicion](/wiki/mechanics/suspicion)
- [Day / Night Cycle](/wiki/mechanics/day-night)
- [Corruption Track](/wiki/mechanics/corruption)
