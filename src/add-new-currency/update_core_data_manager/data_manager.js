var RewardCurrenciesCheck = require('./reward_currencies_check');
var GatherItemsForShop = require('./gather_items');

var olderDataManagerIsDataBaseLoadedMethod = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!olderDataManagerIsDataBaseLoadedMethod.call(this)) {
    return false;
  }

  // process Note tags
  this.flareProcessEnemyNoteTags($dataEnemies);

  // Set up rewards for enemies.
  var rewardCurrenciesCheck = new RewardCurrenciesCheck();
  rewardCurrenciesCheck.createCheckObject();

  // Set up the currency shops
  new GatherItemsForShop();

  return true;
}

var oldDataManagerMakeSaveContentsMethod = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
  var contents = oldDataManagerMakeSaveContentsMethod.call(this);
  contents.currencies = window.flareCurrency.getCurrencyStore();

  return contents;
};

var oldDataManagerExtractSaveContentMethod = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    oldDataManagerExtractSaveContentMethod.call(this, contents);
    window.flareCurrency.setStoreFromLoad(contents.currencies);
};

/**
 * Process the enemy note tag looking for currency information.
 *
 * Currency tags can have name, how much and percentage of drop.
 * percentage is optional. Default is 100.
 *
 * @param $dataEnemies enemies
 */
DataManager.flareProcessEnemyNoteTags = function(enemies) {
  var noteTag = /<currency:\s*([^,>]+),\s*([^,>]+)(,\s*([^,>]+))?>/i;

  for (var i = 1; i < enemies.length; i++) {
    var enemy         = enemies[i];
    var enemyNoteData = enemy.note.split(/[\r\n]+/);

    enemy.enemyCurrencyRewardData = [];
    this._processEnemyNoteDataForCurrencyReward(enemy, enemyNoteData, noteTag);
  }
}

/**
 * Private Method. Process Enemy Currency Note Data.
 *
 * Pushes the enemy currency reward data object to an array of the same type.
 * enemies can have multiple currencies attached to them.
 *
 * @param Object enemy
 * @param Array enemyNoteData
 * @param regex noteTag
 */
DataManager._processEnemyNoteDataForCurrencyReward = function(enemy, enemyNoteData, noteTag) {
  for (var n = 0; n < enemyNoteData.length; n++) {
    var line = enemyNoteData[n];
    
    if (line.match(noteTag)) {
      var lineMatched = line.match(noteTag);

      enemy.enemyCurrencyRewardData.push(this._createCurrencyRewardObject(lineMatched));
    }
  }
}

/**
 * Private Method. Creates the actual object.
 *
 * Creates a currency reward object that contains name, amount and percentage of either 100 or the
 * third number that the user placed in the tag.
 *
 * @param Array lineMatched
 */
DataManager._createCurrencyRewardObject = function(lineMatched) {
  if (lineMatched[4] !== undefined) {
    return {name: lineMatched[1], amount: parseInt(lineMatched[2]), percentage: parseInt(lineMatched[4])}
  } else {
    return {name: lineMatched[1], amount: parseInt(lineMatched[2]), percentage: 100}
  }
}
