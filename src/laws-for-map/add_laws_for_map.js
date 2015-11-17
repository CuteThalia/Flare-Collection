var extractAllOfType  = require('rmmv-mrp-core/option-parser').extractAllOfType;
var Punishments       = require('./punishment_storage/punishments');
var LawManagement     = require('./law_storage/laws_for_map');

class AddLawsForMap {

  constructor() {
    this._punishments = new Punishments();
  }

  grabMapInformation() {
    var noteBoxData = $dataMap.note;
    var lawData     = extractAllOfType(noteBoxData, 'law');
    var self        = this;

    var noteData = extractAllOfType(noteBoxData, 'law');

    for (var i = 0; i < noteData.length; i++) {
      if (noteData[i] instanceof Object && this.validatePunishment(noteData[i].punishment)) {
        LawManagement.storeLaw(noteData[i]);
      }
    }
  }

  validatePunishment(punishment) {
    if (this._punishments.hasPunishment(punishment)) {
      return true;
    }

    return false;
  }
}

module.exports = AddLawsForMap;
