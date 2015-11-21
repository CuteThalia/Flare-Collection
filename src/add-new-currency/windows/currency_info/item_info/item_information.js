var FlareWindowSelectable    = require('../../../../flare_window_selectable');
var StoreCurrencyItemInfo    = require('../helper/store_currency_item_info');
var wordWrap                 = require('../../../../../node_modules/underscore.string/wrap');
var lodashIsUndefined        = require('../../../../../node_modules/lodash/lang/isUndefined');
var MapHasCureencyShop       = require('../helper/map_has_currency_shop');
var extractAllOfType         = require('rmmv-mrp-core/option-parser').extractAllOfType;

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

  getCountOfShopsSellingThisCurrency() {
    var mapEvents     = $dataMap.events;

    var doesMapHaveCurrencyShop = new MapHasCureencyShop(mapEvents);
    return doesMapHaveCurrencyShop.doesMapHaveCurrencyShop();
  }

  getCustomDescription(itemInfo) {
    var description = false;

    switch(itemInfo.type) {
      case 'item':
        $dataItems.forEach(function(item){
          if (item !== null && item.id === itemInfo.itemId && !lodashIsUndefined(itemCustomDescriptionTag[0])) {
            var itemCustomDescriptionTag = extractAllOfType(item.note, 'currencyItem');
            description = itemCustomDescriptionTag[0].description;
          }
        });
        break;
      case 'weapon':
        $dataWeapons.forEach(function(weapon){
          if (weapon !== null && weapon.id === itemInfo.itemId && !lodashIsUndefined(itemCustomDescriptionTag[0])) {
            var itemCustomDescriptionTag = extractAllOfType(weapon.note, 'currencyItem');
            description = itemCustomDescriptionTag[0].description;
          }
        });
        break;
      case 'armor':
        $dataArmors.forEach(function(armor){
          if (armor !== null && armor.id === itemInfo.itemId && !lodashIsUndefined(itemCustomDescriptionTag[0])) {
            var itemCustomDescriptionTag = extractAllOfType(armor.note, 'currencyItem');
            description = itemCustomDescriptionTag[0].description;
          }
        });
        break;
    }

    if (description !== false) {
      description = description.replace(/\\\\/g, "\\\\\\");
      description = wordWrap(description, {width: 48});
      return description
    } else {
      return false;
    }
  }

  drawItemInformation(index) {
    this.contents.fontSize  = 18;

    var itemInformation     = StoreCurrencyItemInfo.getCurrencyItemArray()[index];
    itemInformation         = itemInformation.replace(/\\\\/g, "\\\\\\");

    var content             = wordWrap(itemInformation.description, {width: 48});
    var IsMapSelling        = this.getCountOfShopsSellingThisCurrency();
    var customDescription   = this.getCustomDescription(itemInformation);

    this.drawIcon(itemInformation.itemIcon, 10, 20);
    this.flareDrawTextEx(itemInformation.itemName, 60, 20);
    this.flareDrawTextEx('- Shops are selling for: ' + itemInformation.currencyCost, 10, 80);

    if (IsMapSelling) {
      this.flareDrawTextEx('- There is a \\c[14]currency shop\\c[0] selling this item.', 10, 100);
    }

    if (customDescription !== false) {
      this.flareDrawTextEx(customDescription, 10, 140);
    } else {
      this.flareDrawTextEx(content, 10, 140);
    }

    this.resetFontSettings();
  }
}

module.exports = ItemInformation;
