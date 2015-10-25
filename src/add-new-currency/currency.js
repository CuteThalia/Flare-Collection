/**
 * Currency Object Creation Class
 *
 * Responsible for creating the currencie objects and storing
 * them in a currency store that can then be fetched and manipulated
 * through out the game.
 */
class Currency {

  constructor() {
    this._currencyStore = []
  }

  /**
   * Stores the currency into the currency store array.
   *
   * @param currency - object
   */
  store(currency) {

    for (var key in currency) {
      if (currency.hasOwnProperty(key) && currency[key] !== "") {

        var currencyObject = JSON.parse(currency[key]);
        this.currencyValidator(currencyObject);

        this._currencyStore.push(currencyObject);
      }
    }
  }

  /**
   * Validates the json to make sure we have all the parts we need.
   *
   * @param curencyJson - JSON
   */
  currencyValidator(currencyJson) {
    if (!currencyJson.hasOwnProperty('name')) {
      throw 'Missing name for currency object.';
    }

    if (!currencyJson.hasOwnProperty('description')) {
      throw 'Missing description for currency object.';
    }

    if (!currencyJson.hasOwnProperty('icon')) {
      throw 'Missing icon for currency object.';
    }
  }

  /**
   * Get the currency store.
   *
   * @return Array of Objects
   */
  getCurrencyStore() {
    return this._currencyStore;
  }

};

module.exports = Currency;
