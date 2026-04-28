---
title: Scope & Feasibility
category: Dev Reference
route: shared
status: canonical
order: 5
summary: Honest production estimates per system. What ships easy, what bites, what to cut if scope explodes.
tags: [scope, production, asset-pipeline, cuts]
---

This page exists to keep the design *deliverable*. Every system on the wiki has been graded for engineering effort, asset cost, and writing burden. Use this page when scope creep starts whispering.

## Effort Grades

| System                         | Code | Assets | Writing | Verdict |
|--------------------------------|------|--------|---------|---------|
| Per-girl stat trackers         | Trivial | None | None | Ship |
| Day/Night hub loop             | Easy | Map BG + 6 buttons | None | Ship |
| Menu-driven combat             | Easy | 3 combat BGs + idle/battle sprites | Per-encounter dialogue | Ship |
| Sabotage / Support menus       | Easy | None (text) | High — every fight needs flavor lines | Ship, write last |
| Suspicion soft-gates           | Easy | None | Medium — confront-scene dialogue | Ship |
| Day 45 Crucible                | Easy | 1-2 BGs | High — 4 distinct scripted scenes | **Critical, write first** |
| NTR three-button agency        | Easy | NTR CGs (each scene) | High — three branches per scene | Ship, plan CG budget |
| Memory Fragments (10 entries)  | Easy | None or 1 stylized BG | High — these are the prose showcase | Ship, write in passes |
| Curse-stage scene variation    | Medium | More CG variants | Very high — 3-4 resolutions per intimate scene | **Cut to 2 stages if needed** |
| Cure Quest (4 steps)           | Medium | 4 unique location BGs + CGs | Very high — each step is a mini-arc | Ship if Vanilla matters |
| Inventory UI screen            | Medium | Item icons (~30) | None | Ship a *minimal* version, polish later |
| Stats / debug overlay          | Trivial | None | None | Ship Day 1, keep forever |
| Random encounter pool          | Easy | Per-monster sprites | Per-monster dialogue | Ship 3 minimum, expand later |
| NG+ persistent unlocks         | Easy | None | None | Ship if multi-route reception is good |

## Asset Pipeline — the real ceiling

Code is cheap. **Sprites are the constraint.** A realistic minimum for a 2-girl, 1-villain, 3-NPC cast:

| Character        | Outfits | Expressions | Corruption tints | Total |
|------------------|---------|-------------|------------------|-------|
| Protagonist      | 2       | 6           | 1 (curse only)   | 12    |
| Ryoka            | 3       | 8           | 4                | 96    |
| Yuriko           | 3       | 8           | 4                | 96    |
| Antagonist       | 2       | 6           | 1                | 12    |
| Brennan (tavern) | 1       | 4           | 1                | 4     |
| Elara (priestess)| 2       | 5           | 1                | 10    |
| Rival party (3)  | 1 each  | 4 each      | 1                | 12    |

**Total core sprites: ~242.** Plus ~25 CGs (intimate, NTR, Crucible variants), plus ~12 location BGs, plus ~30 item icons.

> [!warning]
> If you're solo-arting this, that's a year+ of part-time work before you've drawn a single environment. Two realistic mitigations:
> - **Use AI generation as a base, hand-touch for consistency.** Stylebook the line and shading first, then batch.
> - **Cut corruption tints to 2 stages** (pristine + corrupted), not 4. Halves Ryoka/Yuriko sprite count.

## Writing Burden

Word count estimate for a complete first build:

| Section                     | Words   |
|-----------------------------|---------|
| Prologue + Acts 1-3 spine   | 25,000  |
| Vanilla route content       | 18,000  |
| NTR route content           | 18,000  |
| Split / Bittersweet         | 8,000   |
| Cure Quest (4 steps)        | 12,000  |
| Memory Fragments × 10       | 4,000   |
| Combat encounter dialogue   | 6,000   |
| Hub idle barks + ambient    | 4,000   |
| **Total**                   | **~95,000** |

That's a short novel. Pace yourself in 2-3k word weekly increments and the project ships in a year. Try to write it in three months and it ships *bad*.

## Recommended Cut Order (if scope explodes)

In priority order — cut from the bottom up:

1. **Cut NG+ persistent unlocks.** Nice-to-have. Doesn't affect first impression.
2. **Cut random encounter pool down to 2** — keep the goblin pack and the wolf lord. Drop bandit scouts.
3. **Cut curse stages from 4 to 2.** Pristine + Bound. The intermediate stages are flavor; the endpoints are the only ones that *narratively land*.
4. **Cut Elara to a non-romanceable NPC.** She still keeps the cure-ritual function, just no third-romance arc.
5. **Cut Split route entirely.** Only Vanilla, NTR, and Tragedy ship. Lose the Bittersweet ending.
6. **Last resort: cut Yuriko from the corruption track.** She stays as a Vanilla affection partner; only Ryoka has an NTR arc. Halves all NTR sprite work.

> [!note]
> Each cut listed is *narratively survivable*. Past cut #5 the game is a different game. Don't go there unless the alternative is shipping nothing.

## What CANNOT be cut

These are the load-bearing pieces. Cutting them collapses the design:

- **Per-girl corruption + affection.** Without these, route logic doesn't work.
- **Day/Night loop.** Without this, the player has no rhythm.
- **Day 45 Crucible.** Without this, the route flag is arbitrary.
- **Cure Quest, even truncated.** Without this, Vanilla has no climax.
- **Three-button NTR agency.** Without this, the genre's complicity engine doesn't fire.
- **Memory Fragments — at minimum 5 of them.** Without these, the Antagonist is a cardboard cutout.

## Production Schedule (realistic part-time)

| Phase | Months | Goal |
|-------|--------|------|
| 1. Engine + state | 1 | Day loop, hub, stats, save/load all functional with placeholder art |
| 2. Combat + encounters | 1 | All 3 encounter labels working, sabotage menus tested |
| 3. Acts 1-2 spine | 3 | Critical-path scenes with placeholder sprites |
| 4. Day 45 Crucible + route lock | 1 | All 4 crucible variants written and routable |
| 5. Vanilla Cure Quest | 2 | All 4 steps + ritual climax |
| 6. NTR fall arcs | 2 | Both girls' fall sequences + Breaking Point |
| 7. Bittersweet Split | 1 | The middle path |
| 8. All endings | 1 | Six ending labels, polished |
| 9. Asset pass | ongoing | Continuous sprite/CG replacement |
| 10. QA + balance | 1 | Suspicion math, day-cap pacing, soft-locks |

**Honest total: 12-14 months part-time, 5-6 months full-time.** Anyone who tells you a project this size ships in 3 months is either lying or shipping a different project.
