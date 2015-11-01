/**
 * @namespace FlareNotification.
 */

/**
 * Responsible for updating scene map.
 *
 * Allows us to show notifications on the map.
 */

var FlareNotificationWindow = require('../windows/flare_notification_window');

var oldSceneMapPrototypeInitializeMethod = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
  oldSceneMapPrototypeInitializeMethod.call(this);
  this._isWindowOpen = false;

  var timeTillNextwindow = _NotificationOptions.getNotificationOptions().time_till_next_window;

  if (isNaN(parseInt(timeTillNextwindow))) {
    throw new Error('Sorry but: ' + timeTillNextwindow + ' is not a number');
  }

  this._waitForWindowToClose = timeTillNextwindow;
  this._flareNotificationWindow = null;
  this._flareWindow = null;
}

var oldSceneMapPrototypeUpdateMainMethod = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
  oldSceneMapPrototypeUpdateMainMethod.call(this);

  if (FlareNotification._getQueue().length > 0 ) {
    this.handleQueue();
  }
}

Scene_Map.prototype.handleQueue = function() {
  if (this._waitForWindowToClose > 0) {
    this.openFlareNotificationWindow();
    this._waitForWindowToClose--;
  } else {
    this.allowAnotherWindowToBeOpened(this._flareWindow);
  }
}

Scene_Map.prototype.openFlareNotificationWindow = function() {
  if (this._flareWindow === null) {
    this._flareWindow = FlareNotification._getQueue().shift();
    this.addChild(this._flareWindow.windowMethod);
    this._flareWindow.windowMethod.open((this._flareWindow.text));
  }
}

Scene_Map.prototype.allowAnotherWindowToBeOpened = function(flareNotification) {
  this.removeChild(flareNotification);
  this._flareWindow = null;
  this._waitForWindowToClose = 75;
}

var oldSceneMapPrototypeStopMethod = Scene_Map.prototype.stop;
Scene_Map.prototype.stop = function() {
  if (this._flareWindow !== null) {
    this._flareWindow.close();
  }

  oldSceneMapPrototypeStopMethod.call(this);
}

var oldSceneMapPrototypeCallMenuMethod = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function() {
  if (this._flareWindow !== null) {
    this._flareWindow.hide();
  }
  oldSceneMapPrototypeCallMenuMethod.call(this);
}

var SceneMapPrototypeLaunchbattleMethod = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function() {
  SceneMapPrototypeLaunchbattleMethod.call(this);
  if (this._flareWindow !== null) {
    this._flareWindow.hide();
  }
}
