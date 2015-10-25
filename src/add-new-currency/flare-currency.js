var Currency          = require('./currency.js');
var FlareCurrencyMenu = require('./menus/flare_currency_menu.js');
var FlareError        = require('../flare_error.js');

/**
 * @namespace FlareCollection
 */

 /*:
  * @plugindesc Allows you to add a new currency or set of currencies to the game
  * such currencies can include things like "clay pot" or "silver coin" they are then
  * used in shops.
  * @author Adam Balan (AKA: DarknessFalls)
  *
  * @param ---Currencies---
  * @desc
  *
  * @param Currency One
  * @desc First Currency, enter something like: {name: 'currency', description: 'something', icon: 20}
  * Default: {}
  * @default {}
  *
  * @param Currency Two
  * @desc Second Currency, enter something like: {name: 'currency', description: 'something', icon: 20}
  * Default: {}
  * @default {}
  *
  * @param Currency Three
  * @desc Third Currency, enter something like: {name: 'currency', description: 'something', icon: 20}
  * Default: {}
  * @default {}
  *
  * @param Currency Four
  * @desc Fourth Currency, enter something like: {name: 'currency', description: 'something', icon: 20}
  * Default: {}
  * @default {}
  *
  * @param Currency Five
  * @desc Fifth Currency, enter something like: {name: 'currency', description: 'something', icon: 20}
  * Default: {}
  * @default {}
  *
  * @param Currency Six
  * @desc Sixth Currency, enter something like: {name: 'currency', description: 'something', icon: 20}
  * Default: {}
  * @default {}
  *
  * @param Currency Seven
  * @desc Seventh Currency, enter something like: {name: 'currency', description: 'something', icon: 20}
  * Default: {}
  * @default {}
  *
  * @param Currency Eight
  * @desc Eigth Currency, enter something like: {name: 'currency', description: 'something', icon: 20}
  * Default: {}
  * @default {}
  *
  * @param Currency Nine
  * @desc Nineth Currency, enter something like: {name: 'currency', description: 'something', icon: 20}
  * Default: {}
  * @default {}
  *
  * @param Currency Ten
  * @desc TenTh Currency, enter something like: {name: 'currency', description: 'something', icon: 20}
  * Default: {}
  * @default {}
  *
  * @help
  *
  * All Currencies must have the following format:
  *
  * {"name": "some name", "description": "something", "icon": index}.
  *
  * Any deviation from this will cause an exception to be thrown. I do validate
  * that you have those fields filled in. Should you not want to use a currency,
  * you must provide: {} which is the default.
  */

var FlareCurrencyPluginParamters = PluginManager.parameters('Flare-Currency');

/**
 * Core Currency Class.
 *
 * Contains a method called createCurrencies() that creates the currencies based off
 * the plugin paramters.
 */
class FlareCurrency {

  constructor() {
    this._currency = new Currency();
  }

  /**
   * Non public API method to create currencies.
   *
   * Calls on the Currency class to store the currencies
   * that were set up via the plugin parameters.
   */
  createCurrencies() {
    this._currency.store(FlareCurrencyPluginParamters);
  }
};

// Create the Currencies menu item.
var flareCurrencyMenu = new FlareCurrencyMenu();
flareCurrencyMenu.menuHandler();

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

// Gives the world access to the Flare Currency class.
window.FlareCurrency = FlareCurrency;
