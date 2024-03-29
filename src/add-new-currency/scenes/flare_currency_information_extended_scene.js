/**
 * @namespace FlareCurrency
 */

import ItemForCurrencySelectableWindow from '../windows/currency_info/item_info/item_for_currency';
import ItemInformation                 from '../windows/currency_info/item_info/item_information';
import SceneWindowContainer            from '../../lib/containers/scene/window/scene_window_container';

/**
 * Create the actual currency information scene.
 *
 * When the user selects currencies from the menu we want to
 * create a new scene which then creates a new window that displays information
 * about that currency.
 */
class FlareCurrencyInformationExtendedScene extends Scene_MenuBase {

  constructor() {
    super();
  }

  /**
   * Create the currency info window
   */
  create() {
    super.create(this);
    this.createExtendedInfoScene();
  }

  /**
   * Listen for the canel action.
   *
   * Close the currency info window, pop this scene off the stack.
   */
  update() {
    super.update(this);

    if (Input.isTriggered("cancel")) {
      this.popScene();
    }
  }

  /**
   * Create the actual window.
   */
  createExtendedInfoScene() {
    SceneWindowContainer.emptyContainer();

    this._itemSelectableWindow = new ItemForCurrencySelectableWindow();
    this._itemInformaton       = new ItemInformation();

    SceneWindowContainer.setWindowToContainer('flare-item-info', this._itemInformaton);

    this.addWindow(this._itemSelectableWindow);
    this.addWindow(this._itemInformaton);

  }
};

module.exports = FlareCurrencyInformationExtendedScene;
