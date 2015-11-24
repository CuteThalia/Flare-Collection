/**
 * @namespace FlareLawsForMap.
 */

/**
 * Static class to store the "no gold" message
 */
class StoreNoGoldMessage {

  /**
   * Create an empty store.
   */
  static createStorage() {
    this._noGoldMessage = null;
  }

  /**
   * Set the actual message
   *
   * @param string message
   */
  static setMessage(message) {
    this._noGoldMessage = message;
  }

  /**
   * Get the actual message.
   *
   * @return undefined or string
   */
  static getMessage() {
    return this._noGoldMessage;
  }
}

module.exports = StoreNoGoldMessage;
