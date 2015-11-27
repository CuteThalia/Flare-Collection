/**
 * @namespace FlareCollection
 */
 
import lodashIsUndefined from 'lodash/lang/isUndefined';

/**
 * Great in selectable windows to conain options.
 *
 * Good example of this class being used is when you need
 * to store options that are then passed between selectable windows
 * in the same scene. Maybe one activates when one hits enter and the other
 * becomes dorment.
 */
class SelectableWindowContainer {

  /**
   * Empty the container.
   */
  static emptyContainer() {
    this._windowObjectContainer = {};
  }

  /**
   * Set a key and a value to the object.
   *
   * @param string key
   * @param mixed value
   */
  static setKeyValue(key, value) {
    this._windowObjectContainer[key] = value;
  }

  /**
   * Get the value from from the key.
   *
   * @param string key
   * @return mixed or false if nothing was found.
   */
  static getKeyValue(key) {
    if (lodashIsUndefined(this._windowObjectContainer)) {
      return false;
    }

    if (lodashIsUndefined(this._windowObjectContainer[key])) {
      return false;
    }

    return this._windowObjectContainer[key];
  }
}

module.exports = SelectableWindowContainer;
