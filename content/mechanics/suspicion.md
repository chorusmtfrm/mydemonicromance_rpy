---
title: Suspicion
category: Mechanics
route: ntr
status: planned
order: 7
summary: Per-girl 0–100 hidden stat. Soft-gates corruption gains as it climbs. The patience tax on the corruption route.
tags: [ntr, balance, hidden-stat]
---

# Suspicion

Per-girl, hidden, decay-on-rest. Suspicion is what makes the corruption route a *system* instead of a one-button feedback loop. Without it, sabotage is free; with it, the player has to pace, alibi, and occasionally take a clean day.

> [!warning]
> **Suspicion is never displayed numerically.** No bar, no integer, no UI. It surfaces *only* through dialogue tells and reactive scenes. The mystery is the predator-fantasy tension. A visible bar collapses the system into another stat to grind.

## Variables

```python
default ryoka_suspicion = 0          # 0..100
default yuriko_suspicion = 0         # 0..100
default ryoka_suspicion_lock_until = 0
default yuriko_suspicion_lock_until = 0
```

## Sources of Gain

| Source | Per-target Δ |
|---|---|
| Combat sabotage (visible item) | +5 |
| Combat sabotage (subtle item, e.g. `whispered_suggestion`) | +1 |
| Caught with shady items in inventory (random check at her_susp ≥ 60) | +15 |
| Lying in confrontation scene | +10 |
| Witnessing Intervene during an NTR scene targeting her | +20 |
| `whisper_stone_use` on her | +3 |

## Decay

| Source | Per-target Δ |
|---|---|
| Rest day (day-action) | -1 |
| High-affection Tavern scene (target's `affection ≥ 60`) | -2 |
| Gift of her *loved* taste category | -3 |
| Charisma-pass during a 90+ confrontation | -40 (one-shot, big swing) |

Decay applies in `label day_advance`. Floor at 0.

## Thresholds (per girl)

Soft-gating, not hard wall. The point is to *teach* the player to engage cleverly.

### 30+ — Caution

- That girl rejects **one rotating sabotage type** for 3 in-game days. The rejected category is randomized from `[aphrodisiac, sensitivity_hex, whispered_suggestion]`.
- Dialogue tells begin: she narrows her eyes after combat, asks once if the protagonist has been to the Night Market lately.
- Tavern conversation gains a "share a worry" entry that's actually her starting to *probe*.

### 60+ — Doubt

- Corruption gains on that girl are **halved** until suspicion drops below 60 again.
- Random check during shop visits: if she's in the party, 25% chance the inventory check fires (+15 suspicion if shady items present, set `caught_with_shady = True` for use in 90+ confrontation).
- Mood enum can drift to `"wary"`. From `"wary"` she will refuse one Tavern intimacy scene per night until suspicion drops.

### 90+ — Confrontation

Scripted scene the next morning. **One per girl per playthrough.** Branches:

```python
label confrontation_yuriko:
    "Yuriko stands in the doorway. She is not yelling. That is the bad sign."
    menu:
        "Lie — Charisma check":
            $ chance = 30 + max(0, ryoka_affection + yuriko_affection - 80)
            if renpy.random.randint(1, 100) <= chance:
                $ yuriko_suspicion -= 40
                $ lies_told += 1
                jump confrontation_yuriko_pass
            jump confrontation_yuriko_fail
        "Redirect — gift bomb":
            if "rare_grimoire_page" in inventory["gifts"]:
                $ yuriko_suspicion -= 30
                $ inventory["gifts"].remove("rare_grimoire_page")
                jump confrontation_yuriko_redirect
            "You don't have anything that would land."
        "Come clean":
            if route_locked is None:
                $ route_locked = "vanilla"  # commitment moment
            $ yuriko_suspicion = 0
            jump confrontation_yuriko_truth
```

Outcomes:

| Path | Effect |
|---|---|
| **Pass (lie)** | Suspicion drops, `lies_told += 1`. She's quiet for two in-game days. Dialogue stays acidic for the rest of the week. |
| **Fail (lie caught)** | If `route_locked is None`, force-lock to `bittersweet`. If already locked: that girl's `mood = "wary"`, all corruption gains on her +50% for 5 days (she's hurt and acting out). |
| **Redirect** | Suspicion drops, gift consumed. She knows the redirect was deliberate. `mood = "sulking"` for 2 days. |
| **Come clean** | If unlocked, force-lock to `vanilla`. Suspicion zeroes. `affection += 8`. Cure Quest path becomes the active arc. |

> [!proposal]
> The "Come clean" branch should also play a brief retrospective montage of *all* sabotage actions the player took against her up to that point. Wordless, color-drained, ten seconds. The player has to *see* what they did. That's the moment the corruption route's cost lands on a Vanilla switcher. If they Lie or Redirect, the montage is withheld — it only fires for honesty.

## Cover items

The Night Market sells **cover items** specifically for managing suspicion. These exist *because* suspicion exists — without the stat they'd be useless. With it, they're load-bearing economy.

| Item | Cost | Effect |
|---|---|---|
| Pearl Lily Perfume | 30g | -5 suspicion to chosen girl, one use. |
| Innocent's Alibi | 80g | Blocks the *next* random inventory check from firing. One use. |
| Forgotten Tea | 50g | Sets her `mood = "neutral"` regardless of current state. One use, evening only. |

See [Night Market](/wiki/locations/night-market) for full economy.

## Anti-patterns

- ❌ Don't make suspicion visible to the player as a number. Tells only.
- ❌ Don't let suspicion *kill* the corruption route. The 60+ halving is the strongest mechanical brake; do not stack a hard lock on top.
- ❌ Don't auto-decay suspicion at the end of every battle. The cost has to *persist* across days for the system to feel real.
- ✅ Do write the dialogue tells with care. Suspicion is the most narratively expressive system in the game — each girl's tells are her personality under pressure.

## Cross-references

- [Combat — Sabotage vs Support](/wiki/mechanics/combat)
- [Night Market](/wiki/locations/night-market)
- [Corruption Track](/wiki/mechanics/corruption)
