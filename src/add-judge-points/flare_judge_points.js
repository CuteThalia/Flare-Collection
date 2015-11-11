var LawManagement     = require('./law_storage/laws_for_map');
var FlareLawMenu      = require('./menus/add_law_to_menu');

/*:
 * @plugindesc Allows you to have a set of laws for a map.
 * @author Adam Balan (AKA: DarknessFalls)
 *
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
 * The above should be all on one line, I did it like this because
 * the help file only allows 60 characters pr line
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
class FlareJudgePoints {
  static getLawsForMap() {
    return LawManagement.getLawsForMap();
  }
}

var flareLawMenu = new FlareLawMenu
flareLawMenu.menuHandler();

window.FlareJudgePoints = FlareJudgePoints;
window._lawsForMap = [];
