var FlareRandomNumber = require('../../flare_random_number.js');

var oldBattleManagerInitMembersMethod = BattleManager.initMembers;
BattleManager.initMembers = function() {
  oldBattleManagerInitMembersMethod.call(this);
  this._gainCurrenciesAfterBattle = null;
}

var oldBattleManagerDisplayRewardsMethod = BattleManager.displayRewards
BattleManager.displayRewards = function() {
  oldBattleManagerDisplayRewardsMethod.call(this);
  this.displayCurrencies();
}

var oldBattleManagerGainRewardsMethod = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
  oldBattleManagerGainRewardsMethod.call(this);

  for (var i = 0; i < $gameTroop.troop().members.length; i++) {
    if (typeof $gameTroop.troop().members[i] === 'object') {
      var enemy = this._searchForEnemy($dataEnemies, $gameTroop.troop().members[i].enemyId);

      for (var j = 0; j < this._gainCurrenciesAfterBattle.length; j++) {
        if (this._gainCurrenciesAfterBattle[j].enemy_id === enemy.id &&
            this._gainCurrenciesAfterBattle[j].gain_currency)  {
              this._gainCurrencies(enemy);
        }
      }
    }
  }
}

BattleManager.displayCurrencies = function() {
  var self = this;
  this._gainCurrenciesAfterBattle = this._checkChance($gameTroop);

  for (var i = 0; i < $gameTroop.troop().members.length; i++) {
    if (typeof $gameTroop.troop().members[i] === 'object') {
      var enemy = this._searchForEnemy($dataEnemies, $gameTroop.troop().members[i].enemyId);

      for (var j = 0; j < this._gainCurrenciesAfterBattle.length; j++) {
        if (this._gainCurrenciesAfterBattle[j].enemy_id === enemy.id &&
            this._gainCurrenciesAfterBattle[j].gain_currency)  {
              this._gatherCurrenciesForgameMessage(enemy);
        }
      }
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

BattleManager._checkChance = function(gameTroop) {
  var gainCurrencies = [];

  for (var i = 0; i <  gameTroop.troop().members.length; i++) {
    if (typeof gameTroop.troop().members[i] === 'object') {
      var enemy = this._searchForEnemy($dataEnemies, $gameTroop.troop().members[i].enemyId);

      var self = this;
      enemy.enemyCurrencyRewardData.map(function(currency) {
        gainCurrencies.push(self._createGainCurrencyObject(currency, enemy));
      });
    }
  }

  return gainCurrencies;
}

BattleManager._createGainCurrencyObject = function(currency, enemy) {
  if (currency.percentage !== 100) {
    return {enemy_id: enemy.id, gain_currency: this._doWeGainCurrencies(currency)};
  } else {
    return {enemy_id: enemy.id, gain_currency: true};
  }
}

BattleManager._doWeGainCurrencies = function(currency) {
  var needTopGetAbove = 100 - currency.percentage;
  var percentage      = FlareRandomNumber.minMax(0, 100);
  var gainCurrency    = false;

  if (percentage > needTopGetAbove) {
    gainCurrency = true;
  }

  return gainCurrency
}
