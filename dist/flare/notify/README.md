# Flare Notifications

![Notification Window Scrolling](http://i.imgur.com/EfSN6tQ.png)

Flare Notifications allows you to create notification windows based on different
events.

So lets create a notification:

 ```javascript
 FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]", stickToTop, fadeOutNearBottom);
```

This creates a notification window that will scroll down the game window fading in and then out
at a specified rate given by the options.

As you can see we give the notification window some text. Optional values are `stickToTop` and
`fadeOutNearBottom` which should be obvious what they do.

`fadeOutNearBottom` is calculated based on a plugin setting which lets you calculate when it
it should start fading out.

All windows are added to a cue, first in first out.

For example an event can have:

```javascript
FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]", false, true, {windoWidth: 900, windowX: 2, windowY: 90});
FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]", true, false, {windoWidth: 900, windowX: 2, windowY: 90, fontSize: 20});

// Options are passed in as an object:
// windowWidth = The width of the notification window.
// windowX     = The x position of the window.
// windowY     = the y position of the window.
// fontSize    = the font size for the window.

FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
```

This adds ten windows to an event that will then all be called.

> ## ATTN!
>
> If you have 1 or more notifications and you open a menu, enter a battle.
> we will play the next set of notifications. If you then open a battle or a menu
> we will remove any notifications currently on the screen. This is similar behavior
> to the map name.
>
> ## Regarding windowY
>
> If you set the window Y to low or too high you may never see the notification because
> the window moved down the y axis and as it does it fades out over time. That time
> can be adjusted how ever.

## Event Based Notifications

Now you can enable a set of options to turn on event based notifications for weapons, armor, items, xp, gold, hp, mp and so on. There are a ton of individual event notifications that you can turn on or off so that you
are not creating events all the time that contain notifications after a party gains x item or loses x hp.

These only trigger on events that require the player to some how activate them. They do not play in battle or in
menus.

Event based notifications have options for the way the window looks and behaves including width, font size, stay at the top, how long till next window and so on. These options are different then self created notification  window options and are individual for each type of event notification.

> ATTN!!
>
> Assume you have 6 events that play (all at once) as the player triggers them.
> The notification messages are added to a queue. The events will play out,
> level messages and other types of messages will play out associated with that event.
> these messages are known as `$gameMessage`'s.
>
> The notification event messages will play directly after according to how they were
> added to a queue.
