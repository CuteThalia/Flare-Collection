var extractAllOfType = require('rmmv-mrp-core/lib/OptionParser').extractAllOfType;
var lodashFind = require('../../../node_modules/lodash/collection/find');

class GatherItems {
  constructor(){
    this.processItems();
  }

  processItems() {

    $dataItems.forEach(function(item){
      if (item !== null) {
        var itemCurrencyInfo = extractAllOfType(item.note, 'currencyShop');

        itemCurrencyInfo.forEach(function(info){
          if (typeof info === 'object') {
            if (itemCurrencyInfo.length > 0) {
              _itemsForCurrencieShop.items.push({
                 currency: info.belongsTo,
                 item_id: item.id,
                 item_cost: info.andCosts
              });
            }
          }
        })
      }
    });

    console.log(_itemsForCurrencieShop);
  }
}

module.exports = GatherItems;

// Do not touch or manipulate this.
window._itemsForCurrencieShop = {
  items:  [],
  weapons:[],
  armor:  []
};
