/**
 * @namespace FlareLawsForMap.
 */

import FlareLawWindowScene from '../scenes/flare_law_window_scene';

var oldSceneMenuPrototypeCreateCommandWindiow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  oldSceneMenuPrototypeCreateCommandWindiow.call(this);
  this._commandWindow.setHandler('Laws', this.lawsCommand.bind(this));
}

Scene_Menu.prototype.lawsCommand = function() {
  SceneManager.push(FlareLawWindowScene);
}
