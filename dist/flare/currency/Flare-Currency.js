(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Currency Object Creation Class
 *
 * Responsible for creating the currencie objects and storing
 * them in a currency store that can then be fetched and manipulated
 * through out the game.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Currency = (function () {
  function Currency() {
    _classCallCheck(this, Currency);

    this._currencyStore = [];
  }

  /**
   * Stores the currency into the currency store array.
   *
   * @param currency - object
   */

  _createClass(Currency, [{
    key: 'store',
    value: function store(currency) {

      for (var key in currency) {
        if (currency.hasOwnProperty(key) && currency[key] !== "") {

          var currencyObject = JSON.parse(currency[key]);
          this.currencyValidator(currencyObject);

          this._currencyStore.push(currencyObject);
        }
      }
    }

    /**
     * Validates the json to make sure we have all the parts we need.
     *
     * @param curencyJson - JSON
     */
  }, {
    key: 'currencyValidator',
    value: function currencyValidator(currencyJson) {
      if (!currencyJson.hasOwnProperty('name')) {
        throw 'Missing name for currency object.';
      }

      if (!currencyJson.hasOwnProperty('description')) {
        throw 'Missing description for currency object.';
      }

      if (!currencyJson.hasOwnProperty('icon')) {
        throw 'Missing icon for currency object.';
      }
    }

    /**
     * Get the currency store.
     *
     * @return Array of Objects
     */
  }, {
    key: 'getCurrencyStore',
    value: function getCurrencyStore() {
      return this._currencyStore;
    }
  }]);

  return Currency;
})();

;

module.exports = Currency;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Currency = require('./currency.js');
var FlareCurrencyMenu = require('./menus/flare_currency_menu.js');

/**
 * @namespace FlareCollection
 */

/**
 * Flare Collection - Currency
 *
 * @plugindesc Allows you to add a new currency or set of currencies to the game
 * such currencies can include things like "clay pot" or "silver coin" they are then
 * used in shops.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @param ---Currencies---
 * @desc
 *
 * @param Currency One
 * @desc First Currency, enter something like: {name: 'currency', description: 'something', icon: 20}
 * Default: {}
 * @default {}
 */

var FlareCurrencyPluginParamters = PluginManager.parameters('Flare-Currency');

var FlareCurrency = (function () {
  function FlareCurrency() {
    _classCallCheck(this, FlareCurrency);
  }

  _createClass(FlareCurrency, [{
    key: 'createCurrencies',
    value: function createCurrencies() {
      Currency.store(FlareCurrencyPluginParamters);
    }
  }, {
    key: 'currencies',
    value: function currencies() {
      Currency.getCurrencyStore();
    }
  }]);

  return FlareCurrency;
})();

;

var flareCurrencyMenu = new FlareCurrencyMenu();
flareCurrencyMenu.menuHandler();

window.FlareCurrency = FlareCurrency;

},{"./currency.js":1,"./menus/flare_currency_menu.js":3}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareMenuSceneHandlerInterface = require('../../flare_menu_scene_interface.js');
var FlareCurrencyScene = require('../scenes/flare_currency_scene');

/**
 * Allows you to view the currencies that you hold.
 *
 * Overrides the main scene menu to add a new option: Currencies.
 * This class does not handle the scene window.
 *
 */

var FlareCurrencyMenu = (function (_FlareMenuSceneHandlerInterface) {
  _inherits(FlareCurrencyMenu, _FlareMenuSceneHandlerInterface);

  function FlareCurrencyMenu() {
    _classCallCheck(this, FlareCurrencyMenu);

    _get(Object.getPrototypeOf(FlareCurrencyMenu.prototype), 'constructor', this).call(this);
  }

  /**
   * Create a new menu item for the currency window.
   */

  _createClass(FlareCurrencyMenu, [{
    key: 'menuHandler',
    value: function menuHandler() {
      var oldSceneMenu = Scene_Menu.prototype.createCommandWindow;

      Scene_Menu.prototype.createCommandWindow = function () {
        oldSceneMenu.call(this);
        this._commandWindow.setHandler('Currencies', this.currencyCommand.bind(this));
      };

      Scene_Menu.prototype.currencyCommand = function () {
        SceneManager.push(FlareCurrencyScene);
      };

      this.addCommandToGameMenu();
    }

    /**
     * Add a new command to the window menu command.
     */
  }, {
    key: 'addCommandToGameMenu',
    value: function addCommandToGameMenu() {
      var addNewMenuContent = Window_MenuCommand.prototype.addOriginalCommands;
      Window_MenuCommand.prototype.addOriginalCommands = function () {
        addNewMenuContent.call(this);
        this.addCommand('Currencies', 'Currencies');
      };
    }
  }]);

  return FlareCurrencyMenu;
})(FlareMenuSceneHandlerInterface);

;

module.exports = FlareCurrencyMenu;

},{"../../flare_menu_scene_interface.js":6,"../scenes/flare_currency_scene":4}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareCurrencyWindow = require('../windows/flare_currency_window.js');

/**
 * Create the actual currency scene.
 *
 * When the user selects currencies from the menu we want to
 * create a new scene which then creates a new window.
 */

var FlareCurrencyScene = (function (_Scene_MenuBase) {
  _inherits(FlareCurrencyScene, _Scene_MenuBase);

  function FlareCurrencyScene() {
    _classCallCheck(this, FlareCurrencyScene);

    _get(Object.getPrototypeOf(FlareCurrencyScene.prototype), "constructor", this).call(this);
  }

  /**
   * Create the Currency Window
   */

  _createClass(FlareCurrencyScene, [{
    key: "create",
    value: function create() {
      _get(Object.getPrototypeOf(FlareCurrencyScene.prototype), "create", this).call(this, this);
      this.createCurrencyWindowForParty();
    }

    /**
     * Listen for the canel action.
     *
     * Close the currency window, pop this scene off the stack.
     */
  }, {
    key: "update",
    value: function update() {
      _get(Object.getPrototypeOf(FlareCurrencyScene.prototype), "update", this).call(this, this);

      if (Input.isTriggered("cancel")) {
        this._flareCurrencyWindow.close();
        this.popScene();
      }
    }

    /**
     * Create the actual window.
     */
  }, {
    key: "createCurrencyWindowForParty",
    value: function createCurrencyWindowForParty() {
      this._flareCurrencyWindow = new FlareCurrencyWindow();
      this.addWindow(this._flareCurrencyWindow);
    }
  }]);

  return FlareCurrencyScene;
})(Scene_MenuBase);

;

module.exports = FlareCurrencyScene;

},{"../windows/flare_currency_window.js":5}],5:[function(require,module,exports){
/**
 * Create the currency window.
 *
 * Create a window that is the size of the entire game box.
 * This window displays all the currencies a party has.
 *
 * Currencies not stored here is gold.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareCurrencyWindow = (function (_Window_Base) {
  _inherits(FlareCurrencyWindow, _Window_Base);

  function FlareCurrencyWindow() {
    _classCallCheck(this, FlareCurrencyWindow);

    _get(Object.getPrototypeOf(FlareCurrencyWindow.prototype), 'constructor', this).call(this);

    this.initialize();
    this.refresh();
  }

  _createClass(FlareCurrencyWindow, [{
    key: 'initialize',
    value: function initialize() {
      _get(Object.getPrototypeOf(FlareCurrencyWindow.prototype), 'initialize', this).call(this, 0, 0, this.windowWidth(), this.windowHeight());
    }
  }, {
    key: 'windowWidth',
    value: function windowWidth() {
      return Graphics.boxWidth;
    }
  }, {
    key: 'windowHeight',
    value: function windowHeight() {
      return Graphics.boxHeight;
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.drawText('Hello World', 150, 200, 100, 'center');
      this.drawText('Hello World', 150, 300, 100, 'center');
      this.drawText('Hello World', 300, 300, 100, 'center');
      this.drawText('Hello World', 450, 300, 100, 'center');
    }
  }]);

  return FlareCurrencyWindow;
})(Window_Base);

module.exports = FlareCurrencyWindow;

},{}],6:[function(require,module,exports){
/**
 * Interace based class.
 *
 * Contains methods to be over ridden by sub classing.
 * Contains methods to do with the core game scene.
 *
 * Flare Screen is to be subclassed and the methods to be implemented
 * based on the API documentation provided below.
 *
 * @namespace FlareCollection
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlareMenuSceneHandlerInterface = (function () {
  function FlareMenuSceneHandlerInterface() {
    _classCallCheck(this, FlareMenuSceneHandlerInterface);
  }

  /**
   * This method allows you to create menu handlers.
   *
   * You can use this method to create your own menu items for the
   * core game menu.
   */

  _createClass(FlareMenuSceneHandlerInterface, [{
    key: "menuHandler",
    value: function menuHandler() {}

    /**
     * Used to add a new window command to the menu.
     */
  }, {
    key: "addCommandToGameMenu",
    value: function addCommandToGameMenu() {}
  }]);

  return FlareMenuSceneHandlerInterface;
})();

module.exports = FlareMenuSceneHandlerInterface;

},{}]},{},[2]);
