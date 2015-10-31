/**
 * @namespace FlareNotify
 *
 */

var FlareWindowBase = require('../../flare_window_base');

/**
 * Creates a notification Window.
 *
 * Cretes a simple notificiation window similar to the map
 * name window.
 */
class FlareNotifyWindow extends FlareWindowBase {

  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    super.initialize(this, 0, 0, this.windowWidth(), this.windowHeight());

    this.opacity         = 0;
    this.contentsOpacity = 0;
    this._showCount      = 0;
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
      this._showCount--;
    } else {
      this.updateFadeOut();
    }
  }

  updateFadeIn() {
    this.contentsOpacity += 16;
  }

  updateFadeOut() {
    this.contentsOpacity -= 16;
  }

  open() {
    this.refresh();
    this._showCount = 175;
  }

  close() {
    this._showCount = 0;
  }

  refresh() {
    this.contents.clear();

    var width = this.contentsWidth();
    this.drawBackground(0, 0, 324, this.lineHeight());
    this.drawText('Hello World', 0, 0, 324, 'center');

    console.log(this.contents);
  }

  drawBackground(x, y, width, height) {
    var colorOne = this.dimColor1();
    var colorTwo = this.dimColor2();

    this.contents.gradientFillRect(x, y, width / 2, height, colorTwo, colorOne);
    this.contents.gradientFillRect(x + width / 2, y, width / 2, height, colorOne, colorTwo);
  }
}

module.exports = FlareNotifyWindow;
