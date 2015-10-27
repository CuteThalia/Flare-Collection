var Currency = require('../currency.js');
var FlareWindowBase = require('../../flare_window_base.js');

/**
 * Create the currency window.
 *
 * Create a window that is the size of the entire game box.
 * This window displays all the currencies a party has.
 *
 * Currencies not stored here is gold.
 */
class FlareCurrencyWindow extends FlareWindowBase {
  constructor() {
    super();
    this.initialize();
    this.refresh();
  }

  initialize() {
    super.initialize(this.tryAndCenter(), this.tryAndCenter() - 120, this.windowWidth(), this.windowHeight());
  }

  tryAndCenter() {
    return (Graphics.boxWidth / 2) / 2;
  }

  windowWidth() {
    return Graphics.boxWidth / 2;
  }

  windowHeight() {
    return Graphics.boxWidth / 2 + 50;
  }

  refresh() {
    this.drawText('Currencies', 10, 10, 100, 'center');

    var currencies = window.flareCurrency.getCurrencyStore();
    this.contents.fontSize = 16;

    var baseYForText = 70; // the y variable for drawText and drawIcon.
    var textState = {};

    var self = this;
    currencies.map(function(currency){
      if (typeof currency === 'object') {

        self.drawIcon(currency.icon, 10, baseYForText );
        self.printCurrencyName(currency.name, baseYForText);
        self.drawText(currency.description, 60, baseYForText + 10, self.textWidth(currency.description), 'left');
        self.drawText('Currently Have: ' + currency.amount, 60, baseYForText + 30, 250, 'left');

        baseYForText += 70;
      }
    });
  }

  printCurrencyName(currencyName, baseYForText) {
    var textState = {}
    var colorCode = 0;

    textState.text = currencyName;
    var currencyName = this.convertEscapeCharacters(currencyName);
    var colorCode = this.obtainEscapeParam(currencyName);
    console.log(colorCode);
    this.changeTextColor(colorCode);

    this.drawText(currencyName, 60, baseYForText - 10, this.textWidth(currencyName), 'left');
    this.resetTextColor();
  }

}

module.exports = FlareCurrencyWindow;
