var BrokenLawWindow = require('../windows/broken_law/broken_law_window');

class FlareLawWasBrokenWindowScene extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create(this);

    this.createLawBrokenWindow();
  }

  update() {
    super.update(this);

    if (Input.isTriggered("cancel")) {
      this._flareBrokenLawWindow.close();
      this.popScene();

      // Should every one be dead when this is closed end the game.
      if ($gameParty.isAllDead()) {
        SceneManager.goto(Scene_Gameover);
      }
    }
  }

  createLawBrokenWindow() {
    this._flareBrokenLawWindow = new BrokenLawWindow();
    this.addWindow(this._flareBrokenLawWindow);
  }
}

module.exports = FlareLawWasBrokenWindowScene;
