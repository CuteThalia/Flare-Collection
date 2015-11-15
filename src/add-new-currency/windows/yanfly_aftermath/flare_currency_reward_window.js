var lodashClone       = require('../../../../node_modules/lodash/lang/clone');
var lodashIsUndefined = require('../../../../node_modules/lodash/lang/isUndefined');

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
    console.log('dsiplayed - yanfly');
    var self   = this;
    var baseY  = 0;
    var data   = lodashClone(enemy.enemyCurrencyRewardData);


    enemy.gainCurrencyOnBattleWin.forEach(function(gainCurrency) {
      if (gainCurrency.doWeGainCurrency &&
          Array.isArray(data) &&
          data.length > 0 &&
          gainCurrency.currency_name === data[0].name)
      {
          var amountToGain = lodashFind(window._gainAmount, function(amount){
            return amount.name === data[0].name;
          });

          if (!lodashIsUndefined(amountToGain)) {
            self.drawText("You gained: " + amountToGain + ", of: " + data[0].name, 0, baseY, 500, 'left');
            data.shift();
            window._gainAmount.shift();
            baseY += 45;
          }
      }
    });
  }
}

module.exports = FlareCurrencyRewardWindow;
