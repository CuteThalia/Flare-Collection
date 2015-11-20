class StoreCurrencyItemInfo {

  static storeCurrencyItemInformation(arrayOfItemsForCurrency) {
    this._arrayOfItemsForCurrencies = arrayOfItemsForCurrency;
  }

  static getCurrencyItemArray() {
    return this._arrayOfItemsForCurrencies;
  }
}

module.exports = StoreCurrencyItemInfo;
