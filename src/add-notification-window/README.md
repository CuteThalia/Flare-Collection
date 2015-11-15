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
FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]", true ,true);
FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]", true, false);
FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]", true);

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
