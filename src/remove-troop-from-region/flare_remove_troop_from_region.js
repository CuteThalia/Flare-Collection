
import EnounterListContainer from './system/container/encounter_holder';
import lodashIsUndefined     from 'lodash/lang/isUndefined';

/*:
 * @plugindesc Lets you remove a troop id from troops associated to a region after a battle.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @help
 *
 * Super Easy script, create a parallel event that removes
 * troops from the encounterList on $dataMap. For example,
 * if you have a region with troop id x  it and you call:
 *
 * FlareRemoveTroopFromRegion.removeOnBattleEnd(1, 1);
 *
 * You are saying, remove troop id 1 from region 1. This only
 * works if the troop id is associated with the region in question.
 *
 * Now what if you leave the map? Well if you come back to the map
 * that troop will still not be encountable.
 *
 * So what do you do?
 *
 * FlareRemoveTroopFromRegion.removeFromTroopContainer(1)
 *
 * What this does is state, remove the container for this map id
 * that holds all the enounters to be removed from a encounterList
 * associated to the map.
 *
 * If you want to reset all enemies that are to be removed from all
 * maps:
 *
 * FlareRemoveTroopFromRegion.emptyWholeContainer()
 *
 * This will allow all regions to have the encounters you stated
 * to be removed to be encountable again.
 */

/**
 * Public API Class - Removes troop from region.
 */
class FlareRemoveTroopFromRegion {

  /**
   * Remove a troop id based on region id.
   *
   * @param int troopId
   * @param int regionId
   */
  static removeOnBattleEnd(troopId, regionId) {
    if ($gameMap.encounterList().length > 0) {
      this._toopId   = troopId;
      this._regionId = regionId;
    }
  }

  /**
   * Restore a specific map to default map encounter list.
   *
   * @param int mapId
   */
  static restoreToDefault(mapId) {

    if (!lodashIsUndefined(EnounterListContainer.getContainer())) {
      for (var i = 0; i < EnounterListContainer.getContainer().length; i++) {
        if (EnounterListContainer.getContainer()[i].mapId = mapId) {
          EnounterListContainer.getContainer()[i] = EnounterListContainer.getOriginalArray(mapId)
        }
      }
    }
  }

  /**
   * Gets the mutated container.
   *
   * @return array or undefined
   */
  static getMutatedContainer() {
    if (!lodashIsUndefined(EnounterListContainer.getContainer())) {
      return EnounterListContainer.getContainer()
    }
  }

  /**
   * Get the troop id that you want removed.
   *
   * @return int
   */
  static _getTroopId() {
    return this._toopId;
  }

  /**
   * Get the region id.
   *
   * @return int
   */
  static _getRegionId() {
    return this._regionId;
  }
}

window.FlareRemoveTroopFromRegion = FlareRemoveTroopFromRegion;
