---
title: AIO Template Reference
category: Dev Reference
order: 2
status: canonical
tags: [aio, helpers, accessibility, reference]
summary: What the AIO GUI Template provides out of the box. Use this when you forget which helper to call.
---

# AIO Template Reference

Cheat sheet for the helpers, characters, and screens shipped by the
AIO GUI Template v2.7. Everything below already works in the repo
without additional setup.

## Helpers from `accessibility.rpy`

### Audio

```python
# Music — fades and channels respected
$ play_music(garden, fadein=2.0, fadeout=2.0)
$ play_music(business, if_changed=True)        # avoids restarting same track
$ play_music(rain, channel="weathermusic")     # custom channel

# Sound effects
$ play_sound(door)
$ play_sound(phone, loop=True)

# Stop the music channel
stop music fadeout 2.0
```

Both helpers respect the **audio caption** preference. When on, a
`renpy.notify()` describes the cue using captions registered in
`accessibility.rpy`'s `audio_caption_dict`. Adding new audio
**requires** updating that dict or the cue will play silently
to caption-users.

### Screen Shake

```python
$ shake()
```

Randomized intensity per call. Respects the "reduce motion"
preference and becomes a no-op when disabled. **Do not use
`with hpunch`** — it bypasses the preference.

### Image Captions

The `ic` speaker is defined as a Character that emits narration
only when image captions are enabled:

```python
show ryoka at right with move
ic "Ryoka steps to the right, scanning the alley mouth."
```

If captions are off, `ic` lines are skipped. We can use this to
narrate every meaningful sprite movement without bloating prose
for sighted players.

## Helpers from `extras.rpy`

### Read Percentage

```python
$ percent()
```

Sets `readtotal` (0–100). Called near the end of the game (in the
`credits` label). Tied to `persistent.game_clear` and the
`completionist` achievement.

### Galleries

The template provides three gallery objects, all instantiated in
`extras.rpy`:

| Object | Purpose |
| --- | --- |
| `g_bg` | Background gallery — unlock with `g_bg.unlock("imgname")` |
| `g_sprite` | Sprite gallery — `g_sprite.unlock_image("bg", "char attr")` |
| `g_cg` | CG gallery (use for our scene CGs) |

Locked thumbnails fall back to `bg_locked.jpg` / `cg_locked.jpg` /
`sprite_locked.jpg` in `gui/button/`.

### Replay

Replayable scenes are wrapped in a label and triggered with
`Replay("label_name")`. The template demos this with
`label office:` and `label beach:` inside the `start` label.

For our purposes, replay-worthy scenes are: Tavern affection
peaks, ending epilogues, cure-ritual finale.

### Credits Scroll

```python
call screen credits(15.0)
```

The `15.0` is the duration in seconds. Credits text lives in
`extras.rpy` as `screen credits()` — find and edit there.

## Achievement Framework

Defined in `0bobcachievements.rpy`. Append to `BOBCACHIEVEMENT_LIST`:

```python
define BOBCACHIEVEMENT_LIST = (
    ("ending_vanilla_harem",   _("Bonded"),       _("Saved both Ryoka and Yuriko.")),
    ("ending_ntr_harem",       _("Demon's Yoke"), _("Watched both fall and called it love.")),
    ("ending_bittersweet_r",   _("Half-Light"),   _("Saved Ryoka. Lost Yuriko."), True),
    ("ending_bittersweet_y",   _("Half-Light"),   _("Saved Yuriko. Lost Ryoka."), True),
    ("ending_tragedy",         _("Day Ninety"),   _("The clock ran out."), True),
    ("fragment_collector_5",   _("Listener"),     _("Collected five Memory Fragments.")),
    ("fragment_collector_all", _("Witness"),      _("Collected every Memory Fragment."), True),
    ("completionist",          _("Completionist"),_("Read all of the game."), True),
)
```

Granting an achievement in script:

```python
achieve ending_vanilla_harem
```

The `True` fourth tuple element marks the achievement as
**hidden** until earned (description shows `???`).

## Display Screen

`screen bobcachievements()` in `sbobcachievements.rpy` renders the
achievement list. Visual customization via these defines (override
in our own file or in `screens.rpy`):

```python
define BOBCACHIVEMENTS_SPACING = 20
define BOBCACHIVEMENTS_HIDDEN_ACHIEVEMENT_TEXT = _("???")
define BOBCACHIEVEMENTS_SPACING_CHAR = _("-")
define BOBCACHIEVEMENTS_GRANTED_COLOR = gui.text_color
define BOBCACHIEVEMENTS_UNGRANTED_COLOR = gui.insensitive_color
```

To expose the screen from the game menu, `sbobcachievements.rpy`'s
header instructs adding to `screens.rpy`'s `screen navigation()`:

```python
textbutton _("Achievements") action ShowMenu("bobcachievements")
```

## Splashscreen Flow

Order of operations on first launch:

1. `label splashscreen:` plays the Ren'Py logo + "Made with Ren'Py" text
2. `call screen content_warning` — text in `extras.rpy`
3. If `not persistent.firstlaunch`:
   - `call screen splash_settings`
   - `call screen preferences`
   - `$ persistent.firstlaunch = True`
4. `return` → `label start:`

For our game, **content warning text** is the highest-priority
edit — currently the placeholder text in `extras.rpy`. Then
intercept `label start:` to point at our prologue.

## End-of-Game Flow

```python
label credits:
    $ quick_menu = False
    window hide
    scene black with fade
    call screen credits(15.0)
    $ persistent.credits_seen = True
    # ...
    $ percent()
    show screen results
    centered "Fin"
    hide screen results
    if persistent.game_clear: pass
    else:
        if readtotal == 100:
            achieve completionist
            # secret message reveal
            $ persistent.game_clear = True
            pause
    $ quick_menu = True
    return
```

For our six endings, **each** ending label should `jump credits`
after its epilogue scene completes. The credits handle achievement
attribution, percentage tracking, and the secret-message reveal
for completionists.

## Character Definition Pattern

```python
define r = Character("Ryoka",
                    color="#c94a3d",
                    image="ryoka")

define r_nvl    = Character("Ryoka", color="#c94a3d", kind=nvl,    image="ryoka")
define r_bubble = Character(          color="#c94a3d", kind=bubble, image="ryoka")
```

The `image="ryoka"` argument links the character to the
LayeredImage of the same name, enabling `r "..."` to pull the
correct sprite for side-image displays.

## LayeredImage Pattern

```python
layeredimage ryoka:

    group base auto:
        attribute armor default
        attribute robe
        attribute corrupted

    group face auto:
        attribute neutral default
        attribute angry
        attribute smiling
        attribute lustful
        attribute crying
```

`auto` means new files like `ryoka_base_robe.png` register
automatically — no manual `attribute` declarations needed for
each art file. The `corrupted` attribute on the base group is our
hook for visual corruption escalation.

## What's Missing (Build Targets)

The template provides everything for VN-style storytelling. It
does **not** provide:

- Day/night cycle or hub screen
- Combat system
- Inventory / shop UI
- Stat tracking screens (corruption, affection, suspicion)
- Variable-driven scene branching infrastructure

All of those are our work and live in new files in `game/`.
Recommended file split for our additions:

| New File | Contents |
| --- | --- |
| `characters.rpy` | All Character() defines + LayeredImages |
| `state.rpy` | All `default` variables (corruption, affection, etc.) |
| `helpers.rpy` | Python helpers (compute_ending, suspicion_check, fragment_draw) |
| `day_loop.rpy` | Day loop label + hub screen |
| `combat.rpy` | Combat label + battle screen |
| `scenes/tavern.rpy` | Tavern scenes |
| `scenes/alley.rpy` | Dark Alley scenes + fragment drops |
| `scenes/market.rpy` | Night Market scenes + shop |
| `scenes/cure.rpy` | Four-step Cure Quest |
| `scenes/crucible.rpy` | Day 45 Crucible |
| `scenes/endings.rpy` | All six ending labels + jump credits |
| `lore/fragments.rpy` | Fragment vignette labels |
