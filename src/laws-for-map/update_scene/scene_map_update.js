var AddLawsForMap = require('../add_laws_for_map');

var oldSceneMapPrototypeOnMapLoadedMethod = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
  oldSceneMapPrototypeOnMapLoadedMethod.call(this);
  var flarAddLawsForMap = new AddLawsForMap();
  flarAddLawsForMap.grabMapInformation();
}
