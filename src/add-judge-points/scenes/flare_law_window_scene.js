var FlareLawWindow = require('../windows/laws_window');

class FlareLawWindowScene extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create(this);

    this.createLawWindowForParty();
  }

  update() {
    super.update(this);

    if (Input.isTriggered("cancel")) {
      this._flareLawWindow.close();
      this.popScene();
    }
  }

  createLawWindowForParty() {
    this._flareLawWindow = new FlareLawWindow();
    this.addWindow(this._flareLawWindow);
  }
}

module.exports = FlareLawWindowScene;
