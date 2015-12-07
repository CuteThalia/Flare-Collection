/**
 * @namespace FlareCurrency
 */

import FlareCurrencySelectableWindow from '../windows/flare_currency_selecatble_window';
import FlareCurrencyInfo             from '../windows/currency_info/currency_details';
import SceneWindowContainer          from '../../lib/containers/scene/window/scene_window_container';

/**
 * Create the actual currency scene.
 *
 * When the user selects currencies from the menu we want to
 * create a new scene which then creates a new window.
 */
class FlareCurrencyScene extends Scene_MenuBase {

  constructor() {
    super();
  }

  /**
   * Create the Currency Window
   */
  create() {
    super.create(this);
    this.createCurrencyWindowForParty();
  }

  /**
   * Listen for the canel action.
   *
   * Close the currency window, pop this scene off the stack.
   */
  update() {
    super.update(this);

    if (Input.isTriggered("cancel")) {
      this._flareCurrencyWindow.close();
      this.popScene();
    }
  }

  /**
   * Create the actual window.
   */
  createCurrencyWindowForParty() {
    SceneWindowContainer.emptyContainer();

    this._flareCurrencyWindow = new FlareCurrencySelectableWindow();
    this._flareCurrencyInfo   = new FlareCurrencyInfo();

    SceneWindowContainer.setWindowToContainer('flare-currency-info', this._flareCurrencyInfo);

    this.addWindow(this._flareCurrencyWindow);
    this.addWindow(this._flareCurrencyInfo);
  }
};

module.exports = FlareCurrencyScene;
