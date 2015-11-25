
/**
 * Store the broken law object alone with additional keys and values.
 */
class StoreBrokenLawObject {

  /**
   * Ensure the container is empty.
   */
  static emptyContainer() {
    this._brokenLawObject = {};
  }

  /**
   * Set an object to the container.
   *
   * @param object
   */
  static setObject(object) {
    this._brokenLawObject = object;
  }

  /**
   * Set a key with a value to the container.
   *
   * @param String key
   * @param mixed value
   */
  static setKeyValue(key, value) {
    this._brokenLawObject[key] = value;
  }

  /**
   * Get the broken law container.
   *
   * @return object
   */
  static getLawObject() {
    return this._brokenLawObject;
  }
}

module.exports = StoreBrokenLawObject;
