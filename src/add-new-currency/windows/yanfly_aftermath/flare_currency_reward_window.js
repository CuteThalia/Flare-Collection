/**
 * @namespace FlareCurrency
 */

import lodashClone       from 'lodash/lang/clone';
import lodashIsUndefined from 'lodash/lang/isUndefined';
import lodashFind        from 'lodash/collection/find';

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
    var data   = lodashClone(enemy.enemyCurrencyRewardData);

    for (var i = 0; i < enemy.gainCurrencyOnBattleWin.length; i++) {
      var enemyRewardData = enemy.gainCurrencyOnBattleWin[i];

      if (enemyRewardData instanceof Object &&
        enemyRewardData.doWeGainCurrency &&
        Array.isArray(data) &&
        data.length > 0 &&
        enemyRewardData.currency_name === data[0].name) {

        var amountToGain = lodashFind(BattleManager._gainCurrencies, function(amount){
          return amount.name === data[0].name;
        });

        if (!lodashIsUndefined(amountToGain)) {
          console.log('uh ....');
          this.drawTextEx("You gained: " + amountToGain.amount + ", of: " + ' \\i['+amountToGain.icon+'] ' +  data[0].name, 0, window._baseYForText, 500, 'left');
          BattleManager._gainCurrencies.shift();

        } else {
          console.log('hmmm');
          this.drawTextEx("You gained: " + amountToGain.amount + ", of: " + ' \\i['+amountToGain.icon+'] ' + data[0].name, 0, window._baseYForText, 500, 'left');
        }

        window._baseYForText += 45;
        data.shift();
      }
    }
  }
}

module.exports = FlareCurrencyRewardWindow;
