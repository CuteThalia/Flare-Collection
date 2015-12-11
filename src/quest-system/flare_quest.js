/**
 * @namespace FlareQuestSystem.
 */

import QuestContainer     from './system/container/quest_container';
import lodashIsUndefined  from 'lodash/lang/isUndefined';

/*:
 * @plugindesc Create quests for specific events
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @help
 *
 */

/**
 * Contains a way for users to get access to the api.
 *
 * This class contains both developer API and user API.
 *
 * Developer API allows you develop third party scripts that interact with the
 * questing system. It also allows you to expand upon the questing system with your
 * own ideas.
 *
 * User API is used in the game editor to set up quests, validate quest completion
 * and hand out rewards.
 */
class FlareQuest {

  /**
   * Set A single quest to active.
   *
   * Non quest chain quest can be set to active.
   *
   * @param string title
   * @param id eventId
   * @param int mapId - optional, find object based on map id as well
   */
  static setSingleQuestToActive(title, eventId, mapId) {
    var questObject = this.getSingleQuest(title, eventId, mapId);

    if (questObject.status !== 'complete') {}
    questObject.status = 'active'
  }

  /**
   * Set A single quest to active.
   *
   * Non quest chain quest can be set to complete.
   *
   * @param string title
   * @param id eventId
   * @param int mapId - optional, find object based on map id as well
   * @return false if quest is not found.
   */
  static setSingleQuestToComplete(title, eventId, mapId) {
    var questObject = this.getSingleQuest(title, eventId, mapId);

    if (!questObject) {
      return false;
    }

    questObject.status = 'complete'
  }

  /**
   * Set A single quest to active.
   *
   * Non quest chain quest can be set to incomplete.
   *
   * @param string title
   * @param id eventId
   * @param int mapId - optional, find object based on map id as well
   * @return false if quest is not found.
   */
  static setSingleQuestToIncomeplete(title, eventId, mapId) {
    var questObject = this.getSingleQuest(title, eventId, mapId);

    if (!questObject) {
      throw new Error('No Quest: ' + title + ' exists. Does the event: ' + eventId + ' exist on this map? If not pass in an Map Id as well.');
    }

    if (!this.isSingleQuestActive(title, eventId, mapId) && !this.isSingleQuestComplete(title, eventId, mapId)) {
      questObject.status = 'incomplete'
    } else {
      throw new Error(questObject.questTitle + ' is already complete, cannot be reactivated.');
    }
  }

  /**
   * Activate a quest chain.
   *
   * This is done by first finding a quest chain object that belongs to
   * said event and then activating the first quest in the array of quests.
   *
   * @param int questChainId
   * @param int eventId
   * @param int mapId - optional, find object based on map id as well
   * @return false if quest chain object cannot be found.
   */
  static activateQuestChain(questChainId, eventId, mapId) {
    var questChainObject = this.getQuestChain(questChainId, eventId, mapId);

    if (!questChainObject) {
      throw new Error('No Quest Chain with id of: ' + questChainId + ' exists. Does the event: ' + eventId + ' exist on this map? If not pass in an Map Id as well.');
    }

    questChainObject.questInformation[0].questStatus = 'active';
    questChainObject.status = 'active';
  }

  /**
   * Move the quest chain along.
   *
   * We will move the quest chain to the next quest in the set of quests
   * assuming there is a next quest to move too. If there isnt we will
   * set the quest chain status to complete, meaning you have completed all
   * quests in the quest chain.
   *
   * @param int questChainId
   * @param int eventId
   * @param int mapId - optional, find object based on map id as well
   * @return false if a quest object is not found.
   */
  static moveToNextQuestInChain(questChainId, eventId, mapId) {
    var questChainObject = this.getQuestChain(questChainId, eventId, mapId);

    if (!questChainObject) {
      throw new Error('No Quest Chain with id of: ' + questChainId + ' exists. Does the event: ' + eventId + ' exist on this map? If not pass in an Map Id as well.');
    }

    for (var i = 0; i < questChainObject.questInformation.length; i++) {
      if (questChainObject.questInformation[i].questStatus === 'active') {

        // Set quest to complete
        questChainObject.questInformation[i].questStatus = 'complete';

        // Advance one more index, if its undefined: set the quest chain to
        // complete. else set the next quest to active.
        if (lodashIsUndefined(questChainObject.questInformation[i + 1])) {
          questChainObject.status = 'complete';
          return;
        } else {
          questChainObject.questInformation[i + 1].questStatus = 'active';
          return;
        }
      }
    }
  }

  /**
   * is the current quest chain complete?
   *
   * Quest chains are either complete or incomplete based on the status of
   * the quests in them. If all the quests are complete then the quest chain is
   * complete.
   *
   * @param int questChainId
   * @param int eventId
   * @param int mapId - optional, find object based on map id as well
   * @return return boolean
   */
  static isQuestChainComplete(questChainId, eventId, mapId) {
    var questChainObject = this.getQuestChain(questChainId, eventId, mapId);

    if (!questChainObject) {
      throw new Error('No Quest Chain with id of: ' + questChainId + ' exists. Does the event: ' + eventId + ' exist on this map? If not pass in an Map Id as well.');
    }

    return questChainObject.status === 'complete';
  }

  /**
   * Determins if the quest chain its self is active.
   *
   * @param int questChainId
   * @param int eventId
   * @param int mapId - optional, find object based on map id as well
   * @return boolean
   */
  static isQuestChainActive(questChainId, eventId, mapId) {
    var questChainObject = this.getQuestChain(questChainId, eventId, mapId);

    if (!questChainObject) {
      throw new Error('No Quest Chain with id of: ' + questChainId + ' exists. Does the event: ' + eventId + ' exist on this map? If not pass in an Map Id as well.');
    }

    return questChainObject.status === 'active';

    return false;
  }

  /**
   * Is a single quest active?
   *
   * Is a non quest chain quest active?
   *
   * @param string title
   * @param int eventId
   * @param int mapId - optional, find object based on map id as well
   * @return boolean
   */
  static isSingleQuestActive(title, eventId, mapId) {
    var questObject = this.getSingleQuest(title, eventId, mapId);

    if (!questObject) {
      throw new Error('No Quest: ' + title + ' exists. Does the event: ' + eventId + ' exist on this map? If not pass in an Map Id as well.');
    }

    return questObject.status === 'active'
  }

  /**
   * Is a single quest complete?
   *
   * Is a non quest chain quest complete?
   *
   * @param string title
   * @param int eventId
   * @param int mapId - optional, find object based on map id as well
   * @return boolean
   */
  static isSingleQuestComplete(title, eventId, mapId) {
    var questObject = this.getSingleQuest(title, eventId, mapId);

    if (!questObject) {
      throw new Error('No Quest: ' + title + ' exists. Does the event: ' + eventId + ' exist on this map? If not pass in an Map Id as well.');
    }

    return questObject.status === 'complete'
  }

  /**
   * Is a single quest incomplete?
   *
   * Is a non quest chain quest incomplete?
   *
   * @param string title
   * @param int eventId
   * @param int mapId - optional, find object based on map id as well
   * @return boolean
   */
  static isSingleQuestIncomplete(title, eventId, mapId) {
    var questObject = this.getSingleQuest(title, eventId, mapId);

    if (!questObject) {
      throw new Error('No Quest: ' + title + ' exists. Does the event: ' + eventId + ' exist on this map? If not pass in an Map Id as well.');
    }

    return questObject.status === 'incomplete'
  }

  /**
   * Get a single quest whos title matches the title you passed in.
   *
   * Searches through the array of single non quest chain quests looking
   * for one that belongs to said event and has the same title.
   *
   * @param string title
   * @param int eventId
   * @param int mapId - optional, find object based on map id as well
   * @return object
   */
  static getSingleQuest(title, eventId, mapId) {
    return QuestContainer.getQuestNameFromEvent(title, eventId, mapId);
  }

  /**
   * Get all quests based on event ID.
   *
   * Get the entire container of single and quest chain quests for an event.
   *
   * @param int eventId
   * @return object or array
   */
  static getAllQuests(eventId) {
    return QuestContainer.getQuestObjectBasedOnEventId(eventId);
  }

  /**
   * Get quest from quest chain of id x where name matches and belongs to event of id y.
   *
   * Search the quest container for a quest object that matches said quest title, belongs to said event
   * and belongs to a quest chain with an id of x.
   *
   * @param string title
   * @param int questChainID
   * @param int eventID
   */
  static getQuestChainQuest(title, questChainId, eventId) {
    return QuestContainer.getQuestFromQuestChain(title, questChainId, eventId);
  }

  /**
   * Returns a quest chain object for an event.
   *
   * Returns withr the quest chain object or false.
   *
   * @param int questChainId
   * @param int eventId
   * @param int mapId - optional, find object based on map id as well
   * @return boolean
   */
  static getQuestChain(questChainId, eventId, mapId) {
    return QuestContainer.getQuestChainObjectForEvent(questChainId, eventId, mapId);
  }
};

// Opens this up for the user.
window.FlareQuest = FlareQuest;
