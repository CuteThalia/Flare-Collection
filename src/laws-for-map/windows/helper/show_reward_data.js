import RewardStorage      from '../../reward_storage/reward_storage';
import lodashIsUndefined  from 'lodash/lang/isUndefined';

class ShowRewardData {

  constructor() {
    this._rewardData = RewardStorage.getContainer();

    this._weapons     = [];
    this._items       = [];
    this._armors      = [];
    this._goldAmount  = 0;
    this._xpAmount    = 0;
  }

  processForWindow() {
    for (var i = 0; i < this._rewardData.length; i++) {
      this._processForArray(this._rewardData[i])
    }
  }

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

  getWeaponNames() {
    return this._weapons;
  }

  getArmorNames() {
    return this._armors;
  }

  getItemNames() {
    return this._items;
  }

  getGoldAmount() {
    return this._goldAmount;
  }

  getXpAmount() {
    return this._xpAmount;
  }
}

module.exports = ShowRewardData;
