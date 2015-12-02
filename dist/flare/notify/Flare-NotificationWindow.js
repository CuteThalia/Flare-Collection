(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @namespace FlareNotification.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _flare_notification_window = require('./windows/flare_notification_window');

var _flare_notification_window2 = _interopRequireDefault(_flare_notification_window);

var _notification_options = require('./notification_options/notification_options');

var _notification_options2 = _interopRequireDefault(_notification_options);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _options = require('./notification/window/options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
 * @param Should I stay at the top?
 * @desc Should the notification stay at the top?
 * Default: false
 * @default false
 *
 * @param Calulation For Fade out
 * @desc calculate how soon after fade in we should fade out.
 * Default: (175 / 2) + 50
 * @default (175 / 2) + 50
 *
 * @param Show Window?
 * @desc Do we want a window behind the text?
 * Default: true
 * @default true
 *
 * @param ---Gold Event---
 * @desc
 *
 * @param Display Gold Notification Event?
 * @desc When party gains gold via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Gold Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Gold Notification Font Size
 * @desc What font size should we use on the gold notification window?
 * Default: 20
 * @default 20
 *
 * @param Gold Notification Stay At The Top?
 * @desc Should the gold notification windw stay at the top?
 * Default: false
 * @default false
 *
 * @param Gold Notification Should Fadeout?
 * @desc Should the gold window fade out if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---Item Event---
 * @desc
 *
 * @param Display Item Notification Event?
 * @desc When party gains item via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Item Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Item Notification Font Size
 * @desc What font size should we use on the item notification window?
 * Default: 20
 * @default 20
 *
 * @param Item Notification Stay At The Top?
 * @desc Should the item notification windw stay at the top?
 * Default: false
 * @default false
 *
 * @param Item Notification Should Fadeout?
 * @desc Should the item window fade out if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---Weapon Event---
 * @desc
 *
 * @param Display Weapon Notification Event?
 * @desc When party gains weapon via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Weapon Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Weapon Notification Font Size
 * @desc What font size should we use on the weapon notification window?
 * Default: 20
 * @default 20
 *
 * @param Weapon Notification Stay At The Top?
 * @desc Should the weapon notification windw stay at the top?
 * Default: false
 * @default false
 *
 * @param Weapon Notification Should Fadeout?
 * @desc Should the weapon window fade out if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---Armor Event---
 * @desc
 *
 * @param Display Armor Notification Event?
 * @desc When party gains armor via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Armor Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Armor Notification Font Size
 * @desc What font size should we use on the armor notification window?
 * Default: 20
 * @default 20
 *
 * @param Armor Notification Stay At The Top?
 * @desc Should the armor notification windw stay at the top?
 * Default: false
 * @default false
 *
 * @param Armor Notification Should Fadeout?
 * @desc Should the armor window fade out if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @param ---Party Event---
 * @desc
 *
 * @param Display Party Notification Event?
 * @desc When party gains an actor via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Party Notification Width
 * @desc What width should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Party Notification Font Size
 * @desc What font size should we use on the party notification window?
 * Default: 20
 * @default 20
 *
 * @param Party Notification Stay At The Top?
 * @desc Should the party notification windw stay at the top?
 * Default: false
 * @default false
 *
 * @param Party Notification Should Fadeout?
 * @desc Should the party window fade out if it isn't staying at the top?
 * Default: true
 * @default true
 *
 * @help
 *
 * Notifications can be created easily, on the fly. Its amazing how easily they
 * can  be created. lets create one together:
 *
 * FlareNotification.notify(text, stickToTop, fadeOutNearBottom);
 *
 * - text: String, accepts short code like color and icon.
 * - StickToTop: Boolean, default false. Sticks to the top of the screen if enabled.
 * - fadeOutNearBottom: Boolean, default false. Fades out using plugin configured fade out time.
 *
 * Text with short codes must use double slash:
 *
 * FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
 *
 * The name of the window can be the same for all of your notifications if
 * you wish. We use, first in, first out concept:
 *
 * FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
 * FlareNotification.notify("\\i[8] \\c[10]Hello\\c[0]");
 * FlareNotification.notify("\\i[8] \\c[10]World\\c[0]");
 *
 * Hello World is First out then Hello and finally World.
 *
 * === Notification on event gain ===
 *
 * There is options for each type of event, such as width, stay at the top, fadeout and font size.
 *
 * We also have an option to show the event should you want too disable that particular
 * event notification.
 *
 * By defauly all notifications will show at the top and slide down the page fading out over time.
 *
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
     * @param text - text for the window
     */
    value: function notify(text, stayAtTop, fadeoutTowardsBottom, options) {
      this._arrayOfNotifications.push({
        windowMethod: new _flare_notification_window2.default(options),
        text: text
      });

      var stayAtTop = false ? (0, _isUndefined2.default)(stayAtTop) : stayAtTop;
      var fadeoutTowardsBottom = false ? (0, _isUndefined2.default)(fadeoutTowardsBottom) : fadeoutTowardsBottom;

      _options2.default.setOption('shouldWeStayAtTop', stayAtTop);
      _options2.default.setOption('shouldWeFadeOutTowardsBottom', fadeoutTowardsBottom);
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

},{"./notification/window/options":3,"./notification_options/notification_options":4,"./windows/flare_notification_window":7,"lodash/lang/isUndefined":1}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @namespace FlareNotification.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Sets options for the notification windo by key/value
 */

var NotificationWindowOptions = (function () {
  function NotificationWindowOptions() {
    _classCallCheck(this, NotificationWindowOptions);
  }

  _createClass(NotificationWindowOptions, null, [{
    key: 'setOption',

    /**
     * Sets an option by key => value
     *
     * @param string key
     * @param mixed value
     */
    value: function setOption(key, value) {
      if ((0, _isUndefined2.default)(this._windowOptions)) {
        this._windowOptions = {};
      }

      this._windowOptions[key] = value;
    }

    /**
     * Returns the container
     *
     * @return Object
     */

  }, {
    key: 'getContainer',
    value: function getContainer() {
      return this._windowOptions;
    }
  }]);

  return NotificationWindowOptions;
})();

module.exports = NotificationWindowOptions;

},{"lodash/lang/isUndefined":1}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @namespace FlareNotification.
*/

// Plugin Options.
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

  _createClass(NotificationOptions, null, [{
    key: 'createNotificationOptions',
    value: function createNotificationOptions() {
      this.getGoldInformation(FlareNotificationWindow);
      this.getItemInformation(FlareNotificationWindow);
      this.getWeaponInformation(FlareNotificationWindow);
      this.getPartyInformation(FlareNotificationWindow);

      this._notificationOptions = {
        timeTillNextWindow: FlareNotificationWindow['Till Next Notification?'],
        fadeOutTime: FlareNotificationWindow['How Long Till Notification Fade Out?'],
        stickToTop: FlareNotificationWindow['Should I stay at the top?'],
        fadeOutCalculation: FlareNotificationWindow['Calulation For Fade out'],
        showWindow: FlareNotificationWindow['Show Window?'],
        showGoldNotificationEvent: FlareNotificationWindow['Display Gold Notification Event?'],
        goldNotificationWindowWidth: parseInt(FlareNotificationWindow['Gold Notification Width']),
        goldNotificationFontSize: parseInt(FlareNotificationWindow['Gold Notification Font Size']),
        goldNotificationWindowMoveDown: this._goldNotificationWindowMoveDown,
        goldNotificationWindowFadeOut: this._goldNotificationWindowFadeOut,
        showItemNotificationEvent: FlareNotificationWindow['Display Item Notification Event?'],
        itemNotificationWindowWidth: parseInt(FlareNotificationWindow['Item Notification Width']),
        itemNotificationFontSize: parseInt(FlareNotificationWindow['Item Notification Font Size']),
        itemNotificationWindowMoveDown: this._itemNotificationWindowMoveDown,
        itemNotificationWindowFadeOut: this._itemNotificationWindowFadeOut,
        showWeaponNotificationEvent: FlareNotificationWindow['Display Weapon Notification Event?'],
        weaponNotificationWindowWidth: parseInt(FlareNotificationWindow['Weapon Notification Width']),
        weaponNotificationFontSize: parseInt(FlareNotificationWindow['Weapon Notification Font Size']),
        weaponNotificationWindowMoveDown: this._weaponNotificationWindowMoveDown,
        weaponNotificationWindowFadeOut: this._weaponNotificationWindowFadeOut,
        showArmorNotificationEvent: FlareNotificationWindow['Display Armor Notification Event?'],
        armorNotificationWindowWidth: parseInt(FlareNotificationWindow['Armor Notification Width']),
        armorNotificationFontSize: parseInt(FlareNotificationWindow['Armor Notification Font Size']),
        armorNotificationWindowMoveDown: this._armorNotificationWindowMoveDown,
        armorNotificationWindowFadeOut: this._armorNotificationWindowFadeOut,
        showPartyMemberJoiningParty: FlareNotificationWindow['Display Party Notification Event?'],
        partyNotificationWindowWidth: parseInt(FlareNotificationWindow['Party Notification Width']),
        partyNotificationFontSize: parseInt(FlareNotificationWindow['Party Notification Font Size']),
        partyNotificationWindowMoveDown: this._partyNotificationWindowMoveDown,
        partyNotificationWindowFadeOut: this._partyNotificationWindowFadeOut
      };
    }
  }, {
    key: 'getNotificationOptions',
    value: function getNotificationOptions() {
      return this._notificationOptions;
    }
  }, {
    key: 'getGoldInformation',
    value: function getGoldInformation(pluginOptions) {
      this._goldNotificationWindowMoveDown = false;
      this._goldNotificationWindowFadeOut = false;

      if (pluginOptions['Gold Notification Stay At The Top?'] === "true") {
        this._goldNotificationWindowMoveDown = true;
      }

      if (pluginOptions['Gold Notification Should Fadeout?'] === "true") {
        this._goldNotificationWindowFadeOut = true;
      }
    }
  }, {
    key: 'getItemInformation',
    value: function getItemInformation(pluginOptions) {
      this._itemNotificationWindowMoveDown = false;
      this._itemNotificationWindowFadeOut = false;

      if (pluginOptions['Item Notification Stay At The Top?'] === "true") {
        this._itemNotificationWindowMoveDown = true;
      }

      if (pluginOptions['Item Notification Should Fadeout?'] === "true") {
        this._itemNotificationWindowFadeOut = true;
      }
    }
  }, {
    key: 'getWeaponInformation',
    value: function getWeaponInformation(pluginOptions) {
      this._weaponNotificationWindowMoveDown = false;
      this._weaponNotificationWindowFadeOut = false;

      if (pluginOptions['Weapon Notification Stay At The Top?'] === "true") {
        this._weaponNotificationWindowMoveDown = true;
      }

      if (pluginOptions['Weapon Notification Should Fadeout?'] === "true") {
        this._weaponNotificationWindowFadeOut = true;
      }
    }
  }, {
    key: 'getArmorInformation',
    value: function getArmorInformation(pluginOptions) {
      this._armorNotificationWindowMoveDown = false;
      this._armorNotificationWindowFadeOut = false;

      if (pluginOptions['Armor Notification Stay At The Top?'] === "true") {
        this._armorNotificationWindowMoveDown = true;
      }

      if (pluginOptions['Armor Notification Should Fadeout?'] === "true") {
        this._armorNotificationWindowFadeOut = true;
      }
    }
  }, {
    key: 'getPartyInformation',
    value: function getPartyInformation(pluginOptions) {
      this._partyNotificationWindowMoveDown = false;
      this._partyNotificationWindowFadeOut = false;

      if (pluginOptions['Party Notification Stay At The Top?'] === "true") {
        this._partyNotificationWindowMoveDown = true;
      }

      if (pluginOptions['Party Notification Should Fadeout?'] === "true") {
        this._partyNotificationWindowFadeOut = true;
      }
    }
  }]);

  return NotificationOptions;
})();

// Private global object.

window._NotificationOptions = NotificationOptions;

module.exports = NotificationOptions;

},{}],5:[function(require,module,exports){
'use strict';

var _flare_notification_window = require('../windows/flare_notification_window');

var _flare_notification_window2 = _interopRequireDefault(_flare_notification_window);

var _options = require('../notification/window/options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace FlareNotification.
 */

/**
 * Responsible for updating scene map.
 *
 * Allows us to show notifications on the map.
 */

var oldSceneMapPrototypeInitializeMethod = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
  oldSceneMapPrototypeInitializeMethod.call(this);
  this._isWindowOpen = false;

  var timeTillNextwindow = _NotificationOptions.getNotificationOptions().timeTillNextWindow;

  if (isNaN(parseInt(timeTillNextwindow))) {
    throw new Error('Sorry but: ' + timeTillNextwindow + ' is not a number');
  }

  this._waitForWindowToClose = timeTillNextwindow;
  this._flareWindow = null;
};

var oldSceneMapPrototypeUpdateMainMethod = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function () {
  oldSceneMapPrototypeUpdateMainMethod.call(this);

  if (this._waitForWindowToClose > 0) {
    this._waitForWindowToClose--;
  } else if (FlareNotification._getQueue().length > 0) {
    this.handleQueue();
  }
};

Scene_Map.prototype.handleQueue = function () {
  this.openFlareNotificationWindow();
  this.allowAnotherWindowToBeOpened(this._flareWindow);
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

},{"../notification/window/options":3,"../windows/flare_notification_window":7}],6:[function(require,module,exports){
'use strict';

var _notification_options = require('../notification_options/notification_options');

var _notification_options2 = _interopRequireDefault(_notification_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Change Gold
Game_Interpreter.prototype.command125 = function () {
  var value = this.operateValue(this._params[0], this._params[1], this._params[2]);
  var text = '';

  if (value < 0) {
    text = "\\c[16]Party Loses Gold in the amount of\\c[0]: " + Math.abs(value);
  } else {
    text = "\\c[16]Party Gains Gold in the amount of\\c[0]: " + Math.abs(value);
  }

  this.processNotificationEvents(text, "showGoldNotificationEvent", value, {
    moveDown: _notification_options2.default.getNotificationOptions().goldNotificationWindowMoveDown,
    fadeOut: _notification_options2.default.getNotificationOptions().goldNotificationWindowFadeOut,
    windowOptions: {
      windowWidth: _notification_options2.default.getNotificationOptions().goldNotificationWindowWidth,
      fontSize: _notification_options2.default.getNotificationOptions().goldNotificationFontSize
    }
  });

  $gameParty.gainGold(value);
  return true;
};

// Items
Game_Interpreter.prototype.command126 = function () {
  var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
  var text = '';

  if (value < 0) {
    text = "\\c[16]Party Loses " + Math.abs(value) + " \\i[" + $dataItems[this._params[0]].iconIndex + "] \\c[0]" + $dataItems[this._params[0]].name + "(s)";
  } else {
    text = "\\c[16]Party Gains " + Math.abs(value) + " \\i[" + $dataItems[this._params[0]].iconIndex + "] \\c[0]" + $dataItems[this._params[0]].name + "(s)";
  }

  this.processNotificationEvents(text, "showItemNotificationEvent", value, {
    moveDown: _notification_options2.default.getNotificationOptions().itemNotificationWindowMoveDown,
    fadeOut: _notification_options2.default.getNotificationOptions().itemNotificationWindowFadeOut,
    windowOptions: {
      windowWidth: _notification_options2.default.getNotificationOptions().itemNotificationWindowWidth,
      fontSize: _notification_options2.default.getNotificationOptions().itemNotificationFontSize
    }
  });

  $gameParty.gainItem($dataItems[this._params[0]], value);
  return true;
};

// Weapons
Game_Interpreter.prototype.command127 = function () {
  var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
  var text = '';

  if (value < 0) {
    text = "\\c[16]Party Loses " + Math.abs(value) + " \\i[" + $dataWeapons[this._params[0]].iconIndex + "] \\c[0]" + $dataWeapons[this._params[0]].name + "(s)";
  } else {
    text = "\\c[16]Party Gains " + Math.abs(value) + " \\i[" + $dataWeapons[this._params[0]].iconIndex + "] \\c[0]" + $dataWeapons[this._params[0]].name + "(s)";
  }

  this.processNotificationEvents(text, "showWeaponNotificationEvent", value, {
    moveDown: _notification_options2.default.getNotificationOptions().weaponNotificationWindowMoveDown,
    fadeOut: _notification_options2.default.getNotificationOptions().weaponNotificationWindowFadeOut,
    windowOptions: {
      windowWidth: _notification_options2.default.getNotificationOptions().weaponNotificationWindowWidth,
      fontSize: _notification_options2.default.getNotificationOptions().weaponNotificationFontSize
    }
  });

  $gameParty.gainItem($dataWeapons[this._params[0]], value, this._params[4]);
  return true;
};

// Armors
Game_Interpreter.prototype.command128 = function () {
  var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
  var text = '';

  if (value < 0) {
    text = "\\c[16]Party Loses " + Math.abs(value) + " \\i[" + $dataArmors[this._params[0]].iconIndex + "] \\c[0]" + $dataArmors[this._params[0]].name + "(s)";
  } else {
    text = "\\c[16]Party Gains " + Math.abs(value) + " \\i[" + $dataArmors[this._params[0]].iconIndex + "] \\c[0]" + $dataArmors[this._params[0]].name + "(s)";
  }

  this.processNotificationEvents(text, "showArmorNotificationEvent", value, {
    moveDown: _notification_options2.default.getNotificationOptions().armorNotificationWindowMoveDown,
    fadeOut: _notification_options2.default.getNotificationOptions().armorNotificationWindowFadeOut,
    windowOptions: {
      windowWidth: _notification_options2.default.getNotificationOptions().armorNotificationWindowWidth,
      fontSize: _notification_options2.default.getNotificationOptions().armorNotificationFontSize
    }
  });

  $gameParty.gainItem($dataArmors[this._params[0]], value, this._params[4]);
  return true;
};

// Party
Game_Interpreter.prototype.command129 = function () {
  var actor = $gameActors.actor(this._params[0]);
  var text = '';

  if (actor) {
    if (this._params[1] === 0) {
      // Add
      if (this._params[2]) {
        // Initialize
        $gameActors.actor(this._params[0]).setup(this._params[0]);
      }

      text = $gameActors.actor(this._params[0]).name() + "\\c[16] Has chosen to join your party!\\c[0]";

      this.processNotificationEvents(text, "showPartyMemberJoiningParty", value, {
        moveDown: _notification_options2.default.getNotificationOptions().partyNotificationWindowMoveDown,
        fadeOut: _notification_options2.default.getNotificationOptions().partyNotificationWindowFadeOut,
        windowOptions: {
          windowWidth: _notification_options2.default.getNotificationOptions().partyNotificationWindowWidth,
          fontSize: _notification_options2.default.getNotificationOptions().partyNotificationFontSize
        }
      });

      $gameParty.addActor(this._params[0]);
    } else {
      // Remove
      text = $gameActors.actor(this._params[0]).name() + "\\c[16] Has chosen to leave your party.\\c[0]";

      this.processNotificationEvents(text, "showPartyMemberJoiningParty", value, {
        moveDown: _notification_options2.default.getNotificationOptions().partyNotificationWindowMoveDown,
        fadeOut: _notification_options2.default.getNotificationOptions().partyNotificationWindowFadeOut,
        windowOptions: {
          windowWidth: _notification_options2.default.getNotificationOptions().partyNotificationWindowWidth,
          fontSize: _notification_options2.default.getNotificationOptions().partyNotificationFontSize
        }
      });

      $gameParty.removeActor(this._params[0]);
    }
  }
  return true;
};

/**
 * Allows us to process notification options.
 *
 * @param string type - The type for the message, might be weapons, armors, items, gold and so on.
 * @param strink showKey - The key to be used to find if we should show the notification.
 * @param int value - value for the notification window.
 * @param object options - options for the notification window.
 */
Game_Interpreter.prototype.processNotificationEvents = function (text, showKey, value, options) {
  if (_notification_options2.default.getNotificationOptions()[showKey]) {
    if (value < 0) {
      FlareNotification.notify(text, options.moveDown, options.fadeOut, options.windowOptions);
    } else {
      FlareNotification.notify(text, options.moveDown, options.fadeOut, options.windowOptions);
    }
  }
};

},{"../notification_options/notification_options":4}],7:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _flare_window_base = require('../../flare_window_base');

var _flare_window_base2 = _interopRequireDefault(_flare_window_base);

var _options = require('../notification/window/options');

var _options2 = _interopRequireDefault(_options);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @namespace FlareNotification.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Create a notiication window.
 *
 * Responsible for creating a notification window that
 * can show various type sof notifications.
 */

var FlareNotificationWindow = (function (_FlareWindowBase) {
  _inherits(FlareNotificationWindow, _FlareWindowBase);

  function FlareNotificationWindow(options) {
    _classCallCheck(this, FlareNotificationWindow);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlareNotificationWindow).call(this));

    _this.initialize(options);
    return _this;
  }

  _createClass(FlareNotificationWindow, [{
    key: 'initialize',
    value: function initialize(options) {
      if (!(0, _isUndefined2.default)(options) && !(0, _isUndefined2.default)(options.windowWidth)) {
        this._windowWidth = options.windowWidth;
      } else {
        this._windowWidth = 350;
      }

      var width = this._windowWidth;
      var height = this.windowHeight();

      var x = 0;
      var y = 0;

      if (!(0, _isUndefined2.default)(options) && !(0, _isUndefined2.default)(options.windowX)) {
        x = options.windowX;
      }

      if (!(0, _isUndefined2.default)(options) && !(0, _isUndefined2.default)(options.windowY)) {
        y = options.windowY;
      }

      if (!(0, _isUndefined2.default)(options) && !(0, _isUndefined2.default)(options.fontSize)) {
        this._fontSize = options.fontSize;
      } else {
        this._fontSize = 22;
      }

      _get(Object.getPrototypeOf(FlareNotificationWindow.prototype), 'initialize', this).call(this, x, y, width, height);

      this.contentsOpacity = 0;
      this.opacity = 0;
      this._showCount = 0;
      this._storeShowCount = 0;
      this._fadeInFinished = false;

      this.refresh();
    }
  }, {
    key: 'windowWidth',
    value: function windowWidth() {
      return this._windowWidth;
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

        if (!_options2.default.getContainer().shouldWeStayAtTop || !_NotificationOptions.getNotificationOptions().stickToTop) {
          this.y += 3;
        }

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
      if (this.contentsOpacity === 255) {
        this._fadeInFinished = true;
      }

      if (this._fadeInFinished) {
        if (_options2.default.getContainer().showWeFadeoutTowardsBottom && this._showCount < this._storeShowCountHalf) {

          this.contentsOpacity -= 16;
        }
      } else {
        this.contentsOpacity += 16;
      }
    }
  }, {
    key: 'open',
    value: function open(text, windowWidth) {

      if (!(0, _isUndefined2.default)(windowWidth)) {
        this._windowWidth = windowWidth;
      }

      this.refresh(text);

      var fadeOutTime = _NotificationOptions.getNotificationOptions().fadeOutTime;

      if (isNaN(parseInt(fadeOutTime))) {
        throw new Error('Sorry but: ' + fadeOutTime + ' is not a number');
      }

      this._showCount = fadeOutTime;
      this._storeShowCountHalf = Math.round(eval(_NotificationOptions.getNotificationOptions().fadeOutCalculation));
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

      this.contents.fontSize = this._fontSize;

      if (_NotificationOptions.getNotificationOptions().showWindow === "true") {
        this.drawBackground(0, 0, width, this.lineHeight());
      }

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
})(_flare_window_base2.default);

module.exports = FlareNotificationWindow;

},{"../../flare_window_base":8,"../notification/window/options":3,"lodash/lang/isUndefined":1}],8:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var FlareWindowBase = (function (_Window_Base) {
  _inherits(FlareWindowBase, _Window_Base);

  function FlareWindowBase(args) {
    _classCallCheck(this, FlareWindowBase);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FlareWindowBase).call(this, args));
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
    key: 'flareDrawTextEx',
    value: function flareDrawTextEx(text, x, y) {
      if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.text = textState.text.replace(/\\/g, '');
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

module.exports = FlareWindowBase = FlareWindowBase;

},{}]},{},[2,5,6]);
