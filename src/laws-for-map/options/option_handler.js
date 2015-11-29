/**
 * @namespace FlareLawsForMap.
 */

// Plugin Options.
var FlareLawsForMap = PluginManager.parameters('Flare-LawsForMap');

/**
 * Laws for Map plugin options
 */
class OptionHandler {

  /**
   * Stores the options passed in via the plugin options.
   */
  static createOptionsStorage() {
    this._lawOptions = {
      death_state_id:            FlareLawsForMap['Death State ID'],
      number_of_laws_for_map:    FlareLawsForMap['How many laws per map?'],
      before_or_after:           FlareLawsForMap['Calculate law after or before battle?']
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
