/**
 * @namespace FlareCurrency
 */

/**
 * Determine if any item, weapon or armor has a currency name
 */
class CurrencyExists {

  /**
   * @param String currencyName
   */
  constructor(currencyName) {
    this._currencyName = currencyName;
  }

  /**
   * Do we have any items for the currency?
   *
   * Walk over every items, armor and or weapon as on of those
   * might have a belongsTo this._currencyName. If this is true, instantly
   * return true.
   *
   * @return boolean
   */
  doesMapHaveItems() {
    for (var i = 1; i < $dataItems.length; i++) {
      if ($dataItems[i] !== null) {
        if ($dataItems[i].belongsToCurrency === this._currencyName) {
          return true;
        }
      }
    }

    for (var i = 1; i < $dataWeapons.length; i++) {
      if ($dataWeapons[i] !== null) {
        if ($dataWeapons[i].belongsToCurrency === this._currencyName) {
          return true;
        }
      }
    }

    for (var i = 1; i < $dataArmors.length; i++) {
      if ($dataArmors[i] !== null) {
        if ($dataArmors[i].belongsToCurrency === this._currencyName) {
          return true;
        }
      }
    }

    return false;
  }
}

module.exports = CurrencyExists;
