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

       if (window._isDeadFromBreakingLaw) {
        window._subjectWhoBrokeLaw.addState(_OptionHandler.getOptions().death_state_id);
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
