/**
 * @namespace FlareLawsForMap.
 */

// Plugin Options.
var FlareLasForMap = PluginManager.parameters('Flare-LawsForMap');

/**
 * Laws for Map plugin options
 */
class OptionHandler {

  /**
   * Stores the options passed in via the plugin options.
   */
  static createOptionsStorage() {
    this._lawOptions = {
      death_state_id:  FlareLasForMap['Death State ID'],
    };
  }

  /**
   * Gets the options back
   *
   * Known options: death_state_id
   *
   * @return object with key values.
   */
  static getOptions() {
    return this._lawOptions;
  }
}

module.exports = OptionHandler
