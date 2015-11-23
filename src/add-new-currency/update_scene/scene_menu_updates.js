/**
 * @namespace FlareCurrency
 */

import FlareCurrencyScene from '../scenes/flare_currency_scene';

var oldSceneMenuPrototypeCreateCommandWindiow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  oldSceneMenuPrototypeCreateCommandWindiow.call(this);
  this._commandWindow.setHandler('Currencies', this.currencyCommand.bind(this));
}

Scene_Menu.prototype.currencyCommand = function() {
  SceneManager.push(FlareCurrencyScene);
}
