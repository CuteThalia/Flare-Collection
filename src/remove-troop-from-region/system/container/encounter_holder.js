import lodashIsUndefined from 'lodash/lang/isUndefined';
import lodashClone       from 'lodash/lang/clone';
import lodashFindWhere   from 'lodash/collection/findWhere';

/**
 * Contains the dataMap.encounterList
 *
 * We need to clone the encounterList so that we can manipulate this object.
 *
 * These are stored by map id.
 */
class EncounterHolder {

  /**
   * Store the encounter list for the specific map.
   *
   * @param int mapId
   * @param array encounterList
   */
  static setTroopArray(mapId, encounterList) {
    if (lodashIsUndefined(this._encounterContainer)) {
      this._encounterContainer = [];
    }

    this._encounterContainer.push({mapId: mapId, encounterList: lodashClone(encounterList, true)});
  }

  /**
   * Store the original data map encounter list based on map id.
   *
   * @param array originalDataMapEncounterList
   */
  static storeOriginalArray(mapId, originalDataMapEncounterList) {
    if (lodashIsUndefined(this._originalEncounterContainer)) {
      this._originalEncounterContainer = [];
    }

    this._originalEncounterContainer.push({mapId: mapId, encounterList: lodashClone(originalDataMapEncounterList, true)});
  }

  /**
   * Get an object based on map id.
   *
   * @param int mapId
   * @return undefined or object
   */
  static getOriginalArray(mapId) {
    if (!lodashIsUndefined(this.getOriginalContainer())) {
      return lodashFindWhere(this.getOriginalContainer(), {mapId: mapId});
    }
  }

  /**
   * Get the container containing original encounter lists.
   *
   * @return undefined or array
   */
  static getOriginalContainer() {
    return this._originalEncounterContainer;
  }

  /**
   * Returns the array of objects that contain cloned data
   *
   * @return array
   */
  static getContainer() {
    return this._encounterContainer;
  }

  /**
   * Find by map id from the container.
   *
   * @param int mapId
   * @return undefined or object
   */
  static findByMapId(mapId) {
    if (!lodashIsUndefined(this.getContainer())) {
      return lodashFindWhere(this.getContainer(), {mapId: mapId});
    }
  }

  /**
   * Set the encounter list to the container.
   *
   * @param array encounterList
   */
  static loadArray(encounterList) {
    this._encounterContainer = encounterList;
  }
}

module.exports = EncounterHolder;
