var lodashFindWhere   = require('lodash/collection/findWhere');
var lodashIsUndefined = require('lodash/lang/isUndefined');
var lodashCapitalize  = require('lodash/string/capitalize');
var lodashTrim        = require('lodash/string/trim');

/**
 * @namespace FlareLawsForMap.
 */

/**
 * Stores the various laws for a specific map.
 */
class LawsForMap {

  /**
   * Store the actual law.
   *
   * Remove any additional cantUse beyond the three.
   *
   * Create a lawForMap object and store it.
   *
   * @param Object law
   */
  static storeLaw(law) {
    var lawCannotUse = null;

    if (law.cantUse.indexOf(',') !== -1) {
      lawCannotUse             = law.cantUse.split(',');
      lawCannotUse.length      = 3;
      var upperCaseCannotUse   = [];

      lawCannotUse.forEach(function(cannotUse){
        var trimmedCannotUse = lodashTrim((cannotUse));
        upperCaseCannotUse.push(lodashCapitalize(trimmedCannotUse));
      });

      lawCannotUse = upperCaseCannotUse.join();

    } else {
      lawCannotUse = lodashCapitalize(law.cantUse);
    }

    var lawForMap = {
      name: law.name,
      punishment: law.punishment,
      amount: law.amount,
      icon: law.icon,
      cantUse: lawCannotUse
    }

    if (this._lawsForMap.length === 3) {
      this.setLawsForMap([]);
    }

    this._lawsForMap.push(lawForMap);
  }

  /**
   * Get all the laws for this map.
   *
   * @return array of 3 objects.
   */
  static getLawsForMap() {
    return this._lawsForMap;
  }

  /**
   * Set laws for map.
   *
   * Needs to be an array. Also over rides current laws.
   */
  static setLawsForMap(laws) {
    this._lawsForMap = laws;
  }
}

module.exports = LawsForMap;
