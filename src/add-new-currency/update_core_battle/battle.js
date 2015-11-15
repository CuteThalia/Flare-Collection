var lodashClone      = require('../../../node_modules/lodash/lang/clone');
var RewardCurrencies = require('../update_core_data_manager/reward_currencies_check');

var oldBattleManagerSetupMethod = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    oldBattleManagerSetupMethod.call(this, troopId, canEscape, canLose)

    var rewardCurrencies = new RewardCurrencies();
    rewardCurrencies.createCheckObject();
};

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
    if (enemy !== null && enemy.id === member.enemyId &&
        enemy.enemyCurrencyRewardData.length > 0
    ) {
      self._gainCurrencyMessage(enemy);
    }
  });
}

BattleManager._gainCurrencyMessage = function(enemy) {

  var self   = this;
  var baseY  = 0;
  var data   = lodashClone(enemy.enemyCurrencyRewardData);

  enemy.gainCurrencyOnBattleWin.forEach(function(gainCurrency) {
    if (gainCurrency.doWeGainCurrency &&
        Array.isArray(data) &&
        data.length > 0 &&
        gainCurrency.currency_name === data[0].name)
    {
          $gameMessage.add('\\c[8]You Gained: \\c[0]' + data[0].amount + ' of: ' + data[0].name);
          data.shift();
    }
  });
}

var oldBattleManagerGainRewardsMethod = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
  oldBattleManagerGainRewardsMethod.call(this);
  this.gainCurrencies();
}

BattleManager.gainCurrencies = function() {
  var self = this;
  $gameTroop.troop().members.forEach(function(enenemyObject){
    self._parseEnemyObject(enenemyObject);
  });
}

BattleManager._parseEnemyObject = function(enemyObjectFromTroop) {
  var self = this;
  $dataEnemies.forEach(function(enemy){
    if (enemy !== null && enemy.id === enemyObjectFromTroop.enemyId &&
        enemy.enemyCurrencyRewardData.length > 0) {
          self._getCurrenciesAndRewardThem(enemy)
        }
  });
}

BattleManager._getCurrenciesAndRewardThem = function(enemy) {
  var self   = this;
  var baseY  = 0;
  var data   = lodashClone(enemy.enemyCurrencyRewardData);


  enemy.gainCurrencyOnBattleWin.forEach(function(gainCurrency) {
    if (gainCurrency.doWeGainCurrency &&
        Array.isArray(data) &&
        data.length > 0 &&
        gainCurrency.currency_name === data[0].name)
    {
          window.FlareCurrencies.addAmount(data[0].name, data[0].amount);
          data.shift()
    }
  });
}
