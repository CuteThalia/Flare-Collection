/**
 * @namespace FlareCollection
 */


/**
 * Contains the reward storage.
 *
 * You have to call: CreateRewardStorage() before calling this class.
 *
 * It should be something like:
 *
 * CompileStorageContainer.emptyContainer();
 * CreateRewardStorage();
 * CompileStorageContainer.getContainer();
 */
class CompileStorageContianer {

  /**
   * Empty the container.
   */
  static emptyContainer() {
    this._container = [];
  }

  /**
   * Set an array as the container.
   *
   * @param array rewards
   */
  static setContainer(rewards) {
    this._container = rewards;
  }

  /**
   * Get the container.
   *
   * @return Array
   */
  static getContainer() {
    return this._container;
  }
}

module.exports = CompileStorageContianer;
