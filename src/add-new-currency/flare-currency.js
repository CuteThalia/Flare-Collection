/**
 * @namespace FlareCurrency
 */

var Currency          = require('./currency.js');
var FlareCurrencyMenu = require('./menus/flare_currency_menu.js');
var FlareError        = require('../flare_error.js');

 /*:
  * @plugindesc Allows you to add a new currency or set of currencies to the game
  * such currencies can include things like "clay pot" or "silver coin" they are then
  * used in shops.
  * @author Adam Balan (AKA: DarknessFalls)
  *
  * @param ---Currency One---
  * @desc
  *
  * @param Currency One Name
  * @desc Name of the Currency
  * Default: Example Name
  * @default Example Name
  *
  * @param Currency One Description
  * @desc Keep it short. Currency description
  * Default: Used to buy: something.
  * @default Used to buy: something.
  *
  * @param Currency One Icon Index
  * @desc icon index.
  * Default: 25
  * @default 25
  *
  * @param ---Currency Two---
  * @desc
  *
  * @param Currency Two Name
  * @desc Name of the Currency
  * Default: Example Name
  * @default Example Name
  *
  * @param Currency Two Description
  * @desc Keep it short. Currency description
  * Default: Used to buy: something.
  * @default Used to buy: something.
  *
  * @param Currency Two Icon Index
  * @desc icon index.
  * Default: 25
  * @default 25
  *
  * @param ---Currency Three---
  * @desc
  *
  * @param Currency Three Name
  * @desc Name of the Currency
  * Default: Example Name
  * @default Example Name
  *
  * @param Currency Three Description
  * @desc Keep it short. Currency description
  * Default: Used to buy: something.
  * @default Used to buy: something.
  *
  * @param Currency Three Icon Index
  * @desc icon index.
  * Default: 25
  * @default 25
  *
  * @param ---Currency Four---
  * @desc
  *
  * @param Currency Four Name
  * @desc Name of the Currency
  * Default: Example Name
  * @default Example Name
  *
  * @param Currency Four Description
  * @desc Keep it short. Currency description
  * Default: Used to buy: something.
  * @default Used to buy: something.
  *
  * @param Currency Four Icon Index
  * @desc icon index.
  * Default: 25
  * @default 25
  *
  * @param ---Currency Five---
  * @desc
  *
  * @param Currency Five Name
  * @desc Name of the Currency
  * Default: Example Name
  * @default Example Name
  *
  * @param Currency Five Description
  * @desc Keep it short. Currency description
  * Default: Used to buy: something.
  * @default Used to buy: something.
  *
  * @param Currency Five Icon Index
  * @desc icon index.
  * Default: 25
  * @default 25
  *
  * @help
  *
  * Currencies can be used in game to buy items that require that specific
  * currency. For example maybe Demonic Armor needs 5 Demonic Runes. you
  * would create a currency called Demonic Runes, with a description of:
  * "Used to buy Demonic Armour" and then set an icon index.
  *
  * Descriptions must be kept SUPER SUPER short. yes we do allow short codes
  * but no we do not do anything like word wrapping. Keep the concept of:
  *
  * Used to buy: x
  *
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
