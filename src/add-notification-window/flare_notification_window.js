class FlareScene extends Scene_Base {
  constructor() {
    super();
  }

  create() {
    super.create(this);
    this.makeWindow()
  }

  makeWindow() {
    this._flareNotificationWindow = new FlareNotificationWindow();
    this.addChild(this._flareNotificationWindow);
  }
}

class FlareNotification {

  static createNewScene() {
    SceneManager.push(FlareScene);
  }
}

window.FlareNotification = FlareNotification;
