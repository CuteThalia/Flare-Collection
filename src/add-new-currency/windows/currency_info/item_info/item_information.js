/**
 * @namespace FlareCurrency
 */

import FlareWindowBase          from '../../../../lib/windows/flare_window_base';
import StoreCurrencyItemInfo    from '../helper/store_currency_item_info';
import wordWrap                 from 'underscore.string/wrap';
import lodashIsUndefined        from 'lodash/lang/isUndefined';
import MapHasCureencyShop       from '../helper/map_has_currency_shop';
import {extractAllOfType}       from 'rmmv-mrp-core/option-parser';
import TextHandler              from '../../../currencies/text_handler';

/**
 * @namespace FlareCurrency
 */

/**
 * Create a window to display item information thats associated to x currency.
 */
class ItemInformation extends FlareWindowBase {

  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    var width = (Graphics.boxWidth / 2) + 70;
    var height = Graphics.boxHeight;

    super.initialize(width - 140, 0, width, height);
  }

  refresh(index) {
    this.contents.clear();
    this.drawItemInformation(index)
  }

  getCountOfShopsSellingThisCurrency() {
    var mapEvents = $dataMap.events;

    var doesMapHaveCurrencyShop = new MapHasCureencyShop(mapEvents);
    return doesMapHaveCurrencyShop.doesMapHaveCurrencyShop();
  }

  drawItemInformation(index) {
    this.contents.fontSize         = 18;
    var itemInformation            = StoreCurrencyItemInfo.getCurrencyItemArray()[index];
    var itemInformationDescription = itemInformation.description.replace(/\\\\/g, "\\\\\\");

    var content      = wordWrap(itemInformationDescription, {width: 48});
    var IsMapSelling = this.getCountOfShopsSellingThisCurrency();

    this.drawIcon(itemInformation.itemIcon, 10, 20);
    this.drawText(itemInformation.itemName, 60, 20);
    this.drawText(TextHandler.getText().areSellingFor + ' ' + itemInformation.currencyCost, 10, 80);

    if (IsMapSelling) {
      this.flareDrawTextEx(TextHandler.getText().currencyShopsSelling.replace(/\\/g, "\\\\\\") + ' ', 10, 100);
    }

    this.flareDrawTextEx(content, 10, 140);
    this.resetFontSettings();
  }
}

module.exports = ItemInformation;
