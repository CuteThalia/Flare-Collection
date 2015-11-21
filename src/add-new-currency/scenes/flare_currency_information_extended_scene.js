/**
 * @namespace FlareCurrency
 */

var ItemForCurrencySelectableWindow = require('../windows/currency_info/item_info/item_for_currency');
var ItemInformation                 = require('../windows/currency_info/item_info/item_information');
var SceneWindowContainer            = require('./scene_window_container');

/**
 * Create the actual currency scene.
 *
 * When the user selects currencies from the menu we want to
 * create a new scene which then creates a new window.
 */
class FlareCurrencyInforationExtendedScene extends Scene_MenuBase {

  constructor() {
    super();
  }

  /**
   * Create the Currency Window
   */
  create() {
    super.create(this);
    this.createExtendedInfoScene();
  }

  /**
   * Listen for the canel action.
   *
   * Close the currency window, pop this scene off the stack.
   */
  update() {
    super.update(this);

    if (Input.isTriggered("cancel")) {
      this._itemSelectableWindow.close();
      this.popScene();
    }
  }

  /**
   * Create the actual window.
   */
  createExtendedInfoScene() {
    SceneWindowContainer.createContainer();

    this._itemSelectableWindow = new ItemForCurrencySelectableWindow();
    this._itemInformaton       = new ItemInformation();

    SceneWindowContainer.setWindowToContainer('flare-item-info', this._itemInformaton);

    this.addWindow(this._itemSelectableWindow);
    this.addWindow(this._itemInformaton);

  }
};

module.exports = FlareCurrencyInforationExtendedScene;
