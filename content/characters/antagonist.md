---
title: The Bully
category: Characters
route: ntr
status: planned
order: 4
summary: Massive figure from the protagonist's past. The corruption faucet. Lives in the Dark Alley.
tags: [antagonist, alley, past]
---

## Concept

The Bully is the protagonist's history made flesh. Someone he knew before the party, before the curse, before he pretended he could be useful. He never left. Now he's powerful in a way that maps cleanly onto everything the protagonist failed to become — physical, certain, present.

He is the **corruption faucet**: every meaningful corruption gain on the NTR route flows through interactions with him in the Dark Alley.

## Why He Works (Mechanically)

Most NTR antagonists are interchangeable: a brick wall with a name. This one is structurally tied to the protagonist's *backstory*, which means every Alley meeting is also a memory recovery. That gives the route narrative weight beyond escalating scenes.

> ENI Proposal: every Dark Alley visit unlocks one **Memory Fragment** in the inventory. They're collectible, readable in the codex, and on the Vanilla route Ryoka and Yuriko can find them — that's how they learn what the protagonist has been doing on his "errands." Lore drip + accountability + collectible. Triple-duty.

## Stat / State Definition

```python
init python:
    class Bully:
        name = "Garrik"        # placeholder — needs a real name
        level = 70             # not as strong as the girls, but he never has to fight them
        method = "alchemy + access"
        leverage_held = []     # list[str] — what the player has fed him
        appearance_count = 0   # increments per Alley visit
        memory_fragments_unlocked = []
```

## Leverage Loop

The Alley scenes work as a *trade*. The player can:

1. **Give information** — what spells Yuriko's been studying, where the party camps. → Adds to `bully.leverage_held`. Drives `corruption` up.
2. **Take items** — aphrodisiacs, sensitivity hexes. Goes into inventory under `shady`.
3. **Take memory** — dialogue-only. Decrements `suspicion`, unlocks lore.

The third option is the pressure valve. Without it, every Alley visit is just a corruption ratchet and the route gets monotonous fast.

## Voicing Notes

- Calm, quiet, extremely patient. Never raises his voice. The horror is the *control*.
- Knows the protagonist's real name even though only the protagonist's *new* name is on the party roster. (Use this for a reveal scene around Day 35.)
- Refers to Ryoka and Yuriko by their formal titles, never their names — until corruption is high. Then it inverts.

## Scene Flag Index

| Flag                       | Trigger                                |
|----------------------------|------------------------------------------|
| `alley_first_visit`        | Day ≥ 7 + player chooses Dark Alley      |
| `alley_real_name_reveal`   | Day ≥ 35 + appearance_count ≥ 5          |
| `alley_proposition_ryoka`  | `ryoka_corruption ≥ 30`                  |
| `alley_proposition_yuriko` | `yuriko_corruption ≥ 40`                 |
| `alley_offer_payoff`       | `corruption_total ≥ 80`                  |
