(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FlareNotificationWindow = require('./windows/flare_notification_window');

var FlareNotification = (function () {
  function FlareNotification() {
    _classCallCheck(this, FlareNotification);
  }

  _createClass(FlareNotification, null, [{
    key: 'createNewScene',
    value: function createNewScene() {
      this._windowOpen = true;
    }
  }, {
    key: '_isWindowOpen',
    value: function _isWindowOpen() {
      if (this._windowOpen === undefined) {
        this._windowOpen = false;
      }

      return this._windowOpen;
    }
  }, {
    key: '_windowIsNotOpen',
    value: function _windowIsNotOpen() {
      this._windowOpen = false;
    }
  }]);

  return FlareNotification;
})();

window.FlareNotification = FlareNotification;

},{"./windows/flare_notification_window":3}],2:[function(require,module,exports){
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
  this._waitForWindowToClose = 175;
  this._flareNotificationWindow = null;
};

var oldSceneMapPrototypeUpdateMainMethod = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function () {
  oldSceneMapPrototypeUpdateMainMethod.call(this);

  if (this._flareNotificationWindow === null) {
    this._flareNotificationWindow = new FlareNotificationWindow();
  }

  if (!this._iswindowOpen && FlareNotification._isWindowOpen()) {
    this.addChild(this._flareNotificationWindow);
    this._flareNotificationWindow.open();
    this._isWindowOpen = true;
  }

  if (this._isWindowOpen) {
    this._waitForWindowToClose--;
    if (this._waitForWindowToClose === 0) {
      this.allowAnotherWindowToBeOpened();
    }
  }
};

Scene_Map.prototype.allowAnotherWindowToBeOpened = function () {
  FlareNotification._windowIsNotOpen();
  this._isWindowOpen = false;
  this.removeChild(this._flareNotificationWindow);
  this._flareNotificationWindow = null;
  this._waitForWindowToClose = 175;
};

var oldSceneMapPrototypeStopMethod = Scene_Map.prototype.stop;
Scene_Map.prototype.stop = function () {
  this._flareNotificationWindow.close();
  oldSceneMapPrototypeStopMethod.call(this);
};

var oldSceneMapPrototypeCallMenuMethod = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function () {
  this._flareNotificationWindow.hide();
  oldSceneMapPrototypeCallMenuMethod.call(this);
};

var SceneMapPrototypeLaunchbattleMethod = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function () {
  SceneMapPrototypeLaunchbattleMethod.call(this);
  this._flareNotificationWindow.hide();
};

},{"../windows/flare_notification_window":3}],3:[function(require,module,exports){
/**
 * Create a notiication window.
 *
 * Responsible for creating a notification window that
 * can show various type sof notifications.
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareNotificationWindow = (function (_Window_Base) {
  _inherits(FlareNotificationWindow, _Window_Base);

  function FlareNotificationWindow() {
    _classCallCheck(this, FlareNotificationWindow);

    _get(Object.getPrototypeOf(FlareNotificationWindow.prototype), "constructor", this).call(this);
    this.initialize();
  }

  _createClass(FlareNotificationWindow, [{
    key: "initialize",
    value: function initialize() {
      var width = this.windowWidth();
      var height = this.windowHeight();

      _get(Object.getPrototypeOf(FlareNotificationWindow.prototype), "initialize", this).call(this, 0, 0, width, height);

      this.contentsOpacity = 0;
      this.opacity = 0;
      this._showCount = 0;

      this.refresh();
    }
  }, {
    key: "windowWidth",
    value: function windowWidth() {
      return 360;
    }
  }, {
    key: "windowHeight",
    value: function windowHeight() {
      return this.fittingHeight(1);
    }
  }, {
    key: "update",
    value: function update() {
      _get(Object.getPrototypeOf(FlareNotificationWindow.prototype), "update", this).call(this, this);

      if (this._showCount > 0) {
        this.updateFadeIn();
        this.y += 3;
        this._showCount--;
      } else {
        this.updateFadeOut();
      }
    }
  }, {
    key: "updateFadeOut",
    value: function updateFadeOut() {
      this.contentsOpacity -= 16;
    }
  }, {
    key: "updateFadeIn",
    value: function updateFadeIn() {
      this.contentsOpacity += 16;
    }
  }, {
    key: "open",
    value: function open() {
      this.refresh();
      this._showCount = 175;
    }
  }, {
    key: "close",
    value: function close() {
      this._showCount = 0;
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var width = this.contentsWidth();
      this.drawBackground(0, 0, width, this.lineHeight());
      this.drawText("Hello World", 0, 0, width, 'center');
    }
  }, {
    key: "drawBackground",
    value: function drawBackground(x, y, width, height) {
      var colorOne = this.dimColor1();
      var ColorTwo = this.dimColor2();
      this.contents.gradientFillRect(x, y, width / 2, height, ColorTwo, colorOne);
      this.contents.gradientFillRect(x + width / 2, y, width / 2, height, colorOne, ColorTwo);
    }
  }]);

  return FlareNotificationWindow;
})(Window_Base);

module.exports = FlareNotificationWindow;

},{}]},{},[1,2]);
