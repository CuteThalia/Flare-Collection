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
    }
  }

  createLawBrokenWindow() {
    this._flareBrokenLawWindow = new BrokenLawWindow();
    this.addWindow(this._flareBrokenLawWindow);
  }
}

module.exports = FlareLawWasBrokenWindowScene;
