var extractAllOfType  = require('rmmv-mrp-core/option-parser').extractAllOfType;
var Punishments       = require('./punishment_storage/punishments');
var LawManagement     = require('./law_storage/laws_for_map');
var ladashArrayUnique = require('lodash/array/uniq');
var lodashClone       = require('lodash/lang/clone');
var lodashIsUndefined = require('lodash/lang/isUndefined');

/**
 * @namespace FlareLawsForMap.
 */

/**
 * Add a law to a global private name space.
 *
 * We take all the laws for the map and then remove all the duplicate laws.
 * After that we have to push the law up for the global private object that
 * is then used all over the place.
 */
class AddLawsForMap {

  /**
   * Seup the Punishment class
   */
  constructor() {
    this._punishments = new Punishments();
  }

  /**
   * Send the laws for storage.
   *
   * First remove duplicate laws.
   *
   * If we have more then three unique laws, grab only three random laws.
   *
   * Push those laws to a Law Management class.
   */
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

    if (lodashIsUndefined(LawManagement._lawsForMap)) {
      LawManagement.setLawsForMap([]);
    }

    for (var i = 0; i < arrayOfRandomLaws.length; i++) {
      if (arrayOfRandomLaws[i] instanceof Object && this.validatePunishment(arrayOfRandomLaws[i].punishment)) {
        LawManagement.storeLaw(arrayOfRandomLaws[i]);
      }
    }
  }

 /**
  * Validate that the punishment exists.
  *
  * @return boolean
  */
  validatePunishment(punishment) {
    if (this._punishments.hasPunishment(punishment)) {
      return true;
    }

    return false;
  }

  /**
   * Private method, generate a random number between min and max.
   *
   * @return int.
   */
  _generateRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}

exports AddLawsForMap;
