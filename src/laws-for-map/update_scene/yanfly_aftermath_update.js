/**
 * @namespace FlareLawsForMap
 */

import YanflyLawsRewardWindow from '../windows/yanfly_aftermath/reward_window';
import lodashIsUndefined      from 'lodash/lang/isUndefined';

// Make sure this actually exists.
if (Scene_Battle.prototype.addCustomVictorySteps) {

  var oldSceneBattleprototypeUpdateVictoryStepsMethod = Scene_Battle.prototype.updateVictorySteps;
  Scene_Battle.prototype.updateVictorySteps = function() {
    oldSceneBattleprototypeUpdateVictoryStepsMethod.call(this);
    if (this.isVictoryStep('LAWS')) {
      this.updateRewardLawStep();
    }
  }

  Scene_Battle.prototype.addCustomLawsGainWindow = function() {
    if (!lodashIsUndefined(this._yanflyAfterMathCurrencyWindowReward)) {
      this._yanflyAfterMathCurrencyWindowReward.close();
    } else {
      this._victoryDropWindow.close()
    }

    this._yanflyLawsRewardWindow = new YanflyLawsRewardWindow();

    this.addWindow(this._yanflyLawsRewardWindow);
    this._yanflyLawsRewardWindow.open();
    this._yanflyLawsRewardWindow.y = 72;
  }

  Scene_Battle.prototype.updateRewardLawStep = function() {
     if (!this._yanflyLawsRewardWindow) {
       this.addCustomLawsGainWindow();
     } else if (this._yanflyLawsRewardWindow.isOpen()) {
       if (this.victoryTriggerContinue()) {
         this.finishVictoryCurrencies();
       }
     }
  }

  Scene_Battle.prototype.finishVictoryCurrencies = function() {
    SoundManager.playOk();
    this._yanflyLawsRewardWindow.hide();
    this.processNextVictoryStep();
  }
}
