var UnderscoreClean = require('../../../node_modules/underscore.string/clean');
var UnderscoreWords = require('../../../node_modules/underscore.string/words');

var olderDataManagerIsDataBaseLoadedMethod = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!olderDataManagerIsDataBaseLoadedMethod.call(this)) {
    return false;
  }

  this.flareProcessEnemyNoteTags($dataEnemies);
  return true;
}

DataManager.flareProcessEnemyNoteTags = function(enemies) {
  var noteTag = /<(?:CURRENCY):[ ]*([\w\s]+(\s*,\s*)\d+(\s*\d+)*)>/i;

  for (var i = 1; i < enemies.length; i++) {
    var enemy         = enemies[i];
    var enemyNoteData = enemy.note.split(/[\r\n]+/);

    enemy.enemyCurrencyRewardData = [];

    for (var n = 0; n < enemyNoteData.length; n++) {
      var line = enemyNoteData[n];

      if (line.match(noteTag)) {
        var lineMatched = line.match(noteTag);
        var splitWords = UnderscoreWords(lineMatched[1], ',');

        var currencyRewardObject = {name: splitWords[0], amount: parseInt(splitWords[1])}
        enemy.enemyCurrencyRewardData.push(currencyRewardObject);
      }
    }
  }
}
