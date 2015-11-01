(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @namespace FlareNotification.
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FlareNotificationWindow = require('./windows/flare_notification_window');
var NotificationOptions = require('./notification_options/notification_options');

/*:
 * @plugindesc Allows you to create notifications for player based events.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @param Till Next Notification?
 * @desc How long should we wait before displaying the next notification?
 * Default: 175
 * @default 175
 *
 * @param How Long Till Notification Fade Out?
 * @desc How long before the notification fades out?
 * Default: 175
 * @default 175
 *
 *
 * @help
 *
 * Notifications can be created easily, on the fly. Its amazing how easily they
 * can  be created. lets create one together:
 *
 * FlareNotification.notify(name, text);
 *
 * - name: String, name is the name of the window. All windows are pushed to
 *         a queue that is then cycled through over time. Time being the option
 *         of: Till Next Notification?
 *
 * - text: String, accepts short code like color and icon.
 *
 * Text with short codes must use double slash:
 *
 * FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
 *
 * The name of the window can be the same for all of your notifications if
 * you wish. We use, first in, first out concept:
 *
 * FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
 * FlareNotification.notify("window name", "\\i[8] \\c[10]Hello\\c[0]");
 * FlareNotification.notify("window name", "\\i[8] \\c[10]World\\c[0]");
 *
 * Hello World is First out then Hello and finally World.
 */

var FlareNotification = (function () {
  function FlareNotification() {
    _classCallCheck(this, FlareNotification);
  }

  _createClass(FlareNotification, null, [{
    key: 'notify',

    /**
     * Public API: Notify Window.
     *
     * Creates a window for the que.
     *
     * @param name - name of the window for the queue.
     * @param text - text for the window
     */
    value: function notify(name, text) {
      this._arrayOfNotifications.push({
        name: name,
        windowMethod: new FlareNotificationWindow(),
        text: text
      });
    }

    /**
     * Private Method.
     *
     * Check if the queue array length is greator then 0.
     *
     * @return bool
     */
  }, {
    key: '_isThereAQueue',
    value: function _isThereAQueue() {
      if (this._arrayOfNotifications.length > 0) {
        return true;
      }

      return false;
    }

    /**
     * Private Methd
     *
     * Gets the queue array.
     *
     * @return Array
     */
  }, {
    key: '_getQueue',
    value: function _getQueue() {
      return this._arrayOfNotifications;
    }
  }]);

  return FlareNotification;
})();

window.FlareNotification = FlareNotification;

// Set up the options.
_NotificationOptions.createNotificationOptions();

// Do not touch or manipulate this.
FlareNotification._arrayOfNotifications = [];

},{"./notification_options/notification_options":2,"./windows/flare_notification_window":4}],2:[function(require,module,exports){
/**
 * @namespace FlareNotification.
 */

// Plugin Options.
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FlareNotificationWindow = PluginManager.parameters('Flare-NotificationWindow');

/**
 * Notifiation Options.
 *
 * Set options such as how long till the next window and how long till
 * a window fades out after it fades in.
 */

var NotificationOptions = (function () {
  function NotificationOptions() {
    _classCallCheck(this, NotificationOptions);
  }

  // Private global object.

  _createClass(NotificationOptions, null, [{
    key: 'createNotificationOptions',
    value: function createNotificationOptions() {
      this._notificationOptions = {
        time_till_next_window: FlareNotificationWindow['Till Next Notification?'],
        fade_out_time: FlareNotificationWindow['How Long Till Notification Fade Out?']
      };
    }
  }, {
    key: 'getNotificationOptions',
    value: function getNotificationOptions() {
      return this._notificationOptions;
    }
  }]);

  return NotificationOptions;
})();

window._NotificationOptions = NotificationOptions;
_NotificationOptions._notificationOptions = null;

module.exports = NotificationOptions;

},{}],3:[function(require,module,exports){
/**
 * @namespace FlareNotification.
 */

/**
 * Responsible for updating scene map.
 *
 * Allows us to show notifications on the map.
 */

'use strict';

var FlareNotificationWindow = require('../windows/flare_notification_window');

var oldSceneMapPrototypeInitializeMethod = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
  oldSceneMapPrototypeInitializeMethod.call(this);
  this._isWindowOpen = false;

  var timeTillNextwindow = _NotificationOptions.getNotificationOptions().time_till_next_window;

  if (isNaN(parseInt(timeTillNextwindow))) {
    throw new Error('Sorry but: ' + timeTillNextwindow + ' is not a number');
  }

  this._waitForWindowToClose = timeTillNextwindow;
  this._flareNotificationWindow = null;
  this._flareWindow = null;
};

var oldSceneMapPrototypeUpdateMainMethod = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function () {
  oldSceneMapPrototypeUpdateMainMethod.call(this);

  if (FlareNotification._getQueue().length > 0) {
    this.handleQueue();
  }
};

Scene_Map.prototype.handleQueue = function () {
  if (this._waitForWindowToClose > 0) {
    this.openFlareNotificationWindow();
    this._waitForWindowToClose--;
  } else {
    this.allowAnotherWindowToBeOpened(this._flareWindow);
  }
};

Scene_Map.prototype.openFlareNotificationWindow = function () {
  if (this._flareWindow === null) {
    this._flareWindow = FlareNotification._getQueue().shift();
    this.addChild(this._flareWindow.windowMethod);
    this._flareWindow.windowMethod.open(this._flareWindow.text);
  }
};

Scene_Map.prototype.allowAnotherWindowToBeOpened = function (flareNotification) {
  this.removeChild(flareNotification);
  this._flareWindow = null;
  this._waitForWindowToClose = 75;
};

var oldSceneMapPrototypeStopMethod = Scene_Map.prototype.stop;
Scene_Map.prototype.stop = function () {
  if (this._flareWindow !== null) {
    this._flareWindow.close();
  }

  oldSceneMapPrototypeStopMethod.call(this);
};

var oldSceneMapPrototypeCallMenuMethod = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function () {
  if (this._flareWindow !== null) {
    this._flareWindow.hide();
  }
  oldSceneMapPrototypeCallMenuMethod.call(this);
};

var SceneMapPrototypeLaunchbattleMethod = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function () {
  SceneMapPrototypeLaunchbattleMethod.call(this);
  if (this._flareWindow !== null) {
    this._flareWindow.hide();
  }
};

},{"../windows/flare_notification_window":4}],4:[function(require,module,exports){
/**
 * @namespace FlareNotification.
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareWindowBase = require('../../flare_window_base');

/**
 * Create a notiication window.
 *
 * Responsible for creating a notification window that
 * can show various type sof notifications.
 */

var FlareNotificationWindow = (function (_FlareWindowBase) {
  _inherits(FlareNotificationWindow, _FlareWindowBase);

  function FlareNotificationWindow() {
    _classCallCheck(this, FlareNotificationWindow);

    _get(Object.getPrototypeOf(FlareNotificationWindow.prototype), 'constructor', this).call(this);
    this.initialize();
  }

  _createClass(FlareNotificationWindow, [{
    key: 'initialize',
    value: function initialize() {
      var width = this.windowWidth();
      var height = this.windowHeight();

      _get(Object.getPrototypeOf(FlareNotificationWindow.prototype), 'initialize', this).call(this, 0, 0, width, height);

      this.contentsOpacity = 0;
      this.opacity = 0;
      this._showCount = 0;

      this.refresh();
    }
  }, {
    key: 'windowWidth',
    value: function windowWidth() {
      return 360;
    }
  }, {
    key: 'windowHeight',
    value: function windowHeight() {
      return this.fittingHeight(1);
    }
  }, {
    key: 'update',
    value: function update() {
      _get(Object.getPrototypeOf(FlareNotificationWindow.prototype), 'update', this).call(this, this);

      if (this._showCount > 0) {
        this.updateFadeIn();
        this.y += 3;
        this._showCount--;
      } else {
        this.updateFadeOut();
      }
    }
  }, {
    key: 'updateFadeOut',
    value: function updateFadeOut() {
      this.contentsOpacity -= 16;
    }
  }, {
    key: 'updateFadeIn',
    value: function updateFadeIn() {
      this.contentsOpacity += 16;
    }
  }, {
    key: 'open',
    value: function open(text) {

      this.refresh(text);

      var fadeOutTime = _NotificationOptions.getNotificationOptions().fade_out_time;

      if (isNaN(parseInt(fadeOutTime))) {
        throw new Error('Sorry but: ' + fadeOutTime + ' is not a number');
      }

      this._showCount = fadeOutTime;
    }
  }, {
    key: 'close',
    value: function close() {
      this._showCount = 0;
    }
  }, {
    key: 'refresh',
    value: function refresh(text) {
      var width = this.contentsWidth();
      this.drawBackground(0, 0, width, this.lineHeight());
      this.flareDrawTextEx(text, 0, 0, width, 'center');
      this.resetFontSettings();
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground(x, y, width, height) {
      var colorOne = this.dimColor1();
      var ColorTwo = this.dimColor2();
      this.contents.gradientFillRect(x, y, width / 2, height, ColorTwo, colorOne);
      this.contents.gradientFillRect(x + width / 2, y, width / 2, height, colorOne, ColorTwo);
    }
  }]);

  return FlareNotificationWindow;
})(FlareWindowBase);

module.exports = FlareNotificationWindow;

},{"../../flare_window_base":5}],5:[function(require,module,exports){
/**
 * @namespace FlareCollection
 */

/**
 * All Flare based items use this window base.
 *
 * Flare Window Base extends the Window Base Class
 * and adds some additional generic helper methods
 * that are useful for creating windows and their contents.
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareWindowBase = (function (_Window_Base) {
  _inherits(FlareWindowBase, _Window_Base);

  function FlareWindowBase() {
    _classCallCheck(this, FlareWindowBase);

    _get(Object.getPrototypeOf(FlareWindowBase.prototype), "constructor", this).call(this);
  }

  /**
   * Custom drawtextEx function.
   *
   * We do not reset font settings, which is what the default method does.
   * I dont like giant text in my windows.
   *
   * It is usp to the implementor to call: this.resetFontSettings();
   */

  _createClass(FlareWindowBase, [{
    key: "flareDrawTextEx",
    value: function flareDrawTextEx(text, x, y) {
      if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        while (textState.index < textState.text.length) {
          this.processCharacter(textState);
        }
        return textState.x - x;
      } else {
        return 0;
      }
    }
  }]);

  return FlareWindowBase;
})(Window_Base);

module.exports = FlareWindowBase;

},{}]},{},[1,3]);
