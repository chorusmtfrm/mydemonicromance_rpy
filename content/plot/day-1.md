---
title: Day 1 — The Slime in the Tavern
category: Plot
order: 0
status: canonical
route: shared
summary: The opening chapter. Cold open in the tavern, party introduction, first sabotage decision. Currently the only authored chapter — boundary of the early dev build.
tags: [plot, day-1, opening, tutorial, combat, tavern]
---

# Day 1 — The Slime in the Tavern

The first chapter, live on `main` as of commit `f4e340f`. It runs
from `label start:` to `return` in `game/script.rpy`. The chapter
exists to do four things, in order:

1. **Establish voice** — first-person protagonist narration, dry
   Konosuba self-awareness, the irreconcilable gap between his level
   and his party's.
2. **Introduce the cast** — Ryoka, Yuriko, and Brennan in their
   native register, before any system has been explained.
3. **Plant the engine** — the slime fight is the player's first
   exposure to the **Support / Sabotage / Watch** menu. Every choice
   moves real numbers, even though the player isn't told that.
4. **Stop cleanly** — Day 1 ends at an end-of-build screen so the
   game boots, plays, and ends without referencing systems the rest
   of the build doesn't have yet.

## Beat Sheet

| Beat | Location | Music | Notes |
| --- | --- | --- | --- |
| Cold open | Tavern bedroom (`bg room`) | `garden` | First-person hangover, demon lord identity, eight silver, party shame |
| Brennan offstage | (still bedroom, audio only) | `garden` | `play_sound(door)` from below; tavern keeper hails the protagonist |
| Common room arrival | Tavern common room (reuses `bg room`) | switch to `concrete` | First slime mid-fight, Ryoka + Yuriko introduced through action |
| Notice the protagonist | Common room | `concrete` | Affection beat — Ryoka warm, Yuriko ledgered |
| Second slime | Common room | `concrete` + `shake()` | The actual menu choice |
| After the fight | Common room | switch to `garden` | Brennan's "drinks aren't free anymore" |
| End-of-build hub stub | Common room | `garden` | Four choices, all converge to the closing screen |
| Closing screen | NVL | (music stops) | "End of Day 1" + acknowledgment |

## The Combat Choice

The mid-chapter slime fight sets the player's first values for the
combat-habit telemetry. The wiki's
[Combat](/wiki/mechanics/combat) and
[Suspicion](/wiki/mechanics/suspicion) pages describe these
counters in full; this is what Day 1 specifically does:

| Choice | Variable changes | Narrative |
| --- | --- | --- |
| **Support — buy them an opening** | `support_count +1`, `ryoka_affection +2`, `yuriko_affection +2` | Protagonist casts *Lux Inversa* on the slime's eyestalks. Ryoka strikes through the opening. Yuriko is dryly approving. |
| **Sabotage — let them flounder** | `sabotage_count +1`, `ryoka_corruption +3`, `yuriko_suspicion +5` | Protagonist withholds the spell. Ryoka takes a forearm scrape. Yuriko *looks at him.* The look is described as worse than angry — *taking notes.* This is the first suspicion telegraph. |
| **Watch** | `watch_count +1` (no affection / corruption move) | Protagonist folds his arms and counts to eleven. Ryoka snaps at him; Yuriko sides with him. |

> [!note] Why the numbers are small
> Day 1 is a single fight. The thresholds in
> [Corruption](/wiki/mechanics/corruption) and
> [Affection](/wiki/mechanics/affection) are tuned for a 90-day arc,
> so a single choice deliberately moves the bars by a handful of
> points. The player should *not* hit a state change in chapter one.
> The point is to plant the dial, not turn it.

## Variables Initialized

`script.rpy` declares the entire canonical variable set at module
scope (via `default`) so the very first save file has every variable
defined, even ones the build doesn't read yet. The set lives in the
"My Demonic Romance — Canonical Game Variables" section, just above
`label start:`. See the [Variables Reference](/wiki/dev/variables)
for the canonical list and definitions.

Day-1-specific flags introduced:

| Variable | Type | Purpose |
| --- | --- | --- |
| `met_brennan` | `bool` | Set true after Brennan's offstage greeting. Future Brennan scenes can branch on this. |
| `day1_combat_choice` | `str | None` | One of `"support" | "sabotage" | "watch"`. Read by future days for callback dialogue. |
| `mc_name` | `str` | Defaults to `"Kael"`. Player-renaming UI is not yet wired. |

## Cast Definitions

Live in `script.rpy` immediately above the variables block:

| Character | Speaker tag | Color | Vibe |
| --- | --- | --- | --- |
| Protagonist | `mc` | `#c8a861` (muted gold) | First-person internal monologue + spoken lines |
| Ryoka | `ry` | `#d97757` (warm fire-red) | Loud, warm, level 99 warrior |
| Yuriko | `yu` | `#7a8fcf` (cool studious blue) | Quiet, ledgered, level 95 mage |
| Brennan | `br` | `#8a6f4c` (earthy brown) | Tavern keeper |
| `???` (silhouette) | `stranger` | `#7a2230` (burgundy) | Reserved for the antagonist's first appearance — unused in Day 1 |

## Asset Notes

Day 1 is **sprite-less by design**. No character art is authored
yet, so the chapter leans on:

- **Background:** `bg room` (the AIO template's bedroom) — reused
  for both the protagonist's bedroom and the tavern common room. A
  proper tavern common-room background is the highest-priority art
  ask for Day 2.
- **Music:** AIO template's `garden` (calm) and `concrete` (tension).
  Both are placeholders; Eric Matyas tracks under their original
  licenses.
- **SFX:** Only `door` (`Edge-of-Ocean.mp3`, repurposed) is used.
  All audio goes through `play_music()` / `play_sound()` so caption
  users see the cue.
- **Effects:** `shake()` for the second slime entrance — respects
  the player's screenshake preference.

## Open Hooks for Day 2+

The Day 1 hub stub lists four choices, all of which currently
converge on the end-of-build screen. They're written so the
narrative continuation is obvious:

| Hub choice | Where it'd lead | What system it'd unlock |
| --- | --- | --- |
| Drink at the tavern | [Tavern](/wiki/locations/tavern) | Affection scenes |
| Look for paying work | (not yet specced — town board?) | Gold gain via adventuring + random encounters |
| Walk down toward the lower district | [Dark Alley](/wiki/locations/dark-alley) | Corruption vector + Memory Fragment drops |
| Go back to bed | Day 2 | Day-loop tick (decrements suspicion) |

## Known Debt

- **`mc_name` rename UI** — currently hard-coded `"Kael"`. Needs a
  name-prompt screen called from the splashscreen flow before
  `label start:`.
- **`bg tavern_common`** — placeholder reuses the bedroom. Replace
  with a proper common-room background when art is ready.
- **No Day 2** — all four hub choices fall through to the close
  screen. Authoring Day 2 is the next milestone.
- **Achievement IDs** — only the template's `beginning` is
  re-purposed. Real Day-1-specific achievements (e.g. one for each
  combat choice) want to be added to `sbobcachievements.rpy`.
