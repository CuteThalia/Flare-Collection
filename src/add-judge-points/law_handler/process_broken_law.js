var LawsForMap = require('../law_storage/laws_for_map');

class ProcessBrokenLaw {

  constructor(nameOfAction) {
    this._nameOfAction = nameOfAction;
  }

  punishPlayer() {
    console.log(LawsForMap.getLawsForMap(), this._nameOfAction);
  }
}

module.exports = ProcessBrokenLaw;
