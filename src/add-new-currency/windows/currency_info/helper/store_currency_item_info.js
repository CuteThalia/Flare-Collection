/**
 * @namespace FlareCurrency
 */

/**
 * Store basic information about the item belonging to said currency.
 *
 * Each currency has a set of items, when a window is selected for that
 * currency, we create an array of basic item information for that
 * currency.
 *
 * This information is then used when a user selects an item to read more info
 * about it.
 */
class StoreCurrencyItemInfo {

  /**
   * Stores an array of items for a currency.
   *
   * @param array
   */
  static storeCurrencyItemInformation(arrayOfItemsForCurrency) {
    this._arrayOfItemsForCurrencies = arrayOfItemsForCurrency;
  }

  /**
   * Gets the item list.
   *
   * @return undefined or array
   */
  static getCurrencyItemArray() {
    return this._arrayOfItemsForCurrencies;
  }
}

module.exports = StoreCurrencyItemInfo;
