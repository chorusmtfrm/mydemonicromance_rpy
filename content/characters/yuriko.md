---
title: Yuriko
category: Characters
route: both
status: planned
order: 3
summary: Lvl 95 mage. Cool, curious, dangerously well-read. Falls through intellectual fascination with her own arousal.
tags: [mage, party, corruption-vector-curiosity]
---

## Concept

Yuriko is the party's brain. Cool, deliberate, never the first to speak in a room. She wears formal robes and carries a notebook everywhere. Where Ryoka responds to corruption with shame, Yuriko responds with **curiosity** — she catalogues her own reactions, tries variables, takes notes. That's what makes her fall worse: she *studies* it.

Her affection vector is **respect for competence**. She does not warm up to people who don't earn it. The protagonist earns it by knowing more about anatomy and curses than any healer his rank should — a thread that ties into the Antagonist's history with him.

## Stat Block

```python
init python:
    class Yuriko:
        level = 95
        hp = 6800
        mp = 9999
        atk = 4200
        defense = 410
        magic_def = 9999
        archetype = "mage"
        signature = "AoE / status"
        corruption_vector = "intellectual fascination, self-experiment"
        affection_vector = "earned respect, shared study"
```

## Combat Behavior

| Default Action                            | When `aroused_state[yuriko] == True`                     |
|-------------------------------------------|----------------------------------------------------------|
| `Annihilation Sigil` (AoE, 9999)          | Skipped turn. The whole field she would have cleared survives — multiple enemies converge on her. |
| `Mana Loop` (party MP regen)              | Cancelled. Spell she was channeling collapses on her.    |

Because she's an AoE caster, sabotaging her on a wave fight is the most *visibly* devastating choice in the game. Use this as the gating mechanism for the worst NTR set-pieces — the player sees the cost of Sabotage written across the entire battle screen.

## Affection Track (Vanilla)

- **Aff 0–20:** Polite distance. She corrects your grimoire references.
- **Aff 20–45:** First time you correct *her*. She actually pauses. Bookshop scene.
- **Aff 45–70:** She offers to help research the curse. This is a major scene — it's the trigger for the Cure Quest's first artifact location.
- **Aff 70–90:** She admits her interest is no longer purely academic. Late-night library scene. Curse fires; she *takes notes* afterward, not as a joke — she's already trying to engineer a counter-spell.
- **Aff 90+:** Co-leader of the Cure Quest's intellectual half. She decodes the final inscription.

## Corruption Track (NTR)

- **Cor 0–25:** Calmly identifies Sabotage items by smell. Lectures the protagonist on dosage. Embarrassed but composed.
- **Cor 25–50:** Begins noting her own response patterns in her field journal. Doesn't show anyone. Dread builds.
- **Cor 50–75:** Asks the bully *technical questions* about what he uses on her. Treats it as research. The horror is in her professionalism.
- **Cor 75+:** The notebook is full. She brings it with her to the Alley.

> ENI Proposal: Yuriko's notebook is a recoverable item if you switch routes through the proposed Rescue ending — finding it post-fact lets the protagonist learn the bully's full method, which gates the cure for *her* specifically. Single artifact, single page reveal. Cheap, devastating.

## Scene Flag Index

| Flag                          | Trigger                                       |
|-------------------------------|------------------------------------------------|
| `yuriko_bookshop_scene`       | Aff ≥ 25 + Day ≥ 5                             |
| `yuriko_research_offer`       | Aff ≥ 45 — gates Cure Quest start              |
| `yuriko_library_night`        | Aff ≥ 70                                       |
| `yuriko_notebook_observed`    | Cor ≥ 35 + Tavern Room visit                   |
| `yuriko_alley_scene_1`        | Cor ≥ 40 + Dark Alley visit ≥ 4                |
| `yuriko_breaking_point`       | Cor ≥ 75                                       |
