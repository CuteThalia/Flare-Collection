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

    extractAllOfType(noteBoxData, 'law').map(function(lawObject) {
      if (typeof lawObject === 'object' && self.validatePunishment(lawObject.punishment)) {
        LawManagement.storeLaw(lawObject);
      }
    });
  }

  validatePunishment(punishment) {
    if (this._punishments.hasPunishment(punishment)) {
      return true;
    }

    return false;
  }
}

module.exports = AddLawsForMap;
