/**
 * @namespace FlareCollection
 */

/**
 * Create a ranom number
 *
 * Methods here are useful for creating random numbers.
 */
class FlareRandomNumber {

  /**
   * Create random number between nim and max.
   *
   * @param Int min
   * @param Int max
   * @return int
   */
  static minMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = FlareRandomNumber;
