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
   * Set the amount currency.
   *
   * This is good if you want to store the current amount of the currency
   * based on the current amount.
   *
   * @param int amount
   */
  static setCurrentAmountOfCurrency(amount) {
    this._currencyAmount = amount;
  }

  /**
   * Get the currentamount stored.
   *
   * @return int or undefined
   */
  static getAmount() {
    return this._currencyAmount;
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
