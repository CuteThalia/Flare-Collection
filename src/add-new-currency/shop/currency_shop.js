var lodashFindIndex = require('../../../node_modules/lodash/array/findIndex');

class CurrencyShop {

  constructor() {
    this._goods = [];
  }

  openShopWindow(currency, purchaseOnly) {
    _currencyShopInfo.currency_name = currency;
    this._createShopGoods(currency);
    console.log(this._goods);
    SceneManager.push(Scene_Shop);
    SceneManager.prepareNextScene(this._goods, purchaseOnly);
  }

  _createShopGoods(currency) {
    var itemsArray   = $dataItems;
    var weaponsArray = $dataWeapons;
    var armorsArray   = $dataArmors;

    this.processItemsArray(itemsArray, currency);
    this.processWeaponsArray(weaponsArray, currency);
    this.processArmorsArray(armorsArray, currency);
  }

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

  processArmorsArray(armorArray, currency) {
    for (var i = 0; i < armorArray.length; i++) {
      if (armorArray[i] !== null && armorArray[i].belongsToCurrency === currency) {

        if (i <= 2000) {
          var armor = [2, armorArray[i].id];
        }

        var found = lodashFindIndex(this._goods, function(goodsItem){
          goodsItem.join(',') === armor.join(',');
        })

        if (found === -1) {
          this._goods.push(armor);
        }
      }
    }
  }
}

module.exports = CurrencyShop;
window._currencyShopInfo = {currency_name: null};
