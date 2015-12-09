/**
 * @namespace FlareQuestSystem.
 */

import lodashIsUndefined from 'lodash/lang/isUndefined';
import lodashFind        from 'lodash/collection/find';

/**
 * The main container that stores all the quests in the system across maps, events and saves.
 *
 * This is the core container that contains all the quests and quest chains that is persisted across
 * saves and maps as well as events.
 */
class QuestContainer {

  /**
   * Stores a new quest object for an event on a specific map.
   *
   * @param int mapId
   * @param int eventId
   * @param array singleQuest
   * @param array questChains
   */
  static storeQuestinformation(mapId, eventID, singleQuests, questChains) {

    if (lodashIsUndefined(this._questContainer)) {
      this._questContainer = [];
    }

    this._questContainer.push({
      mapId:             mapId,
      eventId:           eventID,
      singleQuests:      singleQuests,
      questChains:       questChains
    });
  }

  /**
   * Returns the current container.
   *
   * @return undefined or array
   */
  static getQuestContainer() {
    return this._questContainer;
  }

  /**
   * Returns an object matchin this id or false.
   *
   * @param int id
   * @return false or object
   */
  static getQuestObjectBasedOnEventId(id) {
    if (lodashIsUndefined(this.getQuestContainer()) || this.getQuestContainer().length === 0) {
      return false;
    }

    var containerObject = lodashFind(this.getQuestContainer(), function(container){
      return container.eventId === id
    });

    if (lodashIsUndefined(containerObject)) {
      return false;
    }

    return containerObject;
  }

  /**
   * Returns an object matchin this id or false.
   *
   * @param int id
   * @return false or object
   */
  static getQuestObjectBasedOnMapId(id) {
    if (lodashIsUndefined(this.getQuestContainer()) || this.getQuestContainer().length === 0) {
      return false;
    }

    var containerObject = lodashFind(this.getQuestContainer(), function(container){
      return container.mapId === id
    });

    if (lodashIsUndefined(containerObject)) {
      return false;
    }

    return containerObject;
  }
}

module.exports = QuestContainer;
