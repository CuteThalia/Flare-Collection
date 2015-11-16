var LawManagement     = require('./law_storage/laws_for_map');
var LawOptions        = require('./options/option_handler');

/*:
 * @plugindesc Allows you to have a set of laws for a map.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @param Death State ID
 * @desc typically one, but you might have changed it ...
 * Default: 1
 * @default 1
 *
 * @help
 *
 * You can have as many laws as you want, any less then 3 we will show them, any more
 * then three will randomly be picked every time you enter the map.
 *
 * How to set up a law:
 *
 * <law
 *    name:"something"
 *    punishment:"gold"
 *    amount: 700 icon: 26
 *    cantUse: "potion, attack, Fire"
 *  >
 *
 * ===============================================================
 * The above will be parsed by the parser if placed into the
 * the note box as such.
 * ===============================================================
 *
 * - Keep the names the law short. The can't use should also be short,
 * any thing longer then the window doesn't wrap.
 *
 * - Items, weapons, skills must all match the name of the
 * the thing you want to create a law against.
 *
 * - You can ONLY have three "can't use" in the law. Any more I
 * cut it off.
 */
class FlareLawsForMap {
  static getLawsForMap() {
    return LawManagement.getLawsForMap();
  }
}

// Set up the options.
_OptionHandler.createOptionsStorage();

window.FlareLawsForMap = FlareLawsForMap;
window._lawsForMap = [];
