/**
 * @namespace FlareCurrency
 */

var extractAllOfType = require('rmmv-mrp-core/lib/OptionParser').extractAllOfType;
var lodashFind = require('../../../node_modules/lodash/collection/find');

/**
 * Creates objects for the currency shop.
 *
 * Creates weapons, armor and items for the currency shop that match
 * the tags in the note boxes.
 */
class GatherItems {

  /**
   * Calls each method that creates an object for said methods.
   */
  constructor(){
    this.processItems();
    this.processWeapons();
    this.processArmors();
  }

  /**
   * Pushes an item object on to the item array.
   */
  processItems() {
    var self = this;

    $dataItems.forEach(function(item){
      if (item !== null) {
        var itemCurrencyInfo = extractAllOfType(item.note, 'currencyShop');

        itemCurrencyInfo.map(function(info){
          self._createItemObject(info, item);
        });
      }
    });
  }

  /**
   * Pushes an weapon object on to the weapon array.
   */
  processWeapons() {
    var self = this;

    $dataWeapons.forEach(function(weapon){
      if (weapon !== null) {
        var weaponCurrencyInfo = extractAllOfType(weapon.note, 'currencyShop');

        weaponCurrencyInfo.map(function(info){
          self._createWeaponObject(info, weapon);
        });
      }
    });
  }

  /**
   * Pushes an armor object on to the armor array.
   */
  processArmors() {
    var self = this;

    $dataArmors.forEach(function(armor){
      if (armor !== null) {
        var armorCurrencyInfo = extractAllOfType(armor.note, 'currencyShop');

        armorCurrencyInfo.map(function(info){
          self._createArmorObject(info, armor);
        });
      }
    });
  }

  /**
   * Actually pushes an item to the item array.
   *
   * @param Object itemTagInfo
   * @param Object item
   */
  _createItemObject(itemTagInfo, item) {
    if (typeof itemTagInfo === 'object') {
      _itemsForCurrencieShop.items.push({
         currency: itemTagInfo.belongsTo,
         item_id: item.id,
         item_cost: itemTagInfo.andCosts
      });
    }
  }

  /**
   * Actually pushes an weapon to the weapon array.
   *
   * @param Object weaponTagInfo
   * @param Object weapon
   */
  _createWeaponObject(weaponTagInfo, weapon) {
    if (typeof weaponTagInfo === 'object') {
      _itemsForCurrencieShop.weapons.push({
         currency: weaponTagInfo.belongsTo,
         item_id: weapon.id,
         item_cost: weaponTagInfo.andCosts
      });
    }
  }

  /**
   * Actually pushes an armor to the armor array.
   *
   * @param Object armorTagInfo
   * @param Object armor
   */
  _createArmorObject(armorTagInfo, armor) {
    if (typeof armorTagInfo === 'object') {
      _itemsForCurrencieShop.armors.push({
         currency: armorTagInfo.belongsTo,
         item_id: armor.id,
         item_cost: armorTagInfo.andCosts
      });
    }
  }
}

module.exports = GatherItems;

// Do not touch or manipulate this.
window._itemsForCurrencieShop = {
  items:  [],
  weapons:[],
  armors:  []
};
