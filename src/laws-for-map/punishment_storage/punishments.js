var lodashFind = require('../../../node_modules/lodash/collection/find');

/**
 * @namespace FlareLawsForMap.
 */

/**
 * Stores the types of punishments.
 */
class Punishments {

  constructor() {
    this._punishementStorage = [
      "gold", "xp", "hp", "mp", "tp"
    ]
  }

  /**
   * Get the punishment storage.
   *
   * @return array of strings.
   */
  getPunishmentStorage() {
    return this._punishementStorage;
  }

  /**
   * Do we have said punishement?
   *
   * @return boolean
   */
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
