/**
 * @namespace FlareQuestSystem.
 */

import EventHandler       from '../../lib/handler/events/pages/event_page_handler';
import ParseQuestText     from '../system/handler/parse_quest_text';
import CreateQuestObjects from '../system/handler/create_quest_objects';

Game_Event.prototype.start = function() {

    // If user interacts with event, process its pages.
    if (this._trigger === 0) {
      var eventhandler = new EventHandler(this.page());
      var eventText = eventhandler.mergeEventsPage();
      new CreateQuestObjects(eventText, this.eventId());
    }

    var list = this.list();
    if (list && list.length > 1) {
        this._starting = true;
        if (this.isTriggerIn([0,1,2])) {
            this.lock();
        }
    }
};
