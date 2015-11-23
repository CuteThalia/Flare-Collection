/**
 * @namespace FlareCurrency
 */

/**
 * Store the currency name
 *
 * Basic helper class that helps to store the current currency name.
 */
class StoreCurrentCurrencyName {

  /**
   * Set the name.
   *
   * @param string name
   */
  static setName(name) {
    this._name = name;
  }

  /**
   * Get the name.
   *
   * @return string name or undefined
   */
  static getName() {
    return this._name;
  }
}

module.exports = StoreCurrentCurrencyName;
