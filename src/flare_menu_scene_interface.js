/**
 * @namespace FlareCollection
 */

/**
 * Interace based class.
 *
 * Contains methods to be over ridden by sub classing.
 * Contains methods to do with the core game scene.
 *
 * Flare Screen is to be subclassed and the methods to be implemented
 * based on the API documentation provided below.
 *
 * @namespace FlareCollection
 */
class FlareMenuSceneHandlerInterface {

  constructor(){}

  /**
   * This method allows you to create menu handlers.
   *
   * You can use this method to create your own menu items for the
   * core game menu.
   */
  menuHandler(){}

  /**
   * Used to add a new window command to the menu.
   */
  addCommandToGameMenu(){}
}

module.exports = FlareMenuSceneHandlerInterface;
