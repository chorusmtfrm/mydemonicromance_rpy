---
title: Elara — The Quiet Priestess
category: Characters
route: vanilla
status: planned
order: 5
summary: Cure Quest ritual-keeper. Vanilla-locked third love interest. Quiet, devout, present only when the protagonist has chosen to be cured.
tags: [priestess, vanilla-locked, cure-quest, third-romance]
---

## Concept

Elara is the steward of the Sun-Drowned Chapel — the ritual site at the end of the Cure Quest. She does not wander into the protagonist's life. She is *only encountered* once Vanilla route is locked and Cure Quest Step 4 begins. This is deliberate: she is a reward for the route that earns its name.

She is not a Konosuba parody. She is the part of the world that the parody is *protecting*. Soft-spoken, plain robes, hands always faintly cool. She is the only character in the game who never raises her voice.

> [!proposal]
> Elara is positioned as a third love interest in shadow. Her arc is fully optional and gated behind a Vanilla True Ending — only players who clear the Cure Quest with both Ryoka and Yuriko at affection 70+ unlock her epilogue scenes. This is a NG+ reward and a reason to replay Vanilla after seeing it once. If scope tightens, demote her to a non-romanceable NPC who still performs the ritual function — she works either way.

## Mechanical Function

| Plot beat                | Role                                                    |
|--------------------------|---------------------------------------------------------|
| Cure Quest Step 1 (Fetch) | Sends the protagonist after the Verdant Tear           |
| Cure Quest Step 2 (Boss) | Identifies the Sundered Lich as the curse-anchor        |
| Cure Quest Step 3 (Choice) | Asks the protagonist who he wants the cure to bind to |
| Cure Quest Step 4 (Ritual) | Performs the rite. Co-presence with the chosen partner |

She is a **dialogue gate**, not a combat presence. She never fights. Her function is to make the protagonist *say out loud* what he's been avoiding saying for forty days.

## Stat Block

```python
init python:
    class Elara:
        archetype = "priestess / ritual"
        combat_role = None
        affection_track = "vanilla-true-only"
        signature_line = "I will not ask you again. I am asking once."
        unlocks_at = "cure_quest_step_4"
```

## Why she works dramatically

The two main girls are *active*. They get loud, they fight, they sin, they drink. Elara is **passive on purpose** — she's the still water the protagonist sees himself in. After forty days of choosing between Ryoka's sword and Yuriko's spell, the protagonist meets a third woman who asks nothing of him except honesty.

Vanilla route's emotional payoff is "you chose to be a person worth loving." Elara is the camera that catches him being one.

## Affection Track (Vanilla True only)

- **First meeting (Cure Step 1):** Polite. She studies him too long over the rim of her cup.
- **Step 2:** She corrects his pronunciation of an old word. Doesn't laugh when he mispronounces it again.
- **Step 3:** She asks him *who he wants to be* when this is over. He doesn't have an answer ready. She waits.
- **Step 4 ritual:** She places her hand over his over the chosen partner's. Three hands, one rite.
- **NG+ epilogue scene:** A year later. He returns to the chapel alone. She knew he would.

## Scene Flag Index

| Flag                          | Trigger                                       |
|-------------------------------|------------------------------------------------|
| `elara_first_meeting`         | Cure Quest Step 1 begins                       |
| `elara_correction_scene`      | Cure Quest Step 2 (mid)                        |
| `elara_who_do_you_want_to_be` | Cure Quest Step 3                              |
| `elara_three_hands`           | Cure Quest Step 4 ritual climax                |
| `elara_ng_plus_epilogue`      | NG+ flag set + Vanilla True cleared once       |

## Voice Sample

> "You came here to be unmade and remade. Most men come here to be only the second one. I'm telling you the cost is both. I will not flinch on your behalf. Are you ready?"

That's her. Doesn't smile. Doesn't soften. Doesn't moralize. Just states the cost.
