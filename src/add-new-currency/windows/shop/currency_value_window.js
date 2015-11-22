var lodashFind = require('lodash/collection/find')

/**
 * Creates a currency window for the currency shop
 */
class CurrencyValueWindow extends Window_Base {

  constructor(currencyName) {
    super(currencyName);
    this.initialize(currencyName);
  }

  initialize(currencyName) {

    super.initialize(0, 108, 204, 72);
    this._currencyObject =  this.setCurrencyObject(currencyName);
    this.refresh()
  }

  refresh() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.drawCurrencyInfo(this.value(), this.currencyIcon(), x, 0, width);
  }

  value() {
      return this._currencyObject.amount;
  };

  currencyIcon() {
      return this._currencyObject.icon;
  };

  setCurrencyObject(currencyName) {
    var foundCurrency = lodashFind(flareCurrency.getCurrencyStore(), function(currencyObject) {
      if (currencyObject.name.indexOf(currencyName) !== -1 ||
          currencyName.indexOf(currencyObject.name) !== -1 ) {
            return currencyObject;
          }
    });

    if (foundCurrency === undefined) {
      throw new Error('We failed to find any currency by the name of: ' + currencyName);
    }

    return foundCurrency;
  }

  drawCurrencyInfo(value, unit, x, y, width) {
      var unitWidth = Math.min(80, this.textWidth(unit));
      this.resetTextColor();
      this.drawText(value, x, y, width - unitWidth - 6, 'left');
      this.changeTextColor(this.systemColor());
      this.drawIcon(unit, x + width - unitWidth, y);
  }

}

module.exports = CurrencyValueWindow;
