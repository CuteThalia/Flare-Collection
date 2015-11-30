/**
 * @namespace FlareCurrency
 */

import FlareWindowBase from '../../../flare_window_base';
import wordWrap        from 'underscore.string/wrap';
import TextHandler     from '../../currencies/currency';

/**
 * Displays infoirmation about said currency.
 */
class CurrencyDetails extends FlareWindowBase {

  constructor() {
    super();
  }

  initialize() {
    var width = (Graphics.boxWidth / 2) + 70;
    var height = Graphics.boxHeight;

    super.initialize(width - 140, 0, width, height);
  }

  refresh(currencyObject) {
    this.contents.clear();
    this.drawCurrencyInfo(currencyObject);
  }

  drawCurrencyInfo(currencyInfo) {
    this.contents.fontSize = 18
    var contents = currencyInfo.description.replace(/\\/g, '\\\\\\');
    contents = wordWrap(contents, {width: 48});

    this.flareDrawTextEx(contents, 0, 0);

    var helpText = TextHandler.getText().helpText;
    helpText = wordWrap(helpText, {width: 48});

    this.flareDrawTextEx('\\c[2]---------------------------------\\c[0]', 0, Graphics.boxHeight - 150);
    this.flareDrawTextEx(helpText, 0, Graphics.boxHeight - 100);

    this.resetFontSettings();
  }
}

module.exports = CurrencyDetails;
