---
title: The Cure Quest
category: Mechanics
route: vanilla
status: planned
order: 4
summary: Vanilla-route progression in four mixed-type steps. Each completion decrements curse_severity and unlocks deeper intimacy in the Tavern.
tags: [vanilla, quest, artifact-of-purification]
---

# The Cure Quest

Four steps. Mixed types — never twice the same gameplay verb in a row, because monotony is what kills slow-burn romance arcs in Ren'Py. Each step decrements `curse_severity` by 1 and shifts the Tavern intimacy resolution table on [Affection](/wiki/mechanics/affection).

## Structure

| # | Type | Lead | Step Variable | Severity After |
|---|---|---|---|---|
| 1 | **Fetch** | Yuriko | `cure_quest_step = 1` | 2 |
| 2 | **Boss Fight** | Ryoka | `cure_quest_step = 2` | 1 (or 0, see below) |
| 3 | **Dialogue / Choice Gate** | Both | `cure_quest_step = 3` | unchanged — chooses *how* the cure ends |
| 4 | **Ritual** | Both, in the Tavern Room | `cure_quest_step = 4` | 0, `curse_lifted = True` |

> [!dev]
> The Mark caps at severity 3. Severity 2 → 1 → 0 happens across steps 1, 2, 4. Step 3 is intentionally mechanically silent — its job is to fork the *meaning* of the cure, not the integer. That's what makes step 3 the emotional center of the quest.

## Step 1 — Fetch: Pendant Half (Old Chapel)

**Day-action.** Triggered by `adventuring_select` once `cure_quest_started == True`. Lead: Yuriko.

- Locked behind `ryoka_affection >= 40 OR yuriko_affection >= 40`. The girls have to trust the protagonist enough to follow him into a ruin that connects to his past.
- Combat: trash mobs only. **No sabotage option** — this is a Vanilla-coded encounter, the menu omits the button.
- Recovery scene at the chapel altar surfaces Memory Fragment II if not already drawn. First time the protagonist's *past name* is spoken.

```python
label cure_step_1_complete:
    $ cure_quest_step = 1
    $ curse_severity = max(0, curse_severity - 1)
    $ inventory["key_items"].append("pendant_half")
    if "fragment_02" not in memory_fragments:
        $ memory_fragments.append("fragment_02")
    "The Mark cools, just slightly. Like a banked ember."
    return
```

**Severity payoff that night:** Tavern Room scene resolves at severity 2 — mutual pacing, half-success, affection +5 to whichever girl was led with.

## Step 2 — Boss Fight: Salt-Forged Knife (Coastal Cliffs)

**Day-action.** Lead: Ryoka. Locked behind `cure_quest_step == 1` and `day_count >= 35`.

- Boss: the Tide-Bound Wretch. A soul-bound creature that holds the salt-forged knife. **Mechanical hook:** the boss has a "Lash of Memory" ability that triggers a flashback mid-combat — the player sees Memory Fragment IV play out in real time while the fight continues.
- Sabotage menu is **available but penalized**: each sabotage adds `+10` corruption *and* `+15` suspicion to the targeted girl. Tempting but rarely worth it. The Vanilla path's fingerprint — the discipline cost is real.
- Boss reward: salt-forged knife (key item), and severity decrement.

```python
label cure_step_2_complete:
    $ cure_quest_step = 2
    $ curse_severity = max(0, curse_severity - 1)
    $ inventory["key_items"].append("salt_forged_knife")
    if "fragment_04" not in memory_fragments:
        $ memory_fragments.append("fragment_04")
    return
```

> [!warning]
> If the player fails this fight, **do NOT route to a Game Over**. Route to a defeat scene where Ryoka carries the protagonist back to the Tavern. `curse_severity` does *not* decrement, but `ryoka_affection += 8` because she swore she'd protect him — and just did. The retry option is available next day. Defeat scenes are where Vanilla earns its emotional currency.

## Step 3 — Dialogue / Choice Gate: The Confession

**Day-action.** Lead: Both. Triggered automatically the morning after Step 2 completes.

This is the step that **forks the cure**. No combat. No fetch. A long Tavern-Room conversation where the protagonist must explain the curse, the Antagonist's identity, and his own past. The player chooses the *frame*:

| Choice | Frame | Effect on Step 4 |
|---|---|---|
| **Confess everything** | "He cursed me because I broke a promise to him." | Step 4 ritual unlocks the **Atonement** finale — protagonist + both girls confront Antagonist together. |
| **Reframe as victim** | "He's been hunting me. I don't know why." | Step 4 ritual unlocks the **Refuge** finale — Antagonist is sealed, not faced. Smaller scope, gentler tone. |
| **Withhold key detail** | Hides the broken promise. | Step 4 still fires but `lies_told += 1`; epilogue text shifts to acknowledge the unspoken thing. Vanilla still resolves but with a melancholy undertone. |

```python
label cure_step_3_complete:
    $ cure_quest_step = 3
    # severity unchanged — this step is narrative
    menu confession_frame:
        "Confess everything.":
            $ persistent_atonement_path = True
        "Frame yourself as a victim.":
            $ persistent_refuge_path = True
        "Withhold the broken promise.":
            $ persistent_atonement_path = True
            $ lies_told += 1
    return
```

> [!proposal]
> Run a high-`ryoka_affection` and high-`yuriko_affection` *Charisma* check on the "Withhold" branch. If either girl's affection ≥ 80, the option is **greyed out with a flavor line**: "She'd see through this in a heartbeat." Treat it as the game refusing to let the player be a coward when the relationship has earned candor. That's the warmest beat in the route.

## Step 4 — Ritual: Reforging (Tavern Room)

**Night-action**, locked to Day 75 minimum and `cure_quest_step == 3`. Lead: Both.

The reforging happens *in the Tavern Room*. Not a dungeon. Not the Antagonist's domain. Home. This is the only step that doesn't take a day-slot — it consumes the entire Day 75 night, and the next morning is the finale wind-down.

```python
label cure_step_4_complete:
    $ cure_quest_step = 4
    $ curse_severity = 0
    $ curse_lifted = True
    $ inventory["key_items"].append("reforged_pendant")
    if persistent_atonement_path:
        jump finale_atonement
    if persistent_refuge_path:
        jump finale_refuge
    jump finale_refuge   # default
```

**The scene itself:** the pendant halves are joined. Both girls speak the witness lines. The protagonist breaks the curse aloud. The Mark on his thigh fades to a silver scar. CG ramps from ember-red to muted gold to silver across the scene's three beats. Music drops to a single string halfway through and stays there.

## Hard Deadline

Day 90 is the hard cap. If at Day 90 `cure_quest_step < 4`:

- `curse_severity` is locked at its current value
- Vanilla route still resolves but as **Compromised Vanilla (V2)** — see [Endings](/wiki/plot/endings)
- The remaining cure steps are referenced in epilogue text as "things you'd been meaning to do"

> [!warning]
> Never lock the player out of the route entirely at Day 90. The deadline degrades the ending; it doesn't bar the door. Locking out earned routes is the fastest way to make players reload the entire run, and a 30-hour reload is a refund request.

## Cross-references

- [NTR Mark](/wiki/mechanics/ntr-mark) — what the curse actually does
- [Affection](/wiki/mechanics/affection) — Tavern intimacy resolution table
- [Memory Fragments](/wiki/lore/fragments) — fragments unlocked along the way
- [Endings](/wiki/plot/endings) — V1, V2, and which step counts gate which
