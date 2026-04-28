# AGENT.md — Cursor / Opus / Claude Code Brief

> If you are a coding agent (Cursor, Opus 4.7, Claude Code, etc.) opening
> this repo, **read this file first**, then follow the links.
> If you are human: skim this, then open the wiki.

## Project

**My Demonic Romance** — adult Konosuba-flavored fantasy visual novel.
Branching corruption / NTR / vanilla-romance routes. Built on the
**AIO Ren'Py GUI Template v2.7** (MIT, BáiYù et al.) on Ren'Py 8.2.1+.

## Where the design lives

The full design wiki lives on the branch
**`v0/theh3rbshop-3f9c2708`** under `content/`. It is rendered as a
Next.js dev-reference site (run `pnpm dev` on that branch to view it
locally at `http://localhost:3000`).

**Required reading (in this order):**

1. `content/dev/agent-brief.md` — orientation
2. `content/dev/codebase-audit.md` — what's in the repo
3. `content/dev/aio-template.md` — helpers you must use
4. `content/dev/variables.md` — canonical variable names
5. `content/dev/labels.md` — canonical label names
6. `content/dev/renpy-implementation.md` — copy-pasteable patterns
7. `content/dev/pitfalls.md` — footguns, read twice
8. `content/dev/implementation-roadmap.md` — what to build, in what order

To read these without switching branches:

```bash
git fetch origin v0/theh3rbshop-3f9c2708
git show origin/v0/theh3rbshop-3f9c2708:content/dev/agent-brief.md
```

## Hard invariants

1. **Audio.** Use `play_music("...")` / `play_sound("...")` — never
   raw `play music`/`play sound`. The helpers fire accessibility
   captions. Same for `shake("h")` instead of `with hpunch`.
2. **Image captions.** Every new asset needs a caption registered in
   `accessibility.rpy`'s `IMAGE_CAPTIONS` / `AUDIO_CAPTIONS`.
3. **Don't edit `definitions.rpy`.** Template-internal, dormant.
4. **Don't rename `splashscreen`, `start`, `skip_splashscreen`,
   `credits`, `before_main_menu`** — the template references them.
5. **Per-girl stats only.** `ryoka_corruption` / `yuriko_corruption`
   are independent. Never use a shared `party_corruption`.
6. **Six endings, not three.** Tragedy is the default if uncommitted
   at Day 90. The selector lives in `label compute_ending`.
7. **MIT compliance.** Keep the AIO template credits in `gui.about`
   (BáiYù, bobcgames, TheoMinute, npckc) and the MIT license link.
8. **Indentation:** 4 spaces. **Variable casing:** snake_case.
   **Label casing:** `day_NN_event_name` or `system_action`.
9. **One coherent change per commit.** Either "add system X" or
   "author chapter Y" — don't mix.
10. **Wiki and code stay in sync.** If you add a variable, mechanic,
    or label, update the corresponding wiki page in the same commit.

## Current state

| Status | Item |
| --- | --- |
| Done | Rebrand (`options.rpy`) |
| Done | Content warning rewrite (`extras.rpy`) |
| Done | Day 1 cold open + slime fight + three-button combat introduction (`script.rpy`) |
| Next | Day-loop scaffold (Phase 1 in the roadmap) |

See `content/dev/implementation-roadmap.md` (on the wiki branch) for
the full ordered queue.

## Style

Read the file you're about to edit in full. Match its conventions
exactly. Don't refactor unprompted.

When you ask the user a question, propose your answer first. "I want
to do X because Y. Override?" — not "what should I do?"

## Branding

- Name: **My Demonic Romance**
- Repo: `chorusmtfrm/mydemonicromance_rpy`
- Version: see `define config.version` in `game/options.rpy`
- Save dir: `MyDemonicRomance-1761696000` — never change this for
  released versions, it would break player saves.

## License

Game code, prose, and design are © the project author.
The AIO GUI Template (BáiYù, bobcgames, TheoMinute, npckc) is MIT.
Credits preserved in `gui.about` per the MIT license.
