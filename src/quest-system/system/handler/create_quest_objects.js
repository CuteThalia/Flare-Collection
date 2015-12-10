/**
 * @namespace FlareQuestSystem.
 */

import ParseQuestText     from './parse_quest_text';
import QuestContainer     from '../container/quest_container';
import lodashIsUndefined  from 'lodash/lang/isUndefined';

/**
 * We need to create quest objects based off event comment data.
 *
 * The process is super simple, you instantiate this class with the event text
 * and the event's ID.
 *
 * This information is gotten from the event when the player interacts with the event in
 * some manner.
 *
 * Next we have a function that creates whats known as a master event contsainer, This container
 * is then processed to weed out two types of quests: single quests and quest chains.
 *
 * The information for quests is the same regardless of chain or not.
 *
 * Finally we store everything into a static class container called a Quest Container.
 */
class CreateQuestObjects {

  /**
   * You can do: new CreateQuestObjects(string, id);
   *
   * @param string eventText
   * @param int eventId
   */
  constructor(eventText, eventId) {
    this._parseQuestText = new ParseQuestText(eventText);

    this._masterQuestContainer  = [];
    this._questChainData        = [];
    this._singleQuestData       = []; // Doesnt belong to a chain.

    this.createQuestObjects(eventId)
  }

  /**
   * Creates the actual objects.
   *
   * Creates a master container, processes it creating two types of objects,
   * single and chain based quests.
   *
   * These arrays of objects along with the current map id and the evcent id are then passed
   * to the Quest Container class to create a container of quests.
   *
   * @param int eventID
   */
  createQuestObjects(eventId) {
    // Quest Chains
    this._masterQuestContainer = this._parseQuestText.parseQuestChain();

    // If The array is > 0 add more stuff to it
    // else create it.
    if (this._masterQuestContainer.length > 0) {
      this._masterQuestContainer.push(this._parseQuestText.parseQuest());
    } else {
      this._masterQuestContainer = this._parseQuestText.parseQuest();
    }

    // Flatten the array.
    if (this._masterQuestContainer.length > 0) {
      this._masterQuestContainer = [].concat.apply([], this._masterQuestContainer);
    }

    // Store the Quest Chains
    this.processMasterQuestContainer(this._masterQuestContainer);

    // process quest chain data to add additional info to to
    // questInformation array.
    this.processQuestChainData(this._questChainData);

    // Create the container of quests.
    if (!QuestContainer.getQuestObjectBasedOnMapId($gameMap.mapId) && !QuestContainer.getQuestObjectBasedOnEventId(eventId) &&
        this._singleQuestData.length > 0 && this._questChainData.length > 0) {
      QuestContainer.storeQuestinformation($gameMap.mapId(), eventId, this._singleQuestData, this._questChainData);
    }

    console.log(QuestContainer.getQuestContainer());
  }

  /**
   * Processes the master quest cotnainer.
   *
   * Pushes either single quest items to a single quest data holder or
   * pushes quests to the quest chains quest data information data holder.
   *
   * @param array container - All quest information
   */
  processMasterQuestContainer(container) {
    var self = this;

    container.forEach(function(individualQuests){
      if (lodashIsUndefined(individualQuests['id'])) {
        // Creates a single QuestChainData object and pushes it to the array.
        // the quests key array will not be mutated.
        self._questChainData.push({
          questChainId:     individualQuests.id,
          quests:           self._parseQuestText.parseQuest(individualQuests.block),
          status:           "incomplete",
          questInformation: [] // Where the actual quest info for this chain will be stored.
        });
      } else {
        self.createSingleQuestObject(self._singleQuestData, individualQuests);
      }
    });
  }

  /**
   * Processes a single quest object from a chain
   *
   * Because quest chains usually have multiple quests associated with
   * them, we need to walk over each quest chain, and process the quests
   * with in them.
   *
   * @param array questChainData - contains all the quest chains
   */
  processQuestChainData(questChainData) {
    var self = this;

    for (var i = 0; i < questChainData.length; i++) {
      questChainData[i].quests.forEach(function(individualQuestData){
        self.createSingleQuestObject(questChainData[i].questInformation, individualQuestData);
      });
    }
  }

  /**
   * Creates a single quest object.
   *
   * @param array singleQuestData - container to push quest data too.
   * @param object individualQuest - object containing quest info.
   */
  createSingleQuestObject(singleQuestData, individualQuest) {
    singleQuestData.push({
      questTitle:   individualQuest.title,
      questLevel:   individualQuest.level,
      objectives:   this._parseQuestText.parseQuestObjective(individualQuest.block),
      rewardInfo:   this._parseQuestText.parseQuestReward(individualQuest.block)[0],
      queststatus:  "incomplete"
    });
  }
}

module.exports = CreateQuestObjects
