var FlareCurrencyWindow = require('../windows/flare_currency_window.js');

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
    this._flareCurrencyWindow = new FlareCurrencyWindow();
    this.addWindow(this._flareCurrencyWindow);
  }
};

module.exports = FlareCurrencyScene;
