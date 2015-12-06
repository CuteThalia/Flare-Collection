/**
 * @namespace FlareCurrency
 */

import lodashFind         from 'lodash/collection/find';
import lodashFilter       from 'lodash/collection/filter';
import lodashIsUndefined  from 'lodash/lang/isUndefined';
import CurrencyShop       from './shop/currency_shop';

 /*:
  * @plugindesc Allows you to add a new currency or set of currencies to the game
  * such currencies can include things like "clay pot" or "silver coin" they are then
  * used in shops.
  * @author Adam Balan (AKA: DarknessFalls)
  *
  * @param ---Currency Translation---
  *
  * @param Label For Menu
  * @desc The name the player will see in the menu.
  * Default: Currency
  * @default Currency
  *
  * @param Currently Have
  * @desc the label for "currently have" in the list of currencies.
  * Default: Currently have:
  * @default Currently have:
  *
  * @param Help Text
  * @desc The help text when looking at the details of a single currency.
  * Default: \c[18]Hit Enter to see more information, or switch to another currency and hit enter\c[0]
  * @default \c[18]Hit Enter to see more information, or switch to another currency and hit enter\c[0]
  *
  * @param Shops sell for text
  * @desc The text used to show: "Shops sell" for when looking at currency items.
  * Default: Shops Sell For:
  * @default Shops Sell For:
  *
  * @param Shops are selling for text
  * @desc The text used to show: "Shops are selling for" for when looking at currency items details.
  * Default: - Shops are selling for:
  * @default - Shops are selling for:
  *
  * @param Currency Shops Selling This item
  * @desc Text when the there are shops selling the item on the map.
  * Default: - There is a \c[14]currency shop\c[0] selling this item.
  * @default - There is a \c[14]currency shop\c[0] selling this item.
  *
  * @param ---Currency One---
  * @desc
  *
  * @param Currency One Name
  * @desc Name of the Currency
  * Default:
  * @default
  *
  * @param Currency One Description
  * @desc Keep it short. Currency description
  * Default:
  * @default
  *
  * @param Currency One Icon Index
  * @desc icon index.
  * Default:
  * @default
  *
  * @param ---Currency Two---
  * @desc
  *
  * @param Currency Two Name
  * @desc Name of the Currency
  * Default:
  * @default
  *
  * @param Currency Two Description
  * @desc Keep it short. Currency description
  * Default:
  * @default
  *
  * @param Currency Two Icon Index
  * @desc icon index.
  * Default:
  * @default
  *
  * @param ---Currency Three---
  * @desc
  *
  * @param Currency Three Name
  * @desc Name of the Currency
  * Default:
  * @default
  *
  * @param Currency Three Description
  * @desc Keep it short. Currency description
  * Default:
  * @default
  *
  * @param Currency Three Icon Index
  * @desc icon index.
  * Default:
  * @default
  *
  * @param ---Currency Four---
  * @desc
  *
  * @param Currency Four Name
  * @desc Name of the Currency
  * Default:
  * @default
  *
  * @param Currency Four Description
  * @desc Keep it short. Currency description
  * Default:
  * @default
  *
  * @param Currency Four Icon Index
  * @desc icon index.
  * Default:
  * @default
  *
  * @param ---Currency Five---
  * @desc
  *
  * @param Currency Five Name
  * @desc Name of the Currency
  * Default:
  * @default
  *
  * @param Currency Five Description
  * @desc Keep it short. Currency description
  * Default:
  * @default
  *
  * @param Currency Five Icon Index
  * @desc icon index.
  * Default:
  * @default
  *
  * @param ---Currency Six---
  * @desc
  *
  * @param Currency Six Name
  * @desc Name of the Currency
  * Default:
  * @default
  *
  * @param Currency Six Description
  * @desc Keep it short. Currency description
  * Default:
  * @default
  *
  * @param Currency Six Icon Index
  * @desc icon index.
  * Default:
  * @default
  *
  * @param ---Currency Seven---
  * @desc
  *
  * @param Currency Seven Name
  * @desc Name of the Currency
  * Default:
  * @default
  *
  * @param Currency Seven Description
  * @desc Keep it short. Currency description
  * Default:
  * @default
  *
  * @param Currency Seven Icon Index
  * @desc icon index.
  * Default:
  * @default
  *
  * @param ---Currency Eight---
  * @desc
  *
  * @param Currency Eight Name
  * @desc Name of the Currency
  * Default:
  * @default
  *
  * @param Currency Eight Description
  * @desc Keep it short. Currency description
  * Default:
  * @default
  *
  * @param Currency Eight Icon Index
  * @desc icon index.
  * Default:
  * @default
  *
  * @param ---Currency Nine---
  * @desc
  *
  * @param Currency Nine Name
  * @desc Name of the Currency
  * Default:
  * @default
  *
  * @param Currency Nine Description
  * @desc Keep it short. Currency description
  * Default:
  * @default
  *
  * @param Currency Nine Icon Index
  * @desc icon index.
  * Default:
  * @default
  *
  * @param ---Currency Ten---
  * @desc
  *
  * @param Currency Ten Name
  * @desc Name of the Currency
  * Default:
  * @default
  *
  * @param Currency Ten Description
  * @desc Keep it short. Currency description
  * Default:
  * @default
  *
  * @param Currency Ten Icon Index
  * @desc icon index.
  * Default:
  * @default
  *
  * @help
  *
  * Currencies can be used in game to buy items that require that specific
  * currency. For example maybe Demonic Armor needs 5 Demonic Runes. you
  * would create a currency called Demonic Runes, with a description of:
  * "Used to buy Demonic Armor" and then set an icon index.
  *
  * Descriptions must be kept SUPER SUPER short. Yes we do allow short codes
  * but no we do not do anything like word wrapping. Keep the concept of:
  *
  * Used to buy: x
  *
  * Currency Name must be present or we will not draw its information to
  * the list of currencies.
  *
  * === Note Tags - Enemies ===
  *
  * For Enemies:
  *
  * The following tags can be applied to enemies:
  *
  * <currencyToGain name:"Name", amount: 10, chance: 90>
  *
  * "Name"     - Currency Name, can have color short codes.
  * amount     - Can be either an interger or a string containing: "1 ~ x"
  *              the string of: "1~x" means random number between 1 and x.
  *              This value is determined on reward.
  * percentage - Optional integer. percentage of drop (see below).
  *
  * Percentage is optional, with out it, all currencies
  * have a 100% drop rate. doing:
  *
  * <currencyToGain name:"Demon Teeth", amount: "10 ~ 765", chance: 50>
  *
  * Means you have a 50% chance to get betwen 10 and 765 Demon Teeth.
  *
  * <currencyToGain name:"Demon Teeth", amount: 10>
  *
  * Means you have a 100% chance to get 10 Demon Teeth
  *
  * === Note Tags - Setting up a shop ===
  *
  * You have some currencies, via the battles or via the public API methods
  * below that can be called via events. Now how do you set up items
  * for the currency shop, which can be opened via the public api
  * methods below.
  *
  * Items, weapons and armors can have the following tag:
  *
  * <currencyShop belongsTo: "Sample Name" andCosts: 76>
  *
  * This states that the item belongs to the currency of "Sammple Name" and
  * it costs 76 of that currency.
  *
  * This same tag can be used on weapons and armor. When you call:
  *
  * FlareCurrencies.openShop("Sample Name")
  *
  * We will open a shop with ALL items, weapons and armors that
  * match that currency name.
  *
  * This tag adds belongsToCurrency and currencyCost to an item object.
  *
  * The way the shop is designed is such that if we cannot find a item
  * that matches your currency name you will get an empty shop.
  *
  * All items are fetched for you on game start up so that creating shops is
  * done super super fast.
  *
  * === Yanfly Vistory Aftermath ===
  *
  * To use this with Yanfly victory after math all you have to do is add:
  * currency to the Victory Order. For example: exp custom drops currency
  *
  * === Yanfly Menu Manager ===
  *
  * This script automatically works with Yanfly Menu manger.
  * You don't need to do anything sepcial.
  *
  * === Shop Compatability and Programming ===
  *
  * Shops are done such that they are backwards compatible and should work
  * with othr shop scripts.
  *
  * For programmers there is two new keys added to items:
  *
  * belongsToCurrency: "string"
  * currencyCost: int
  *
  * === For programmers: Currencies ===
  *
  * There is a base object you can access: flareCurrency
  *
  * This can be called and contains static methods. It is lower case because
  * it is meant to be "private". It contains the following API:
  *
  * store(currency) - Takes an array of objects, each contains the following
  * key/value: name, description, icon and amount. This store is read from
  * and wrote too.
  *
  * setStoreFromLoad(currency) - Same as store. This over rides the store.
  * this is sed for loading the game from a saved state.
  *
  * getCurrencyStore() - Returns an array of objects that is the store and
  * the time its called.
  *
  * Regarding Enemies:
  *
  * We add two new keys on to enemy objects.
  *
  * enemyCurrencyRewardData, which is an array of objects that holds information about each
  * currency associated with that enemy.
  *
  * gainCurrencyOnBattleWin, which is an array of objects containing name and a boolean value.
  * this is calculated and assigned to an enemy when the battle begins.
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
  * === Methods ===
  *
  * FlareCurrencies.addAmount(currencyName, currencyAmount)
  *
  * Method to add or subtract a specific amount from a
  * currency given the currency name.
  *
  * Example: FlareCurrencies.addAmount("Demon Teeth", 76);
  *
  * This will give you 76 Demon Teeth.
  *
  * Second Example: FlareCurrencies.addAmount("Demon Teeth", -99999);
  *
  * Because we do not have a limit on currencies, assume the user
  * has 10 Demon Teeth, this will make the count 0;
  *
  * FlareCurrencies.setAmountBasedOnVariableId("Currency Name", variableId)
  *
  * The idea here is that you would set a variable to have a set amount
  * then you would later on call this script that sets the specvified
  * currency to have the amount in the variable.
  *
  * FlareCurrencies.openShop("Currency Name", purchaseOnly)
  *
  * Opens a currency shop based on the currency name. We will gather
  * all the items that have the currencyShop tag attached to them, determine
  * there price and so on.
  *
  * Purchase only can be true/false or not even passed in (default false).
  * Purcahse only works the way you think it would, you cannot sell.
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
  static addAmount(currencyName, currencyAmount) {
    var filteredArray = lodashFilter(flareCurrency.getCurrencyStore(), function(currency) {
      return currency.name && currency.icon && currency.description;
    });

    if (filteredArray.length === 0) {
      throw new Error('There are no currencies fully defined');
    }

    var currencies = flareCurrency.getCurrencyStore();

    var self = this;

    var currencyObject = lodashFind(currencies, function(currency){
      if (currency.name.indexOf(currencyName) !== -1 ||
          currencyName.indexOf(currency.name) !== -1 ) {

        return currency;
      }
    });

    if (currencyObject === undefined) {
      throw new Error('Currency not found. Tried looking for: ' + currencyName + ' is the spelling right?')
    }

    this._addAmount(currencyObject, parseInt(currencyAmount))
  }

  /**
   * Set currency amount based off variable id.
   *
   * @param String currencyName
   * @param int variableId
   */
  static setAmountBasedOnVariableId(currencyName, variableId) {
    var filteredArray = lodashFilter(flareCurrency.getCurrencyStore(), function(currency) {
      return currency.name && currency.icon && currency.description;
    });

    if (filteredArray.length === 0) {
      throw new Error('There are no currencies fully defined');
    }

    this.addAmount(currencyName, $gameVariables.value(parseInt(variableId)));
  }

  /**
   * Opens a currency shop.
   *
   * @param string currency
   * @param boolean purchaseOnly
   */
  static openShop(currency, purchaseOnly) {
    var filteredArray = lodashFilter(flareCurrency.getCurrencyStore(), function(currency) {
      return currency.name && currency.icon && currency.description;
    });

    if (filteredArray.length === 0) {
      throw new Error('There are no currencies fully defined');
    }

    if (purchaseOnly === undefined) {
      purchaseOnly = false;
    }

    var currencyShop = new CurrencyShop();
    currencyShop.openShopWindow(currency, purchaseOnly);
  }

  static getCurrentCurrencyAmount(currencyName) {
    var filteredArray = lodashFilter(flareCurrency.getCurrencyStore(), function(currency) {
      return currency.name && currency.icon && currency.description;
    });

    if (filteredArray.length === 0) {
      throw new Error('There are no currencies fully defined');
    }

    var currencies = flareCurrency.getCurrencyStore();
    var self       = this;

    var currencyObject = lodashFind(currencies, function(currency){
      if (currency.name.indexOf(currencyName) !== -1 ||
          currencyName.indexOf(currency.name) !== -1 ) {

        return currency;
      }
    });

    return currencyObject.amount;
  }

  /**
   * Private method: sets Currency.
   *
   * @param Object Currency
   * @param Int CurrencyAmount
   */
  static _addAmount(currency, currencyAmount) {
    currency.amount += currencyAmount;

    if (currency.amount < 0) {
      currency.amount = 0;
    }
  }
}

// Create public API.
window.FlareCurrencies = FlareCurrencies;
window._baseYForText = 0;
