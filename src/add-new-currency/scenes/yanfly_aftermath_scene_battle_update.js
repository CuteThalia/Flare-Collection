var FlareCurrencyRewardWindow = require('../windows/yanfly_aftermath/flare_currency_reward_window');

// Make sure this actually exists.
if (Scene_Battle.prototype.addCustomVictorySteps) {

  var oldSceneBattleprototypeUpdateVictoryStepsMethod = Scene_Battle.prototype.updateVictorySteps;
  Scene_Battle.prototype.updateVictorySteps = function() {
    oldSceneBattleprototypeUpdateVictoryStepsMethod.call(this);
    if (this.isVictoryStep('CURRENCY')) {
      this.updateCurrencyStep();
    }
  }

  Scene_Battle.prototype.addCustomCurrenciesGainWindow = function() {
    this._victoryDropWindow.hide()
    this._yanflyAfterMathCurrencyWindowReward = new FlareCurrencyRewardWindow();
    this.addWindow(this._yanflyAfterMathCurrencyWindowReward);
    this._yanflyAfterMathCurrencyWindowReward.open();
    this._yanflyAfterMathCurrencyWindowReward.y = 72;
  }

  Scene_Battle.prototype.updateCurrencyStep = function() {
     if (!this._yanflyAfterMathCurrencyWindowReward) {
       this.addCustomCurrenciesGainWindow();
     } else if (this._yanflyAfterMathCurrencyWindowReward.isOpen()) {
       if (this.victoryTriggerContinue()) {
         this.finishVictoryCurrencies();
       }
     }
  }

  Scene_Battle.prototype.finishVictoryCurrencies = function() {
    SoundManager.playOk();
    this._yanflyAfterMathCurrencyWindowReward.close();
    this.processNextVictoryStep();
  }
}
