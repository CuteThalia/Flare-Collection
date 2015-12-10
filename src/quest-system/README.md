# Quests

The quest system is a bit more complicated then most, but it is the best system that keeps everything in one place.

Quests are essential to any RPG game, and when making the quest system the goal was simple, keep the core concept simple
and small and yet powerful. So how did I do that?

## Creating Quests

Creating quests is simple, consider the following example:

![Quest System](http://i.imgur.com/Bzvup4T.png)

In the above example we can see that we use RPG Maker MV event comments to set up the quest, now event comments do not allow us more then 4 or 5 lines of text, so
we have to create multiple comments, and yes this can get quite complicated.

So whats going on?

A simple quest is broken into a couple pieces:

- **Quest**, contains a title (must be unique) and a level recommendation. If no level recommendation is provided we will assume any player level is able to complete this quest.
  - **questReward**, we use this to symbolize the reward for this quest which is given out after the quest is complete.
    - **i** is for items, you can do: `"1,2,4"` which means: give the player items 1,2 ad 3. You cal also do: "`1 ~ 3`" which means: give the player a random item between id 1 and 3. You can also do: `"rand: 1, 13, 65"` which means: give the player a random item between 1, 13 or 65. so you have a 1/3 chance to get 65 or 13 or even 1.
    - **w** is for weapon, the same concepts for id's apply as they do for items.
    - **a** is for armor, the same concepts for id's apply as they do for items.
    - **gold** can have a random number: `"1 ~ x"` or a single number.
    - **xp** can also have a random number: `"1 ~ x"` or a single number.
  - **objective**, this is what the player should do. This can be as long as you want it to be, just keep it all on one line since comment boxes seem to have infinite scrolling, yes it will work on multiple lines too, but keep in mind the comment box only has 4 to 5 lines.

- **QuestChain** Contains a set of quests as described above.
  - **id** the id of the quest chain, this must be unique.

> ## ATTN!
>
> The way we read things in and parse the quests allows you to have any number
> lines for your objective, you can have the closing tag for the objective in
> comment 24 if you wish.
>
> ## Regarding duplicate quests and quest chains
>
> We will not add any quest that has the same title. This is for simple quests. So if you have two single quests with
> the same title, we will only add one of them.
>
> If you have two quest chains with the same id attached we will only add one.
>
> **No error will be thrown.**
>
> Quest Chains Must have unique quests in them as well, that is no quest in a quest chain can have the same title.
>
>How ever
> in each quest chain you may have a the same quest name as another quest chain quest. That is, if quest chain id 2 has a quest called
> "Save Me" and quest chain with an id of 4 has a quest with the title of "Save Me", that is acceptable.
