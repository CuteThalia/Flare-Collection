
import EnounterListContainer from './system/container/encounter_holder';
import lodashIsUndefined     from 'lodash/lang/isUndefined';

/*:
 * @plugindesc Lets you remove a troop id from troops associated to a region after a battle.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @help
 *
 * Super easy script that removed enemy troops x, y and z
 * from the map region specified, even if enemy troop id
 * belongs to multiple regions.
 *
 * We also save this data across maps, loading and so on.
 *
 * So how do we get started?
 *
 * FlareRemoveTroopFromRegion.removeOnBattleEnd(x, y)
 *
 * x repersents the troop id, y repersents the region.
 *
 * You can also do:
 *
 * FlareRemoveTroopFromRegion.removeOnBattleEnd([a,b,c], y)
 *
 * Which will remove, on success any on of those from the region assuming
 * a, b or c match the troop id you are fighting.
 *
 * Both commands work in a parallel process event, infact that is
 * what they are designed for.
 *
 * Because this data replaces the original map encounter list
 * You can use:
 *
 * FlareRemoveTroopFromRegion.restoreToDefault(x)
 *
 * Where x is the map id you want to restore the original encounter
 * list for.
 *
 * Keep in mind that if you restore the ecnounter list and do not create
 * a switch to turn off the parallel process event then you will
 * re-manipulate the data structure all over again.
 *
 * The mutated data structure is saved when you save the game and loded
 * when you load the game. Kepp that in mind.
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
