var AddLawsForMap = require('../add_laws_for_map.js');

var oldGameMapPrototypeSetupMethod = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  oldGameMapPrototypeSetupMethod.call(this, mapId);

  // Process laws for map.
  var flarAddLawsForMap = new AddLawsForMap();
  flarAddLawsForMap.grabMapInformation();
};
