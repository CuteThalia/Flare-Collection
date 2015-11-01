/**
 * @namespace FlareCurrency
 */

var Currency = require('../currencies/currency');
var FlareWindowBase = require('../../flare_window_base');

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
    super.initialize(this.tryAndCenter(), this.tryAndCenter() - 190, this.windowWidth(), this.windowHeight());
  }

  tryAndCenter() {
    return (Graphics.boxWidth / 2) / 2;
  }

  windowWidth() {
    return Graphics.boxWidth / 2;
  }

  windowHeight() {
    return Graphics.boxWidth / 2 + 190;
  }

  refresh() {
    this.contents.clear();

    this.drawText('Currencies', 10, 10, 100, 'center');

    var currencies = window.flareCurrency.getCurrencyStore();

    this.drawFlareCurrencies(currencies);
    this.resetFontSettings();
  }

  drawFlareCurrencies(currencies) {
    var baseYForText       = 70; // the y variable for drawText and drawIcon.
    this.contents.fontSize = 20;

    var self = this;
    currencies.map(function(currency){
      if (typeof currency === 'object') {

        self.drawIcon(currency.icon, 10, baseYForText );
        self.flareDrawTextEx(currency.name, 60, baseYForText - 10);
        self.flareDrawTextEx(currency.description, 60, baseYForText + 15);
        self.flareDrawTextEx('Currently Have: ' + currency.amount, 60, baseYForText + 42, 250, 'left');

        baseYForText += 100;
      }
    });
  }
}

module.exports = FlareCurrencyWindow;
