/*:
 * @plugindesc Lets you remove a troop id from troops associated to a region after a battle.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @help
 *
 *
 */

class FlareRemoveTroopFromRegion {

  static removeOnBattleEnd(troopId, regionId) {
    if ($gameMap.encounterList().length > 0) {
      this._toopId   = troopId;
      this._regionId = regionId;
    }
  }

  static _getTroopId() {
    return this._toopId;
  }

  static _getRegionId() {
    return this._regionId;
  }
}

window.FlareRemoveTroopFromRegion = FlareRemoveTroopFromRegion;
