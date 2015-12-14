import lodashIsUndefined from 'lodash/lang/isUndefined';
import lodashFindWhere   from 'lodash/collection/findWhere';
import lodashIncludes    from 'lodash/collection/includes';
import lodashFind        from 'lodash/collection/find';

class EnocounterList {

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

  static getEcounterContainer() {
    return this._troopContainer;
  }

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
