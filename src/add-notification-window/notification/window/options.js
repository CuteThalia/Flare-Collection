/**
 * @namespace FlareNotification.
 */

import lodashIsUndefined from 'lodash/lang/isUndefined';

/**
 * Sets options for the notification windo by key/value
 */
class NotificationWindowOptions {

  /**
   * Sets an option by key => value
   *
   * @param string key
   * @param mixed value
   */
  static setOption(key, value) {
    if (lodashIsUndefined(this._windowOptions)) {
      this._windowOptions = {};
    }

    this._windowOptions[key] = value
  }

  /**
   * Returns the container
   *
   * @return Object
   */
  static getContainer() {
    return this._windowOptions;
  }
}

module.exports = NotificationWindowOptions
