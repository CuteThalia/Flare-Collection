/**
 * @namespace FlareCollection
 */

import lodashFind        from '../node_modules/lodash/collection/find';
import lodashIsUndefined from '../node_modules/lodash/lang/isUndefined';



/**
 * Allows us to store a window object.
 *
 * Window objects can be stored and then called later on
 * when we want to open them or do other things to them
 */
class SceneWindowContainer {

  /**
   * Sets a window to a container.
   *
   * Best done in a scene before or after you add the window to the
   * scene its self.
   *
   * @param string name
   * @param classInstance windowObject
   */
  static setWindowToContainer(name, windowObject) {
    this._container.push({
      name: name,
      windowObject: windowObject
    });
  }

  /**
   * Empties the current container.
   *
   * Best done when you close a scene or pop a scene off.
   */
  static emptyContainer() {
    this._container = [];
  }

  /**
   * Gets the actual window class instance based on name.
   *
   * @param string name
   * @return classInstance or undefined.
   */
  static getWindowFromContainer(name) {
    return lodashFind(this._container, function(windows) {
      return windows.name === name;
    });
  }

  /**
   * Get the whole container.
   *
   * @return array
   */
  static getContainer() {
    return this._container;
  }

  /**
   * Determines if a container is empty.
   *
   * Undefined containers are considered empty.
   *
   * @return boolean
   */
  static isContainerEmpty() {
    if (!lodashIsUndefined(this._container) && this._container.length > 0) {
      return false;
    }

    return true;
  }
}

module.exports = SceneWindowContainer = SceneWindowContainer;
