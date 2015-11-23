import AddLawsForMap from '../add_laws_for_map.js';

/**
 * @namespace FlareLawsForMap.
 */

var oldGameMapPrototypeSetupMethod = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  oldGameMapPrototypeSetupMethod.call(this, mapId);

  // Process laws for map.
  var flarAddLawsForMap = new AddLawsForMap();
  flarAddLawsForMap.grabMapInformation();
};
