class Punishments {

  constructor() {
    this._punishementStorage = [
      "gold", "jail", "xp", "hp", "mp", "tp", "currencies"
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
