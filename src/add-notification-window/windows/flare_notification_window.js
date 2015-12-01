/**
 * @namespace FlareNotification.
 */

import FlareWindowBase    from '../../flare_window_base';
import WindowOptions      from '../notification/window/options';
import lodashIsUndefined  from 'lodash/lang/isUndefined';

/**
 * Create a notiication window.
 *
 * Responsible for creating a notification window that
 * can show various type sof notifications.
 */
class FlareNotificationWindow extends FlareWindowBase {

  constructor(options) {
    super();
    this.initialize(options);
  }

  initialize(options) {
    if (!lodashIsUndefined(options) && !lodashIsUndefined(options.windowWidth)) {
      this._windowWidth = options.windowWidth;
    } else {
      this._windowWidth = 350;
    }

    var width = this._windowWidth;
    var height = this.windowHeight();

    var x = 0;
    var y = 0;

    if (!lodashIsUndefined(options) && !lodashIsUndefined(options.windowX)) {
      x = options.windowX;
    }

    if (!lodashIsUndefined(options) && !lodashIsUndefined(options.windowY)) {
      y = options.windowY;
    }

    if (!lodashIsUndefined(options) && !lodashIsUndefined(options.fontSize)) {
      this._fontSize = options.fontSize;
    } else {
      this._fontSize = 22;
    }

    super.initialize(x, y, width, height);

    this.contentsOpacity = 0;
    this.opacity = 0;
    this._showCount = 0;
    this._storeShowCount = 0;
    this._fadeInFinished = false;

    this.refresh();
  }

  windowWidth() {
    return this._windowWidth;
  }

  windowHeight() {
    return this.fittingHeight(1);
  }

  update() {
    super.update(this);

    if (this._showCount > 0) {
      this.updateFadeIn();

      if (!WindowOptions.getContainer().shouldWeStayAtTop ||
          !_NotificationOptions.getNotificationOptions().stick_to_top) {
        this.y += 3;
      }

      this._showCount--;
    } else {
      this.updateFadeOut();
    }
  }

  updateFadeOut() {
    this.contentsOpacity -= 16;
  }

  updateFadeIn() {
    if (this.contentsOpacity === 255) {
      this._fadeInFinished = true;
    }

    if (this._fadeInFinished) {
      if (WindowOptions.getContainer().showWeFadeoutTowardsBottom &&
          this._showCount < this._storeShowCountHalf) {

        this.contentsOpacity -= 16;
      }
    } else {
      this.contentsOpacity += 16
    }
  }

  open(text, windowWidth) {

    if (!lodashIsUndefined(windowWidth)) {
      this._windowWidth = windowWidth;
    }

    this.refresh(text);

    var fadeOutTime = _NotificationOptions.getNotificationOptions().fade_out_time;

    if (isNaN(parseInt(fadeOutTime))) {
      throw new Error('Sorry but: ' + fadeOutTime + ' is not a number');
    }

    this._showCount          = fadeOutTime;
    this._storeShowCountHalf = Math.round(eval(_NotificationOptions.getNotificationOptions().fade_out_calculation));
  }

  close() {
    this._showCount = 0;
  }

  refresh(text) {
    var width = this.contentsWidth();

    this.contents.fontSize = this._fontSize;

    if (_NotificationOptions.getNotificationOptions().show_window === "true") {
      this.drawBackground(0, 0, width, this.lineHeight())
    }

    this.flareDrawTextEx(text, 0, 0, width, 'center');
    this.resetFontSettings();
  }

  drawBackground(x, y, width, height) {
    var colorOne = this.dimColor1();
    var ColorTwo = this.dimColor2();
    this.contents.gradientFillRect(x, y, width / 2, height, ColorTwo, colorOne);
    this.contents.gradientFillRect(x + width / 2, y, width / 2, height, colorOne, ColorTwo);
  }
}

module.exports = FlareNotificationWindow;
