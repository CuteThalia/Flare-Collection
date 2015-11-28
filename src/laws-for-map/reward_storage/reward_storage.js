/**
 * @namespace FlareCollection
 */

/**
 * Store the actual rewards.
 *
 * This will just store the id's of items, weapons and armors.
 *
 * It will also store xp and gold as int's.
 */
class RewardStorage {

  /**
   * Create an empty container.
   */
  static createContainer() {
    this._container = [];
  }

  /**
   * Set the item container to the container.
   *
   * @param array or int item
   */
  static setToStorage(item) {
    this._container.push(item);
  }

  /**
   * Return an actual container.
   *
   * @return Array
   */
  static getContainer() {
    return this._container;
  }
}

module.exports = RewardStorage;
