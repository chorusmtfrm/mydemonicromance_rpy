---
title: Brennan — The Tavern Keeper
category: Characters
route: shared
status: planned
order: 7
summary: Old retired adventurer. Runs the Crooked Hearth. Quest dispenser, ambient pressure, and the first character to notice the rot.
tags: [tavern, npc, quest-giver, moral-mirror, atmosphere]
---

## Concept

Brennan ran a five-person party for fourteen years. Four of them are dead. He doesn't talk about it. He runs the Crooked Hearth — best stew in three districts, no bards on Tuesdays — and watches.

He is not a love interest. He is not a quest-giver in the JRPG sense (he doesn't hand out exclamation points). He is **the longest-serving NPC in the protagonist's life by a margin of five years**, which means when the protagonist starts changing, Brennan is the first person who registers it. Not because he's perceptive in some special way. Because he's been *watching* this kid for half a decade.

## Mechanical Function

The Tavern is the **affection well** — the place affection ticks up. Brennan is the reason the Tavern has flavor. Without him it's a rest button.

| Visit type     | Brennan behavior                                          |
|----------------|-----------------------------------------------------------|
| First visit/day | Pours drinks. Comments on weather. Asks how the girls are |
| Affection rising | Tells stories about his old party. Cautious but warm    |
| Corruption rising | Notices. Says less. Watches the door more              |
| Suspicion crossing 60 on either girl | Pulls the protagonist aside. One scene |
| Day 45 (Crucible night) | Polishes the same glass three times. The tell |
| Tragedy ending | He's the one who tells the Silver Vow where to go         |

## Stat Block

```python
init python:
    class Brennan:
        archetype = "tavern_keeper"
        former_class = "ranger"
        years_known_protagonist = 5
        combat_level = 60   # not a fighter anymore but not unarmed
        affection_track = None
        function = "atmospheric narrator + quest hooks + moral mirror"
```

## The Pull-Aside Scene

This is his only scripted heavy moment. It fires once when either girl's suspicion crosses 60 for the first time. The protagonist is either alone or pretends to be — Brennan asks him to step into the back to "help carry something."

> [!proposal]
> The pull-aside scene is the closest thing the game has to a moral-philosophy beat that doesn't lecture. Brennan doesn't tell the protagonist to stop. He tells him *one story* — about the third member of his old party, Davren, who started skimming gold from the splits and lying about it. About how nobody confronted him. About how the rot wasn't the gold, it was the *quiet*. Then Brennan pours two drinks and changes the subject. Player gets no choice in the scene. They just hear it. Whether it lands depends on what they do the next day.

## Quest Hook System

Brennan is the **soft delivery** for adventuring days. Not "quest givers handing out scripted missions" — gossip seeds.

```renpy
label tavern_brennan_chat:
    if day_count >= 10 and not seen_quest_lich:
        $ seen_quest_lich = True
        bren "There's a man at the back came in last night looking for hands. Sundered Lich north of the Verdant. Pays well, dies often. Take it or don't."
    elif day_count >= 25 and not seen_quest_caravan:
        $ seen_quest_caravan = True
        bren "Caravan to Vol Bren needs guards. Three days each way. Vex was asking after the route this morning, if that means anything to you."
    else:
        $ line = renpy.random.choice([
            "Stew's good today. Wife's doing.",
            "Yuriko was in earlier. Reading something thick.",
            "Saw Ryoka working forms in the yard at dawn. She's pushing herself.",
            "Quiet night. Nights like this used to scare me.",
        ])
        bren "[line]"
    return
```

## Voice Samples

**On the first day:**
> "You back already? Sit. I'll bring you the stew. The girls were in earlier — they're alright. Eat first, then go find them."

**On the pull-aside (Day ~30):**
> "I want to tell you about a man named Davren. You don't know him because he's dead, and he's dead because nobody around him said anything. The story isn't a lesson. The story is just a story. I'm going to tell it once, and then I'm going to pour us a drink, and then we are going to talk about anything else. Sit down."

**On the Tragedy ending arrival of the Silver Vow:**
> "South Road. He's at the alley. The girls are with him. They're not — they're not them anymore. Bring something to cover their faces. Go."

## Scene Flag Index

| Flag                          | Trigger                                       |
|-------------------------------|------------------------------------------------|
| `brennan_first_meeting`       | Day 1 Tavern visit (always fires)              |
| `brennan_quest_lich_hook`     | Day ≥ 10                                       |
| `brennan_quest_caravan_hook`  | Day ≥ 25                                       |
| `brennan_pull_aside`          | First time `ryoka_suspicion ≥ 60` OR `yuriko_suspicion ≥ 60` |
| `brennan_crucible_glass`      | Day 45                                         |
| `brennan_silver_vow_dispatch` | Day 90 + route_locked == "tragedy"             |
