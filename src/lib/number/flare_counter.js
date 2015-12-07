/**
 * Store the current count.
 *
 * Used if you want to store the current count of
 * something and then use the value of that count else where.
 */
class FlareCounter {

  /**
   * Reset the counter to 0.
   */
  static resetCounter() {
    this._counter = 0;
  }

  /**
   * Appends the value to the current counter.
   *
   * @param int value
   */
  static addValue(value) {
    this._counter += parseInt(value);
  }

  /**
   * Get the current state of the count.
   *
   * @return int
   */
  static getCurrentState() {
    return this._counter;
  }
}

module.exports = FlareCounter;
