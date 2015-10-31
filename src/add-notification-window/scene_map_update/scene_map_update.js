/**
 * Responsible for updating scene map.
 *
 * Allows us to show notifications on the map.
 */

var FlareNotificationWindow = require('../windows/flare_notification_window');

var oldSceneMapPrototypeInitializeMethod = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
  oldSceneMapPrototypeInitializeMethod.call(this);
  this._iswindowOpen = false;
}

var oldSceneMapPrototypeCreateDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
  oldSceneMapPrototypeCreateDisplayObjects.call(this);
  this.createFlareNotificationWindow();
}

var oldSceneMapPrototypeUpdateMainMethod = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
  oldSceneMapPrototypeUpdateMainMethod.call(this);

  if (!this._iswindowOpen) {
    this._flareNotificationWindow.open();
    this._iswindowOpen = true;
  }
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

Scene_Map.prototype.createFlareNotificationWindow = function() {
  this._flareNotificationWindow = new FlareNotificationWindow();
  this.addChild(this._flareNotificationWindow);
}
