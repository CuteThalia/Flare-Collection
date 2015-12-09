/**
 * @namespace FlareQuestSystem.
 */

import {extractAllOfType}  from 'rmmv-mrp-core/option-parser';
import lodashIsUndefined from 'lodash/lang/isUndefined';

/**
 * Parses quest information from the event text.
 *
 * Event text is gained on player interaction with an event.
 */
class ParseQuestText {

  /**
   *
   * @param string eventText
   */
  constructor(eventText) {
    this.eventText = eventText;
  }

  /**
   * Parse QuestChain tags.
   *
   * @return array of objects or empty array
   */
  parseQuestChain() {
    return extractAllOfType(this.eventText, 'QuestChain');
  }

  /**
   * Parse Quest tags.
   *
   * You can pass in a string of text containing a quest tag.
   *
   * @param string text
   * @return array of objects or empty array
   */
  parseQuest(text) {
    if (lodashIsUndefined(text)) {
      return extractAllOfType(this.eventText, 'Quest')
    } else {
      return extractAllOfType(text, 'Quest');
    }
  }

  /**
   * Parse Quest Reward tag.
   *
   * You can pass in a string of text containing a quest reward tag.
   *
   * @param string textInsideQuestBlock
   * @return array of objects or empty array
   */
  parseQuestReward(textInsideQuestBlock) {
    if (lodashIsUndefined(textInsideQuestBlock)) {
      return false;
    } else {
      return extractAllOfType(textInsideQuestBlock, 'questReward')
    }
  }

  /**
   * Parses the objective tag
   *
   * @param textInsideQuestBlock, string that contains <objective> tag
   * @return array of objects,empty array or false if the textInsideQuestBlock is undefined.
   */
  parseQuestObjective(textInsideQuestBlock) {
    if (lodashIsUndefined(textInsideQuestBlock)) {
      return false;
    } else {
      return extractAllOfType(textInsideQuestBlock, 'objective');
    }
  }
}

module.exports = ParseQuestText;
