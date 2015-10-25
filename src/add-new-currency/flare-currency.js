var Currency          = require('./currency.js');
var FlareCurrencyMenu = require('./menus/flare_currency_menu.js');

/**
 * @namespace FlareCollection
 */

 /**
  * Flare Collection - Currency
  *
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
  */

var FlareCurrencyPluginParamters = PluginManager.parameters('Flare-Currency');

class FlareCurrency {

  constructor() {}

  createCurrencies() {
    Currency.store(FlareCurrencyPluginParamters);
  }

  currencies() {
    Currency.getCurrencyStore();
  }

};

const flareCurrencyMenu = new FlareCurrencyMenu();
flareCurrencyMenu.menuHandler();

window.FlareCurrency = FlareCurrency;
