var FlareRandomNumber = require('../../flare_random_number');

/**
 * @namespace FlareCurrency
 */

/**
 * Determine if the playr gets currencies.
 *
 * Currency tags can have a percentage attribute set. If it is set then
 * we go ahead check if they will be successful to gain the currency AFTER
 * a battle.
 */
class RewardCurrenciesCheck {

  constructor() {}

  /**
   * Creates Currency Ceck Object.
   *
   * Assigns a new array to a enemy object. This array contains
   * x number of objects. Each object contains a currency name and
   * do we gain currency check which is either true or false.
   */
  createCheckObject() {

    for (var i = 0; i < $dataEnemies.length; i++) {
      var enemy = $dataEnemies[i];

      if (enemy !== null) {
        enemy.gainCurrencyOnBattleWin = [];
        this._processEnemyCurrencyReward(enemy, enemy.enemyCurrencyRewardData);
      }
    }
  }

  /**
   * Private method. Create enemy check object.
   *
   * Assigns the gain currency check object to the array of objects
   * this allows for an enemy to have multiple currencies with different
   * percentages.
   *
   * @param Object enemy
   * @param Array enemyCurrencyReward
   */
  _processEnemyCurrencyReward(enemy, enemyCurrencyReward) {
    var self        = this;

     enemyCurrencyReward.map(function(currencyObject){
      if (typeof currencyObject === 'object') {
        enemy.gainCurrencyOnBattleWin.push({
          currency_Name: currencyObject.name,
          doWeGainCurrency: self._processPercentage(currencyObject)
        });
      }
    });
  }

  /**
   * Private method. check percentage.
   *
   * When no percentage is given it is set to 100, default truth.
   * when percentage is given we subtract it from 100, then random a number
   * between 0 an 100 and compare the result to the "toGetAbove" varaible.
   *
   * Example: 100 - 85 = 15, random number is 16, 16 > 15 = true.
   *
   * In the above example case the user would be rewarded the currency.
   *
   * @param Object CurrencyObject
   * @return bool
   */
  _processPercentage(currencyObject) {
    if (currencyObject.percentage !== 100) {
      var toGetAbove   = 100 - currencyObject.percentage;
      var randomNumber = FlareRandomNumber.minMax(0, 100);

      if (randomNumber > toGetAbove) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }
}

module.exports = RewardCurrenciesCheck;
