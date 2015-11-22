var extractAllOfType  = require('rmmv-mrp-core/option-parser').extractAllOfType;
var StoreCurrencyName = require('./store_current_currency_name');

class MapHasCureencyShop {

  constructor(events) {
    this._events = events;
    this._hasCurrencyShop = false;

  }

  doesMapHaveCurrencyShop() {
    var self = this;
    this._events.forEach(function(event){
      if (event !== null) {
        self.walkOverPages(event);
      }
    });

    return this._hasCurrencyShop;
  }

  walkOverPages(event) {
    var self = this;
    event.pages.forEach(function(page){
      self.walkOverLists(page);
    });
  }

  walkOverLists(page) {
    var self = this;
    page.list.forEach(function(list){
      self.walkOverParameters(list)
    });
  }

  walkOverParameters(list) {
    var self = this;
    list.parameters.forEach(function(params){
      self.determineTruthy(params);
    });
  }

  determineTruthy(params) {
    var self = this;
    var currencyShopInfo = extractAllOfType(params, 'IsCurrencyShop');

    if (currencyShopInfo.length >= 1) {
      currencyShopInfo.forEach(function(information){
        if (information.currencyUsed === StoreCurrencyName.getName()) {
          self._hasCurrencyShop = true;
        }
      });
    }
  }
}

module.exports = MapHasCureencyShop;
