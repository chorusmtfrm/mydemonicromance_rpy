---
title: "Act III — Confrontation"
category: Plot
route: shared
status: drafted
order: 3
summary: Days 60–90. Final dungeon, Memory Fragment 11, ending branch resolves on locked route. Day 90 is the absolute wall.
---

# Act III — Confrontation

**Days 60–90.** The ending is already chosen. Act III is the *expression* of the choice.

## Beats per route

### Vanilla branch

1. **Day 60.** Cure Quest step 2 complete (Salt-Forged Knife). `curse_severity == 1`.
2. **Day 65–70.** Step 3 (Confession) fires automatically — the dialogue gate. Forks the cure's *meaning* into Atonement vs Refuge.
3. **Day 70.** Memory Fragment 11 (Choosing) drops in the Dark Alley. The Antagonist chose to be what he became — the reframe-back, the most damning fragment.
4. **Day 75.** Step 4 (Ritual) consumes the night. `curse_lifted = True`. Sigil fades to silver scar.
5. **Day 80.** Final dungeon. Both girls present. Combat plays differently — *Support* actions hit harder than they ever have because affection is maxed.
6. **Day 90.** Final boss: Antagonist. Defeated, then *spared* if Atonement path was chosen. Vanilla scene with both girls.

### NTR branch

1. **Day 60.** Pact Tier 3 negotiation if not yet at 3. Soulbond Ribbon offered.
2. **Day 70.** Memory Fragment 11 drops via Antagonist directly. He shows you who *he* lost. The mirror is intentional.
3. **Day 80.** Final dungeon. The corrupted girl(s) fight at the Antagonist's side. Combat is **Sabotage-only** — the support verb is greyed out. The protagonist chose this.
4. **Day 90.** Final boss: the protagonist's own past self, projected. Two endings — **Inherit** (you become the next Antagonist, world-cycle continues) or **Break** (you destroy the Mark, the girls free, but everyone walks away ruined).

### Bittersweet branch

1. **Day 60–80.** Two parallel arcs. Vanilla path with the kept girl. Corruption path resolves with the lost girl already at the Antagonist's side.
2. **Day 85 — Choice scene.** The Antagonist offers to release the lost girl in exchange for the kept girl. Three buttons:
   - **Refuse** — locks Bittersweet path, both girls survive in compromised states
   - **Trade** — locks Tragedy (B2)
   - **Invoke the Cure Quest items** — requires `cure_quest_step >= 3`, locks Rescue (B1)
3. **Day 90.** Resolution scene varies by the Day 85 choice. Rescue is the hardest to achieve and the most emotionally complete.

## Day 90 — the absolute wall

```python
label finale_resolve:
    if route_locked is None:
        # Drift = Tragedy. The deadline does what it must.
        $ route_locked = "bittersweet"
        jump finale_tragedy
    if route_locked == "vanilla":
        jump finale_vanilla
    if route_locked == "ntr":
        jump finale_ntr
    jump finale_bittersweet
```

> [!warning]
> If `route_locked is None` at Day 90, the engine commits the player to Bittersweet → Tragedy (B2). This is the **drift = tragedy** rule. It exists to prevent pacing collapse. Without it, players grind both meters indefinitely.

## Variables resolved

```python
label act3_finale:
    $ ending_id = compute_ending()
    jump expression "ending_" + ending_id
```

See [Endings](/wiki/plot/endings) for the full ending matrix and `compute_ending` body.

## Cross-references

- [Endings](/wiki/plot/endings)
- [Memory Fragments](/wiki/lore/fragments)
- [Cure Quest — Step 4 Ritual](/wiki/mechanics/cure-quest)
- [Antagonist](/wiki/characters/antagonist)
