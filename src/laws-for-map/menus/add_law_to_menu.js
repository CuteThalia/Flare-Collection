var FlareMenuSceneHandlerInterface = require('../../flare_menu_scene_interface');
var FlareLawWindowScene = require('../scenes/flare_law_window_scene');

class AddLawToMenuAsMenuItem extends FlareMenuSceneHandlerInterface {

  constructor() {
    super();
  }

  menuHandler() {
    var oldSceneMenu = Scene_Menu.prototype.createCommandWindow;

    Scene_Menu.prototype.createCommandWindow = function() {
      oldSceneMenu.call(this);
      this._commandWindow.setHandler('Laws', this.lawCommand.bind(this));
    }

    Scene_Menu.prototype.lawCommand = function() {
      SceneManager.push(FlareLawWindowScene);
    }

    this.addCommandToGameMenu();
  }

  addCommandToGameMenu() {
    var oldWindowMenuCommandPrototypeAddOriginalCommandsMethod = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
      oldWindowMenuCommandPrototypeAddOriginalCommandsMethod.call(this);
      this.addCommand('Laws', 'Laws');
    }
  }
}

module.exports = AddLawToMenuAsMenuItem;
