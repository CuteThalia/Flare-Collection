(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

},{}],2:[function(require,module,exports){
/**
 * @namespace FlareNotify
 */

/*:
 * @plugindesc creates notification windows via events.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 *
 * @help
 *
 */

/**
 * Public API Class. Flare Notifications.
 *
 * Class that contains public methods that can be called
 * via the window.FlareNotifcations
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlareNotifications = (function () {
  function FlareNotifications() {
    _classCallCheck(this, FlareNotifications);
  }

  _createClass(FlareNotifications, null, [{
    key: "createNotificationWindow",
    value: function createNotificationWindow() {
      SceneManager.push(FlareNotificationScene);
    }
  }]);

  return FlareNotifications;
})();

window.FlareNotifications = FlareNotifications;

},{}],3:[function(require,module,exports){
/**
 * @namespace FlareNotify
 *
 */

/**
 * Make changes to the Scene Map.
 *
 * Changes here allow for the notification
 * window to open.
 */

'use strict';

var FlareNotifyWindow = require('../windows/notify_window');

var oldSceneMapPrototypeInitializeMethod = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
  oldSceneMapPrototypeInitializeMethod.call(this);
  this._notificationWindowIsOpen = false;
};

var sceneMapPrototypeCreateDisplayObjectsMethod = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function () {
  sceneMapPrototypeCreateDisplayObjectsMethod.call(this);
  this.addFlareNotificationWindow();
};

Scene_Map.prototype.addFlareNotificationWindow = function () {
  this._flareNotificationWindow = new FlareNotifyWindow();
  this.addChild(this._flareNotificationWindow);
};

var oldSceneMapPrototypeUpdateMainMethod = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function () {
  //oldSceneMapPrototypeUpdateMainMethod.call(this);

  if (!this._notificationWindowIsOpen) {
    this._flareNotificationWindow.open();
    this._notificationWindowIsOpen = true;
  }
};

var oldSceneMapPrototypeCallMenuMethod = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function () {
  oldSceneMapPrototypeCallMenuMethod.call(this);
  this._flareNotificationWindow.hide();
};

var oldSceneMapPrototypeLaunchBattleMethod = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function () {
  oldSceneMapPrototypeLaunchBattleMethod.call(this);
  this._flareNotificationWindow.hide();
};

var oldSceneMapPrototypeStopMethod = Scene_Map.prototype.stop;
Scene_Map.prototype.stop = function () {
  oldSceneMapPrototypeStopMethod.call(this);
  this._flareNotificationWindow.close();
};

},{"../windows/notify_window":4}],4:[function(require,module,exports){
/**
 * @namespace FlareNotify
 *
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareWindowBase = require('../../flare_window_base');

/**
 * Creates a notification Window.
 *
 * Cretes a simple notificiation window similar to the map
 * name window.
 */

var FlareNotifyWindow = (function (_FlareWindowBase) {
  _inherits(FlareNotifyWindow, _FlareWindowBase);

  function FlareNotifyWindow() {
    _classCallCheck(this, FlareNotifyWindow);

    _get(Object.getPrototypeOf(FlareNotifyWindow.prototype), 'constructor', this).call(this);
    this.initialize();
  }

  _createClass(FlareNotifyWindow, [{
    key: 'initialize',
    value: function initialize() {
      _get(Object.getPrototypeOf(FlareNotifyWindow.prototype), 'initialize', this).call(this, this, 0, 0, this.windowWidth(), this.windowHeight());

      this.opacity = 0;
      this.contentsOpacity = 0;
      this._showCount = 0;
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
      _get(Object.getPrototypeOf(FlareNotifyWindow.prototype), 'update', this).call(this, this);

      if (this._showCount > 0) {
        this.updateFadeIn();
        this._showCount--;
      } else {
        this.updateFadeOut();
      }
    }
  }, {
    key: 'updateFadeIn',
    value: function updateFadeIn() {
      this.contentsOpacity += 16;
    }
  }, {
    key: 'updateFadeOut',
    value: function updateFadeOut() {
      this.contentsOpacity -= 16;
    }
  }, {
    key: 'open',
    value: function open() {
      this.refresh();
      this._showCount = 175;
    }
  }, {
    key: 'close',
    value: function close() {
      this._showCount = 0;
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.contents.clear();

      var width = this.contentsWidth();
      this.drawBackground(0, 0, 324, this.lineHeight());
      this.drawText('Hello World', 0, 0, 324, 'center');

      console.log(this.contents);
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground(x, y, width, height) {
      var colorOne = this.dimColor1();
      var colorTwo = this.dimColor2();

      this.contents.gradientFillRect(x, y, width / 2, height, colorTwo, colorOne);
      this.contents.gradientFillRect(x + width / 2, y, width / 2, height, colorOne, colorTwo);
    }
  }]);

  return FlareNotifyWindow;
})(FlareWindowBase);

module.exports = FlareNotifyWindow;

},{"../../flare_window_base":1}]},{},[2,3]);
