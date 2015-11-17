var extractAllOfType  = require('rmmv-mrp-core/option-parser').extractAllOfType;
var Punishments       = require('./punishment_storage/punishments');
var LawManagement     = require('./law_storage/laws_for_map');
var ladashArrayUnique = require('../../node_modules/lodash/array/uniq');
var lodashClone       = require('../../node_modules/lodash/lang/clone');
var lodashIsUndefined = require('../../node_modules/lodash/lang/isUndefined');

class AddLawsForMap {

  constructor() {
    this._punishments = new Punishments();
  }

  grabMapInformation() {
    var noteBoxData = $dataMap.note;
    var lawData     = extractAllOfType(noteBoxData, 'law');
    var self        = this;

    var noteData          = extractAllOfType(noteBoxData, 'law');
    var arrayOfRandomLaws = [];
    var threeLaws         = 3;

    // Get unique laws.
    noteData = ladashArrayUnique(noteData, function(lawInfo) {
      return lawInfo.name;
    });

    // If theres more then three randomize which ones we get.
    if (noteData.length > 3) {
      var lawsForRadomizing = lodashClone(noteData);

      // Loop over, creating an array of three random and unique laws.
      while (threeLaws > 0) {
        var index = this._generateRandomNumber(0, lawsForRadomizing.length);
        index = index - 1;

        if (index < 0) {
          index = 0;
        }

        arrayOfRandomLaws.push(lawsForRadomizing[index]);
        lawsForRadomizing.splice(index, 1);
        threeLaws--;
      }
    } else {
      arrayOfRandomLaws = noteData;
    }

    for (var i = 0; i < arrayOfRandomLaws.length; i++) {
      if (arrayOfRandomLaws[i] instanceof Object && this.validatePunishment(arrayOfRandomLaws[i].punishment)) {
        LawManagement.storeLaw(arrayOfRandomLaws[i]);
      }
    }
  }

  validatePunishment(punishment) {
    if (this._punishments.hasPunishment(punishment)) {
      return true;
    }

    return false;
  }

  _generateRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}

module.exports = AddLawsForMap;
