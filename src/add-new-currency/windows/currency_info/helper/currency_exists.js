class CurrencyExists {

  constructor(currencyName) {
    this._currencyName = currencyName;
  }

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
