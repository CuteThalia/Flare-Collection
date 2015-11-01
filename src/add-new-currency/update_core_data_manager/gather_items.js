var extractAllOfType = require('rmmv-mrp-core/lib/OptionParser').extractAllOfType;
var lodashFind = require('../../../node_modules/lodash/collection/find');

class GatherItems {
  constructor(){
    this.processItems();
  }

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

  _createItemObject(itemTagInfo, item) {
    if (typeof itemTagInfo === 'object') {
      _itemsForCurrencieShop.items.push({
         currency: itemTagInfo.belongsTo,
         item_id: item.id,
         item_cost: itemTagInfo.andCosts
      });
    }
  }
}

module.exports = GatherItems;

// Do not touch or manipulate this.
window._itemsForCurrencieShop = {
  items:  [],
  weapons:[],
  armor:  []
};
