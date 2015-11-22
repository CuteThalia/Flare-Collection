var lodashFindIndex = require('lodash/array/findIndex');

/**
 * Responsible for gathering all the items related to a currency.
 *
 * All items have a belongsToCurrency field on them, we check the currency
 * that the user wants to create a shop for and gather all the items
 * for that shop.
 */
class CurrencyShop {

  constructor() {
    this._goods = [];
  }

  /**
   * Open the shop window.
   *
   * Populate with items based off currency name.
   *
   * @param string currency
   * @param boolean purchaseOnly
   */
  openShopWindow(currency, purchaseOnly) {
    _currencyShopInfo.currency_name = currency;
    this._createShopGoods(currency);
    SceneManager.push(Scene_Shop);
    SceneManager.prepareNextScene(this._goods, purchaseOnly);
  }

  /**
   * Creates the actual goods for the shop based off curency name.
   *
   * @param string currency
   */
  _createShopGoods(currency) {
    var itemsArray   = $dataItems;
    var weaponsArray = $dataWeapons;
    var armorsArray   = $dataArmors;

    this.processItemsArray(itemsArray, currency);
    this.processWeaponsArray(weaponsArray, currency);
    this.processArmorsArray(armorsArray, currency);
  }

  /**
   * Stores items in a goods array.
   *
   * @param array itemsArray
   * @param string currency
   */
  processItemsArray(itemsArray, currency) {
    for (var i = 0; i < itemsArray.length; i++) {
      if (itemsArray[i] !== null && itemsArray[i].belongsToCurrency === currency) {

        if (i <= 2000) {
          var item = [0, itemsArray[i].id];
        }

        var found = lodashFindIndex(this._goods, function(goodsItem){
          goodsItem.join(',') === item.join(',');
        })

        if (found === -1) {
          this._goods.push(item);
        }
      }
    }
  }

  /**
   * Stores weapons in a goods array.
   *
   * @param array weaponsArray
   * @param string currency
   */
  processWeaponsArray(weaponsArray, currency) {
    for (var i = 0; i < weaponsArray.length; i++) {
      if (weaponsArray[i] !== null && weaponsArray[i].belongsToCurrency === currency) {

        if (i <= 2000) {
          var weapon = [1, weaponsArray[i].id];

          var found = lodashFindIndex(this._goods, function(goodsItem){
            return goodsItem.join(',') === weapon.join(',');
          })

          if (found === -1) {
            this._goods.push(weapon);
          }
        }
      }
    }
  }

  /**
   * Stores armos in a goods array.
   *
   * @param array armorsArray
   * @param string currency
   */
  processArmorsArray(armorArray, currency) {
    for (var i = 0; i < armorArray.length; i++) {
      if (armorArray[i] !== null && armorArray[i].belongsToCurrency === currency) {

        if (i <= 2000) {
          var armor = [2, armorArray[i].id];
        }

        var found = lodashFindIndex(this._goods, function(goodsItem){
          return goodsItem.join(',') === armor.join(',');
        })

        if (found === -1) {
          this._goods.push(armor);
        }
      }
    }
  }
}

module.exports = CurrencyShop;

// private global method for storing currency currency shop info
window._currencyShopInfo = {currency_name: null};
