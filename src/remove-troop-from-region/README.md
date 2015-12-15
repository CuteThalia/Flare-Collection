# Flare Remove Troop From Region

This script will remove one or more enemy troops from the `encounterList` for a map object. We do this destructively,
how ever its also non destructive such that I save the original encounter list for that map so you can restore at any
time with a simple script call.

It's destructive such that, the cloned data structure gets mutated and then the original is replaced with that new mutated
array of encounters.

When you restore, based on map id, we restore the mutated version of the data back to the original encounter list.

This script is great if you have a boss that is in a specific region as well as other enemies. Or maybe you have a kill
quest that requires the players to kill monsters in a specific part of the map, monsters that belong to multiple regions.

Lets understand how this script works.

Create a parallel event that calls the following, as an example:

```js
FlareRemoveTroopFromRegion.removeOnBattleEnd([1,2], 1);
```

The first parameter is an array of troop id's to be removed from the second param which is the region. In this case
troop id one and two will be removed upon a successful battle.

To remove one enemy from a region:

```js
FlareRemoveTroopFromRegion.removeOnBattleEnd(1, 1);
```

> ## ATTN!!
>
> If you trigger an event on an region where the user would encounter the enemy and you allow them to loose
> I do not remove the troop, because you did not win the battle.
>
> How ever if you should happen to win the battle, I will remove the troop from said region. So keep this in mind
> for battles you trigger manually through events.
>
> ## Regarding "Map" enemies
>
> If you have a troop that belongs to the whole map, **I do not remove this enemy from the troop list**.

Next paint a specific section of your map with region 1, assign some monsters (these troop id's) to it and then encounter them.

You will notice after a battle you will not run into these enemies.

If the enemy troop, lets say id 2, belongs to region 1 and 5 and you encounter it on region 1, you will never encounter it on region 1 again, how ever you **can** encounter it on region 5 So keep that in mind when you want to remove enemies from a region.

## Restoring to default

because this mutated date is stored across saves and maps you might want to restore the map to its original encounter list. This can be done by creating an event with the following:

```js
FlareRemoveTroopFromRegion.restoreToDefault(3);
```

You restore map id 3 to default. This means the original encounter list will be back in effect.

Keep in mind that parallel event is still running, so if you go back to region one and kill troop id 1 again, it will be removed, again, from that region.
