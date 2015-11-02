var FlareWindowBase = require('../../../flare_window_base');
var lodashFind      = require('../../../../node_modules/lodash/collection/find');

class FlareCurrencyWindow extends FlareWindowBase {

  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    super.initialize(this, 0, 72, Graphics.boxWidth, this.windowHeight());
    this.refresh();
  }

  windowHeight() {
    return Graphics.boxHeight - 72
  }

  refresh() {
    this.contents.clear();
    this.drawRewardGain();
    this.resetFontSettings();
  }

  drawRewardGain() {
    var self = this;

    $gameTroop.troop().members.forEach(function(member){
      self._processEnemies(member);
    });
  }

  _processEnemies(member) {
    var self = this;
    $dataEnemies.forEach(function(enemy){
      if (enemy !== null && enemy.id === member.enemyId
      ) {
        self._drawRewardGain(enemy);
      }
    });
  }

  _drawRewardGain(enemy) {
    var self = this;
    enemy.gainCurrencyOnBattleWin.forEach(function(gainCurrency) {

      if (gainCurrency.doWeGainCurrency && Array.isArray(enemy.enemyCurrencyRewardData)) {

        var currencyTogain = lodashFind(enemy.enemyCurrencyRewardData, function(currencyObject) {
          return currencyObject.name === gainCurrency.currency_name;
        });

        self.flareDrawTextEx('\\c[8]You Gained: \\c[0]' + currencyTogain.amount + ' of: ' + currencyTogain.name);
      }
    });
  }
}

module.exports = FlareCurrencyWindow;
