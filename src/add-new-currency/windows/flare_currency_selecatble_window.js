var FlareWindowSelectable = require('../../flare_window_selectable');
var SceneWindowContainer  = require('../scenes/scene_window_container');
var FlareMoreInfoScene    = require('../scenes/flare_currency_information_extended_scene');
var StoreCurrencyName     = require('./currency_info/helper/store_current_currency_name');

class FlareCurrencies extends FlareWindowSelectable {

  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    var width  = (Graphics.boxWidth / 2) - 70;
    var height = Graphics.boxHeight;
    this._currenciesForWindow = [];
    this._count = 0;

    this.getCurrencies();

    super.initialize(0, 0, width, height);

    this.selectFirstItem();
    this.refresh();
  }

  getCurrencies() {
    for (var i = 0; i < flareCurrency.getCurrencyStore().length; i++) {
      if (flareCurrency.getCurrencyStore()[i].name !== '') {
        this._currenciesForWindow.push(flareCurrency.getCurrencyStore()[i]);
      }
    }
  }

  update() {
    super.update(this);
    if (Input.isTriggered("ok")) {
      SceneWindowContainer.getWindowFromContainer('flare-currency-info').windowObject.open(this._currenciesForWindow[this.index()]);

      this._count += 1

      if (this._count === 2) {
        StoreCurrencyName.setName(this._currenciesForWindow[this.index()].name);
        SceneManager.push(FlareMoreInfoScene);
        this.count = 0;
      }
    }
  }

  selectFirstItem() {
    return this.select(0);
  }

  isCursorMovable() {
    return true;
  }

  maxItems() {
    return this._currenciesForWindow.length;
  }

  itemHeight() {
    return 80;
  }

  currency() {
    var index = this.index();
    return this._currenciesForWindow[index]
  }

  isCurrentItemEnabled() {
    return this.isEnabled(this.currency());
  }

  drawItem(index) {
    var currency = this._currenciesForWindow[index];

    if (!currency) {
      return;
    }

    this.drawCurrencyToScreen(currency, index);
  }

  drawCurrencyToScreen(currency, index) {
    var rectangle = this.itemRect(index);
    this.contents.fontSize = 18;
    this.drawIcon(currency.icon, 10, rectangle.y + 20 );
    this.flareDrawTextEx(currency.name, 60, rectangle.y + 10);
    this.flareDrawTextEx('Currently Have: ' + currency.amount, 60, rectangle.y + 32, 250, 'left');
    this.resetFontSettings();
  }
}

module.exports = FlareCurrencies;
