---
title: Dark Alley
category: Locations
route: ntr
status: planned
order: 2
summary: The corruption faucet. Bargain trap. Lore drip. Gated until Day 7.
tags: [hub, ntr, antagonist, fragments]
---

# Dark Alley

Every meaningful corruption gain on the NTR route flows through the Dark Alley. It is also where [Memory Fragments](/wiki/lore/fragments) unlock, which makes it the route's *lore* engine. Gated behind `day_count >= 7`.

## Visit Loop

```python
label alley_night:
    $ alley_visits += 1
    if alley_visits == 1:
        jump alley_first_visit
    call screen alley_choice_screen
    $ night_action_taken = True
    jump sleep

screen alley_choice_screen():
    modal True
    frame:
        background "ui/alley_panel.png"
        vbox:
            text "He's waiting where he always is." style "hub_header"
            textbutton "Trade information about the party":
                action Jump("alley_give_info")
            textbutton "Buy from him":
                action Jump("alley_buy")
                sensitive gold >= 25
            textbutton "Listen to him":
                action Jump("alley_listen")
            textbutton "Walk away":
                action Jump("sleep")
```

## The Four Choices

| Action | Cost / Gain | Purpose |
|---|---|---|
| Give information | +5 corruption to a chosen target. +3 to that girl's suspicion. +1 leverage. | The cheap, dirty advance. |
| Buy from him | -25g, +1 shady item. | Refills sabotage stock. |
| Listen | +1 memory fragment (drawn via priority + RNG). No corruption / no suspicion change. | Lore drip. Pressure valve. |
| Walk away | None. | The pressure valve's pressure valve. |

The "Listen" option is critical — without it, every Alley night is a corruption ratchet and the route becomes monotonous. With it, players can engage with the *narrative* of the Alley without committing to escalation. That ambiguity is the route's voice.

```python
label alley_listen:
    $ frag = draw_fragment()  # see lore/fragments
    if frag is None:
        "He has nothing left to tell you tonight."
    else:
        $ memory_fragments.append(frag)
        call expression frag
    return
```

## Pact Tiers

The Alley's "Buy from him" path also gates the **Pact** — the NTR route's commitment ladder. Tier crossings mutate `pact_tier`.

| Tier | Cost | Effect |
|---|---|---|
| 1 | First info-trade | Sets `pact_signed = True`, unlocks shady item shop |
| 2 | 200g + a key item | Twin Dose unlocks; suspicion brakes weakened |
| 3 | "Soulbond Ribbon" scene | **Locks `route_locked = "ntr"` immediately**, regardless of Day 45 |

Accepting Tier 3 *bypasses* the Day 45 Crucible. The player committed early. See [The Day 45 Crucible](/wiki/mechanics/route-lock).

## Witnessing NTR scenes

Some Alley visits surface an NTR scene rather than the choice screen — the protagonist arrives and finds the Antagonist with one of the girls already. This routes through `ntr_witness_choice` (Intervene / Watch / Walk away). See [NTR Mark — Scene Agency](/wiki/mechanics/ntr-mark#ntr-scene-agency) for the consequences. The Alley is the most common location for these scenes; the Tavern bath is the second.

## Atmosphere Notes

- Always raining or just-rained. The cobblestones never dry.
- The Antagonist sits on the same crate every visit until severity reveals — the static framing is the point.
- One lantern. Off-screen humming from somewhere above. Not threatening, exactly. Just there.
- Background SFX drops to ambient *before* the player commits to a choice. Silence = decision.

## Cross-references

- [Memory Fragments](/wiki/lore/fragments)
- [NTR Mark — Scene Agency](/wiki/mechanics/ntr-mark)
- [The Day 45 Crucible — Pact override](/wiki/mechanics/route-lock)
- [Antagonist](/wiki/characters/antagonist)
