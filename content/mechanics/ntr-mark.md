---
title: The NTR Mark (Curse)
category: Mechanics
route: shared
status: planned
order: 5
summary: Four-stage curse from 0 to 3. Advances on player complicity, decrements on Cure Quest steps. Defines Vanilla intimacy resolution and gates Day 90 endings.
tags: [curse, deadline, mark, agency]
---

# The NTR Mark

Permanent magical brand. Manifests as a faint sigil on the inner thigh. Mechanically the Mark is the spine of both routes — it's what gives Vanilla *progression to lift* and what gives NTR *gravity to fall toward*.

## Four Stages

`curse_severity` is the master variable. Range **0..3**.

| Stage | Name | Combat Effect | Intimacy Resolution |
|---|---|---|---|
| **0** | Pristine | none — small +5% morale buff once `curse_lifted` | Full scenes. Harem climax can fire. |
| **1** | Marked | -3% party stats while curse-aura is active | Reaches second beat. Stutter then recovery. |
| **2** | Corrupted | -7% party stats; aura draws hostile NPC attention | One held kiss, then fizzle. Partner comforts. |
| **3** | Bound | -12% party stats; Aroused-state proc on hostile turns | Cuts to morning. Tender failure. |

Sigil color tracks severity: ember red (3) → muted bronze (2) → cooled gold (1) → silver scar (0).

## How Severity Advances

`curse_severity` is **not** a clock — it ticks on player action. Each event below increments by 1 (capped at 3).

| Trigger | Source |
|---|---|
| `act2_day22_mark` | Forced. Sets initial severity to 1. |
| `ntr_witness_watch_*` | Player chose "Watch" during an NTR scene. |
| `corruption_threshold_50_*` | Either girl crosses Cor 50 (one-shot per girl). |
| `antagonist_confrontation_2`, `_3` | Scripted Act 2 / Act 3 forcings. |

## How Severity Decrements

Each completed [Cure Quest](/wiki/mechanics/cure-quest) step that *touches* the curse:

- Step 1 → -1
- Step 2 → -1
- Step 4 → -N (drives to 0; sets `curse_lifted = True`)

Step 3 (the dialogue gate) is intentionally silent — it forks the cure's meaning, not the integer.

## Day 90 Hard Cap

```python
label day_advance:
    $ day_count += 1
    if day_count == 90 and not curse_lifted:
        if route_locked is None:
            $ route_locked = "bittersweet"
            jump finale_tragedy   # B2
        # else the route's normal finale fires with curse stuck
```

If the player reaches Day 90 with the curse still applied AND no route locked, the engine forces `bittersweet` + Tragedy. This is the **default-tragedy** rule. Drift causes ending bugs.

## NTR Scene Agency

When the player witnesses an NTR scene (the Antagonist with Ryoka or Yuriko offstage), they get **three buttons**, each with real mechanical consequences. This is the genre's complicity engine — never script-lock these scenes.

```python
screen ntr_witness_choice(target):
    modal True
    frame:
        background "ui/parchment_panel.png"
        vbox:
            text "He hasn't seen you. She hasn't either." style "battle_subhead"
            textbutton "Intervene"     action Jump("ntr_witness_intervene")
            textbutton "Watch"         action Jump("ntr_witness_watch")
            textbutton "Walk away"     action Jump("ntr_witness_walk")
```

| Choice | Mechanical Outcome |
|---|---|
| **Intervene** | Combat encounter against Antagonist (intentionally hard, ~30% win rate at level). On WIN: target's `corruption -= 10`, target's `suspicion += 20` ("how did he know?"). On LOSS: NTR scene proceeds anyway, `+1 curse_severity`, `+20 corruption` to target. *Twice the cost of Watching, in exchange for a real chance to stop it.* |
| **Watch** | Target's `corruption += 15`, `+1 curse_severity`. First time only: sets `seen_voyeur = True`, unlocking a thread of voyeur-tagged dialogue/CGs that recurs through Acts II–III. |
| **Walk away** | Target's `corruption += 5`, **no severity change**. Sets a "you knew" flag (`witnessed_silently_count += 1`) that surfaces in epilogue text and in Tavern dialogue at high suspicion. |

> [!dev]
> "Walk away" looks like the safest option. It is — *mechanically*. Narratively it is the option that hollows the protagonist out. The wiki documents what each button does. The *script* must make the player feel the weight of choosing the cheapest option repeatedly. Reuse the same set-piece framing across multiple Walk-away scenes — the visual repetition is the indictment.

> [!warning]
> Suspicion +20 on Intervene is **counterintuitive but correct**. Intervening reveals that the protagonist had foreknowledge — she now wonders how. Frame it in dialogue, not as a stat drop. ("How did you know to be here?") Without this cost, Intervene becomes the only viable button on a Vanilla run, and the agency triad collapses.

## Player-Visible Indicators

- Status screen: `Curse: ●●●○` (filled = severity remaining out of 3).
- Inner-thigh sigil pulses subtly in CGs at the appropriate color.
- Mood transitions on the partner who witnesses a curse-failure: `"neutral" → "wary"` once, never twice.

## Lore Hook

The curse was not random. The Antagonist placed it — see [Memory Fragment 03](/wiki/lore/fragments). The fact that *removing it* requires Vanilla artifacts and *embracing it* requires Alley visits is the meta-narrative of the entire game: **who decides what the protagonist is**.

## Cross-references

- [Cure Quest](/wiki/mechanics/cure-quest)
- [Affection — Curse Resolution Table](/wiki/mechanics/affection)
- [Memory Fragments](/wiki/lore/fragments)
- [Endings](/wiki/plot/endings)
