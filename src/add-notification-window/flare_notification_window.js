var FlareNotificationWindow = require('./windows/flare_notification_window');

class FlareNotification {

  static createNewScene(name) {
    this._arrayOfNotifications.push({
      name: name, windowMethod: new FlareNotificationWindow()
    });
  }

  static _isThereAQueue() {
    if (this._arrayOfNotifications.length > 0) {
      return true;
    }

    return false;
  }

  static _getQueue() {
    return this._arrayOfNotifications;
  }
}

window.FlareNotification = FlareNotification;
FlareNotification._arrayOfNotifications = [];
