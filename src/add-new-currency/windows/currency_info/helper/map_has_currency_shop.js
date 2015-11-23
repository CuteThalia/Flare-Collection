/**
 * @namespace FlareCurrency
 */

import {extractAllOfType}  from 'rmmv-mrp-core/option-parser';
import StoreCurrencyName from './store_current_currency_name';

/**
 * Determine if the current map has events.
 */
class MapHasCurrencyShop {

  /**
   * @param Array events
   */
  constructor(events) {
    this._events = events;
    this._hasCurrencyShop = false;

  }

  /**
   * Does the current map have a currency shop?
   *
   * Walk over all the events looking deep with in an event for a
   * <CurrencyShop typeOfCurrency: "name"> tag.
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
   * Walk over a set of events.
   *
   * @param Array events
   */
  _walkOverPages(event) {
    var self = this;
    event.pages.forEach(function(page){
      self._walkOverLists(page);
    });
  }

  /**
   * Walk over a set of events pages.
   *
   * @param Array pages
   */
  _walkOverLists(page) {
    var self = this;
    page.list.forEach(function(list){
      self._walkOverParameters(list)
    });
  }

  /**
   * Walk over a set of events pages list.
   *
   * @param Array list
   */
  _walkOverParameters(list) {
    var self = this;
    list.parameters.forEach(function(params){
      self._determineTruthy(params);
    });
  }

  /**
   * Walk over a set of events pages list params determining truthy.
   *
   * @param Array params
   */
  _determineTruthy(params) {
    var self = this;
    var currencyShopInfo = extractAllOfType(params, 'currencyShopEvent');

    if (currencyShopInfo.length >= 1) {
      currencyShopInfo.forEach(function(information){
        if (information.belongsTo === StoreCurrencyName.getName()) {
          self._hasCurrencyShop = true;
        }
      });
    }
  }
}

module.exports = MapHasCurrencyShop;
