/**
 * @namespace FlareLawsForMap.
 */

import CountContainer from  '../../flare_counter';

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
  oldBattleManagerGainRewardsMethod.call(this);
}

var oldBattleManagerDisplayRewards = BattleManager.gainRewards;
BattleManager.displayRewards = function() {
  oldBattleManagerDisplayRewards.call(this);
  if (CountContainer.getCurrentState() === 0) {
    // do soemthing  .... 
  }
}
