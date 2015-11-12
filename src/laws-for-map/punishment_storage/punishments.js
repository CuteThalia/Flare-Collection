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
    if (this.getPunishmentStorage().indexOf(name) !== -1) {
      return true;
    }

    return false;
  }
}

module.exports = Punishments;
