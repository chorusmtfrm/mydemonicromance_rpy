---
title: Agent Brief
category: Dev Reference
route: shared
status: canonical
order: 1
summary: Entry point for an LLM coding agent (Cursor / Opus / Claude Code) working in this repo. Read this first, then the linked references, then start coding.
tags: [agent, llm, cursor, opus, claude, brief, invariants]
---

This page is for an **LLM coding agent**, not a human. If you are
human, read [Codebase Audit](/wiki/dev/codebase-audit) and
[Implementation Roadmap](/wiki/dev/implementation-roadmap) instead.

If you are a coding agent: this is the orientation. Skim it. Then
read the linked references in the order given. Then start work.

## Project identity

**Name.** My Demonic Romance.
**Repo.** `chorusmtfrm/mydemonicromance_rpy` on GitHub.
**Genre.** Adult Konosuba-flavored fantasy visual novel with branching
corruption / NTR / vanilla-romance routes.
**Engine.** Ren'Py 8.2.1+ (also tested on 7.7.1).
**Template.** Built on the **AIO GUI Template v2.7** (MIT, BáiYù et al.).
The template provides accessibility, achievements, gallery, replay,
music room, content warnings. **Do not rip these out** — extend them.
**Branches.** `main` is the live game. The Next.js wiki this page
lives in is on a separate v0 branch. Both are in the same repo.

## Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Engine | Ren'Py 8.2.1 | Python 3 syntax. No `async`/`await`. |
| Language | Ren'Py script + Python `init` blocks | Match style of existing `.rpy` files. |
| Template | AIO GUI v2.7 | Audio captions, image captions, achievements pre-wired. |
| Sprites | Eileen LayeredImage (placeholder) | Real character sprites not yet authored. |
| BG art | `images/room.jpg` only | All other backgrounds need authoring or AI generation. |
| Audio | OGG, in `audio/music/` | Use helpers, never raw `play music`. |
| Fonts | Quicksand + WorkSans (`gui/font/`) | Don't import new fonts unless asked. |

## Required reading (in order)

Read these before writing anything. Each link is a wiki page in this
project's `content/` directory.

1. [Codebase Audit](/wiki/dev/codebase-audit) — what's in the repo right now, file by file.
2. [AIO Template Reference](/wiki/dev/aio-template) — the helpers you must use.
3. [Variables](/wiki/dev/variables) — canonical variable names, types, initial values.
4. [Labels](/wiki/dev/labels) — canonical label naming and structure.
5. [Ren'Py Implementation](/wiki/dev/renpy-implementation) — copy-pasteable patterns for every system.
6. [Pitfalls](/wiki/dev/pitfalls) — the footguns. Read this twice.
7. [Implementation Roadmap](/wiki/dev/implementation-roadmap) — what to build, in what order, with acceptance criteria.

For game design context (less critical, read on demand):
[Day 1](/wiki/plot/day-1), [Endings](/wiki/plot/endings),
[Corruption](/wiki/mechanics/corruption),
[Cure Quest](/wiki/mechanics/cure-quest),
[Route Lock](/wiki/mechanics/route-lock).

## Invariants

These are not suggestions. Violating them breaks the build, breaks
accessibility, breaks the design, or breaks future agent runs.

**Code:**

1. **Never** call `play music X` or `play sound Y` directly. Always
   use `play_music("X")` and `play_sound("Y")` (defined in
   `accessibility.rpy`). The helpers fire `renpy.notify()` for caption
   users.
2. **Never** call `with hpunch` or `with vpunch` directly. Always use
   `shake("h")` / `shake("v")` (in `accessibility.rpy`) — they respect
   the screen-shake-disabled accessibility setting.
3. **Never** edit `definitions.rpy`. It is template-internal and
   currently dormant via `redefine_resources = False`.
4. **Never** rename or delete labels `splashscreen`, `start`,
   `skip_splashscreen`, `credits`, `before_main_menu`. The template
   references them.
5. **Never** define a new persistent variable without checking
   [Variables](/wiki/dev/variables) first. If you add one, update
   that page in the same commit.
6. Every new label, character, screen, or major variable group goes
   in **its own `.rpy` file** under `game/`. Don't bloat `script.rpy`.
   Suggested layout: `game/chapters/day_NN.rpy`,
   `game/systems/combat.rpy`, `game/characters/cast.rpy`.
7. Every new asset (image, audio) gets a caption registration via
   `define_image_caption` / `define_audio_caption` in
   `accessibility.rpy`. No exceptions.

**Workflow:**

8. **Branch awareness.** Code edits go on `main`. Wiki edits stay on
   the v0 branch. Don't cross the streams.
9. If you cannot push directly to `main` (sandboxed environment, or
   v0), use the GitHub Git Data REST API workflow documented in
   [Cross-Branch Workflow](/wiki/dev/cross-branch-workflow).
10. Commits to `main` use the trailer
    `Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>`
    when authored by an agent.
11. **MIT compliance.** The AIO template's credits in `gui.about` and
    the contributor block in `script.rpy` must remain. You may
    rewrite the surrounding prose, but the four names (BáiYù,
    bobcgames, TheoMinute, npckc) and the MIT license link stay.

**Design:**

12. The protagonist is named via `mc_name`. **Default is "Kael"** but
    the player will eventually set it via a name-input prompt. Always
    use `[mc_name]` in dialogue, never the literal string.
13. The two heroines are **Ryoka** (warrior, pink-haired, Hibiki-coded)
    and **Yuriko** (mage, silver-haired, Megumin-coded). Their stat
    progression is **separate** — `ryoka_corruption` and
    `yuriko_corruption` are independent integers, not a shared `party_corruption`.
14. **Six endings.** Vanilla Harem · NTR Total · Vanilla One · NTR One ·
    Bittersweet · Tragedy. Tragedy is the default if uncommitted by Day 90.
    The selector logic lives in `label compute_ending`.
15. The Day 45 Crucible is **scripted**, not arithmetic. Don't
    auto-jump on stat thresholds — fire a real event with dialogue.

## Current state (as of latest commit on `main`)

| Status | Item |
| --- | --- |
| Done | Rebrand (`options.rpy`) |
| Done | Content warning rewrite (`extras.rpy`) |
| Done | Day 1 cold open + slime fight + three-button combat introduction (`script.rpy`) |
| Done | Canonical variable block (in `script.rpy` — should migrate to `game/state.rpy`) |
| Done | Cast definitions (mc, ryoka, yuriko, brennan, stranger) |
| Stubbed | End-of-Day-1 hub screen (placeholder, needs real day loop) |
| Not started | Player-name prompt |
| Not started | Day 2 onward |
| Not started | Real combat system (sabotage submenu, suspicion gating) |
| Not started | Tavern affection scenes |
| Not started | Dark Alley fragments / Memory Fragment writes |
| Not started | Night Market shop |
| Not started | Day 30 / 45 / 90 milestone events |
| Not started | Cure Quest |
| Not started | Achievements migration (`bobcachievements`) |

See [Implementation Roadmap](/wiki/dev/implementation-roadmap) for
the ordered queue.

## How to work

**One coherent change per commit.** Either "add system X" or "author
chapter Y." Don't mix.

**Match existing style.** Read the file you're about to edit in full
first. Match its indentation (4 spaces), label naming
(`day_NN_event_name`), variable casing (snake_case),
and comment style (`# header lines like this for sections`).

**Wiki-first when adding systems.** If you introduce a new variable,
mechanic, or label, update the corresponding wiki page in the same
batch. Drift between the wiki and the code is the project's biggest
failure mode.

**Test by booting.** Ren'Py's launcher → "Launch Project" boots in
~3 seconds. Run after every commit. If it doesn't boot, your last
change broke something — fix before continuing.

## When to ask vs when to decide

**Decide:** indentation/whitespace, naming choices that the wiki
already establishes, refactors that don't change behavior, comment
wording, file organization that follows the wiki's structure.

**Ask:** any choice that touches game *content* not yet written
(scene tone, character voice, fragment prose), any deviation from
the wiki, anything that would change a canonical variable name or
label name, anything that would remove an AIO template feature.

When asking, propose the answer first. "Should I X or Y? I lean X
because Z. Override?" — not "what should I do?"
