var lodashFind = require('../../../node_modules/lodash/collection/find');

var oldBattleManagerDisplayRewards = BattleManager.displayRewards;
BattleManager.displayRewards = function() {
  oldBattleManagerDisplayRewards.call(this);
  this.displayRewardForCurrencies();
}

BattleManager.displayRewardForCurrencies = function() {
  var self = this;
  $gameTroop.troop().members.forEach(function(member){
    self._parseEnemyMemberCurrencies(member);
  });
}

BattleManager._parseEnemyMemberCurrencies = function(member) {
  var self = this;
  $dataEnemies.forEach(function(enemy){
    console.log(member);
    if (enemy !== null && enemy.id === member.enemyId &&
        enemy.enemyCurrencyRewardData.length > 0
    ) {
      self._gainCurrencyMessage(enemy);
    }
  });
}

BattleManager._gainCurrencyMessage = function(enemy) {
  enemy.gainCurrencyOnBattleWin.forEach(function(gainCurrency) {
    if (gainCurrency.doWeGainCurrency && Array.isArray(enemy.enemyCurrencyRewardData)) {
      var currencyTogain = lodashFind(enemy.enemyCurrencyRewardData, function(currencyObject) {
        return currencyObject.name === gainCurrency.currency_name;
      });

      $gameMessage.add('\\c[8]You Gained: \\c[0]' + currencyTogain.amount + ' of: ' + currencyTogain.name);
    }
  });
}
