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
  this._waitForWindowToClose = 175;
  this._flareNotificationWindow = null;
}

var oldSceneMapPrototypeUpdateMainMethod = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
  oldSceneMapPrototypeUpdateMainMethod.call(this);

  if (this._flareNotificationWindow === null) {
    this._flareNotificationWindow = new FlareNotificationWindow();
  }

  if (!this._iswindowOpen && FlareNotification._isWindowOpen()) {
    this.addChild(this._flareNotificationWindow);
    this._flareNotificationWindow.open();
    this._isWindowOpen = true;
  }

  if (this._isWindowOpen) {
    this._waitForWindowToClose--;
    if (this._waitForWindowToClose === 0 ) {
      console.log('Hello World');
      this.allowAnotherWindowToBeOpened();
    }
  }
}

Scene_Map.prototype.allowAnotherWindowToBeOpened = function() {
  FlareNotification._windowIsNotOpen();
  this._isWindowOpen = false;
  this.removeChild(this._flareNotificationWindow);
  this._flareNotificationWindow = null;
  this._waitForWindowToClose = 175;
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
