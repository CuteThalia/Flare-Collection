var FlareError = require('../flare_error.js');

/**
 * Currency Object Creation Class
 *
 * Responsible for creating the currencie objects and storing
 * them in a currency store that can then be fetched and manipulated
 * through out the game.
 */
class Currency {

  constructor() {
    this._currencyStore = [];
  }

  /**
   * Stores the currency into the currency store array.
   *
   * @param currency - object
   */
  store(currency) {
    for (var key in currency) {
      if (currency.hasOwnProperty(key) && currency[key] !== "") {
        if (Object.keys(JSON.parse(currency[key])).length > 0) {
          var currencyObject = JSON.parse(currency[key]);
          this.currencyValidator(currencyObject);

          this._currencyStore.push(currencyObject);
        }
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
      FlareError.error('Currency must have a name attribute in the json.');
    }

    if (!currencyJson.hasOwnProperty('description')) {
      FlareError.error('Currency must have a description attribute in the json.');
    }

    if (!currencyJson.hasOwnProperty('icon')) {
      FlareError.error('Currency must have a icon attribute in the json.');
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
