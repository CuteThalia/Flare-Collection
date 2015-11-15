var GatherItemsForShop    = require('./gather_items');
var extractAllOfType      = require('rmmv-mrp-core/option-parser').extractAllOfType;
var lodashIsUndefined     = require('../../../node_modules/lodash/lang/isUndefined');

var olderDataManagerIsDataBaseLoadedMethod = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!olderDataManagerIsDataBaseLoadedMethod.call(this)) {
    return false;
  }

  // process Note tags
  this.flareProcessEnemyNoteTags($dataEnemies);

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
  for (var i = 1; i < enemies.length; i++) {
    var enemyNoteData = extractAllOfType(enemies[i].note, 'currencyToGain');
    console.log(enemies[i].note, enemyNoteData);

    enemies[i].enemyCurrencyRewardData = [];
    this._processEnemyNoteDataForCurrencyReward(enemies[i], enemyNoteData);
  }
}

/**
 * Private Method. Process Enemy Currency Note Data.
 *
 * Pushes the enemy currency reward data object to an array of the same type.
 * enemies can have multiple currencies attached to them.
 *
 * @param Object enemy
 * @param json enemyNoteData
 */
DataManager._processEnemyNoteDataForCurrencyReward = function(enemy, enemyNoteData) {
  enemy.enemyCurrencyRewardData.push(this._createCurrencyRewardObject(enemyNoteData));
}

/**
 * Private Method. Creates the actual object.
 *
 * Creates a currency reward object that contains name, amount and percentage of either 100 or the
 * third number that the user placed in the tag.
 *
 * @param Array lineMatched
 */
DataManager._createCurrencyRewardObject = function(currencyData) {
  if (!lodashIsUndefined(currencyData.chance)) {
    return {name: currencyData.name, amount: currencyData.amount, percentage: parseInt(currencyData.chance)};
  } else {
    return {name: currencyData.name, amount: currencyData.amount, percentage: 100};
  }
}
