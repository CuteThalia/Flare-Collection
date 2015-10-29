
var oldBattleManagerDisplayRewardsmethod = BattleManager.displayRewards
BattleManager.displayRewards = function() {
  oldBattleManagerDisplayRewardsmethod.call(this);
  this.displayCurrencies();
}

var oldBattleManagerGainRewardsMethod = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
  oldBattleManagerGainRewardsMethod.call(this);

  for (var i = 0; i < $gameTroop.troop().members.length; i++) {
    if (typeof $gameTroop.troop().members[i] === 'object') {
      var enemy = this._searchForEnemy($dataEnemies, $gameTroop.troop().members[i].enemyId);
      this._gainCurrencies(enemy);
    }
  }
}

BattleManager.displayCurrencies = function() {
  var self = this;

  for (var i = 0; i < $gameTroop.troop().members.length; i++) {
    if (typeof $gameTroop.troop().members[i] === 'object') {
      var enemy = this._searchForEnemy($dataEnemies, $gameTroop.troop().members[i].enemyId);
      this._gatherCurrenciesForgameMessage(enemy);
    }
  }
}

BattleManager._gatherCurrenciesForgameMessage = function(enemy) {
  enemy.enemyCurrencyRewardData.map(function(currency){
    $gameMessage.add('Gained: ' + currency.amount + ' of ' + currency.name);
  });
}

BattleManager._gainCurrencies = function(enemy) {
  enemy.enemyCurrencyRewardData.map(function(currency){
    window.FlareCurrencies.setAmount(currency.name, currency.amount);
  });
}

BattleManager._searchForEnemy = function(enemies, id) {
  for (var i = 0; i< enemies.length; i++) {
    if (typeof enemies[i] === 'object'  && enemies[i] !== null) {
      return enemies[i];
    }
  }
}
