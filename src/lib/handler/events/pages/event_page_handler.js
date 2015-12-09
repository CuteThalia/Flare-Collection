/**
 * @namespace FlareCollection
 */

/**
 * Allows you to process parameters on a specific page.
 *
 * All events have a set of pages, each of those pages has a list of
 * objects and each object has a set of paramters.
 *
 * The paramters are are all gathered together in the mergeEventsPage()
 * function and then returned as a single string.
 *
 * This allows for us to parse tags in comments that lay with in a event.
 */
class EventPageHandler {

  /**
   * Set up the specific page.
   *
   * @param object eventPage
   */
  constructor(eventPage) {
    this._eventPage = eventPage;
  }

  /**
   * Merge the event page paramters into a single sting.
   *
   * @return string
   */
  mergeEventsPage() {
    var pageParamters = [];

    this._eventPage.list.forEach(function(list){
      pageParamters.push(list.parameters);
    });

    return pageParamters.join('');
  }
};

module.exports = EventPageHandler;
