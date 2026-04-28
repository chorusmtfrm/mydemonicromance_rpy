---
title: "Act II — The Curse and the Branch"
category: Plot
route: shared
status: drafted
order: 2
summary: Days 20–60. NTR Mark lands. Routes diverge. Per-girl Suspicion goes live. Midpoint route lock at Day 45 via the Crucible.
---

# Act II — The Curse and the Branch

**Days 20–60.** This is the act that breaks the player's heart and asks them to either repair it or finish smashing it.

## Beats

1. **Day ~22 — The Mark.** Antagonist lays the curse. Combat scene: protagonist loses, scripted. Either *witnesses* something between Antagonist and one of the girls (target chosen by current `*_corruption` lead), or wakes up alone with the Mark already burned in. Sets `curse_severity = 1`.
2. **Curse symptoms.** Vanilla scenes that previously read as warm now fizzle — premature, half-erect, pulled out early. **Mechanical, not narrated.** This is where `curse_severity` becomes felt at the Tavern.
3. **Day 25 — The Pact offer.** Antagonist returns to the Alley. Offers Pact Tier 1: power, a way to "even the score," and access to the Shady inventory. Refusing closes the corruption route's ceiling but doesn't lock it. Accepting locks the V1 (True Vanilla) ending out.
4. **Day 30 — Cure Quest opens.** The church hears of the Mark. Cure Quest step 1 unlocks via `adventuring_select`. Vanilla route's primary engine.
5. **Suspicion goes live.** First time either girl crosses `*_suspicion >= 30`, dialogue tells start landing in Tavern conversations and post-combat beats. Second crossing (60+) halves corruption gains on her. Third (90+) fires a confrontation scene that may force-lock the route.
6. **Day 45 — The Crucible.** Hard freeze unless already locked. The state arithmetic decides which crucible event fires; the *player* decides what locks. Four variants — `dual_fall`, `split`, `vanilla`, `drift`. See [The Day 45 Crucible](/wiki/mechanics/route-lock).
7. **Memory Fragment II.** Drops on whichever route is locked. Reveals the Antagonist's *original* claim on the protagonist — past betrayal, broken oath. Fragment 03 (Mark's Origin) follows when `corruption_total >= 30`.

## Tone targets

Cold drift. Konosuba lightness still surfaces in Tavern scenes but Dark Alley scenes go *quiet*. Music should drop instruments, not add menace — restraint reads scarier than horror cues.

> [!dev]
> The Bittersweet route is the most narratively interesting outcome but the easiest to fumble. Rule: it must *not* feel like a participation trophy. The locked-in girl gets her full affection arc. The lost girl gets a complete corruption arc. The player chose neither, and the writing has to honor both halves with *equal weight*. If Bittersweet feels worse than either pure ending, players will reload to avoid it. If it feels best, players will aim for it. Aim for *most expensive emotionally*.

## Pre-Crucible escape hatches

The Crucible can be skipped by **committing early**:

- Suspicion 90+ confrontation, "Come clean" branch → locks `vanilla` immediately
- Pact Tier 3 acceptance at the Alley → locks `ntr` immediately

Players who commit early are rewarded with a fuller Acts II/III arc on their chosen route — they earn the Crucible's omission.

## Cross-references

- [NTR Mark](/wiki/mechanics/ntr-mark)
- [The Day 45 Crucible](/wiki/mechanics/route-lock)
- [Suspicion](/wiki/mechanics/suspicion)
- [Cure Quest](/wiki/mechanics/cure-quest)
- [Memory Fragments](/wiki/lore/fragments)
