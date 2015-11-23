/**
 * @namespace FlareCurrency
 */

/**
 * Used to store currency information for shops.
 */
class CurrencyShopInfoContainer {

  /**
   * Set the currency to the container.
   *
   * @param Object currency
   */
  static setCurrency(currency) {
    this._currencyShopInfo = currency;
  }

  /**
   * Get the currency information back.
   *
   * @return Object currency
   */
  static getCurrency() {
    return this._currencyShopInfo
  }

  /**
   * Empty the container.
   */
  static emptyContainer() {
    this._currencyShopInfo = null;
  }
}

module.exports = CurrencyShopInfoContainer;
