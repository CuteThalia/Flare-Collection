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
  this._waitForWindowToClose = 75;
  this._flareNotificationWindow = null;
  this._flareWindow = null;
}

var oldSceneMapPrototypeUpdateMainMethod = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
  oldSceneMapPrototypeUpdateMainMethod.call(this);

  if (FlareNotification._getQueue().length > 0 ) {
    if (this._waitForWindowToClose > 0) {
      if (this._flareWindow === null) {
        this._flareWindow = FlareNotification._getQueue().shift();
        this.addChild(this._flareWindow.windowMethod);
        this._flareWindow.windowMethod.open();
      }
      this._waitForWindowToClose--;
    } else {
      this.allowAnotherWindowToBeOpened(this._flareWindow);
    }
  }
}

Scene_Map.prototype.allowAnotherWindowToBeOpened = function(flareNotification) {
  this.removeChild(flareNotification);
  this._flareWindow = null;
  this._waitForWindowToClose = 75;
}

var oldSceneMapPrototypeStopMethod = Scene_Map.prototype.stop;
Scene_Map.prototype.stop = function() {
  this._flareNotificationWindow.close();
  oldSceneMapPrototypeStopMethod.call(this);
}

var oldSceneMapPrototypeCallMenuMethod = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function() {
  this._flareNotificationWindow.hide();
  oldSceneMapPrototypeCallMenuMethod.call(this);
}

var SceneMapPrototypeLaunchbattleMethod = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function() {
  SceneMapPrototypeLaunchbattleMethod.call(this);
  this._flareNotificationWindow.hide();
}
