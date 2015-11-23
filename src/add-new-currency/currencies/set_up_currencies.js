/**
 * @namespace FlareCurrencies
 */

import Currency   from './currency';
import FlareError from '../../flare_error';

var FlareCurrencyPluginParamters = PluginManager.parameters('Flare-Currency');

/**
 * Core Currency Class.
 *
 * Contains a method called createCurrencies() that creates the currencies based off
 * the plugin paramters.
 */
class FlareCurrency {

  constructor() {
    window.flareCurrency = new Currency();
  }

  /**
   * Non public API method to create currencies.
   *
   * Calls on the Currency class to store the currencies
   * that were set up via the plugin parameters.
   */
  createCurrencies() {
    window.flareCurrency.store(FlareCurrencyPluginParamters);
  }

  /**
   * Sets the store from the saved game.
   *
   * Saved games will have a contents.currencies in them.
   * Over ride what evers in this._store with the store from the
   * contents.currencies.
   *
   * @param Array store
   */
  setStoreFromLoad(store) {
    window.flareCurrency.setStoreFromLoad(store);
  }
};

// Creates the Currencies.
var flareCurrency = new FlareCurrency();
flareCurrency.createCurrencies();

// Handles Errors thrown in classes that do not extend the
// the RPG Maker classes.
// @see FlareError
var mainSceneMapInitializer = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
  mainSceneMapInitializer.call(this);

  if (FlareError.getError() !== undefined) {
    throw new Error(FlareError.getError());
  }
};
