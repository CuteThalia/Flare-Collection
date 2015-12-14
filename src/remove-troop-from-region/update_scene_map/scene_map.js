import lodashIsUndefined  from 'lodash/lang/isUndefined';
import EncounterContainer from '../system/container/encounter_list';
import lodashFindWhere    from 'lodash/collection/findWhere';

var oldSceneMapPrototypeUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
  oldSceneMapPrototypeUpdate.call(this);

  if (!lodashIsUndefined(EncounterContainer.getEcounterContainer())) {
    var foundItem = lodashFindWhere(EncounterContainer.getEcounterContainer(), {mapId: $gameMap.mapId()});

    if (!lodashIsUndefined(foundItem)) {
      for (var i = 0; i < foundItem.troopIndexes.length; i++) {
        $dataMap.encounterList.splice(foundItem[i], 1);
      }
    }
  }
};
