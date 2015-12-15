import lodashIsUndefined  from 'lodash/lang/isUndefined';
import lodashFind         from 'lodash/collection/find';
import lodashIncludes     from 'lodash/collection/includes';
import EncounterHolder    from '../system/container/encounter_holder';
import lodashFindIndex    from 'lodash/array/findIndex';
import lodashFindWhere    from 'lodash/collection/findWhere';

var oldBattleManagerProcessVictoryMethod = BattleManager.processVictory;
BattleManager.processVictory = function() {
    oldBattleManagerProcessVictoryMethod.call(this);

    var removeTroopId       = FlareRemoveTroopFromRegion._getTroopId();
    var removeFromRegion    = FlareRemoveTroopFromRegion._getRegionId();
    var clonedDataStructure = this.findClonedDataStructure();
    var foundAnObject       = {};

    if (lodashIsUndefined(removeTroopId) && lodashIsUndefined(removeFromRegion)) {
      return;
    }

    if (this.isTroopIdToRemoveAnArray(removeTroopId)) {
      var troopId       = this.getTroopIdFromArray(removeTroopId);
      foundAnObject     = lodashFindWhere(clonedDataStructure.encounterList, {troopId: troopId});

    } else if (removeTroopId === $gameTroop._troopId) {
      foundAnObject = lodashFindWhere(clonedDataStructure.encounterList, {troopId: removeTroopId});
    } else {
      return;
    }

    if (this.doesEncounterBelongToMoreThenOneRegion(foundAnObject.regionSet)) {
      foundAnObject.regionSet.splice(this.getRegionIndex(foundAnObject.regionSet, removeFromRegion), 1);
    } else {
      clonedDataStructure.encounterList.splice(this.getTroopIndex(removeTroopId, $gameMap.mapId()), 1);
    }
};

/**
 * Find a clone data structure by map id.
 *
 * @return object or undefined
 */
BattleManager.findClonedDataStructure = function() {
  return EncounterHolder.findByMapId($gameMap.mapId());
}

/**
 * Is the troop id an array?
 *
 * @param array or int troopIdToRemove
 * @return boolean
 */
BattleManager.isTroopIdToRemoveAnArray = function(troopIdToRemove) {
  return Array.isArray(troopIdToRemove);
}

/**
 * Get the troop's id to remove from an array of troop id's
 *
 * @param array troopIdTroRemove
 * @return int
 */
BattleManager.getTroopIdFromArray = function(troopIdToRemove) {

  for (var i = 0; i < troopIdToRemove.length; i++) {
    if (troopIdToRemove[i] === $gameTroop._troopId) {
      return troopIdToRemove[i];
    }
  }
}

/**
 * Get the troop index
 *
 * @param int troopIdToRemove
 * @param array mapEncounterList
 * @return object
 */
BattleManager.getTroopIndex = function(troopIdToRemove, mapEncounterList) {
  for (var i = 0; i < mapEncounterList.length; i++) {
    if (mapEncounterList[i].troopId == troopIdToRemove) {
      return i;
    }
  }
}

/**
 * Is the troops regionSet greator then 1?
 *
 * @param array regionSet
 * @return boolean
 */
BattleManager.doesEncounterBelongToMoreThenOneRegion = function(regionSet) {
  return regionSet.length > 1;
}

/**
 * Get the index of the region for the troops region set.
 *
 * @param array regionSet
 * @param int regionToRemove
 * @return int index
 */
BattleManager.getRegionIndex = function(regionSet, regionToRemove) {
  for (var i = 0; i < regionSet.length; i++) {
    if (regionSet[i] === regionToRemove) {
      return i;
    }
  }
}
