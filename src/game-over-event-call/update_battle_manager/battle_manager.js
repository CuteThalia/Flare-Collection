
import lodashFind         from 'lodash/collection/find';
import lodashIsUndefined  from 'lodash/lang/isUndefined';

var oldBattleManagerUpdateBattleEndMethod = BattleManager.updateBattleEnd;
BattleManager.updateBattleEnd = function() {
  // If you are not a battle test, all dead, have an event to call and cannot loose, then we call the common event
  // After reviving you and poping the battle scene off.
  ///
  // Else, call the original method.
  if (!this.isBattleTest() && $gameParty.isAllDead() && FlareGameOverEventCall._calleEvent() && !this._canLose) {
    $gameParty.reviveBattleMembers();
    SceneManager.pop();
    $gameTemp.reserveCommonEvent(FlareGameOverEventCall._getEventId());
  } else {
    oldBattleManagerUpdateBattleEndMethod.call(this);
  }
};
