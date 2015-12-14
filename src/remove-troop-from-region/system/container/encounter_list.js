import lodashIsUndefined from 'lodash/lang/isUndefined';
import lodashFindWhere   from 'lodash/collection/findWhere';
import lodashIncludes    from 'lodash/collection/includes';
import lodashFind        from 'lodash/collection/find';

/**
 * Container Object for Encounters.
 *
 * Contains a list of objects that have a map id and
 * a array of indexes that are used to remove the data
 * from the $dataMap.encounterList
 */
class EnocounterList {

  /**
   * Set the encounter for removal.
   *
   * @param int mapId
   * @param int encounterIndex
   */
  static setEncounterForRemoval(mapId, enounterIndex) {
    if (lodashIsUndefined(this._troopContainer)) {
      this._troopContainer = [];
    }

    var foundItem = lodashFindWhere(this._troopContainer, {mapId: mapId});

    if (!lodashIsUndefined(foundItem)) {
      foundItem.troopIndexes.push(enounterIndex);
    } else {
      this._troopContainer.push({mapId: mapId, troopIndexes: []});
      this.setEncounterForRemoval(mapId, enounterIndex);
    }
  }

  /**
   * Add a region to remove from id.
   *
   * Assuming the enemy belongs to multiple regions, we then need
   * to go ahead and set a "Region to remove from" which then only removes
   * the region id from the troop object and not the whole object.
   */
  static addRegionToRemove(mapId, regionToRemove, troopId) {
    if (!lodashIsUndefined(this.getEcounterContainer())) {
      var foundItem = lodashFindWhere(this.getEcounterContainer(), {mapId: mapId});

      if (!lodashIsUndefined(foundItem)) {
        foundItem['regionToRemoveFrom'] = regionToRemove;
        fountItem['troopId'] = troopId
      }
    }
  }

  /**
   * Get the troop container object.
   *
   * @return array or undefined.
   */
  static getEcounterContainer() {
    return this._troopContainer;
  }

  /**
   * Remove an object from the container based on map id.
   *
   * @param int mapId
   */
  static removeFromContainer(mapId) {
    if (!lodashIsUndefined(this.getEcounterContainer())) {
      for (var i = 0; i < this.getEcounterContainer().length; i++) {
        if (this.getEcounterContainer()[i].mapId === mapId) {
          this.getEcounterContainer().splice(i, 1);
        }
      }
    }
  }

  /**
   * Empty the whole container.
   */
  static emptyContainer() {
    if (lodashIsUndefined(this.getEcounterContainer())) {
      this._troopContainer = [];
    }
  }

  /**
   * Does the index exist?
   *
   * Index refers to the index to remove from the
   * $dataMap.encounterList array.
   *
   * @param int mapId
   * @param int index
   * @return boolean
   */
  static doesIndexExist(mapId, index) {
    if (!lodashIsUndefined(this.getEcounterContainer())) {
      var foundItem = lodashFindWhere(this.getEcounterContainer(), {mapId: mapId});

      if (!lodashIsUndefined(foundItem)) {
        return lodashIncludes(foundItem.troopIndexes, index);
      } else {
        return false;
      }
    }

    return false;
  }
}

module.exports = EnocounterList;
