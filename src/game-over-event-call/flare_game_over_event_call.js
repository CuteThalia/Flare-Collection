/**
 * @namespace FLareGameOverEventCall.
 */

import lodashIsUndefined from 'lodash/lang/isUndefined';

/*:
 * @plugindesc Allows you to call an event instead of an immediate game over.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @help
 *
 * === Usage ===
 *
 * Create a common event with a trigger of none. Then create a second parallel process with the following script call:
 *
 *  FlareGameOverEventCall.callEvent(commonEventIdYouCreated)
 *
 * Thats it. When the party either dies on map via script calls or events that kill every one, or when the party
 * dies in a battle they can loose, this will script will kick in, it will revive every one and then call the common event. If
 * you are in battle then we revive, pop the scene and call the common event.
 */

/**
 * Allows you to call a common event when the party is all dead.
 */
class FlareGameOverEventCall {

  /**
   * Public method. Call a common event
   *
   * When the party is dead call a common event. This also works if the party is in a battle
   * and they die.
   *
   * @param int eventId
   */
  static callEvent(eventId) {
    this._eventId   = eventId;
    this._callEvent = true;

    if ($gameParty.isAllDead()) {
      $gameParty.reviveBattleMembers();
      $gameTemp.reserveCommonEvent(FlareGameOverEventCall._getEventId());
    }
  }

  /**
   * Private function. Should we call an event?
   *
   * @return boolean
   */
  static _calleEvent() {
    if (lodashIsUndefined(this._callEvent)) {
      return false;
    }

    return this._callEvent;
  }

  /**
   * Get the event id to call.
   *
   * @return id if its set or throw an error.
   */
  static _getEventId() {
    if (lodashIsUndefined(this._eventId)) {
      throw new Error('sorry but the event id has not been set. Please call: callEvent(eventId)');
    }

    return this._eventId;
  }
}

// Opens this up for the user.
window.FlareGameOverEventCall = FlareGameOverEventCall;
