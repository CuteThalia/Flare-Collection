class StoreCurrentCurrencyName {

  static setName(name) {
    this._name = name;
  }

  static getName() {
    return this._name;
  }
}

module.exports = StoreCurrentCurrencyName;
