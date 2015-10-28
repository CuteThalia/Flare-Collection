/**
 * @namespace FlareCollection
 */

/**
 * Custom Error Handler Class.
 *
 * Use by doing: FlareError.error('Error Text'); then do:
 * FlareError.getError() in the Scene Map initializer to throw
 * errors on the start of the game.
 *
 * This class wont be useful in classes that subclass core RPG Maker
 * classes because the error handler there knows how to catch errors
 * and deal with them.
 *
 * So when would you use this? In classes that dont extend any of the
 * core RPG Maker classes.
 *
 * Alias the Scene_Map initialize method, check if the getError()
 * returns undefined or not, if not, throw a new Error with the value of
 * getError()
 */
class FlareError {

  /**
   * Use this to set a new error message.
   *
   * @param String message
   */
  static error(message) {
    this._error = message;
  }

  /**
   * Get the error message.
   *
   * @return undefined or string
   */
  static getError() {
    return this._error;
  }
}

module.exports = FlareError;
