var lodashFind = require('../../../node_modules/lodash/collection/find');

class Punishments {

  constructor() {
    this._punishementStorage = [
      "gold", "xp", "hp", "mp", "tp"
    ]
  }

  getPunishmentStorage() {
    return this._punishementStorage;
  }

  hasPunishment(name) {
    for(var i = 0; i < this.getPunishmentStorage().length; i++) {
      if (this.getPunishmentStorage()[i] === name) {
        return true;
      }
    }

    return false;
  }
}

module.exports = Punishments;
