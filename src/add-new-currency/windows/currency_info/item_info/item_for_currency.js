/**
 * @namespace FlareCurrency
 */

import FlareWindowSelectable     from '../../../../flare_window_selectable';
import StoreCurrentCurrencyName  from '../helper/store_current_currency_name';
import lodashFind                from 'lodash/collection/find';
import lodashArrayUnique         from 'lodash/array/uniq';
import lodashClone               from 'lodash/lang/clone';
import StoreCurrencyItemInfo     from '../helper/store_currency_item_info';
import SceneWindowContainer      from '../../../../scene_window_container';


/**
 * Creates a selectable window to display items for currency.
 */
class ItemForCurrency extends FlareWindowSelectable {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    var width  = (Graphics.boxWidth / 2) - 70;
    var height = Graphics.boxHeight;

    this._listOfItems = [];
    this.getListOfItems();

    super.initialize(0, 0, width, height);

    StoreCurrencyItemInfo.storeCurrencyItemInformation(this._listOfItems);

    this.refresh();
  }

  getListOfItems() {

    $dataItems.slice(0, 2999);
    $dataWeapons.slice(0, 2999);
    $dataArmors.slice(0, 2999);

    for (var i = 0; i < $dataItems.length; i++) {
      if ($dataItems[i] !== null &&
          $dataItems[i].belongsToCurrency === StoreCurrentCurrencyName.getName() &&
          i <= 2999
          ) {

        this._listOfItems.push({
          currencyCost:   $dataItems[i].currencyCost,
          itemName:       $dataItems[i].name,
          itemIcon:       $dataItems[i].iconIndex,
          description:    $dataItems[i].description
        });
      }
    }

    for (var i = 0; i < $dataWeapons.length; i++) {
      if ($dataWeapons[i] !== null &&
          $dataWeapons[i].belongsToCurrency === StoreCurrentCurrencyName.getName() &&
          i <= 2999
          ) {

        this._listOfItems.push({
          currencyCost:   $dataWeapons[i].currencyCost,
          itemName:       $dataWeapons[i].name,
          itemIcon:       $dataWeapons[i].iconIndex,
          description:    $dataWeapons[i].description
        });
      }
    }

    for (var i = 0; i < $dataArmors.length; i++) {
      if ($dataArmors[i] !== null &&
          $dataArmors[i].belongsToCurrency === StoreCurrentCurrencyName.getName() &&
          i <= 2999
          ) {

        this._listOfItems.push({
          type:           'armor',
          itemId:         $dataArmors[i].id,
          currencyCost:   $dataArmors[i].currencyCost,
          itemName:       $dataArmors[i].name,
          itemIcon:       $dataArmors[i].iconIndex,
          description:    $dataArmors[i].description
        });
      }
    }
  }

  cursorDown() {
    super.cursorDown(this);
    SceneWindowContainer.getWindowFromContainer('flare-item-info').windowObject.refresh(this.index());
  }

  cursorUp() {
    super.cursorUp(this);
    SceneWindowContainer.getWindowFromContainer('flare-item-info').windowObject.refresh(this.index());
  }

  isCursorMovable() {
    return true;
  }

  maxItems() {
    return this._listOfItems.length;
  }

  itemHeight() {
    return 80;
  }

  currentItem() {
    var index = this.index();
    return this._listOfItems[index]
  }

  isCurrentItemEnabled() {
    return this.isEnabled(this.currentItem());
  }

  drawItem(index) {
    var item = this._listOfItems[index];

    if (!item) {
      return;
    }

    this.drawCurrencyItemToScreen(item, index);
  }

  drawCurrencyItemToScreen(item, index) {
    var rectangle = this.itemRect(index);
    this.contents.fontSize = 18;
    this.drawIcon(item.itemIcon, 10, rectangle.y + 20 );
    this.flareDrawTextEx(item.itemName, 60, rectangle.y + 10);
    this.flareDrawTextEx('Shops Sell For: ' + item.currencyCost, 60, rectangle.y + 32, 250, 'left');
    this.resetFontSettings();
  }
}

module.exports = ItemForCurrency;
