import lodashIsUndefined  from 'lodash/lang/isUndefined';
import EncounterContainer from '../system/container/encounter_holder';
import lodashFindWhere    from 'lodash/collection/findWhere';
import lodashFindIndex    from 'lodash/array/findIndex';

var oldSceneMapPrototypeUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
  oldSceneMapPrototypeUpdate.call(this);

  // Constantly replace the encounter list
  if (!lodashIsUndefined(EncounterContainer.getContainer())) {
    $dataMap.encounterList = EncounterContainer.findByMapId($gameMap.mapId()).encounterList;
  }
};
