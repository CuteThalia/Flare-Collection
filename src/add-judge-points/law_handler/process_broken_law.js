var LawsForMap = require('../law_storage/laws_for_map');
var lodashFindWhere = require('../../../node_modules/lodash/collection/findWhere');

class ProcessBrokenLaw {

  constructor(nameOfAction) {
    this._nameOfAction = nameOfAction;
  }

  validatePlayerBrokeTheLaw() {

    for (var i = 0; i < LawsForMap.getLawsForMap().length; i ++) {
      if (LawsForMap.getLawsForMap()[i].cantUse.indexOf(this._nameOfAction)) {
        return true;
      }
    }

    return false;
  }

  punishPlayer() {
    // Do something.
  }
}

module.exports = ProcessBrokenLaw;
