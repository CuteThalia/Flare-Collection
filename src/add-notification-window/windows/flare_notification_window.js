/**
 * Create a notiication window.
 *
 * Responsible for creating a notification window that
 * can show various type sof notifications.
 */
class FlareNotificationWindow extends Window_Base {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    var width = this.windowWidth();
    var height = this.windowHeight();

    super.initialize(0, 0, width, height);

    this.contentsOpacity = 0;
    this.opacity = 0;
    this._showCount = 0;

    this.refresh();
  }

  windowWidth() {
    return 360;
  }

  windowHeight() {
    return this.fittingHeight(1);
  }

  update() {
    super.update(this);

    if (this._showCount > 0) {
      this.updateFadeIn();
      this.y += 3;
      this._showCount--;
    } else {
      this.updateFadeOut();
    }
  }

  updateFadeOut() {
    this.contentsOpacity -= 16;
  }

  updateFadeIn() {
    this.contentsOpacity += 16
  }

  open() {
    this.refresh();
    this._showCount = 175;
  }

  close() {
    this._showCount = 0;
  }

  refresh() {
    var width = this.contentsWidth();
    this.drawBackground(0, 0, width, this.lineHeight())
    this.drawText("Hello World", 0, 0, width, 'center');
  }

  drawBackground(x, y, width, height) {
    var colorOne = this.dimColor1();
    var ColorTwo = this.dimColor2();
    this.contents.gradientFillRect(x, y, width / 2, height, ColorTwo, colorOne);
    this.contents.gradientFillRect(x + width / 2, y, width / 2, height, colorOne, ColorTwo);
  }
}

module.exports = FlareNotificationWindow;
