/**
 * @namespace FlareCurrency
 */

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
  * === Public API ===
  *
  * There are two new objects that roam in the wile. flareCurrency and
  * FlareCurrency
  *
  * flareCurreency is used internally and is not to be touched. Mutating This
  * object can cause issues in the script.
  *
  * FlareCurrency is a class which conains the public api, such as setting
  * currency amount and calling currency specific shops.
  *
  * All methods on FlareCurrencies is static.
  *
  */

/**
 * Public Api Class for handeling currencies.
 *
 * This object is tied to the window object making it public.
 * It contains methods for setting, getting, opening currency shops
 * and so on.
 */
class FlareCurrencies {

  /**
   * Set the amount for the specific currency.
   *
   * Negative numbers are permited. If the total value goes
   * below 0, we will set the amount to 0.
   *
   * @param String currencyName
   * @param Int currencyAmount
   */
  static setAmount(currencyName, currencyAmount) {
    var currencies = window.flareCurrency.getCurrencyStore();

    var self = this;
    currencies.map(function(currency){
      if (currency.name.indexOf(currencyName) !== -1) {
        self._setAmount(currency, currencyAmount);
        return;
      }
    });
  }

  /**
   * Private method: sets Currency.
   *
   * @param Object Currency
   * @param Int CurrencyAmount
   */
  static _setAmount(currency, currencyAmount) {
    currency.amount = currency.amount + currencyAmount;

    if (currency.amount < 0) {
      currency.amount = 0;
    }
  }
}

// Create public API.
window.FlareCurrencies = FlareCurrencies
