/**
 * @namespace FlareCurrency
 */

/**
 * Currency Object Creation Class
 *
 * Responsible for creating the currencie objects and storing
 * them in a currency store that can then be fetched and manipulated
 * through out the game.
 */
class Currency {

  constructor() {
    this._currencyStore;
  }

  /**
   * Stores the currency into the currency store array.
   *
   * @param currency - object
   */
   store(currency) {
    this._currencyStore = [
        {
          name:         currency["Currency One Name"],
          description:  currency["Currency One Description"],
          icon:         currency["Currency One Icon Index"],
          amount:       0
        },
        {
          name:         currency["Currency Two Name"],
          description:  currency["Currency Two Description"],
          icon:         currency["Currency Two Icon Index"],
          amount:       0
        },
        {
          name:         currency["Currency Three Name"],
          description:  currency["Currency Three Description"],
          icon:         currency["Currency Three Icon Index"],
          amount:       0
        },
        {
          name:         currency["Currency Four Name"],
          description:  currency["Currency Four Description"],
          icon:         currency["Currency Four Icon Index"],
          amount:       0
        },
        {
          name:         currency["Currency Five Name"],
          description:  currency["Currency Five Description"],
          icon:         currency["Currency Five Icon Index"],
          amount:       0
        },
        {
          name:         currency["Currency Six Name"],
          description:  currency["Currency Six Description"],
          icon:         currency["Currency Six Icon Index"],
          amount:       0
        },
        {
          name:         currency["Currency Seven Name"],
          description:  currency["Currency Seven Description"],
          icon:         currency["Currency Seven Icon Index"],
          amount:       0
        },
        {
          name:         currency["Currency Eight Name"],
          description:  currency["Currency Eight Description"],
          icon:         currency["Currency Eight Icon Index"],
          amount:       0
        },
        {
          name:         currency["Currency Nine Name"],
          description:  currency["Currency Nine Description"],
          icon:         currency["Currency Nine Icon Index"],
          amount:       0
        },
        {
          name:         currency["Currency Ten Name"],
          description:  currency["Currency Ten Description"],
          icon:         currency["Currency Ten Icon Index"],
          amount:       0
        },
      ];
  }

  /**
   * Sets the store from the saved game.
   *
   * Saved games will have a contents.currencies in them.
   * Over ride what evers in this._store with the store from the
   * contents.currencies.
   *
   * @param Array store
   */
  setStoreFromLoad(store) {
    this._currencyStore = store;
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
