# The script of the game goes in this file.

################################################################################
## AIO Template scaffolding (kept intact)
################################################################################

# Set up LayeredImage Sprites — the Eileen sprite ships with the AIO template.
# We don't use her in the actual game flow, but the LayeredImage definition is
# kept so any template-internal references continue to resolve cleanly.

layeredimage eileen:

    group base auto:
        attribute casual default

    if casual:

        "eileen_headband"

    group face auto:
        attribute neutral default

# This adds Eileen's headband to her sprite when True
default casual = True

# Template's Eileen character (kept defined but unused in the My Demonic Romance flow).
define e = Character("Eileen", color="#f88787", image="eileen")
define e_nvl = Character("Eileen", color="#f88787", kind=nvl, image="eileen")
define e_bubble = Character(color="#f88787", kind=bubble, image="eileen")
define nar_nvl = nvl_narrator

################################################################################
## Splashscreen (template default — leave alone)
################################################################################

image splash_anim_1:

    "gui/renpy-logo.png"
    xalign 0.5 yalign 0.5 alpha 0.0
    ease_quad 7.0 alpha 1.0 zoom 2.0

default persistent.firstlaunch = False

label splashscreen:

    scene black

    show splash_anim_1
    show text "{size=60}Made with Ren'Py [renpy.version_only]{/s}":
        xalign 0.5 yalign 0.8 alpha 0.0
        pause 6.0
        linear 1.0 alpha 1.0

    if not persistent.seen_splash:

        $ renpy.pause(8.5, hard=True)

        $ persistent.seen_splash = True

    else:

        if renpy.pause(8.5):

            jump skip_splash

    scene black
    with fade

    label skip_splash:

        pass

    call screen content_warning

    if not persistent.firstlaunch:

        call screen splash_settings

        call screen preferences

        $ persistent.firstlaunch = True

    return

################################################################################
## My Demonic Romance — Cast
################################################################################

# Player-customizable name. Default is "Kael" — the player can rename via
# a future settings screen. Update this string in vars.rpy when that's wired.
default mc_name = "Kael"

# Protagonist. Muted gold to match the Konosuba-warm wiki theme. Speaks in
# first person via the narrator for inner thoughts; mc for spoken lines.
define mc = Character("[mc_name]", color="#c8a861")

# Ryoka — overpowered warrior. Warm fire-red.
define ry = Character("Ryoka", color="#d97757")

# Yuriko — overpowered mage. Cool studious blue.
define yu = Character("Yuriko", color="#7a8fcf")

# Brennan — tavern keeper. Earthy brown for the friendly neighborhood barman.
define br = Character("Brennan", color="#8a6f4c")

# Unidentified silhouette — used during the cold open before the antagonist
# is named. Color is the wiki's destructive burgundy to telegraph dread.
define stranger = Character("???", color="#7a2230")

################################################################################
## My Demonic Romance — Canonical Game Variables
################################################################################
## These mirror the wiki's dev/variables reference. Set here so the very first
## save file has every variable defined. New systems read these directly.

# --- Time pressure ---
default day_count = 1
default time_of_day = "day"   # "day" or "night"

# --- Per-girl affection (0–100) ---
default ryoka_affection = 0
default yuriko_affection = 0

# --- Per-girl corruption (0–100) ---
default ryoka_corruption = 0
default yuriko_corruption = 0

# --- Per-girl suspicion (hidden, 0–100, decays −1 per rest day) ---
default ryoka_suspicion = 0
default yuriko_suspicion = 0

# --- Curse of the Mark (0 Pristine · 1 Marked · 2 Corrupted · 3 Bound) ---
default curse_severity = 0

# --- Route lock — set by the Day 45 Crucible event ---
default route_locked = None  # None | "vanilla" | "ntr" | "split" | "tragedy"

# --- Resources ---
default gold = 50
default inventory = {
    "consumables": [],
    "key_items": [],
    "gifts": [],
    "shady": [],
}

# --- Lore drip ---
default memory_fragments = []
default seen_fragments = set()

# --- Combat habit telemetry (used by suspicion + ending matrix) ---
default sabotage_count = 0
default support_count = 0
default watch_count = 0

# --- Day-1-specific narrative flags (referenced below) ---
default met_brennan = False
default day1_combat_choice = None  # "support" | "sabotage" | "watch"

################################################################################
## My Demonic Romance — Day 1
################################################################################

label start:

    # Reset language so sound caption translations initialize properly.
    # (Per the npckc accessibility tool's instructions.)
    $ renpy.change_language(_preferences.language, force=True)

    # The 'beginning' achievement ships with the AIO template. We re-purpose
    # it as "began Day 1." Future achievements get added in sbobcachievements.rpy.
    achieve beginning

    # ---- Cold open: a tavern room at noon ----
    scene room
    with fade

    $ play_music(garden, fadein=2.0, fadeout=2.0)

    "Sunlight pries the curtains apart at an angle that suggests the morning has long since given up on me."

    "I open one eye. Then, after some negotiation, the other."

    mc "...I am the Demon Lord of the Sundered Vale."

    mc "Level fifty. Sworn enemy of the kingdoms of light. Architect of seven minor cataclysms and one truly embarrassing wedding interruption."

    mc "And I am hungover in a tavern bed, with eight silver to my name, because my party members ate the last of the venison while I was unconscious."

    "Somewhere downstairs, a cheer goes up. The tavern's day-drinkers have apparently found something to be excited about."

    "I have a guess what."

    # ---- Brennan introduction (offscreen voice from below) ----
    $ play_sound(door)

    "The door at the bottom of the stairs creaks. A familiar voice carries up — friendly, hoarse, two parts soot to one part beer."

    br "Up and at 'em, Lord Demon! Your women are downstairs scaring the regulars again!"

    mc "(They're not {i}my{/i} women.)"

    mc "(They are. Allegedly. The party records list me as their leader. The party records also list our level distribution as fifty / ninety-nine / ninety-five, which is a polite way of saying that on a good day I am useful for opening jam jars.)"

    $ met_brennan = True

    "I get up. The room is generous enough not to spin."

    ic "[mc_name] crosses the room and descends the stairs."

    scene black with fade

    # ---- The tavern common room: Ryoka and Yuriko ----
    $ play_music(concrete, fadein=1.5, fadeout=2.0)

    scene room
    with fade

    "The common room is a mess of overturned chairs and overturned drinkers. In the center, two figures stand back-to-back."

    ry "Yuriko, behind you!"

    yu "I {i}am{/i} behind me, Ryoka. We're back to back."

    ry "You know what I mean!"

    "Ryoka — six feet of wound spring and red braid — pivots on her heel. Her sword leaves the scabbard so fast the air {i}flinches{/i}."

    "Yuriko — a head shorter, robes the color of a clean library — sketches a glyph in the air without looking up from her book."

    yu "Disjunction. Class three. Honestly, who summons a slime indoors?"

    "There's a small wet sound. The slime, formerly the size of a cart, is now the size of regret."

    ry "Yu, was that necessary? I had it."

    yu "You had a {i}quarter{/i} of it. The other three quarters were about to digest a barmaid."

    "The tavern erupts in applause. Brennan ducks back behind the bar with the practiced grace of a man who has watched my party members redecorate his establishment more than once."

    br "On the house, ladies! Just — please — the {i}rugs.{/i}"

    # ---- Player notices the protagonist ----
    ry "...where's Kael?"

    yu "Asleep. Probably. He was making small noises about 'tactical recovery' last night."

    ry "He missed it again."

    yu "He missed it again."

    "I clear my throat from the stairwell. They both look up. Ryoka's smile is genuine and a little too bright; Yuriko's is the smile of someone tallying a column in a ledger."

    ry "There he is! Hero of the hour, ten minutes too late!"

    yu "Good morning, oh fearsome demon lord. I trust you slept well."

    mc "(They love me. I think they love me. The mathematics of how each of them loves me is different — Ryoka loud, Yuriko quiet — and I can never quite catch them at it head-on.)"

    mc "I — yes. Sorry. I had a tactical rest."

    ry "Of course you did."

    yu "Of course you did."

    # ---- Mechanic teaser: the first encounter ----
    "The tavern door bangs open. A second slime — bigger, meaner, the color of a bruise — pours into the doorway."

    $ shake()

    ic "The room shudders."

    ry "Oh, come {i}on,{/i} two of them?"

    yu "Statistically improbable. Almost like someone summoned them on purpose."

    "Both of them turn to look at me. The look that says: {i}you are technically the leader of this party, what would you like to do.{/i}"

    "I have, give or take, three options."

    menu:
        "What does {i}[mc_name]{/i} do?"

        "Support — buy them an opening.":
            $ day1_combat_choice = "support"
            $ support_count += 1
            $ ryoka_affection += 2
            $ yuriko_affection += 2

            mc "Right. Distract it. {i}Lux Inversa.{/i}"

            "I throw a level-fifty spell at the slime's eyestalks. It flinches. Not much — a slime's flinch is more of a slow shrug — but enough."

            ry "There he is!"

            yu "Window open — Ryoka, vertical, please."

            ry "{i}Crescent Sundering!{/i}"

            "The slime is, very suddenly, a memory."

            yu "Clean. Efficient. Affection acknowledged."

            ry "Don't say it like an accountant!"

        "Sabotage — let them flounder. Just to see.":
            $ day1_combat_choice = "sabotage"
            $ sabotage_count += 1
            $ ryoka_corruption += 3
            $ yuriko_suspicion += 5

            mc "(One small thing. Just to see.)"

            "I {i}don't{/i} cast Lux Inversa. I let the moment pass. The slime gets a half-second of clean line at Ryoka's exposed flank — a half-second she has to spend rolling, not striking."

            ry "Hh — !"

            yu "Ryoka, {i}move{/i} —"

            "Yuriko's glyph fires a beat late. They handle it. They always handle it. Ryoka comes up with a long pink scrape down her forearm and a expression I do not entirely recognize on her."

            ry "...Kael, you didn't —"

            mc "Sorry. Spell fizzled. Mana hangover."

            yu "Mm."

            "Yuriko looks at me for a count of three before she goes back to her book. The look is not angry. It is, somehow, much worse than angry. It is {i}taking notes.{/i}"

        "Watch.":
            $ day1_combat_choice = "watch"
            $ watch_count += 1

            "I fold my arms and lean against the banister."

            "It takes them eleven seconds. I count. Yuriko's glyph, Ryoka's blade, a small explosion of slime that ruins another rug."

            ry "Kael! A {i}little{/i} help next time?"

            mc "You had it. You always have it."

            yu "He's not wrong."

            ry "That's not the {i}point —{/i}"

    # ---- After the fight ----
    stop music fadeout 2.0

    "Brennan emerges from behind the bar with a damp rag and the expression of a man revising his rates."

    br "Right. Stew's on. Drinks are not free anymore. {i}Especially{/i} not for the demon lord."

    mc "(Eight silver. Eight.)"

    # ---- End-of-Day stub: the hub-to-be ----
    $ play_music(garden, fadein=2.0, fadeout=2.0)

    "The afternoon stretches out in front of me. There are things I could do."

    "I could spend the day with my party. I could find work. I could — if I were the kind of demon lord I used to be — wander down toward the part of town that respectable people don't go to."

    "I could also just go back to bed."

    menu:
        "How does [mc_name] spend the rest of his day?"

        "Drink at the tavern. Get to know my party.":
            mc "(Affection is built in places like this. Or that's what the bards say.)"

        "Look for paying work in town.":
            mc "(Eight silver does not feed three.)"

        "Walk down toward the lower district. Just to scout.":
            mc "(I am not going to do anything. I am just looking. I will be the judge of that.)"

        "Go back to bed.":
            mc "(There is a perfectly good bed upstairs. The day is long. The ale is paid for. What's the worst that could happen.)"

    # All four choices fall through to the same end-of-build screen for now.

    scene black with fade
    stop music fadeout 2.0

    nar_nvl "End of Day 1."

    nar_nvl "This is an early development build of {b}My Demonic Romance{/b}. The systems behind the scenes — affection, corruption, suspicion, the Curse of the Mark — are tracking your choice from the slime fight, but the days that follow haven't been written yet."

    nar_nvl "Thank you for trying it. More days are coming."

    nvl clear

    $ renpy.end_replay()

    return

################################################################################
## End Credits (template default — leave alone)
################################################################################

label credits:

    $ quick_menu = False

    window hide

    scene black with fade

    call screen credits(15.0)

    $ persistent.credits_seen = True

    scene black
    with fade

    label skip_credits:

        pass

    $ percent()

    show screen results

    centered "Fin"

    hide screen results

    if persistent.game_clear:

        pass

    else:

        if readtotal == 100:

            achieve completionist

            show text "{size=60}{color=#ffffff}You've unlocked a special message.\nAccess it through the Extras Menu.{/color}{/s}":
                xalign 0.5 yalign 0.5 alpha 0.0
                linear 1.0 alpha 1.0

            $ persistent.game_clear = True

            pause

    $ quick_menu = True

    return
