---
title: Codebase Audit
category: Dev Reference
order: 1
status: canonical
tags: [audit, scaffold, aio, conventions]
summary: Reconciliation between the wiki's design and the actual scaffold on master. Read this before authoring anything in the repo.
---

# Codebase Audit

Snapshot of `chorusmtfrm/mydemonicromance_rpy` on `master` as of the
connection date. The repo is the **AIO GUI Template v2.7** by BáiYù
(with code from bobcgames, TheoMinute, npckc), MIT-licensed, tested
on Ren'Py 7.7.1 and 8.2.1. Nothing project-specific has been added
yet — this is a clean scaffold with demo content for the
`Eileen` placeholder character.

## Repo Layout

The root contains the **Ren'Py engine internals** (`00*.rpy`,
`*.rpym`, `_errorhandling.rpym`, `classic_*.rpym`,
`imagemap_*.rpym`, etc). **Do not modify these.** They are a copy
of `renpy/common/` from the SDK and exist so the project can be
opened standalone. All project work happens inside `game/`.

## `game/` Inventory

| File | Lines | Role | Touch? |
| --- | ---: | --- | --- |
| `script.rpy` | 354 | Splashscreen + main `start` label, Eileen demo content | Replace |
| `definitions.rpy` | 119 | Resource auto-loader | See note ↓ |
| `options.rpy` | 240 | `config.name`, version, build name, mixers, transitions | Customize |
| `gui.rpy` | 498 | GUI styling — colors, fonts, sizing | Customize |
| `screens.rpy` | 1800 | Custom screens with accessibility hooks | Read before editing |
| `extras.rpy` | 655 | Content warning, splash settings, gallery, replay, music room, credits | Customize |
| `accessibility.rpy` | 428 | Audio captions, image captions, screen shake, NVL helpers | Read carefully — provides core helpers |
| `0bobcachievements.rpy` | 123 | Achievement framework | Add our IDs |
| `sbobcachievements.rpy` | 74 | Achievement display screen | Customize visuals |

> [!warning] `definitions.rpy` is broken in Ren'Py 8
> The file is a resource auto-loader that overwrote itself with discovered
> images and audio. Its `init -1 python:` block opens the file in binary
> mode and rewrites it — this no longer works in Ren'Py 8 due to script
> compilation changes. The `$ redefine_resources = False` flag at the
> top keeps it dormant. **Recommendation:** leave it dormant and define
> our images/audio explicitly in a new `images.rpy` and rely on Ren'Py 8's
> automatic image discovery for everything in `images/`.

## Pre-Bundled Audio Assets

These come with the template. We can keep them as placeholders or
swap them at any time:

**Music** (in `audio/music/`):

| Alias | File |
| --- | --- |
| `garden` | Sculpture-Garden_Looping.mp3 |
| `summer` | Careless-Summer_Looping.mp3 |
| `business` | Future-Business_v001.mp3 |
| `concrete` | The-Concrete-Bakes_Looping.mp3 |

**SFX** (in `audio/sfx/`):

| Alias | File |
| --- | --- |
| `door` | Edge-of-Ocean.mp3 |
| `drawer_open` | Chest-Drawer_Open.mp3 |
| `drawer_close` | Chest-Drawer_Close.mp3 |
| `interior_door_close` | Interior-Door_Close.mp3 |

All licensed under the music's individual license (Eric Matyas /
soundimage.org for the four music tracks).

## Pre-Defined Achievements

In `0bobcachievements.rpy`:

```python
("beginning", _("Beginning"), _("Started a new game"))
("office", _("Office"), _("Went to the office"))
("beach", _("Beach"), _("Went to the beach"))
("completionist", _("Completionist"), _("Read all of the game"), True)
```

The first three are demo content tied to the Eileen script and
should be **replaced** with our six endings + fragment milestones.
`completionist` we keep — it's wired to `readtotal == 100` in the
credits flow.

## Convention Audit

**File-level:**

- 4-space indentation everywhere.
- Section headers use `## Section ##############` with trailing
  hashes (variable count, usually padding to a column).
- Two comment levels: `## ` for descriptive prose, `# ` for inline.
- UTF-8 BOM on `script.rpy` and `options.rpy`. Preserve when editing.

**Naming:**

- Variables: `snake_case`, often single-word (`casual`,
  `firstlaunch`, `seen_splash`).
- Persistent vars: `persistent.X` — already in use:
  `persistent.firstlaunch`, `persistent.seen_splash`,
  `persistent.credits_seen`, `persistent.game_clear`,
  `persistent.typeface`.
- Characters: `define e = Character(...)` short aliases, with
  parallel `e_nvl`, `e_bubble` variants where needed.

**Audio is captioned, not played raw.** Every music/SFX cue goes
through helpers defined in `accessibility.rpy`:

```python
$ play_music(garden, fadein=2.0, fadeout=2.0)
$ play_sound(door)
```

These check the audio-caption preference and emit a `renpy.notify()`
description if enabled. **Do not** write `play music X fadein 2.0`
in our scenes — it bypasses captions and breaks accessibility.

**Image movements are captioned.** A custom `ic` speaker exists for
narrating sprite changes:

```python
show eileen at right with move
ic "Eileen walks to the right of the room."
```

Whether we caption every move in a corruption-heavy game is a
design choice — but the *infrastructure* is there.

**LayeredImages** are the sprite pattern. Eileen demonstrates:

```python
layeredimage eileen:
    group base auto:
        attribute casual default
        if casual:
            "eileen_headband"
    group face auto:
        attribute neutral default
```

Our Ryoka, Yuriko, Elara, Antagonist, Brennan, and Silver Vow
sprites should follow this pattern — group `base` (outfit) +
group `face` (expression), with `auto` so adding a new file like
`ryoka_base_armor.png` registers the attribute automatically.

**Screen shake** uses a custom `$ shake()` helper, not `with hpunch`.
The helper randomizes intensity and respects the player's
"reduce motion" preference.

**NVL mode** has dedicated character variants (`e_nvl`,
`nar_nvl`). NVL transitions use `nvl clear` to wipe the page.

## Reconciliation: Wiki vs. Scaffold

| Wiki Says | Scaffold Says | Decision |
| --- | --- | --- |
| Variables: `ryoka_corruption`, `yuriko_corruption`, etc. | Convention is short snake_case (`casual`) | Keep wiki names — they're descriptive enough and the project will outgrow single-word ids |
| Music: `play music X fadein 2.0` | Always `$ play_music(X, fadein=2.0)` | **Wiki is wrong.** Update implementation page to use the helper |
| Custom achievements at endings | Framework already exists with 4 demo IDs | Replace demo IDs with ours, keep `completionist` |
| Custom day-loop hub screen | None exists yet | Build new — no conflict |
| Layered character sprites | Pattern established | Follow Eileen's structure for all six new characters |
| Splashscreen flow | Already wired: splashscreen → content_warning → splash_settings → preferences → start | Insert our content warning text + jump to a new `prologue` label instead of the demo |
| `definitions.rpy` lists resources | Broken in Ren'Py 8, dormant | Don't try to revive it. New `images.rpy` if needed |
| Day count, route flag, suspicion | Nothing exists | Greenfield — write new |

## What to Build First

In priority order, smallest viable increment first:

1. **Rename and rebrand** — `options.rpy` (`config.name`,
   `config.version`, build name), splashscreen text in
   `extras.rpy`, content warning copy.
2. **Replace the achievement list** — six ending IDs +
   `fragment_collector_X` milestones, keep `completionist`.
3. **Define our characters** — Ryoka, Yuriko, Elara, Antagonist,
   Brennan, Silver Vow trio. Stub LayeredImage blocks even
   without art so the rest of the script can reference them.
4. **Replace `script.rpy`'s `start` label** — point at a new
   `prologue.rpy` containing the genuine opening, then jump
   to the day loop.
5. **Build the day loop** — new `day_loop.rpy` with the hub
   screen, day/night toggle, action menu (Tavern / Market /
   Alley / Adventure / Rest).

Each step is a single commit to `master`. The Day 45 Crucible,
Cure Quest, and ending resolution layer on top of (5) and don't
need to be built before then.

## Open Questions for the User

- **Voice acting?** `config.has_voice = True` is set — we have the
  channel reserved. If no VA is planned, it can be `False` to hide
  the volume slider.
- **Bubble dialogue?** The template defines `e_bubble`. If our game
  uses bubble dialogue at all, we should establish the pattern
  early. If not, drop the variant when we replace the character
  definitions.
- **Phone-mode GUI?** The template ships separate `gui/phone/` art
  for portrait orientation. If we don't ship mobile, we can
  delete the directory and reclaim a few MB.
- **Translation strings?** Every string in the template is wrapped
  in `_()`. We should follow that convention even if we never
  translate — costs nothing, future-proofs us.
