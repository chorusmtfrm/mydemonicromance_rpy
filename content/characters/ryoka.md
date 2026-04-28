---
title: Ryoka
category: Characters
route: both
status: planned
order: 2
summary: Lvl 99 muscular warrior. Loud, proud, physical. Falls through humiliation of strength.
tags: [warrior, party, corruption-vector-pride]
---

## Concept

Ryoka is the party's fist. Six feet of disciplined muscle, scarred forearms, voice that fills a tavern. Trained at the Iron Order. Considers herself the protagonist's personal shield and is loud about it — even when nobody asked. Konosuba register: brash, easily flustered when complimented sincerely, deeply uncomfortable with anything that isn't earned through training.

Her corruption vector is **pride**. The script never breaks her by being gentle with her. It breaks her by making her *helpless* in the one arena she's defined herself by — combat. That's why Sabotage hits her differently than it hits Yuriko.

## Stat Block

```python
init python:
    class Ryoka:
        level = 99
        hp = 9999
        mp = 200
        atk = 9999
        defense = 850
        magic_def = 120  # her weak axis — Yuriko's hex hits hard here
        archetype = "warrior"
        signature = "single-target crush"
        corruption_vector = "pride / helplessness in combat"
        affection_vector = "earned trust, training side-by-side"
```

## Combat Behavior

| Default Action      | When `aroused_state[ryoka] == True`             |
|---------------------|--------------------------------------------------|
| `Crushing Strike` (single target, 9999) | Skipped turn — flushed, panting, knees buckling. Enemy gets a free grope. |
| `Guard [player_name]`                  | Replaced by helpless trembling. Player takes hits. |

Because she's a single-target attacker, the cost of a Sabotaged turn is *high*: the boss survives a round it should have died. Mechanically this lets you stretch corruption fights without breaking the player's expectation that the girls are gods. Pair with [Combat](/wiki/mechanics/combat).

## Affection Track (Vanilla)

- **Aff 0–20:** Joking around in the tavern. She drinks you under the table.
- **Aff 20–45:** She catches you healing through your own pain limit. Her opinion shifts. First serious one-on-one scene.
- **Aff 45–70:** Training together. She lets you spar — she'd never let a stranger that close. The first kiss happens here, awkward, both half-armored.
- **Aff 70–90:** She tells you about the Iron Order, why she left. Vulnerability scene. The curse triggers in a private moment; she doesn't laugh. She holds you and asks how to help.
- **Aff 90+:** Cure-Quest co-lead. She is the one who lifts the artifact in the third trial.

## Corruption Track (NTR)

- **Cor 0–25:** Furious, embarrassed by Sabotage. Demands to know who keeps slipping potions in her flask.
- **Cor 25–50:** Stops asking. Starts noticing. Starts *waiting* for the feeling.
- **Cor 50–75:** Asks the bully — out of earshot of the protagonist — for stronger doses.
- **Cor 75+:** The Iron Order would not recognize her. Public scene at the Dark Alley.

> ENI Proposal: at Cor 50, give the player a single Vanilla "off-ramp" scene where Ryoka asks the protagonist directly if he wants this to stop. Saying yes locks corruption-from-sabotage for her for 10 days. Players who say no through that scene have *committed*. That's a real character beat instead of grinding a slider.

## Scene Flag Index

| Flag                          | Trigger                                       |
|-------------------------------|------------------------------------------------|
| `ryoka_first_kiss`            | Aff ≥ 50 + Tavern visit                        |
| `ryoka_iron_order_reveal`     | Aff ≥ 70 + Day ≥ 30                            |
| `ryoka_alley_scene_1`         | Cor ≥ 30 + Dark Alley visit ≥ 3                |
| `ryoka_breaking_point`        | Cor ≥ 75                                       |
| `ryoka_offramp_offered`       | Cor crosses 50 (one-shot)                      |
