/**
 * @namespace FlareLawsForMap.
 */

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
