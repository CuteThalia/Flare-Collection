/**
 * @namespace FlareNotify
 *
 */

/**
 * Make changes to the Scene Map.
 *
 * Changes here allow for the notification
 * window to open.
 */

var FlareNotifyWindow = require ('../windows/notify_window');

var oldSceneMapPrototypeInitializeMethod = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
  oldSceneMapPrototypeInitializeMethod.call(this);
  this._notificationWindowIsOpen = false;
}

var sceneMapPrototypeCreateDisplayObjectsMethod = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
  sceneMapPrototypeCreateDisplayObjectsMethod.call(this);
  this.addFlareNotificationWindow();
}

Scene_Map.prototype.addFlareNotificationWindow = function() {
    this._flareNotificationWindow = new FlareNotifyWindow();
    this.addChild(this._flareNotificationWindow);
}

var oldSceneMapPrototypeUpdateMainMethod = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
  oldSceneMapPrototypeUpdateMainMethod.call(this);

  if (!this._notificationWindowIsOpen) {
    this._flareNotificationWindow.open();
    this._notificationWindowIsOpen = true;
  }
}

var oldSceneMapPrototypeCallMenuMethod = Scene_Map.prototype.callMenu
Scene_Map.prototype.callMenu = function() {
  oldSceneMapPrototypeCallMenuMethod.call(this);
  this._flareNotificationWindow.hide();
}

var oldSceneMapPrototypeLaunchBattleMethod = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function() {
  oldSceneMapPrototypeLaunchBattleMethod.call(this);
  this._flareNotificationWindow.hide();
}

var oldSceneMapPrototypeStopMethod = Scene_Map.prototype.stop
Scene_Map.prototype.stop = function() {
  oldSceneMapPrototypeStopMethod.call(this);
  this._flareNotificationWindow.close();
}
