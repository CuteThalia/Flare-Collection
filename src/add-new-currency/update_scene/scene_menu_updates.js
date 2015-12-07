/**
 * @namespace FlareCurrency
 */

import FlareCurrencyScene from '../scenes/flare_currency_scene';
import lodashIsUndefined  from 'lodash/lang/isUndefined';
import lodashAll          from 'lodash/collection/all';
import lodashFilter       from 'lodash/collection/filter';
import TextHandler        from '../currencies/text_handler';

var oldSceneMenuPrototypeCreateCommandWindiow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  oldSceneMenuPrototypeCreateCommandWindiow.call(this);

  var filteredArray = lodashFilter(flareCurrency.getCurrencyStore(), function(currency) {
    return currency.name && currency.icon && currency.description;
  });

  if (filteredArray.length === 0) {
    return;
  }

  this._commandWindow.setHandler(TextHandler.getText().menuLabel, this.currencyCommand.bind(this));
}

Scene_Menu.prototype.currencyCommand = function() {
  SceneManager.push(FlareCurrencyScene);
}
