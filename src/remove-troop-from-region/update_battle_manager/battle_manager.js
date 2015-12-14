import lodashIsUndefined  from 'lodash/lang/isUndefined';
import lodashFind         from 'lodash/collection/find';
import lodashIncludes     from 'lodash/collection/includes';
import EncounterContainer from '../system/container/encounter_list';

var oldBattleManagerProcessVictoryMethod = BattleManager.processVictory;
BattleManager.processVictory = function() {
    oldBattleManagerProcessVictoryMethod.call(this);

    // If the toop id is not undefined, same with region id and the region id matches
    // that of the region id the players on then do stff.
    if (!lodashIsUndefined(FlareRemoveTroopFromRegion._getTroopId()) &&
        !lodashIsUndefined(FlareRemoveTroopFromRegion._getRegionId()) &&
        $gamePlayer.regionId() === FlareRemoveTroopFromRegion._getRegionId()) {

      // Loop over the game map encounter list.
      for (var i = 0; i < $dataMap.encounterList.length; i++) {

        // If we contain the region in the encounter list an the troop id
        // matches that of the troop in that region encounter list add it to the
        // encounter list container.
        if (lodashIncludes($dataMap.encounterList[i].regionSet,
            FlareRemoveTroopFromRegion._getRegionId()) &&
            $gameMap.encounterList()[i].troopId === FlareRemoveTroopFromRegion._getTroopId() &&
            !EncounterContainer.doesIndexExist($gameMap.mapId(), i)) {

          // Add the index to a container and store it by map id.
          EncounterContainer.setEncounterForRemoval($gameMap.mapId(), i);
        }
      }
    }
};
