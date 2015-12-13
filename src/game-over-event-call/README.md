#Flare Call Event On Game Over

This script is super simple and super basic. There is no screen shot to show as the common event you create is up to you.

How ever at the core of the script we do the following:

- Party Dies on map, out of battle, we call a common event after reviving every one.
- Party Dies in a non test, non can loose battle, party is revived, sent back to map and common event is called.

So how would you set this up?

- Create a common event with a trigger of none.
- Create a parallel process that contains the following script call: `FlareGameOverEventCall.callEvent(commondId)`
  - The `commonId` is the id of the common event you created
- Play the game.

Now when a party dies in battle, the characters are revived and the event plays, This also works for when a party dies
on the map. This does **NOT** work when you just call game over via an event.

Simple right?
