import lodashIsUndefined from 'lodash/lang/isUndefined';
import EncounterHolder   from '../system/container/encounter_holder';

var oldGameMapPrototypeSetup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    oldGameMapPrototypeSetup.call(this, mapId);
    
    // Store cloned array based on map id.
    EncounterHolder.setTroopArray(mapId, $dataMap.encounterList);

    // Store original array
    EncounterHolder.storeOriginalArray(mapId, $dataMap.encounterList);
};
