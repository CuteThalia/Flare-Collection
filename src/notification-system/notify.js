/**
 * @namespace FlareNotify
 */

/*:
 * @plugindesc creates notification windows via events.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 *
 * @help
 *
 */

/**
 * Public API Class. Flare Notifications.
 *
 * Class that contains public methods that can be called
 * via the window.FlareNotifcations
 */
class FlareNotifications {

  static createNotificationWindow() {
    SceneManager.push(FlareNotificationScene);
  }

}

window.FlareNotifications = FlareNotifications;
