/**
 * @namespace FlareLawsForMap.
 */

import CountContainer           from  '../../flare_counter';
import lodashClone              from  'lodash/lang/clone';
import CompiledStorageContainer from  '../reward_storage/compiled_storage_container';
import lodashIsUndefined        from  'lodash/lang/isUndefined';
import OptionHandler            from  '../options/option_handler';
import GatherReward             from '../gather_reward';
import CreateRewardStorage      from '../reward_storage/create_reward_storage';

var oldBattleManagerSetupMethod = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    oldBattleManagerSetupMethod.call(this, troopId, canEscape, canLose);
    this._gainedRewards = false;

    if (OptionHandler.getOptions().before_or_after === 'after') {
      //Gather reward data.
      var gatherReward = new GatherReward();
      gatherReward.processPotentialRewards();

      // Now we need reward items.
      new CreateRewardStorage();
    }
};

// We want our own custom message.
BattleManager.processDefeat = function() {
    this.customDisplayMessage();
    this.playDefeatMe();
    if (this._canLose) {
        this.replayBgmAndBgs();
    } else {
        AudioManager.stopBgm();
    }
    this.endBattle(2);
};

BattleManager.customDisplayMessage = function() {
  $gameMessage.add('The whole party was defeated ...');
}

var oldBattleManagerGainRewardsMethod = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
  if (!this._gainedRewards) {
    oldBattleManagerGainRewardsMethod.call(this);
    if (CountContainer.getCurrentState() === 0 && CompiledStorageContainer.getContainer().length > 0) {

      for (var i = 0; i < CompiledStorageContainer.getContainer().length; i++) {
        var item = CompiledStorageContainer.getContainer()[i];

        if (DataManager.isItem(item) || DataManager.isArmor(item) || DataManager.isWeapon(item)) {
          $gameParty.gainItem(item, 1);
        }

        if (!lodashIsUndefined(item['xp'])) {
          $gameParty.allMembers().forEach(function(actor) {
              actor.gainExp(item.xp);
          });
        }

        if (!lodashIsUndefined(item['gold'])) {
          $gameParty.gainGold(item.gold);
        }
      }
    }
  }

  this._gainedRewards = true;

}

var oldBattleManagerDisplayRewards = BattleManager.gainRewards;
BattleManager.displayRewards = function() {
  oldBattleManagerDisplayRewards.call(this);
  if (CountContainer.getCurrentState() === 0 && CompiledStorageContainer.getContainer().length > 0) {
    $gameMessage.add('\\c[16]Party broke no laws. Have some bonus rewards!!!\\c[0]');

    for (var i = 0; i < CompiledStorageContainer.getContainer().length; i++) {
      var item = CompiledStorageContainer.getContainer()[i];

      if (DataManager.isItem(item) || DataManager.isArmor(item) || DataManager.isWeapon(item)) {
        $gameMessage.add('Gained (As a bonus): ' + '\\i['+item.iconIndex+'] ' + item.name);
        $gameMessage.add(''); // spacing for icons.
      }

      if (!lodashIsUndefined(item['xp'])) {
        $gameMessage.add('Gained (As a bonus): ' + item.xp + ' XP (All actors gain this)');
      }

      if (!lodashIsUndefined(item['gold'])) {
        $gameMessage.add('Gained (As a bonus): ' + item.gold + ' Gold');
      }
    }
  }

  if (OptionHandler.getOptions().before_or_after === 'after') {
    CompiledStorageContainer.emptyContainer();
  }
}
