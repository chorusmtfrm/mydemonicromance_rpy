---
title: "Act I — The Hero's Return"
category: Plot
route: shared
status: drafted
summary: Days 1–20. Establishes the world, the party bond, and the Antagonist's reappearance. Branchless except for tone.
---

# Act I — The Hero's Return

**Days 1–20.** Establish, foreshadow, hook.

## Beats

1. **Cold open.** Final boss fight (tutorial-disguised). Party at Lv 99/95/90. Konosuba-tone victory banter. The Hero (you) gets buried in praise. Ryoka punches your shoulder, Yuriko adjusts your collar. *This is what the player is going to lose.*
2. **Return to Capital.** Tavern home base introduced. Day-loop unlocks. Ryoka and Yuriko move in upstairs. Establish gift system, affection bar, mood states.
3. **Strange dreams.** Recurring nightmare of a hooded figure. Player can't act on it yet. Foreshadows Antagonist.
4. **First combat encounter.** Bandit ambush. Tutorial for Sabotage *and* Support — the player is taught both verbs without judgment. Critical: **the game must teach sabotage as a neutral mechanic** at this stage.
5. **Antagonist's reveal.** Day ~15. Hooded figure appears in Dark Alley after a Tavern incident. Recognition shock — the protagonist *knows* him. Memory Fragment I drops. The Pact is *offered*, not pressed.
6. **Act break.** Player chooses whether to return to the Dark Alley voluntarily. **This is the first true branch flag**, but it's not yet routing.

## Variables touched

```python
$ ryoka_affection += 5  # cold open banter
$ yuriko_affection += 5
$ alley_visits = 0
$ memory_fragment_1 = True  # post-reveal
$ antagonist_known = True
```

## Tone targets

Bright. Warm. Konosuba-comedic. **The player should feel safe.** That comfort is the asset Act II spends.

> [!dev]
> Single biggest Act I trap: revealing the corruption mechanic too early. Sabotage exists in the tutorial but is *framed as utility* (debuff the goblin so Ryoka one-shots him). Don't show the player a corruption bar until Act II's first mid-combat aphrodisiac scene. The reveal of *what they've been doing* is a mid-game gut-punch.

## Cross-references

- [Tavern](/wiki/locations/tavern)
- [Antagonist](/wiki/characters/antagonist)
- [Combat](/wiki/mechanics/combat)
