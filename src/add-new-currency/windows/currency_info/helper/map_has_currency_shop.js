var extractAllOfType  = require('rmmv-mrp-core/option-parser').extractAllOfType;
var StoreCurrencyName = require('./store_current_currency_name');

/**
 * @namespace FlareCurrency
 */

/**
 * Determine if the current map the player is on has a curecy shop.
 *
 * When the player is on a map there might be one or more currencie
 * shops selling the item the player is looking for. We want to show
 * this information to the player assuming there is a shop.
 *
 * We store the truthy value in a comment, in an event.
 */
class MapHasCureencyShop {

  /**
   * Core constructor.
   *
   * @param events
   */
  constructor(events) {
    this._events = events;
    this._hasCurrencyShop = false;

  }

  /**
   * Does the map have a currency shop?
   *
   * @return boolean
   */
  doesMapHaveCurrencyShop() {
    var self = this;
    this._events.forEach(function(event){
      if (event !== null) {
        self._walkOverPages(event);
      }
    });

    return this._hasCurrencyShop;
  }

  /**
   * Private method. Walk over all events for map.
   *
   * @param event
   */
  _walkOverPages(event) {
    var self = this;
    event.pages.forEach(function(page){
      self._walkOverLists(page);
    });
  }

  /**
   * Private method. Walk over all pages an there lists.
   *
   * @param page (gotten from event)
   */
  _walkOverLists(page) {
    var self = this;
    page.list.forEach(function(list){
      self._walkOverParameters(list)
    });
  }

  /**
   * Private method. Walk over all paramters in a list.
   *
   * @param list (gotten from pages)
   */
  _walkOverParameters(list) {
    var self = this;
    list.parameters.forEach(function(params){
      self._determineTruthy(params);
    });
  }

  /**
   * Private method
   *
   * Determine if event has currency Shop.
   *
   * @param params (gotten from list)
   */
  _determineTruthy(params) {
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
