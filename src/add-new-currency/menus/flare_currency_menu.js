/**
 * @namespace FlareCurrency
 */

var FlareMenuSceneHandlerInterface = require('../../flare_menu_scene_interface.js');
var FlareCurrencyScene = require('../scenes/flare_currency_scene');

/**
 * Allows you to view the currencies that you hold.
 *
 * Overrides the main scene menu to add a new option: Currencies.
 * This class does not handle the scene window.
 *
 */
class FlareCurrencyMenu extends FlareMenuSceneHandlerInterface {

  constructor() {
    super();
  }

  /**
   * Create a new menu item for the currency window.
   */
  menuHandler() {
    var oldSceneMenu = Scene_Menu.prototype.createCommandWindow;

    Scene_Menu.prototype.createCommandWindow = function() {
      oldSceneMenu.call(this);
      this._commandWindow.setHandler('Currencies', this.currencyCommand.bind(this));
    }

    Scene_Menu.prototype.currencyCommand = function() {
      SceneManager.push(FlareCurrencyScene);
    }

    this.addCommandToGameMenu();
  }

  /**
   * Add a new command to the window menu command.
   */
  addCommandToGameMenu() {
    var addNewMenuContent = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
      addNewMenuContent.call(this);
      this.addCommand('Currencies', 'Currencies');
    }
  }

};

module.exports = FlareCurrencyMenu;
