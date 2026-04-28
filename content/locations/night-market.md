---
title: Night Market
category: Locations
route: both
status: planned
order: 3
summary: The dual-use shop. Same place sells gifts and aphrodisiacs. The route split made retail.
tags: [hub, shop, dual-use]
---

## Function

A canopied, lantern-lit market. Two stalls visible to the player at all times: the **gift stall** (Vanilla route fuel) and the **back-room** (NTR route fuel). The same market, the same shopkeeper, two different conversations the protagonist can choose to have. The Market is the literal embodiment of the route's choice architecture.

## Stall Catalog

### Gift Stall — Affection Track

```python
init python:
    market_gifts = [
        Item("whetstone", price=15, target_taste="ryoka", flavor_loved="A real edge."),
        Item("iron_order_pin", price=40, target_taste="ryoka", flavor_loved="Where did you get this?"),
        Item("dried_jerky", price=8, target_taste="ryoka", flavor_loved="Real meat. Thank the gods."),
        Item("rare_grimoire_page", price=60, target_taste="yuriko"),
        Item("owl_feather_quill", price=22, target_taste="yuriko"),
        Item("cinder_tea", price=12, target_taste="yuriko"),
        Item("leather_strap", price=10, target_taste="ryoka", tier="liked"),
        Item("ink_set", price=18, target_taste="yuriko", tier="liked"),
        Item("wildflower", price=4, target_taste=None, tier="generic"),
    ]
```

See [Affection — Taste Hooks](/wiki/mechanics/affection) for how matched gifts pay out.

### Back Room — Sabotage Track

Accessed by clicking the shopkeeper's nephew in the corner. Different dialogue tone, different price floor.

```python
init python:
    market_shady = [
        Item("aphrodisiac_mild", price=18, corruption=4, target=None),
        Item("aphrodisiac_strong", price=35, corruption=7, target=None),
        Item("twin_dose_powder", price=50, corruption=8, target="both", subtle=False),
        Item("scented_oil", price=22, corruption=2, target=None, subtle=True),  # bypasses suspicion
    ]
```

Items target `None` = player picks at use-time. Items targeting `"both"` apply to both party members.

## Shopkeeper

A retired adventurer. Knows everyone. Says nothing. Charges what the market allows. The same NPC sells you both stalls — that's the *thematic* point. The Market is not evil. The protagonist is the variable.

## Visit Loop

```python
label market_night:
    call screen market_choice_screen
    $ night_action_taken = True
    jump sleep

screen market_choice_screen():
    modal True
    frame:
        background "ui/market_panel.png"
        vbox:
            text "Lanterns on. Two doorways open." style "hub_header"
            textbutton "Browse the gift stall" action Jump("market_gifts")
            textbutton "Slip through the back" action Jump("market_shady")
            textbutton "Walk on through" action Jump("sleep")
```

> Dev Note: the back room must remain visible from Day 1. Hiding it behind progression breaks the player's understanding that they always had the choice. The Market doesn't change. The protagonist does.
