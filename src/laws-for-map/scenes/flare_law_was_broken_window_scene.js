import BrokenLawWindow from '../windows/broken_law/broken_law_window';

/**
 * @namespace FlareLawsForMap.
 */

/**
 * Creates a scene for showing when a law was broken on the map.
 */
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
      } else {
        window._brokenLawObject = null;
      }
    }
  }

  createLawBrokenWindow() {
    this._flareBrokenLawWindow = new BrokenLawWindow();
    this.addWindow(this._flareBrokenLawWindow);
  }
}

module.exports = FlareLawWasBrokenWindowScene;
