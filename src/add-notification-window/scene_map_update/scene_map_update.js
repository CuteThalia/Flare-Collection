/**
 * @namespace FlareNotification.
 */

/**
 * Responsible for updating scene map.
 *
 * Allows us to show notifications on the map.
 */

import FlareNotificationWindow from '../windows/flare_notification_window';
import WindowOptions           from '../notification/window/options';
import NotificationOptions     from '../notification_options/notification_options';

var oldSceneMapPrototypeInitializeMethod = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
  oldSceneMapPrototypeInitializeMethod.call(this);
  this._isWindowOpen = false;

  if (isNaN(parseInt(NotificationOptions.getNotificationOptions().timeTillNextWindow))) {
    throw new Error('Sorry but: ' + NotificationOptions.getNotificationOptions().timeTillNextWindow + ' is not a number');
  }

  this._waitForWindowToClose = 0;
  this._flareWindow = null;
}

var oldSceneMapPrototypeUpdateMainMethod = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
  oldSceneMapPrototypeUpdateMainMethod.call(this);

  if (this._waitForWindowToClose > 0) {
    this._waitForWindowToClose--;
    console.log('waiting');
  } else if (FlareNotification._getQueue().length > 0) {
    console.log('here');
    this.handleQueue();
  }
}

Scene_Map.prototype.handleQueue = function() {
  this.openFlareNotificationWindow();
  this.allowAnotherWindowToBeOpened(this._flareWindow);
}

Scene_Map.prototype.openFlareNotificationWindow = function() {
  if (this._flareWindow === null) {
    this._flareWindow = FlareNotification._getQueue().shift();
    this.addChild(this._flareWindow.windowMethod);

    this._flareWindow.windowMethod.open(this._flareWindow.text);
  }
}

Scene_Map.prototype.allowAnotherWindowToBeOpened = function(flareNotification) {
  this.removeChild(flareNotification);
  this._flareWindow = null;
  this._waitForWindowToClose = NotificationOptions.getNotificationOptions().timeTillNextWindow;
}
