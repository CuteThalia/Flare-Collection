import {extractAllOfType}  from 'rmmv-mrp-core/option-parser';
import Punishments         from './punishment_storage/punishments';
import LawManagement       from './law_storage/laws_for_map';
import ladashArrayUnique   from 'lodash/array/uniq';
import lodashClone         from 'lodash/lang/clone';
import lodashIsUndefined   from 'lodash/lang/isUndefined';
import OptionHandler       from './options/option_handler';

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
    var self        = this;

    var noteData = extractAllOfType(noteBoxData, 'law');

    var arrayOfRandomLaws = [];
    var randomLawsNumber  = parseInt(OptionHandler.getOptions().number_of_laws_for_map);
    console.log(randomLawsNumber)

    // Get unique laws.
    noteData = ladashArrayUnique(noteData, function(lawInfo) {
      return lawInfo.name;
    });

    // If theres more then x laws (default: 3) randomize which ones we get.
    if (noteData.length > parseInt(OptionHandler.getOptions().number_of_laws_for_map)) {
      var lawsForRadomizing = lodashClone(noteData);

      // Loop over, creating an array of three random and unique laws.
      while (randomLawsNumber > 0) {
        var index = this._generateRandomNumber(0, lawsForRadomizing.length);
        index = index - 1;

        if (index < 0) {
          index = 0;
        }

        arrayOfRandomLaws.push(lawsForRadomizing[index]);
        lawsForRadomizing.splice(index, 1);
        randomLawsNumber--;
      }
    } else {
      arrayOfRandomLaws = noteData;
    }

    if (lodashIsUndefined(LawManagement._lawsForMap)) {
      LawManagement.setLawsForMap([]);
    }

    for (var i = 0; i < arrayOfRandomLaws.length; i++) {
      if (arrayOfRandomLaws[i] instanceof Object && this.validatePunishment(arrayOfRandomLaws[i].punishment)) {
        LawManagement.storeLaw(arrayOfRandomLaws[i], randomLawsNumber);
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

module.exports = AddLawsForMap;
