var lodashClone       = require('../../../node_modules/lodash/lang/clone');
var lodashFind        = require('../../../node_modules/lodash/collection/find');
var lodashIsUndefined = require('../../../node_modules/lodash/lang/isUndefined');
var RewardCurrencies  = require('../update_core_data_manager/reward_currencies_check');

var oldBattleManagerSetupMethod = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    oldBattleManagerSetupMethod.call(this, troopId, canEscape, canLose)

    var rewardCurrencies = new RewardCurrencies();
    rewardCurrencies.createCheckObject();

    this._gainCurrencies = []
};

var oldBattleManagerDisplayRewards = BattleManager.displayRewards;
BattleManager.displayRewards = function() {
  console.log('displayed');
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

      var amountGained = BattleManager.howMuchToGive(data);
      self._gainCurrencies.push({name: data[0].name, amount: amountGained})

      $gameMessage.add('\\c[8]You Gained: \\c[0]' + amountGained + ' of: ' + data[0].name);
      data.shift();
    }
  });
}

var oldBattleManagerGainRewardsMethod = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
  console.log('gained');
  oldBattleManagerGainRewardsMethod.call(this);
  this.gainCurrencies();
}

BattleManager.howMuchToGive = function(data) {
  var amountToGive = 0;

  if (data[0].amount.indexOf('~') !== -1) {
    var minMax = data[0].amount.split('~');
    return amountToGive = Math.round(Math.random() * (parseInt(minMax[1]) - parseInt(minMax[0])) + parseInt(minMax[0]))
  } else {
    return amountToGive = data[0].amount
  }
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
        if (lodashIsUndefined(Yanfly.VA)) {

          var amountFound = lodashFind(self._gainCurrencies, function(amount) {
            return amount.name === data[0].name;
          });

          if (!lodashIsUndefined(amountFound)) {
            window.FlareCurrencies.addAmount(data[0].name, amountFound.amount);
            data.shift();
            self._gainCurrencies.shift();
          }
        }
    }
  });
}
