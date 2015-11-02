var lodashClone     = require('../../../../node_modules/lodash/lang/clone');

/**
 * Creates the Flare Currencie Reward window for Yanfly Aftermath.
 */
class FlareCurrencyRewardWindow extends Window_Base {
  constructor() {
    super();
  }

  initialize() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.refresh();
    this.openness = 0;
  }

  windowWidth() {
    return Graphics.boxWidth;
  }

  windowHeight() {
    return Graphics.boxHeight - 72;
  }

  refresh() {
    this.contents.clear();
    this.drawCurrencyRewardData();
  }

  drawCurrencyRewardData() {
    var self = this;
    $gameTroop.troop().members.forEach(function(enenemyObject){
      self._parseEnemyObject(enenemyObject);
    });
  }

  _parseEnemyObject(enemyObject) {
    var self = this;
    $dataEnemies.forEach(function(enemy){
      if (enemy !== null && enemy.id === enemyObject.enemyId &&
          enemy.enemyCurrencyRewardData.length > 0) {
            self._getCurrenciesAndRewardThem(enemy)
          }
    });
  }

  _getCurrenciesAndRewardThem(enemy) {
    var self   = this;
    var baseY  = 0;
    var data   = lodashClone(enemy.enemyCurrencyRewardData);


    enemy.gainCurrencyOnBattleWin.forEach(function(gainCurrency) {
      if (gainCurrency.doWeGainCurrency &&
          Array.isArray(data) &&
          data.length > 0 &&
          gainCurrency.currency_name === data[0].name)
      {
            self.drawText("You gained: " + data[0].amount + ", of: " + data[0].name, 0, baseY, 500, 'left');
            data.shift();
            baseY += 45;
      }
    });
  }
}

module.exports = FlareCurrencyRewardWindow;
