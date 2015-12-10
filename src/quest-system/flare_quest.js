/**
 * @namespace FlareQuestSystem.
 */

import QuestContainer from './system/container/quest_container';

/*:
 * @plugindesc Create quests for specific events
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @help
 *
 */

/**
 * Contains public faceing data about laws on said map.
 */
class FlareQuest {

  /**
   * Get a single quest whos title matches the title you passed in.
   *
   * Searches through the array of single non quest chain quests looking
   * for one that belongs to said event and has the same title.
   *
   * @param string title
   * @param int eventId
   * @return object
   */
  static getSingleQuest(title, eventId) {
    return QuestContainer.getQuestNameFromEvent(title, eventId);
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
};

// Opens this up for the user.
window.FlareQuest = FlareQuest;
