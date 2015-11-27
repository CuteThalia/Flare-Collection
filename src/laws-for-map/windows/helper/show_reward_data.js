/**
 * @namespace FlareCollection
 */

import RewardStorage             from '../../reward_storage/reward_storage';
import lodashIsUndefined         from 'lodash/lang/isUndefined';

/**
 * Container based object for storing different reward types.
 *
 * We can store an array of weapons, items, armors and then ints for gold and xp.
 */
class ShowRewardData {

  /**
   * Basic constructor.
   */
  constructor() {
    this._rewardData = RewardStorage.getContainer();

    this._weapons     = [];
    this._items       = [];
    this._armors      = [];
    this._goldAmount  = 0;
    this._xpAmount    = 0;
  }

  /**
   * Process the reward data.
   */
  processForWindow() {
    for (var i = 0; i < this._rewardData.length; i++) {
      this._processForArray(this._rewardData[i])
    }
  }

  /**
   * Private Method. Determing which type to process.
   *
   * @param object RewardDataObject
   */
  _processForArray(rewardDataObject) {
    if (!lodashIsUndefined(rewardDataObject.weapons)){
      this._storeInArray('weapon', $dataWeapons, rewardDataObject.weapons);
    }

    if (!lodashIsUndefined(rewardDataObject.items)){
      this._storeInArray('item', $dataItems, rewardDataObject.items);
    }

    if (!lodashIsUndefined(rewardDataObject.armors)){
      this._storeInArray('armor', $dataArmors, rewardDataObject.armors);
    }

    if (!lodashIsUndefined(rewardDataObject.gold)){
      this._goldAmount = rewardDataObject.gold;
    }

    if (!lodashIsUndefined(rewardDataObject.xp)){
      this._xpAmount = rewardDataObject.xp;
    }
  }

  /**
   * Private Method. Store the information in an array.
   *
   * The constructor contains specific arrays for weapons, items and armors.
   * this information is processed and then stored.
   *
   * @param string name
   * @param object data
   * @param mixed rewardData, can be int or array
   */
  _storeInArray(name, data, rewardData) {
    switch(name) {
      case 'weapon':
        if (this._getRewardData(data, rewardData) !== false) {
          this._weapons = this._getRewardData(data, rewardData);
        }
        break;
      case 'armor':
        if (this._getRewardData(data, rewardData) !== false) {
          this._armors = this._getRewardData(data, rewardData);
        }
        break;
      case 'item':
        if (this._getRewardData(data, rewardData) !== false) {
          this._items = this._getRewardData(data, rewardData);
        }
        break;
    }
  }

  /**
   * Private Method. Creates array of reward data.
   *
   * Walk over the reward data and the approprate data object
   * be it $dataItems, $dataWeapons, $dataArmors and then store, if we found anything
   * the information in an array thats then returned.
   *
   * If the reward data is not an array then we want to walk over the data object array looking for
   * an id that matches and store that object.
   *
   * We also only walk over things till 2999.
   *
   * @param array data - $dataItems, $dataWeapons, $dataArmors
   * @param mixed rewardData - Array or int.
   * @return Array or false
   */
  _getRewardData(data, rewardData) {
    var rewardDataContainer = [];

    for (var i = 1; i < data.length; i++) {
      // Are we an array?
      if (Array.isArray(rewardData)) {
        // Walk through.
        for (var j = 0; j < rewardData.length; j++) {
          // Push each piece.
          if (data[i] !== null && i < 2999 && data[i].id === rewardData[j]) {
            rewardDataContainer.push(data[i]);
          }
        }
      // Not an array?
      } else {
        // Compare and push.
        if (data[i] !== null && i < 2999 && data[i].id === rewardData) {
          rewardDataContainer.push(data[i]);
        }
      }
    }

    // Anything at all? Return it.
    if (rewardDataContainer.length > 0) {
      return rewardDataContainer;
    }

    // Else default is a false.
    return false;
  }

  /**
   * Get Weapons
   *
   * @return array of objects
   */
  getWeapons() {
    return this._weapons;
  }

  /**
   * Get Armors
   *
   * @return array of objects
   */
  getArmors() {
    return this._armors;
  }

  /**
   * Get items
   *
   * @return array of objects
   */
  getItems() {
    return this._items;
  }

  /**
   * Get Gold Amount
   *
   * @return int
   */
  getGoldAmount() {
    return this._goldAmount;
  }

  /**
   * Get Xp Amount
   *
   * @return int
   */
  getXpAmount() {
    return this._xpAmount;
  }
}

module.exports = ShowRewardData;
