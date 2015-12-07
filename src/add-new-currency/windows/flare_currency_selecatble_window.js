/**
 * @namespace FlareCurrency
 */


import FlareWindowSelectable from '../../lib/windows/flare_window_selectable';
import SceneWindowContainer  from '../../lib/containers/scene/window/scene_window_container';
import FlareMoreInfoScene    from '../scenes/flare_currency_information_extended_scene';
import StoreCurrencyName     from './currency_info/helper/store_current_currency_name';
import CurrencyExists        from './currency_info/helper/currency_exists';
import TextHandler           from '../currencies/text_handler';

/**
 * Currencie window. Lets you select a currency.
 */
class FlareCurrencies extends FlareWindowSelectable {

  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    var width  = (Graphics.boxWidth / 2) - 70;
    var height = Graphics.boxHeight;
    this._currenciesForWindow = [];

    this.getCurrencies();

    super.initialize(0, 0, width, height);
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

    if (Input.isTriggered("ok") &&
        this._currenciesForWindow[this.index()] !== undefined
       ) {

      var currencyExists = new CurrencyExists(this._currenciesForWindow[this.index()].name);

      if (currencyExists.doesMapHaveItems()) {
        StoreCurrencyName.setName(this._currenciesForWindow[this.index()].name);
        SceneManager.push(FlareMoreInfoScene);
      }
    }
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

  cursorDown() {
    super.cursorDown(this);
    SceneWindowContainer.getWindowFromContainer('flare-currency-info').windowObject.refresh(this._currenciesForWindow[this.index()]);
  }

  cursorUp() {
    super.cursorUp(this);
    SceneWindowContainer.getWindowFromContainer('flare-currency-info').windowObject.refresh(this._currenciesForWindow[this.index()]);
  }

  drawCurrencyToScreen(currency, index) {
    var rectangle = this.itemRect(index);
    this.contents.fontSize = 18;
    this.drawIcon(currency.icon, 10, rectangle.y + 20 );
    this.flareDrawTextEx(currency.name, 60, rectangle.y + 10);
    this.flareDrawTextEx(TextHandler.getText().currentlyHave + ' ' + currency.amount, 60, rectangle.y + 32, 250, 'left');
    this.resetFontSettings();
  }
}

module.exports = FlareCurrencies;
