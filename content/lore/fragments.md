---
title: Memory Fragments
category: Lore
route: shared
status: planned
order: 1
summary: Twelve narrative vignettes that drip the Antagonist's backstory across playthrough. Reframe-as-you-progress is the design.
tags: [lore, antagonist, drip-feed]
---

# Memory Fragments

The Dark Alley's "Listen" option draws fragments from a pool of **twelve**. Each fragment is a 180–300 word vignette — Antagonist's POV, present tense, written in the same prose voice as the rest of the script. Together they reframe the Antagonist from *predator* to *wronged party* to *predator who chose this*. The arc of the fragments is the arc of the player's understanding.

## Storage

```python
default memory_fragments = []   # append-only list of fragment IDs

init python:
    fragment_pool = [
        "fragment_01_promise",
        "fragment_02_pendant",
        "fragment_03_mark_origin",
        "fragment_04_flight",
        "fragment_05_alone_year",
        "fragment_06_pact_offered",
        "fragment_07_betrayal",
        "fragment_08_iron_order",
        "fragment_09_library_night",
        "fragment_10_first_kill",
        "fragment_11_choosing",
        "fragment_12_now",
    ]
```

## Drip rules

Fragments are drawn weighted-random *from the unseen pool* with priority overrides:

```python
init python:
    def draw_fragment():
        unseen = [f for f in fragment_pool if f not in store.memory_fragments]
        if not unseen:
            return None
        # Priority order: fragment_03 lands at corruption_total >= 30
        # fragment_07 lands at corruption_total >= 50
        # fragment_11 lands when route_locked is set
        for forced, condition in PRIORITY_TABLE:
            if forced in unseen and condition():
                return forced
        return renpy.random.choice(unseen)
```

> [!dev]
> Do *not* let plot-critical reveals (03, 07, 11) draw via RNG. They are *structurally* keyed — fragment 7 is the betrayal beat, it must land mid-Act-II for the rest of the writing to work. The randomization is reserved for the atmospheric fragments (1, 2, 4, 5, 8, 9, 10, 12).

## The twelve

| ID | Title | Function | Earliest viable |
|---|---|---|---|
| 01 | The Promise | Establishes the protagonist and Antagonist were close. No reveal of *who* broke what. | Alley visit 1 |
| 02 | The Pendant | First sympathetic beat. Antagonist remembers a gift, framed as ordinary. | Alley visit 2 |
| 03 | **The Mark's Origin** | The Antagonist places the curse. POV is calm — he believes he is *correcting* something. | Forced when `corruption_total >= 30` |
| 04 | The Flight | The night Antagonist left. From his side. | Random |
| 05 | The Year Alone | Atmospheric — what loneliness does to a person who once had purpose. | Random |
| 06 | The Pact Offered | The first time the Antagonist was offered the Pact, by *someone else*. He refused. | Random |
| 07 | **Betrayal** | What the protagonist actually did. Hard reframe — the Antagonist is the wronged party. | Forced when `corruption_total >= 50` |
| 08 | Iron Order | Brushes Ryoka's order's history with him. | Drawn if `ryoka_affection >= 50` OR `ryoka_corruption >= 50` |
| 09 | Library Night | Brushes Yuriko's research. She's read his name in a footnote. | Drawn if `yuriko_affection >= 50` OR `yuriko_corruption >= 50` |
| 10 | The First Kill | Atmospheric. Establishes that he is dangerous and has been for some time. | Random, gated to Act II+ |
| 11 | **Choosing** | The Antagonist chooses to be what he became. The reframe-back: he *wronged* and was *wronged*. | Forced when `route_locked is not None` |
| 12 | Now | The Antagonist sees the protagonist, in present time, as he is now. Final fragment of any playthrough. | Drawn last, regardless |

## Fragment writing rules

These exist for tonal consistency. Break them only with cause.

1. **POV is always Antagonist.** First person, present tense.
2. **Word count: 180–300.** Tight. Every fragment is a single image with a single shift.
3. **No exposition dumps.** The reader assembles meaning across fragments. Do not summarize.
4. **One sense detail.** Rain, the smell of iron, a specific shade of light. Pick one and let it carry.
5. **The protagonist is always referred to by past name** (set in `player_name_past`). Never the player-set name. The Antagonist remembers him as the boy he knew.
6. **No dialogue tags.** If someone speaks, name them by what they were doing. ("She, with her hand on the doorframe, said —")

## Vanilla off-ramp

> [!proposal]
> When `route_locked == "vanilla"` and `cure_quest_step >= 2`, allow Ryoka or Yuriko (whichever lead the active step) to *find* a fragment in the protagonist's pack. Triggers a major Tavern confrontation scene. They didn't know. Now they do. The protagonist explains — *the player* explains, via a long write-your-own dialogue scene — and the Cure Quest gains a final emotional act. This is the route's strongest beat, and the fragments are what enables it.

## Sample — Fragment 03 (The Mark's Origin)

> The room is small. Stone-cool, even in summer. He's on the cot, asleep. I'd known him for a long time. I know how he sleeps. He sleeps like he's still listening.
>
> The brand is on the inner thigh because it's a place neither of us would have to look at, normally. I am still treating him gently. The thing I am about to do is not a punishment. It is a *correction*. He has done a thing he ought not to have done, and the world has not yet noticed, and someone must remind him.
>
> The iron does not feel hot to me. He does not wake. The sigil settles into him the way a hand settles into a glove. When it is done I sit beside him and I watch his breathing for a long time, until I am sure I have not killed him. I find I am crying. I do not know why.
>
> I leave the room. I leave the town. I do not see him again for nine years.

This is the tonal target. **Calm.** The Antagonist is *not* shouting. He is *not* gloating. He is doing what he believes must be done — and the prose lets the reader feel that this is the most damning frame possible.

## Cross-references

- [Dark Alley — the listen action](/wiki/locations/dark-alley)
- [Antagonist](/wiki/characters/antagonist)
- [Cure Quest — Vanilla off-ramp](/wiki/mechanics/cure-quest)
