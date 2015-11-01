# Flare Notifications

![Notification Window Scrolling](http://imgur.com/EfSN6tQ)

Flare Notifications allows you to create notification windows based on different
events.

So lets create a notification:

 ```javascript
 FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
```

This creates a notification window that will scroll down the game window fading in and then out
at a specified rate given by the options.

As you can see the notification window is given a name string and a string of text for the window.

All windows are added to a cue, first in first out.

For example an event can have:

```javascript
FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
```

This adds ten windows to an event that will then all be called.
