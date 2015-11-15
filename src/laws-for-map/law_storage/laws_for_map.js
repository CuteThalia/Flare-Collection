var lodashFindWhere   = require('../../../node_modules/lodash/collection/findWhere');
var lodashIsUndefined = require('../../../node_modules/lodash/lang/isUndefined');
var lodashCapitalize  = require('../../../node_modules/lodash/string/capitalize');
var lodashTrim        = require('../../../node_modules/lodash/string/trim');

class LawsForMap {

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

    var foundItem = lodashFindWhere(window._lawsForMap, function(law) {
      return law.name === lawForMap.name
    });

    if (lodashIsUndefined(foundItem)) {
      window._lawsForMap.push(lawForMap);
    }
  }

  static getLawsForMap() {
    return window._lawsForMap;
  }
}

module.exports = LawsForMap;
