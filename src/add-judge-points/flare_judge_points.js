var LawManagement     = require('./law_storage/laws_for_map');
var FlareLawMenu      = require('./menus/add_law_to_menu');

/*:
 * @plugindesc Allows you to have a set of laws for a map.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 *
 * @help
 *
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
