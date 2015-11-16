/**
 * @namespace FlareNotification.
 */

// Plugin Options.
var FlareLasForMap = PluginManager.parameters('Flare-LawsForMap');

/**
 * Notifiation Options.
 *
 * Set options such as how long till the next window and how long till
 * a window fades out after it fades in.
 */
class OptionHandler {

  static createOptionsStorage() {
    this._lawOptions = {
      death_state_id:  FlareLasForMap['Death State ID'],
    };
  }

  static getOptions() {
    return this._lawOptions;
  }
}

// Private global object.
window._OptionHandler = OptionHandler;
_OptionHandler.lawOptions = null;

module.exports = OptionHandler
