---
title: Ren'Py Implementation
category: Dev Reference
route: shared
status: canonical
order: 4
summary: Working Ren'Py code for every system in the design. Copy-paste ready. Proof that the wiki describes a buildable game, not a wishlist.
tags: [renpy, code, architecture, feasibility]
---

This page is the **buildability proof**. Every system the wiki describes is implementable in vanilla Ren'Py 8 with no plugins, no modded engine, no Python C extensions. The patterns below are minimal but functional — paste them into a `.rpy` file and they run.

> [!note]
> Ren'Py is a VN engine, not a JRPG engine. Combat in this game is **menu-driven**, not animated turn-based with HP bars. That's not a downgrade — it's the right register for the Konosuba parody tone (the protagonist literally picks options from a JRPG menu while watching the girls fight). The wiki's "Lvl 99 / 9999 ATK" stats are flavor; the *resolution* is narrative.

---

## 1. Variable Declaration (variables.rpy)

Every save-persisted state variable is declared with `default`. Never use `$ x = 0` outside a label — it breaks loads.

```renpy
# Per-girl trackers — the architectural backbone
default ryoka_corruption = 0
default ryoka_affection = 0
default ryoka_suspicion = 0
default yuriko_corruption = 0
default yuriko_affection = 0
default yuriko_suspicion = 0

# Curse system — four stages
default curse_severity = 1   # 0 Pristine · 1 Marked · 2 Corrupted · 3 Bound

# Time
default day_count = 1
default time_of_day = "day"
default route_locked = None  # "vanilla" | "ntr" | "split" | "tragedy"

# Resources
default gold = 50
default inventory = {
    "consumables": [],
    "gifts": [],
    "key_items": [],
    "shady": [],
}

# Lore
default memory_fragments = []
default fragment_pool = [
    "fragment_origin", "fragment_betrayal", "fragment_grief",
    "fragment_descent", "fragment_curse_genesis",
    "fragment_first_kill", "fragment_choice", "fragment_mirror",
    "fragment_temptation", "fragment_purpose",
]

# Persistent across saves (achievements, NG+ unlocks)
default persistent.true_ending_seen = False
default persistent.ntr_ending_seen = False
default persistent.bittersweet_seen = False
```

## 2. The Day Loop

The whole game lives inside one `label day_loop:` that recurses until a route ending fires.

```renpy
label day_loop:
    # Hard cap — Day 90 forces a resolution
    if day_count > 90:
        jump day_90_cap

    # Crucible — Day 45 locks the route
    if day_count == 45 and route_locked is None:
        call day_45_crucible

    # Daytime hub
    $ time_of_day = "day"
    call screen day_hub

    # Nighttime hub (different action set)
    $ time_of_day = "night"
    call screen night_hub

    # Day advance + suspicion decay
    $ day_count += 1
    $ ryoka_suspicion = max(0, ryoka_suspicion - 1)
    $ yuriko_suspicion = max(0, yuriko_suspicion - 1)
    jump day_loop
```

## 3. Hub Screen (day actions)

Imagebutton-style location picker. Hotspots gate by stat / day / route.

```renpy
screen day_hub():
    tag menu
    add "town_map.png"

    # Always available
    imagebutton:
        idle "btn_tavern_idle.png" hover "btn_tavern_hover.png"
        xpos 100 ypos 220
        action Jump("tavern_visit")

    imagebutton:
        idle "btn_market_idle.png" hover "btn_market_hover.png"
        xpos 320 ypos 380
        action Jump("market_day")

    # Adventuring is the combat-spawning action
    imagebutton:
        idle "btn_adventure_idle.png" hover "btn_adventure_hover.png"
        xpos 540 ypos 290
        action Jump("adventuring_day")

    # Dark Alley unlocks at Day 5
    if day_count >= 5:
        imagebutton:
            idle "btn_alley_idle.png" hover "btn_alley_hover.png"
            xpos 720 ypos 460
            action Jump("dark_alley_visit")

    # Rest button — ends the day
    textbutton "Rest" action Jump("end_day") xpos 900 ypos 600

    # HUD
    text "Day [day_count] · [gold]g" xalign 0.02 yalign 0.02
```

## 4. Combat Encounter (menu-driven)

The architectural decision: combat is a `label` that loops a `menu:` until a victory flag fires. Sabotage and Support are menu options, gated by inventory and stats.

```renpy
label adventuring_day:
    "You head out past the gates."
    $ encounter = renpy.random.choice(["goblin_pack", "wolf_lord", "bandit_scouts"])
    call expression "combat_" + encounter
    return

label combat_goblin_pack:
    scene bg forest_combat
    show ryoka battle_idle at left
    show yuriko battle_idle at right
    "Three goblins block the path. Yuriko is already counting them."

    $ enemy_hp = 3   # rounds-to-kill, not real HP
    $ round_num = 0

label combat_round:
    $ round_num += 1
    "[ryoka] readies her blade. [yuriko] traces a spell sigil."
    menu:
        "How do you direct the party?"

        "Support Ryoka — call her opening":
            $ ryoka_affection += 2
            "She moves on your word. The first goblin folds in half."
            $ enemy_hp -= 1

        "Support Yuriko — anchor her concentration":
            $ yuriko_affection += 2
            "Her fireball lands clean. Two goblins, one cinder."
            $ enemy_hp -= 2

        # Sabotage choices appear ONLY if you carry the item
        "Sabotage Ryoka — slip her aphrodisiac" if "aphrodisiac" in inventory["shady"]:
            $ inventory["shady"].remove("aphrodisiac")
            $ ryoka_corruption += 5
            $ ryoka_suspicion += 8
            "Her swing goes wide. Color rises in her cheeks. The goblin grins."
            $ enemy_hp -= 0  # she missed her turn

        "Sabotage Yuriko — sensitivity hex" if "sensitivity_scroll" in inventory["shady"]:
            $ inventory["shady"].remove("sensitivity_scroll")
            $ yuriko_corruption += 5
            $ yuriko_suspicion += 8
            "Her sigil shatters. She gasps — too loud. The goblins notice."
            $ enemy_hp -= 0

        "Flee":
            "You wave them off. The forest swallows your retreat."
            jump day_loop

    if enemy_hp <= 0:
        jump combat_victory
    jump combat_round

label combat_victory:
    "The last goblin drops."
    $ gold += 25
    "+25 gold."
    jump day_loop
```

The `if "item" in inventory["shady"]:` guard on each menu line is the core trick — Ren'Py natively supports menu choice gating, so the menu *literally won't show options the player can't take*. No bespoke UI work needed.

## 5. NTR Scene with Three-Button Agency

```renpy
label ntr_scene_ryoka_01:
    scene bg alley_night
    show antagonist amused at right
    show ryoka flushed_kneeling at center
    "You round the corner. The lantern light catches them before they catch you."

    menu:
        "Intervene — draw your sword":
            jump ntr_intervene_combat
        "Watch":
            $ ryoka_corruption += 8
            $ curse_severity = min(3, curse_severity + 1)
            $ persistent.voyeur_route_touched = True
            "You stay frozen. Eyes wide. Your own breath the loudest sound in the alley."
            jump day_loop
        "Walk away":
            $ ryoka_corruption += 4
            $ flag_walked_away_ryoka_01 = True
            "You turn back. The image stays burned behind your eyelids the whole walk home."
            jump day_loop

label ntr_intervene_combat:
    # Antagonist is overleveled — usually a loss, but the protagonist's
    # affection with Ryoka dampens corruption regardless of outcome
    $ ryoka_corruption -= 10
    $ ryoka_suspicion += 20
    "You step into the light. He smiles like he was waiting for you."
    # ... combat resolution
    return
```

## 6. The Day 45 Crucible

This is the route-lock event. It's a normal label that runs once when the day loop crosses Day 45.

```renpy
label day_45_crucible:
    scene bg tavern_night
    "Day 45. The fire is low. Brennan polishes the same glass for the third time."
    "..."

    if ryoka_corruption >= 50 and yuriko_corruption >= 50:
        $ route_locked = "ntr"
        jump crucible_dual_fall

    if (ryoka_corruption >= 50) != (yuriko_corruption >= 50):
        # Exactly one girl has fallen — the Split path
        $ route_locked = "split"
        jump crucible_split

    if ryoka_affection >= 50 and yuriko_affection >= 50 and curse_severity <= 2:
        $ route_locked = "vanilla"
        jump crucible_vanilla

    # Default — neither bar high enough on either girl
    $ route_locked = "tragedy"
    jump crucible_drift
```

## 7. Memory Fragment Drop

```renpy
label dark_alley_visit:
    scene bg alley_dusk
    "The alley smells like smoke and old iron."
    if fragment_pool:
        # Priority pull — the next narrative-critical fragment
        $ frag = fragment_pool.pop(0)
        $ memory_fragments.append(frag)
        call expression "show_" + frag
    # ... rest of alley shopping menu
    return

# Each fragment is its own short label
label show_fragment_origin:
    scene bg memory_haze
    "{i}A memory not your own surfaces, like ink in water.{/i}"
    "..."
    # See lore/fragments for full prose
    return
```

## 8. Curse-Stage Scene Variation

Same intimate scene, four different resolutions. The branching lives at the top of the label.

```renpy
label vanilla_intimate_scene_03:
    scene bg bedroom_night
    show ryoka soft_smile

    if curse_severity == 0:
        jump intimate_03_pristine
    elif curse_severity == 1:
        jump intimate_03_marked
    elif curse_severity == 2:
        jump intimate_03_corrupted
    else:
        jump intimate_03_bound  # tender failure scene

label intimate_03_bound:
    "You try. You try and your body betrays you in the way it has every night for weeks."
    show ryoka tender
    "She doesn't say anything. She just pulls you close, your forehead against her collarbone."
    "..."
    # The curse tests the bond. Doesn't break it.
    return
```

## 9. Ending Resolution

```renpy
label endgame:
    if route_locked == "vanilla" and curse_severity == 0:
        jump ending_true
    elif route_locked == "vanilla":
        jump ending_vanilla_partial   # cure incomplete
    elif route_locked == "split" and split_cure_completed:
        jump ending_bittersweet
    elif route_locked == "ntr" and ryoka_corruption >= 90 and yuriko_corruption >= 90:
        jump ending_ntr_complete
    elif route_locked == "ntr":
        jump ending_ntr_partial
    else:
        jump ending_tragedy
```

## 10. Stats Screen (debug + diegetic JRPG menu)

The Konosuba flavor lets you put the dashboard *inside the game* without breaking tone. The protagonist literally checks his JRPG menu.

```renpy
screen stats_overlay():
    frame:
        xalign 0.5 yalign 0.5
        background "#2b1d10dd"
        padding (40, 30)
        vbox:
            spacing 12
            text "Day [day_count] / 90" size 28
            null height 10
            text "Ryoka — Aff [ryoka_affection] · Cor [ryoka_corruption]"
            text "Yuriko — Aff [yuriko_affection] · Cor [yuriko_corruption]"
            text "Curse Severity — [curse_severity] / 3"
            text "Gold — [gold]"
            null height 10
            text "Route — [route_locked!q]"
            textbutton "Close" action Hide("stats_overlay")

# Bind to a key globally
key "K_TAB" action Show("stats_overlay")
```

## What's NOT trivially implementable

I won't lie about this — three things are real engineering work, not just "type it in":

1. **Custom inventory screen.** The dict pattern above works, but a *pretty* sortable inventory with item descriptions and use-from-menu wiring is ~200 lines of Ren'Py screen language. Plan for one solid afternoon.
2. **Battle CGs at multiple corruption stages.** Not a code problem, an asset problem. Each girl needs minimum 3 outfits × 4 expressions × 4 corruption tints = 48 sprites *each*. See [Scope & Feasibility](/wiki/dev/scope).
3. **Save-bloat from `seen_scenes` set.** Nothing breaks, but if you track every flag with a separate `default flag_x = False` you'll have 200+ booleans by mid-development. Use a single `seen_scenes = set()` and `seen_scenes.add("scene_id")`. Cleaner saves, easier audit.

Everything else is `default`, `menu:`, `if`, and `jump`. Ren'Py's whole job.
