---
title: The Silver Vow — Rival Party
category: Characters
route: shared
status: planned
order: 6
summary: A foil party of three adventurers. Mirror to what the protagonist's party could have been. Recurring presence; pivotal in Tragedy ending.
tags: [foil, recurring-npc, paladin, healer, thief, tragedy-ending]
---

## Concept

The Silver Vow are who the protagonist *could have been*. A party of three competent, decent adventurers who handle the same scale of quest the protagonist's party does, but without the rot. The wiki uses them deliberately — they are an ambient pressure system. Every time the player sees them, they are a reminder of what's available and what's being chosen against.

They are not antagonists in the Vanilla and Bittersweet routes. In NTR, they grow concerned. In Tragedy, they are the ones who put the corrupted party down.

## Members

### Sir Gareth Vell — Paladin
- Mid-thirties, scarred, soft-eyed
- Fights with a cavalry sword and a shield older than he is
- Speaks in plain declaratives. Never raises his voice in anger; raises it once in grief
- **Function:** the older-brother gaze. Notices the protagonist's choices first

### Sister Mira Tann — Healer
- Late twenties, lay sister of a minor sun-faith
- Hands always doing something — bandages, tea, prayer beads
- The party's social glue. Friends with Brennan at the Tavern
- **Function:** delivers gossip about the protagonist that is uncomfortably accurate

### Vex — Thief
- Indeterminate age, indeterminate background, definitely not the name on her birth certificate
- Light-fingered, light-footed, heavy-hearted
- Recognized the Antagonist's signature work from a job three towns over
- **Function:** the only character in the game who identifies the Antagonist *before* the protagonist does

## Mechanical Role

| Day range  | Behavior                                                          |
|------------|-------------------------------------------------------------------|
| 1–20       | Casual Tavern presence. Friendly nods. Gareth buys the protagonist a drink |
| 20–45      | Comments on rumors. Mira asks Ryoka if she's been sleeping        |
| 45–70      | Visibly concerned. Vex starts shadowing the Dark Alley            |
| 70–90 NTR  | Direct confrontation. Gareth offers to take the curse-burden himself |
| 70–90 Vanilla | Backup at Cure Quest Step 2 boss fight (optional party-up scene) |
| **Tragedy ending** | They are the ones who arrive at the end. Gareth carries the sword. Mira closes the eyes. Vex burns the rest. |

## Why they exist

The corruption fantasy is undermined if the *world* is also fallen. The Silver Vow keep the world standing. They prove that a different choice was always available. That makes the protagonist's path *a path* instead of an inevitability — and the genre needs that, because complicity requires alternatives.

> [!proposal]
> Mid-game (~Day 35), give the player a one-off scene where Vex pulls the protagonist aside in the alley and *names the Antagonist* — full real name, last known location, the scar, everything. Player can choose to act on the information or pocket it. Players who pocket it have committed to the descent. That's a character beat earned by an NPC the game has been building for thirty days. Free dramatic dynamite.

## Stat Block

```python
init python:
    class SilverVow:
        members = ["gareth", "mira", "vex"]
        combat_level = 95   # one tick below the protagonist's party
        encounter_type = "scripted_only"  # never random encounters
        first_appearance_day = 3
        confrontation_day = 65   # NTR route only
        tragedy_arrival_day = 90 # default tragedy ending
```

## Voice Samples

**Gareth:**
> "I'm not your father, son. I'd be a poor one. But I'd be a worse stranger if I let what's happening keep happening. So here's what's happening. I see it. Mira sees it. Vex saw it before any of us. You know what you're doing. I don't expect you to stop because I asked. I'm asking anyway. That's the whole conversation. Drink?"

**Mira:**
> "Ryoka came in last week and didn't laugh once. I've known her two years. I noticed."

**Vex (the alley scene):**
> "The man you're shopping with killed my partner six years ago in a town called Vol Bren. I've been hunting him eleven months. You think I don't recognize the work? You think I haven't seen what those potions do? Walk away. I'm not telling you twice."

## Scene Flag Index

| Flag                          | Trigger                                       |
|-------------------------------|------------------------------------------------|
| `silver_vow_first_seen`       | Day 3 Tavern visit                             |
| `mira_notices_ryoka`          | Day ≥ 20 + ryoka_corruption ≥ 25               |
| `vex_alley_warning`           | Day ≥ 35 + Dark Alley visit ≥ 5                |
| `gareth_intervention`         | Day ≥ 65 + route_locked == "ntr"               |
| `silver_vow_party_up`         | Cure Quest Step 2 boss fight                   |
| `silver_vow_tragedy_arrival`  | Day 90 + route_locked == "tragedy"             |
