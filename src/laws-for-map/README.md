# Laws for map

![Broken Law on Map](http://i.imgur.com/ozElbqY.png)
![Laws in Menu](http://i.imgur.com/IPlCqXn.png)
![broke law in battle](http://i.imgur.com/ZYdBEz9.png)
![law window](http://orig14.deviantart.net/d8e8/f/2015/333/1/6/screen_shot_2015_11_29_at_11_42_57_am_by_createdthoughts-d9igoqo.png)
![rewards](http://orig08.deviantart.net/32ab/f/2015/333/e/8/screen_shot_2015_11_29_at_11_44_26_am_by_createdthoughts-d9igoh9.png)
![Yanfly rewards](http://orig08.deviantart.net/8529/f/2015/333/0/4/screen_shot_2015_11_29_at_11_43_33_am_by_createdthoughts-d9igogx.png)
![When laws are rewarded after battle](http://orig09.deviantart.net/c5b1/f/2015/333/1/a/screen_shot_2015_11_29_at_12_05_50_pm_by_createdthoughts-d9igpbt.png)

Welcome to Laws for Map.

The script allows you to set up a set of laws for a map, these laws are then checked when a player does an
action that targets either it's self, another actor or even an enemy. If you say no potions and I use a potion,
you bet ill be punished in some way.

Laws for Map comes with lots of things right out of the bag, lets get into it.

## Setting up laws

you can have any number of laws on a map, we will only show you three of those laws at any one time. When the player
starts up the map either from a new and saved game we will randomize those laws and show a new set of three. The same goes for
when a player transfers to a different map and back again.

Laws are comprised of a couple of things, a short name, a icon, a punishment and a `cantUse` which is allowed to hold
three things in it (any more and I slice them off).

So lets set up a law:

```
<law
   name:"Attacking Causes Death"
   punishment:"hp"
   amount: 1000
   icon: 26
   cantUse: "attack, potion, heal"
>
```

> ###ATTN!
>
> The parser I use will read the tag as is, if you copy and paste it into the map
> detail window.
>
>
> ### Duplicate cantUse
>
> Consider the following example:
>
> ```
> <law
>   name:"Attacking Causes Death"
>   punishment:"hp"
>   amount: 1000
>   icon: 26
>   cantUse: "attack, potion, heal"
> >
> <law
>   name:"Minor Health Loss"
>   punishment:"hp"
>   amount: 10
>   icon: 26
>   cantUse: "attack, potion, heal"
> >
>```
>
> The issue here is that when we process which law you broke, > we take the first one we find in
> the array of laws for the map is the first one we take. In this case `Minor Health Loss` would
> never get used because we found `Attacking causes death` first.
>
> Your can't use has to be unique like the name of the law.

- `name`: The name of the law.
- `punishment`: The thing to punish on the actor object. (see below)
- `amount`: How much do we do when we punish the user?
- `icon`: What icon is representing the law?
- `cantUse`: What can we not use? (see below)

### Punishment

punishments are things we do to the player, we take away things like hp, mp, tp or xp. We can even take away gold.

We cannot take a away items, weapons or armor (equiped or not).

When we take away xp, we can level down the actor.

> ###ATTN!
>
> Laws can kill. if you reduce the hp below 0 or to 0 on a map or in battle
> it can kill the player.
>
> If you are on a map and you kill the whole party, the last law window will tell You
> that every one is dead and its game over before actually going to the game over.
>
> ####We tell you before we punish you, battles.
>
> In battles when you do an action and the law is broken, if that law would kill You
> we will tell you before we actually punish you.
>
> ####We Punish before we tell you, map.
>
> If you are on the map and you use a potion and we have stated no you cannot use potions,
> then we will punish you and THEN show you the law window.

The following are acceptable punishments: hp, mp, tp, xp, gold.

**No you cannot have multiple punishments**.

### `cantUse`

Cant use stipulates what a actor can and cannot use. Because laws are not party wide and affect only the actor breaking it
the cantUse only applies to that specific actor at the time that they use an action.

- You can state, for battles: `Attack, Item Name, Skill Name, Special Name`
- For maps you can do: `Item Name, Skill Name, Special Name`

You can only have three `cantUse` per law.

For example: `attack, potion, spark`

When a player uses attack in battle or spark in battle they have broken a law. When a player uses potion either in or out of battle
that player has broken a law.

The same goes for out of battle. If a player uses a potion out of battle they will be punished.

## Regarding Breaking Laws in Battle.

In a battle its the sole act of doing an action thats against the law that breaks the law. For example if the law states you
cannot attack and you attack, but it misses, you still broke the law and will be punished according to that law.

## Regarding Yanfly Scripts.

For Yanfly battle and Yanfly Menu Manager, you don't have to do anything at all.

This script also works with Yanfly Aftermath, you just have to place `laws` in the list of reward windows:

```js
exp custom drops laws
```

## Reward for not breaking a law

You can set this up with a tag in the map notes:

```js
<lawReward i: 5 w:5 a:8 gold:78 xp:90>
```
This will reward the player it an item of id 5, weapon of id 5 and armor id of 8. The party will also gain 78 gold and the whole party will gain 90 xp.

You can also do:

```js
<lawReward i: "5,6,7" w:"5~89" a:8 gold:"1~78" xp:90>
```

This reads as, gain item id of 5,6 and 7. Gain a random weapon between if 5 and 89. Gain armor with id of 8. Gain random gold between 1 and 78 and finally the whole party gains 90 xp.

## Calculate Before or After Battle?

If you set this plugin option as `before` then you will see:

![law window](http://orig14.deviantart.net/d8e8/f/2015/333/1/6/screen_shot_2015_11_29_at_11_42_57_am_by_createdthoughts-d9igoqo.png)

You can scroll through the laws that associated with this map and hit enter to scroll through the list of rewards.

All of these rewards will be the same for every single battle.

If you want to have the rewards calculated after every single battle and you are using concepts of: `"1 ~ 6"` which is how we calculate random rewards.

Then you'll see:

![When laws are rewarded after battle](http://orig09.deviantart.net/c5b1/f/2015/333/1/a/screen_shot_2015_11_29_at_12_05_50_pm_by_createdthoughts-d9igpbt.png)

Which indicates that there is no reward information to be shown because that information is calulated after every battle.

## Public API

For developers, you get some public api. Non developers might find this useful.

You have access to the `FlareLawsForMap` static class which has the following functions on it:

- `getLawsForMap()` Gets all the laws for the current map, returns an array of 3 objects.
