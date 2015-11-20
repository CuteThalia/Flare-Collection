var FlareWindowSelectable    = require('../../../../flare_window_selectable');
var StoreCurrencyItemInfo    = require('../helper/store_currency_item_info');
var wordWrap                 = require('../../../../../node_modules/underscore.string/wrap')

class ItemInformation extends FlareWindowSelectable {

  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    var width = (Graphics.boxWidth / 2) + 70;
    var height = Graphics.boxHeight;

    super.initialize(width - 140, 0, width, height);
    this.opacity = 0;
  }

  open(index) {
    this.opacity = 255;
    this.refresh(index);
  }

  close() {
    this.opacity = 0;
  }

  refresh(index) {
    this.contents.clear();
    this.drawItemInformation(index)
  }

  drawItemInformation(index) {
    this.contents.fontSize = 18;
    var itemInformation = StoreCurrencyItemInfo.getCurrencyItemArray()[index];
    var content = wordWrap(itemInformation.description, {width: 48});

    var helpText = '\\\c[18]Hit Enter to see what regions in the world sell this item.\\\c[0]';
    helpText = wordWrap(helpText, {width: 48});

    this.drawIcon(itemInformation.itemIcon, 10, 20);
    this.flareDrawTextEx(itemInformation.itemName, 60, 20);
    this.flareDrawTextEx('Shops are selling for: ' + itemInformation.currencyCost, 10, 60);
    this.flareDrawTextEx(content, 10, 110);

    this.flareDrawTextEx('\\c[2]---------------------------------\\c[0]', 0, Graphics.boxHeight - 150);
    this.flareDrawTextEx(helpText, 0, Graphics.boxHeight - 100);

    this.resetFontSettings();
  }
}

module.exports = ItemInformation;
