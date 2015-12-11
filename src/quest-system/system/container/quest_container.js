/**
 * @namespace FlareQuestSystem.
 */

import lodashIsUndefined from 'lodash/lang/isUndefined';
import lodashFind        from 'lodash/collection/find';
import lodashFlatten     from 'lodash/array/flatten';
import lodashPluck       from 'lodash/collection/pluck';
import lodashFindWhere   from 'lodash/collection/findWhere';

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
   * Does the container already contain a quest chain with id?
   *
   * @param int questChainId
   * @return boolean
   */
  static containsQuestChain(questChainId, eventId) {
    if (lodashIsUndefined(this.getQuestContainer()) || this.getQuestContainer().length === 0) {
      return false;
    }

    var questObject = lodashFindWhere(this.getQuestContainer(), {eventId: eventId});

    if (lodashIsUndefined(questObject)) {
      return false;
    }

    var foundItem = lodashFindWhere(questObject.questChains, {questChainId: questChainId});

    if (lodashIsUndefined(foundItem)) {
      return false;
    }

    return true;
  }

  /**
   * Returns a quest based on the title and event id as well as map id
   *
   * @param string title
   * @param int event id
   * @param int mapId
   * @return array or false
   */
  static getQuestNameFromEvent(title, eventId, mapId) {
    var questObject = null;

    if (lodashIsUndefined(this.getQuestContainer()) || this.getQuestContainer().length === 0) {
      return false;
    }

    if (!lodashIsUndefined(mapId) && mapId !== 0) {
      questObject = lodashFindWhere(this.getQuestContainer(), {eventId: eventId, mapId: mapId});;
    } else {
      questObject = lodashFindWhere(this.getQuestContainer(), {eventId: eventId});
    }

    if (lodashIsUndefined(questObject)) {
      return false;
    }

    var foundItem = lodashFindWhere(questObject.singleQuests, {questTitle: title});

    if (lodashIsUndefined(foundItem)) {
      return false;
    }

    return foundItem;
  }

  /**
   * Get a single quest from a quest chain.
   *
   * @param string title
   * @param int questChainId
   * @param int eventId
   */
  static getQuestFromQuestChain(title, questChainId, eventId) {
    if (lodashIsUndefined(this.getQuestContainer()) || this.getQuestContainer().length === 0) {
      return false;
    }

    var questObject = lodashFindWhere(this.getQuestContainer(), {eventId: eventId});

    if (lodashIsUndefined(questObject)) {
      return false;
    }

    var questChainObject = lodashFindWhere(questObject.questChains, {questChainId: questChainId});

    if (lodashIsUndefined(questChainObject)) {
      return false;
    }

    var foundItem = lodashFindWhere(questChainObject.questInformation, {questTitle: title});

    if (lodashIsUndefined(foundItem)) {
      return false;
    }

    return foundItem;
  }

  /**
   * Get a whole quest chain object.
   *
   * Returns the entire quest chain object based on id and event id as well as map id.
   *
   * @param int questChainId
   * @param int eventId
   * @param int mapId
   * @return false or object
   */
  static getQuestChainObjectForEvent(questChainId, eventId, mapId) {
    var questObject;

    if (lodashIsUndefined(this.getQuestContainer()) || this.getQuestContainer().length === 0) {
      return false;
    }

    if (!lodashIsUndefined(mapId) && mapId !== 0) {
      questObject = lodashFindWhere(this.getQuestContainer(), {eventId: eventId, mapId: mapId});;
    } else {
      questObject = lodashFindWhere(this.getQuestContainer(), {eventId: eventId});
    }

    if (lodashIsUndefined(questObject)) {
      return false;
    }

    var questChainObject = lodashFindWhere(questObject.questChains, {questChainId: questChainId});

    if (lodashIsUndefined(questChainObject)) {
      return false;
    }

    return questChainObject
  }

  /**
   * Get a whole quest chain object.
   *
   * Returns the entire quest chain object based on id and event id as well as possibly map and the status
   *
   * @param int questChainId
   * @param int eventId
   * @param int mapId
   * param string
   * @return false or object
   */
  static getCompletedQuestChainObject(questChainId, eventId, mapId, status) {
    var questObject;

    if (lodashIsUndefined(this.getQuestContainer()) || this.getQuestContainer().length === 0) {
      return false;
    }

    if (!lodashIsUndefined(mapId) && mapId !== 0) {
      questObject = lodashFindWhere(this.getQuestContainer(), {eventId: eventId, mapId: mapId});;
    } else {
      questObject = lodashFindWhere(this.getQuestContainer(), {eventId: eventId});
    }

    if (lodashIsUndefined(questObject)) {
      return false;
    }

    var questChainObject = lodashFindWhere(questObject.questChains, {questChainId: questChainId, status: status});

    if (lodashIsUndefined(questChainObject)) {
      return false;
    }

    return questChainObject
  }
}

module.exports = QuestContainer;
