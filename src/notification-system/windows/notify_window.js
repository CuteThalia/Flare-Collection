var FlareWindowBase = require('../../flare_window_base');


class NotifyWindow extends FlareWindowBase {

  constructor() {
    super();
    this.initialize()
  }

  initialize() {
    super.initialize(this, 0, 0, 360, this.fittingHeight(1));

    this.opacity         = 0;
    this.contentsOpacity = 0;
    this._showCount      = 0;

    this.refresh();
  }

  update() {
    super.update(this);

    if (this._showCount > 0) {
      this.updateFadeInAndMove();
      this._showCount--;
    } else {
      this.updateFadeOut();
    }
  }

  updateFadeInAndMove() {
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
    this.drawBackground(0, 0, width, this.lineHeight())
    this.drawText('asdasdas', 0, 0, width, 'center');
  }

  drawBackground(x, y, width, height) {
    var colorOne = this.dimColor1();
    var colorTwo = this.dimColor2();

    this.contents.gradientFillRect(x, y, width / 2, height, colorTwo, colorOne);
    this.contents.gradientFillRect(x + width / 2, y, width / 2, height, colorOne, colorTwo);
  }
}

module.exports = NotifyWindow;
