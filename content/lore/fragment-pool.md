---
title: Memory Fragments — First Five
category: Lore
route: shared
status: drafted
order: 2
summary: Working prose for fragments 1-5 of the Antagonist backstory drip. Antagonist POV, present tense, ordered for narrative reframe.
tags: [memory-fragments, antagonist, prose, lore-drip]
---

These are the first five Memory Fragments in the Dark Alley priority order. Each is presented to the player as a brief vignette — handled by `label show_fragment_*` in [Ren'Py Implementation](/wiki/dev/renpy-implementation) — and is *Antagonist POV*, present tense, written to humanize him early and damn him late. Order matters: the fragments are pulled in sequence from `fragment_pool` so the reframe lands.

> [!lore]
> The Antagonist is unnamed in dialogue and on the wiki for as long as is dramatically possible. The protagonist learns the name only when Vex says it in the Day-35 alley scene. The fragments use only first-person.

---

## Fragment 1 — `fragment_origin`

*Sun, fourteen, a courtyard too small for the both of you.*

The boy who would become the man in your shadow used to share his bread with you. Did you remember that. The summer you both fell in love with the same book — *The Crown of Unfinished Things*, you couldn't pronounce the author's name, neither could he, you both gave up and called her The Lady. The way he laughed when you mispronounced *denouement*. He kept the book. You kept the laughter. Twenty-three years later, neither of you would be able to say which loss cut deeper, and that is the cruelest part of any small thing — that it can outweigh a large one without warning.

You were friends. Fully. Without the irony that the older boys carried around like pocketknives. He gave you the heel of his bread because the heel was the part you liked. You gave him the inside because the inside was the part he liked. That's all. That's the whole fragment. It is not poetic. It was just true.

---

## Fragment 2 — `fragment_betrayal`

*The river, twenty-two, a contract on a table in a town that doesn't exist on the maps anymore.*

The party was three. You don't tell anyone that anymore.

The third one had your back through the goblin caves and the river crossing and the night the wendigo took your ear and the morning you woke up convinced the ear was still there and grieved it twice. The third one watched you choose. *Choose the gold over him,* the contract said, sliding across the table like a fish you'd been told not to feed. *Choose the contract over him. Choose your own name over his bleeding body in a snowdrift outside Vol Bren.* The merchant didn't say it out loud. He didn't have to. His mouth was already open in the shape of a yes you hadn't quite given yet.

You gave it.

The third one didn't die that night. He just stopped being the third one. Walked out of the snow alone, ear-half-frozen, contract-half-paid, and the next time you saw him in a dream he was twelve again and holding out the heel of a piece of bread.

You took it in the dream. You always take it in the dream.

---

## Fragment 3 — `fragment_grief`

*Spring, twenty-four, the room above the bakery in Karth.*

The woman you loved died of a fever in three days. The healer had been six streets away the whole time, drinking. You learned this two weeks after the fire. You did not kill the healer. You wanted to. You stood outside his door for a full evening with your sword across your knees and watched the lamp move from window to window and thought about the geometry of his hands and how all of them were ending in the wrong places.

You went home. You drank water. You did not eat for nine days.

What people don't tell you about grief is that it is a teacher. It teaches one lesson and the lesson is *no.* No, the world is not arranged for your comfort. No, the people you love are not protected by the loving. No, your friends are not in fact a fortress. No, you cannot make a deal with the part of the universe that took her. There is nothing on the other end of that telephone.

After grief you become a student of *no* whether you want to or not. Some students bow. Some get up and break the school.

I broke the school.

---

## Fragment 4 — `fragment_curse_genesis`

*Winter, twenty-six, a snowdrift outside a different Vol Bren than the one you remember.*

There is a moment, when you are bleeding into snow, when the world offers you a trade. Not God. Not the devil. Just the cold itself, patient and arithmetical. The cold is a clerk. The cold has a ledger. The cold says: *you may live, you may walk, you may walk for as long as you need to walk. The cost is the part of you that used to share bread.*

You give it the soft middle of your chest. You give it the laughter from the courtyard. You give it the heel.

The cold takes them and gives you the rest.

You wake up. You walk. You walk for fifteen years without aging the way you should. Every spring you find another version of the bakery in Karth and every spring she is not in it. The cold walks with you the whole time. It is a very patient clerk. It is the patience of something that has been promised a debt and intends to be paid.

I am the debt the cold made of me. I am collecting on behalf of the cold. *That* is the curse, and the curse is not a thing I cast on the boy in the courtyard who became your protagonist. The curse is a thing I *am.* When he kissed his warrior, he kissed me through her. When his mage learned the binding-rite, she learned it from a book I left in the library. The mark on him is the cold pressing through me onto him. There is no exorcism for an arithmetic.

There is, of course, a cure.

The cold does not believe in cures.

I am about to find out which of us is right.

---

## Fragment 5 — `fragment_first_kill`

*Late spring, twenty-eight, a cellar in a town that paid me to be in it.*

I want to be honest about this one because the others have been gentle and you are starting to like me and the liking is the trap.

The first one I killed for money was a woman. She was forty-one. She had not done anything in particular wrong; she was a clerk at a counting-house and she had seen something on a ledger that the counting-house did not want anyone to have seen. The counting-house paid me eighty silvers. I went to her house at night because that was when she was alone. She had a cat. The cat watched the whole thing from a shelf. I was *good* at it — the work — because I had spent two years before that learning to be good at it, and I had spent the year before *that* in the snow, learning that the world does not care if I am good or bad at anything in particular. I was efficient. She did not suffer for very long.

I left the cat alive. I want to be very clear that I did not leave the cat alive out of mercy. I left the cat alive because the cat was not in the contract. The contract was for the woman. I do what the contract says. That is not a virtue. That is the *shape* I am in. The cold made me into a shape that does what contracts say.

You have been collecting these fragments thinking that I was a wronged man. I was a wronged man. *And* I am the man who killed the clerk. Both of those are true. The fragment system was not designed to redeem me. It was designed to make sure that when you find out what I have done to your warrior and your mage, you cannot pretend you did not know what kind of arithmetic you were being introduced to.

You knew. You have always known. I have been telling you since fragment one.

I am the thing you keep going back to the alley to hear from.

---

## Pulling Order

The above is the canonical priority order from `fragment_pool`. Fragments 6-10 (origin variants and choice-point fragments) are sketched but not drafted; they fire after Fragment 5 has been read and serve as Act 3 setup.

```python
default fragment_pool = [
    "fragment_origin",
    "fragment_betrayal",
    "fragment_grief",
    "fragment_curse_genesis",
    "fragment_first_kill",
    # Drafted below this line — prose pending
    "fragment_descent",
    "fragment_choice",
    "fragment_mirror",
    "fragment_temptation",
    "fragment_purpose",
]
```

Each fragment label sets a `seen_fragment_<n>` flag so the gallery screen knows what to show. The fragments are not gated behind affection or corruption — they are pure attendance reward for visiting the Dark Alley. That's the deal: the alley is dangerous, and the price of going there is *learning what you are doing business with*.
