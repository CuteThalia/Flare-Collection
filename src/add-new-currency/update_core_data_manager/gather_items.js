/**
 * @namespace FlareCurrency
 */

var extractAllOfType  = require('rmmv-mrp-core/lib/OptionParser').extractAllOfType;
var lodashFind        = require('../../../node_modules/lodash/collection/find');
var lodashIsUndefined = require('../../../node_modules/lodash/lang/isUndefined')

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
    var items = $dataItems;

    for (var i = 0; i < items.length; i++) {
      if (items[i] !== null) {
        items[i].currencyCost = 0;
        items[i].belongsToCurrency = null;

        var itemNoteBoxInfo = extractAllOfType(items[i].note, 'currencyShop');
        var noteBoxObjectInfo = itemNoteBoxInfo[0];

        if (!lodashIsUndefined(noteBoxObjectInfo)) {
          items[i].currencyCost       = noteBoxObjectInfo.andCosts;
          items[i].belongsToCurrency  = noteBoxObjectInfo.belongsTo;
        }
      }
    }
  }


  /**
   * Pushes an weapon object on to the weapon array.
   */
  processWeapons() {
    var weapons = $dataWeapons;

    for (var i = 0; i < weapons.length; i++) {
      if (weapons[i] !== null) {
        weapons[i].currencyCost = 0;
        weapons[i].belongsToCurrency = null;

        var weaponNoteBoxInfo = extractAllOfType(weapons[i].note, 'currencyShop');
        var noteBoxObjectInfo = weaponNoteBoxInfo[0];

        if (!lodashIsUndefined(noteBoxObjectInfo)){
          weapons[i].currencyCost       = noteBoxObjectInfo.andCosts;
          weapons[i].belongsToCurrency  = noteBoxObjectInfo.belongsTo;
        }
      }
    }
  }

  /**
   * Pushes an armor object on to the armor array.
   */
  processArmors() {
    var armors = $dataArmors;

    for (var i = 0; i < armors.length; i++) {
      if (armors[i] !== null) {
        armors[i].currencyCost = 0;
        armors[i].belongsToCurrency = null;

        var armorsNoteBoxInfo = extractAllOfType(armors[i].note, 'currencyShop');
        var noteBoxObjectInfo = armorsNoteBoxInfo[0];

        if (!lodashIsUndefined(noteBoxObjectInfo)) {
          armors[i].currencyCost       = noteBoxObjectInfo.andCosts;
          armors[i].belongsToCurrency  = noteBoxObjectInfo.belongsTo;
        }
      }
    }
  }
}

module.exports = GatherItems;
