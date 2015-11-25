import RewardStorage       from './reward_storage/reward_storage';
import {extractAllOfType}  from 'rmmv-mrp-core/option-parser';
import lodashIsUndefined   from 'lodash/lang/isUndefined';
import FlareRandomNumber   from '../flare_random_number'

class GatherReward {

  constructor() {
    RewardStorage.createContainer();
    this._itemIdContainer = [];
  }

  processPotentialRewards() {
    var rewardData = extractAllOfType($dataMap.note, 'lawReward');
    rewardData = rewardData[0];

    // Collects things we can give phyiscally to the player
    this._storeReward(rewardData.a, $dataArmors, 'armors');
    this._storeReward(rewardData.w, $dataWeapons, 'weapons');
    this._storeReward(rewardData.i, $dataItems, 'items');

    if (this._getObjectForOtherRewards(rewardData.xp, 'xp') !== false) {
      RewardStorage.setToStorage(this._getObjectForOtherRewards(rewardData.xp, 'xp'));
    }

    if (this._getObjectForOtherRewards(rewardData.gold, 'gold') !== false) {
      RewardStorage.setToStorage(this._getObjectForOtherRewards(rewardData.gold, 'gold'));
    }

    console.log(RewardStorage.getContainer());

  }

  _getObjectForOtherRewards(data, key) {
    var otherTypesOfRewards = {};

    if (!lodashIsUndefined(data)) {
      if (isNaN(data)) {
        data = data.split('~');
        var randomAmount = FlareRandomNumber.minMax(parseInt(data[0]), parseInt(data[1]))
        otherTypesOfRewards[key] = randomAmount;

        return otherTypesOfRewards;
      } else {
        otherTypesOfRewards[key] = data;
        return otherTypesOfRewards;
      }
    }

    return false;
  }

  _storeReward(rewardData, dataObject, key) {
    var object = {};
    if (!lodashIsUndefined(rewardData)) {
      if (this._doesItemIdExist(rewardData, dataObject)) {
        // Store everything ...
        if (this._itemIdContainer.length > 0) {
          if (this._itemIdContainer.length === 1) {
            object[key] = this._itemIdContainer[0];
          } else {
            object[key] = this._itemIdContainer;
          }

          RewardStorage.setToStorage(object);
          this._itemIdContainer = [];
        } else {
          object[key] = rewardData;
          RewardStorage.setToStorage(object);
        }
      }
    }
  }

  _doesItemIdExist(itemId, dataObject) {
    var ids   = [];
    var found = false;

    // Does the item contain more then one item id.
    if (isNaN(itemId) && itemId.indexOf(',') !== -1) {
      ids = itemId.split(',');
    }

    // Does the player want randomized?
    if (isNaN(itemId) && itemId.indexOf('~') !== -1) {
      itemId = itemId.split('~');
      ids.push(FlareRandomNumber.minMax(parseInt(itemId[0]), parseInt(itemId[1])));
    }

    if (ids.length > 0) {
      for (var i = 0; i < ids.length; i++) {
        for (var j = 1; j < dataObject.length; j++) {
          if (dataObject[j] !== null && j < 2999 && dataObject[j].id === parseInt(ids[i])) {
            this._itemIdContainer.push(dataObject[j].id);
          }
        }
      }

      if (this._itemIdContainer.length > 0) {
         return true;
      }
    } else {
      for (var i = 1; i < dataObject.length; i++) {
        if (dataObject[i] !== null && i < 2999 && dataObject[i].id === itemId) {
          return true;
        }
      }
    }

    return false;
  }
}

module.exports = GatherReward;
