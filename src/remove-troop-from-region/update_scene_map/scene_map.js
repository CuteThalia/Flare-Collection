import lodashIsUndefined  from 'lodash/lang/isUndefined';
import EncounterContainer from '../system/container/encounter_list';
import lodashFindWhere    from 'lodash/collection/findWhere';
import lodashFindIndex    from 'lodash/array/findIndex';

var oldSceneMapPrototypeUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
  oldSceneMapPrototypeUpdate.call(this);

  // If container isnt undefiend.
  if (!lodashIsUndefined(EncounterContainer.getEcounterContainer())) {
    var foundItem = lodashFindWhere(EncounterContainer.getEcounterContainer(), {mapId: $gameMap.mapId()});

    // If the item is found
    if (!lodashIsUndefined(foundItem)) {
      if (lodashIsUndefiend(foundItem.regionToRemoveFrom)) {
        // Search the encounter listand remove based on index.
        for (var i = 0; i < foundItem.troopIndexes.length; i++) {
          $dataMap.encounterList.splice(foundItem[i], 1);
        }
      } else {
        // Remove only the region from the enemy troop.
        for (var i = 0; i < $dataMap.encounterList.length; i++) {
          if ($dataMap.encounterList[i].troopId === foundItem.troopId) {
            var index = lodashFindIndex($dataMap.encounterList[i].regionSet, foundItem.regionToRemoveFrom);
            if (index !== -1) {
              $dataMap.encounterList[i].regionSet.splice(index, 1);
            }
          }
        }
      }
    }
  }
};
