/**
 * @namespace FlareNotification.
 */

import FlareNotificationWindow from './windows/flare_notification_window';
import NotificationOptions     from './notification_options/notification_options';
import lodashIsUndefined       from 'lodash/lang/isUndefined';
import WindowOptions           from './notification/window/options';

/*:
 * @plugindesc Allows you to create notifications for player based events.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @param Till Next Notification?
 * @desc How long should we wait before displaying the next notification?
 * Default: 100
 * @default 100
 *
 * @param How Long Till Notification Fade Out?
 * @desc How long before the notification fades out?
 * Default: 75
 * @default 75
 *
 * @param Should I stay at the top?
 * @desc Should the notification stay at the top?
 * Default: false
 * @default false
 *
 * @param Calulation For Fade out
 * @desc calculate how soon after fade in we should fade out.
 * Default: (175 / 2) + 50
 * @default (175 / 2) + 50
 *
 * @param Show Window?
 * @desc Do we want a window behind the text?
 * Default: true
 * @default true
 *
 * @param ---Gold Event---
 * @desc
 *
 * @param Display Gold Notification Event?
 * @desc When party gains gold via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Gold Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Gold Notification Font Size
 * @desc What font size should we use on the gold notification window?
 * Default: 20
 * @default 20
 *
 * @param Gold Notification Stay At The Top?
 * @desc Should the gold notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param Gold Notification Should Fadeout?
 * @desc Should the gold window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---Item Event---
 * @desc
 *
 * @param Display Item Notification Event?
 * @desc When party gains item via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Item Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Item Notification Font Size
 * @desc What font size should we use on the item notification window?
 * Default: 20
 * @default 20
 *
 * @param Item Notification Stay At The Top?
 * @desc Should the item notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param Item Notification Should Fadeout?
 * @desc Should the item window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---Weapon Event---
 * @desc
 *
 * @param Display Weapon Notification Event?
 * @desc When party gains weapon via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Weapon Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Weapon Notification Font Size
 * @desc What font size should we use on the weapon notification window?
 * Default: 20
 * @default 20
 *
 * @param Weapon Notification Stay At The Top?
 * @desc Should the weapon notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param Weapon Notification Should Fadeout?
 * @desc Should the weapon window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---Armor Event---
 * @desc
 *
 * @param Display Armor Notification Event?
 * @desc When party gains armor via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Armor Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Armor Notification Font Size
 * @desc What font size should we use on the armor notification window?
 * Default: 20
 * @default 20
 *
 * @param Armor Notification Stay At The Top?
 * @desc Should the armor notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param Armor Notification Should Fadeout?
 * @desc Should the armor window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---Party Event---
 * @desc
 *
 * @param Display Party Notification Event?
 * @desc When party gains an actor via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Party Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Party Notification Font Size
 * @desc What font size should we use on the party notification window?
 * Default: 20
 * @default 20
 *
 * @param Party Notification Stay At The Top?
 * @desc Should the party notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param Party Notification Should Fadeout?
 * @desc Should the party window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---HP Change Event---
 * @desc
 *
 * @param Display HP Notification Event?
 * @desc When actor gains an hp via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param HP Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param HP Notification Font Size
 * @desc What font size should we use on the hp notification window?
 * Default: 20
 * @default 20
 *
 * @param HP Notification Stay At The Top?
 * @desc Should the hp notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param HP Notification Should Fadeout?
 * @desc Should the hp window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---MP Change Event---
 * @desc
 *
 * @param Display MP Notification Event?
 * @desc When actor gains an mp via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param MP Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param MP Notification Font Size
 * @desc What font size should we use on the mp notification window?
 * Default: 20
 * @default 20
 *
 * @param MP Notification Stay At The Top?
 * @desc Should the hp notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param MP Notification Should Fadeout?
 * @desc Should the hp window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---TP Change Event---
 * @desc
 *
 * @param Display TP Notification Event?
 * @desc When actor gains an tp via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param TP Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param TP Notification Font Size
 * @desc What font size should we use on the tp notification window?
 * Default: 20
 * @default 20
 *
 * @param TP Notification Stay At The Top?
 * @desc Should the tp notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param TP Notification Should Fadeout?
 * @desc Should the tp window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---State Change Event---
 * @desc
 *
 * @param Display State Notification Event?
 * @desc When actor gains an state via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param State Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param State Notification Font Size
 * @desc What font size should we use on the state notification window?
 * Default: 20
 * @default 20
 *
 * @param State Notification Stay At The Top?
 * @desc Should the state notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param State Notification Should Fadeout?
 * @desc Should the state window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---Recover All Event---
 * @desc
 *
 * @param Display Recover All Notification Event?
 * @desc When actor recovers all via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Recover All Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Recover All Notification Font Size
 * @desc What font size should we use on the recover all notification window?
 * Default: 20
 * @default 20
 *
 * @param Recover All Notification Stay At The Top?
 * @desc Should the recover all notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param Recover All Notification Should Fadeout?
 * @desc Should the recover all window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---XP Change Event---
 * @desc
 *
 * @param Display Xp Notification Event?
 * @desc When actor gains xp via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Xp Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Xp Notification Font Size
 * @desc What font size should we use on the xp notification window?
 * Default: 20
 * @default 20
 *
 * @param Xp Notification Stay At The Top?
 * @desc Should the xp notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param Xp Notification Should Fadeout?
 * @desc Should the xp window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---Level Change Event---
 * @desc
 *
 * @param Display Level gain Notification Event?
 * @desc When actor gains level via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Level gain Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Level gain Notification Font Size
 * @desc What font size should we use on the level notification window?
 * Default: 20
 * @default 20
 *
 * @param Level gain Notification Stay At The Top?
 * @desc Should the level notification window stay at the top?
 * Default: false
 * @default false
 *
 * @param Level gain Notification Should Fadeout?
 * @desc Should the level window fade out, if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @help
 *
 * Notifications can be created easily, on the fly. Its amazing how easily they
 * can  be created. lets create one together:
 *
 * FlareNotification.notify(text, stickToTop, fadeOutNearBottom);
 *
 * - text: String, accepts short code like color and icon.
 * - StickToTop: Boolean, default false. Sticks to the top of the screen if enabled.
 * - fadeOutNearBottom: Boolean, default false. Fades out using plugin configured fade out time.
 *
 * Text with short codes must use double slash:
 *
 * FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
 *
 * The name of the window can be the same for all of your notifications if
 * you wish. We use, first in, first out concept:
 *
 * FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
 * FlareNotification.notify("\\i[8] \\c[10]Hello\\c[0]");
 * FlareNotification.notify("\\i[8] \\c[10]World\\c[0]");
 *
 * Hello World is First out then Hello and finally World.
 *
 * == Regarding Options ===
 *
 * The "Till Next Notification?" Needs to be larger then the
 * "How Long Till Notification Fade Out?" or else you could have over lapping
 * notifications especially when you choose notifications that "stick to the top."
 *
 * === Note on Staying at the top ===
 *
 * If you have three events, two of which fade down and a one that stays at the top
 * and these events are triggered by trigged by player touch:
 *
 * Event A: [notification, dont stay at top], [notification, dont stay at top]
 * Event B: notification, stay at tip
 *
 * Lets say you trigger A, and then B, in A the first notification will slide down
 * the page, the second notifcation will stay at the top and the third will
 * also stay at the top.
 *
 * This is not a bug, this is because you have specifically told us to stay at the
 * top in the third event which is triggered before the actual notification appears.
 *
 * === Notification on event gain ===
 *
 * There is options for each type of event, such as width, stay at the top, fadeout
 * and font size.
 *
 * We also have an option to show the event should you want too disable that particular
 * event notification.
 *
 * By defauly all notifications will show at the top and slide down the page fading
 * out over time.
 *
 * With these types of notifications, events will play first and then the message,
 * if there are multiple events, each message is added to the queue and they play one
 * after the other.
 */

class FlareNotification {

  /**
   * Public API: Notify Window.
   *
   * Creates a window for the que.
   *
   * @param text - text for the window
   */
  static notify(text, stayAtTop, fadeoutTowardsBottom, options) {
    this._arrayOfNotifications.push({
      windowMethod: new FlareNotificationWindow(options),
      text:         text
    });

    var stayAtTop            = false ? lodashIsUndefined(stayAtTop) : stayAtTop;
    var fadeoutTowardsBottom = false ? lodashIsUndefined(fadeoutTowardsBottom) : fadeoutTowardsBottom;

    WindowOptions.setOption('shouldWeStayAtTop', stayAtTop);
    WindowOptions.setOption('shouldWeFadeOutTowardsBottom', fadeoutTowardsBottom);
  }

  /**
   * Private Method.
   *
   * Check if the queue array length is greator then 0.
   *
   * @return bool
   */
  static _isThereAQueue() {
    if (this._arrayOfNotifications.length > 0) {
      return true;
    }

    return false;
  }

  /**
   * Private Methd
   *
   * Gets the queue array.
   *
   * @return Array
   */
  static _getQueue() {
    return this._arrayOfNotifications;
  }
}

window.FlareNotification = FlareNotification;

// Set up the options.
_NotificationOptions.createNotificationOptions();

// Do not touch or manipulate this.
FlareNotification._arrayOfNotifications = [];
