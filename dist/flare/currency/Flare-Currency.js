(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Ensure some object is a coerced to a string
 **/
module.exports = function makeString(object) {
  if (object == null) return '';
  return '' + object;
};

},{}],2:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function include(str, needle) {
  if (needle === '') return true;
  return makeString(str).indexOf(needle) !== -1;
};

},{"./helper/makeString":1}],3:[function(require,module,exports){
/**
 * @namespace FlareCurrency
 */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlareError = require('../../flare_error');

/**
 * Currency Object Creation Class
 *
 * Responsible for creating the currencie objects and storing
 * them in a currency store that can then be fetched and manipulated
 * through out the game.
 */

var Currency = (function () {
  function Currency() {
    _classCallCheck(this, Currency);

    this._currencyStore;
  }

  /**
   * Stores the currency into the currency store array.
   *
   * @param currency - object
   */

  _createClass(Currency, [{
    key: "store",
    value: function store(currency) {
      this._currencyStore = [{
        name: currency["Currency One Name"],
        description: currency["Currency One Description"],
        icon: currency["Currency One Icon Index"],
        amount: 0
      }, {
        name: currency["Currency Two Name"],
        description: currency["Currency Two Description"],
        icon: currency["Currency Two Icon Index"],
        amount: 0
      }, {
        name: currency["Currency Three Name"],
        description: currency["Currency Three Description"],
        icon: currency["Currency Three Icon Index"],
        amount: 0
      }, {
        name: currency["Currency Four Name"],
        description: currency["Currency Four Description"],
        icon: currency["Currency Four Icon Index"],
        amount: 0
      }, {
        name: currency["Currency Five Name"],
        description: currency["Currency Five Description"],
        icon: currency["Currency Five Icon Index"],
        amount: 0
      }];
    }

    /**
     * Get the currency store.
     *
     * @return Array of Objects
     */
  }, {
    key: "getCurrencyStore",
    value: function getCurrencyStore() {
      return this._currencyStore;
    }
  }]);

  return Currency;
})();

;

module.exports = Currency;

},{"../../flare_error":12}],4:[function(require,module,exports){
/**
 * @namespace FlareCurrencies
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Currency = require('./currency');
var FlareCurrencyMenu = require('../menus/flare_currency_menu');
var FlareError = require('../../flare_error');

var FlareCurrencyPluginParamters = PluginManager.parameters('Flare-Currency');

/**
 * Core Currency Class.
 *
 * Contains a method called createCurrencies() that creates the currencies based off
 * the plugin paramters.
 */

var FlareCurrency = (function () {
  function FlareCurrency() {
    _classCallCheck(this, FlareCurrency);

    window.flareCurrency = new Currency();
  }

  /**
   * Non public API method to create currencies.
   *
   * Calls on the Currency class to store the currencies
   * that were set up via the plugin parameters.
   */

  _createClass(FlareCurrency, [{
    key: 'createCurrencies',
    value: function createCurrencies() {
      window.flareCurrency.store(FlareCurrencyPluginParamters);
    }
  }]);

  return FlareCurrency;
})();

;

// Create the Currencies menu item.
var flareCurrencyMenu = new FlareCurrencyMenu();
flareCurrencyMenu.menuHandler();

// Creates the Currencies.
var flareCurrency = new FlareCurrency();
flareCurrency.createCurrencies();

// Handles Errors thrown in classes that do not extend the
// the RPG Maker classes.
// @see FlareError
var mainSceneMapInitializer = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
  mainSceneMapInitializer.call(this);

  if (FlareError.getError() !== undefined) {
    throw new Error(FlareError.getError());
  }
};

},{"../../flare_error":12,"../menus/flare_currency_menu":6,"./currency":3}],5:[function(require,module,exports){
/**
 * @namespace FlareCurrency
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var UnderscoreInclude = require('../../node_modules/underscore.string/include');

/*:
 * @plugindesc Allows you to add a new currency or set of currencies to the game
 * such currencies can include things like "clay pot" or "silver coin" they are then
 * used in shops.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @param ---Currency One---
 * @desc
 *
 * @param Currency One Name
 * @desc Name of the Currency
 * Default: Example Name
 * @default Example Name
 *
 * @param Currency One Description
 * @desc Keep it short. Currency description
 * Default: Used to buy: something.
 * @default Used to buy: something.
 *
 * @param Currency One Icon Index
 * @desc icon index.
 * Default: 25
 * @default 25
 *
 * @param ---Currency Two---
 * @desc
 *
 * @param Currency Two Name
 * @desc Name of the Currency
 * Default: Example Name
 * @default Example Name
 *
 * @param Currency Two Description
 * @desc Keep it short. Currency description
 * Default: Used to buy: something.
 * @default Used to buy: something.
 *
 * @param Currency Two Icon Index
 * @desc icon index.
 * Default: 25
 * @default 25
 *
 * @param ---Currency Three---
 * @desc
 *
 * @param Currency Three Name
 * @desc Name of the Currency
 * Default: Example Name
 * @default Example Name
 *
 * @param Currency Three Description
 * @desc Keep it short. Currency description
 * Default: Used to buy: something.
 * @default Used to buy: something.
 *
 * @param Currency Three Icon Index
 * @desc icon index.
 * Default: 25
 * @default 25
 *
 * @param ---Currency Four---
 * @desc
 *
 * @param Currency Four Name
 * @desc Name of the Currency
 * Default: Example Name
 * @default Example Name
 *
 * @param Currency Four Description
 * @desc Keep it short. Currency description
 * Default: Used to buy: something.
 * @default Used to buy: something.
 *
 * @param Currency Four Icon Index
 * @desc icon index.
 * Default: 25
 * @default 25
 *
 * @param ---Currency Five---
 * @desc
 *
 * @param Currency Five Name
 * @desc Name of the Currency
 * Default: Example Name
 * @default Example Name
 *
 * @param Currency Five Description
 * @desc Keep it short. Currency description
 * Default: Used to buy: something.
 * @default Used to buy: something.
 *
 * @param Currency Five Icon Index
 * @desc icon index.
 * Default: 25
 * @default 25
 *
 * @help
 *
 * Currencies can be used in game to buy items that require that specific
 * currency. For example maybe Demonic Armor needs 5 Demonic Runes. you
 * would create a currency called Demonic Runes, with a description of:
 * "Used to buy Demonic Armour" and then set an icon index.
 *
 * Descriptions must be kept SUPER SUPER short. yes we do allow short codes
 * but no we do not do anything like word wrapping. Keep the concept of:
 *
 * Used to buy: x
 *
 * === Public API ===
 *
 * There are two new objects that roam in the wile. flareCurrency and
 * FlareCurrency
 *
 * flareCurreency is used internally and is not to be touched. Mutating This
 * object can cause issues in the script.
 *
 * FlareCurrency is a class which conains the public api, such as setting
 * currency amount and calling currency specific shops.
 *
 * All methods on FlareCurrencies is static.
 *
 */

/**
 * Public Api Class for handeling currencies.
 *
 * This object is tied to the window object making it public.
 * It contains methods for setting, getting, opening currency shops
 * and so on.
 */

var FlareCurrencies = (function () {
  function FlareCurrencies() {
    _classCallCheck(this, FlareCurrencies);
  }

  // Create public API.

  _createClass(FlareCurrencies, null, [{
    key: 'setAmount',

    /**
     * Set the amount for the specific currency.
     *
     * Negative numbers are permited. If the total value goes
     * below 0, we will set the amount to 0.
     *
     * @param String currencyName
     * @param Int currencyAmount
     */
    value: function setAmount(currencyName, currencyAmount) {
      var currencies = window.flareCurrency.getCurrencyStore();

      var self = this;
      currencies.map(function (currency) {
        if (UnderscoreInclude(currency.name, currencyName)) {
          self._setAmount(currency, currencyAmount);
          return;
        }
      });
    }

    /**
     * Private method: sets Currency.
     *
     * @param Object Currency
     * @param Int CurrencyAmount
     */
  }, {
    key: '_setAmount',
    value: function _setAmount(currency, currencyAmount) {
      currency.amount = currency.amount + currencyAmount;

      if (currency.amount < 0) {
        currency.amount = 0;
      }
    }
  }]);

  return FlareCurrencies;
})();

window.FlareCurrencies = FlareCurrencies;

},{"../../node_modules/underscore.string/include":2}],6:[function(require,module,exports){
/**
 * @namespace FlareCurrency
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareMenuSceneHandlerInterface = require('../../flare_menu_scene_interface');
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

},{"../../flare_menu_scene_interface":13,"../scenes/flare_currency_scene":7}],7:[function(require,module,exports){
/**
 * @namespace FlareCurrency
 */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareCurrencyWindow = require('../windows/flare_currency_window');

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

},{"../windows/flare_currency_window":11}],8:[function(require,module,exports){
'use strict';

var FlareRandomNumber = require('../../flare_random_number.js');

var oldBattleManagerInitMembersMethod = BattleManager.initMembers;
BattleManager.initMembers = function () {
  oldBattleManagerInitMembersMethod.call(this);
  this._gainCurrenciesAfterBattle = null;
};

var oldBattleManagerDisplayRewardsMethod = BattleManager.displayRewards;
BattleManager.displayRewards = function () {
  oldBattleManagerDisplayRewardsMethod.call(this);
  this.displayCurrencies();
};

var oldBattleManagerGainRewardsMethod = BattleManager.gainRewards;
BattleManager.gainRewards = function () {
  oldBattleManagerGainRewardsMethod.call(this);

  for (var i = 0; i < $gameTroop.troop().members.length; i++) {
    if (typeof $gameTroop.troop().members[i] === 'object') {
      var enemy = this._searchForEnemy($dataEnemies, $gameTroop.troop().members[i].enemyId);

      for (var j = 0; j < this._gainCurrenciesAfterBattle.length; j++) {
        if (this._gainCurrenciesAfterBattle[j].enemy_id === enemy.id && this._gainCurrenciesAfterBattle[j].gain_currency) {
          this._gainCurrencies(enemy);
        }
      }
    }
  }
};

BattleManager.displayCurrencies = function () {
  var self = this;
  this._gainCurrenciesAfterBattle = this._checkChance($gameTroop);

  for (var i = 0; i < $gameTroop.troop().members.length; i++) {
    if (typeof $gameTroop.troop().members[i] === 'object') {
      var enemy = this._searchForEnemy($dataEnemies, $gameTroop.troop().members[i].enemyId);

      for (var j = 0; j < this._gainCurrenciesAfterBattle.length; j++) {
        if (this._gainCurrenciesAfterBattle[j].enemy_id === enemy.id && this._gainCurrenciesAfterBattle[j].gain_currency) {
          this._gatherCurrenciesForgameMessage(enemy);
        }
      }
    }
  }
};

BattleManager._gatherCurrenciesForgameMessage = function (enemy) {
  enemy.enemyCurrencyRewardData.map(function (currency) {
    $gameMessage.add('Gained: ' + currency.amount + ' of ' + currency.name);
  });
};

BattleManager._gainCurrencies = function (enemy) {
  enemy.enemyCurrencyRewardData.map(function (currency) {
    window.FlareCurrencies.setAmount(currency.name, currency.amount);
  });
};

BattleManager._searchForEnemy = function (enemies, id) {
  for (var i = 0; i < enemies.length; i++) {
    if (typeof enemies[i] === 'object' && enemies[i] !== null) {
      return enemies[i];
    }
  }
};

BattleManager._checkChance = function (gameTroop) {
  var gainCurrencies = [];

  for (var i = 0; i < gameTroop.troop().members.length; i++) {
    if (typeof gameTroop.troop().members[i] === 'object') {
      var enemy = this._searchForEnemy($dataEnemies, $gameTroop.troop().members[i].enemyId);

      var self = this;
      enemy.enemyCurrencyRewardData.map(function (currency) {
        gainCurrencies.push(self._createGainCurrencyObject(currency, enemy));
      });
    }
  }

  return gainCurrencies;
};

BattleManager._createGainCurrencyObject = function (currency, enemy) {
  if (currency.percentage !== 100) {
    return { enemy_id: enemy.id, gain_currency: this._doWeGainCurrencies(currency) };
  } else {
    return { enemy_id: enemy.id, gain_currency: true };
  }
};

BattleManager._doWeGainCurrencies = function (currency) {
  var needTopGetAbove = 100 - currency.percentage;
  var percentage = FlareRandomNumber.minMax(0, 100);
  var gainCurrency = false;

  if (percentage > needTopGetAbove) {
    gainCurrency = true;
  }

  return gainCurrency;
};

},{"../../flare_random_number.js":14}],9:[function(require,module,exports){
'use strict';

var RewardCurrenciesCheck = require('./reward_currencies_check');

var olderDataManagerIsDataBaseLoadedMethod = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
  if (!olderDataManagerIsDataBaseLoadedMethod.call(this)) {
    return false;
  }

  this.flareProcessEnemyNoteTags($dataEnemies);

  var rewardCurrenciesCheck = new RewardCurrenciesCheck();
  rewardCurrenciesCheck.createCheckObject();

  return true;
};

/**
 * Process the enemy note tag looking for currency information.
 *
 * Currency tags can have name, how much and percentage of drop.
 * percentage is optional. Default is 100.
 *
 * @param $dataEnemies enemies
 */
DataManager.flareProcessEnemyNoteTags = function (enemies) {
  var noteTag = /<currency:\s*([^,>]+),\s*([^,>]+)(,\s*([^,>]+))?>/i;

  for (var i = 1; i < enemies.length; i++) {
    var enemy = enemies[i];
    var enemyNoteData = enemy.note.split(/[\r\n]+/);

    enemy.enemyCurrencyRewardData = [];
    this._processEnemyNoteDataForCurrencyReward(enemy, enemyNoteData, noteTag);
  }
};

/**
 * Private Method. Process Enemy Currency Note Data.
 *
 * Pushes the enemy currency reward data object to an array of the same type.
 * enemies can have multiple currencies attached to them.
 *
 * @param Object enemy
 * @param Array enemyNoteData
 * @param regex noteTag
 */
DataManager._processEnemyNoteDataForCurrencyReward = function (enemy, enemyNoteData, noteTag) {
  for (var n = 0; n < enemyNoteData.length; n++) {
    var line = enemyNoteData[n];

    if (line.match(noteTag)) {
      var lineMatched = line.match(noteTag);

      enemy.enemyCurrencyRewardData.push(this._createCurrencyRewardObject(lineMatched));
    }
  }
};

/**
 * Private Method. Creates the actual object.
 *
 * Creates a currency reward object that contains name, amount and percentage of either 100 or the
 * third number that the user placed in the tag.
 *
 * @param Array lineMatched
 */
DataManager._createCurrencyRewardObject = function (lineMatched) {
  if (lineMatched[4] !== undefined) {
    return { name: lineMatched[1], amount: parseInt(lineMatched[2]), percentage: parseInt(lineMatched[4]) };
  } else {
    return { name: lineMatched[1], amount: parseInt(lineMatched[2]), percentage: 100 };
  }
};

},{"./reward_currencies_check":10}],10:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FlareRandomNumber = require('../../flare_random_number');

/**
 * @namespace FlareCurrency
 */

/**
 * Determine if the playr gets currencies.
 *
 * Currency tags can have a percentage attribute set. If it is set then
 * we go ahead check if they will be successful to gain the currency AFTER
 * a battle.
 */

var RewardCurrenciesCheck = (function () {
  function RewardCurrenciesCheck() {
    _classCallCheck(this, RewardCurrenciesCheck);
  }

  /**
   * Creates Currency Ceck Object.
   *
   * Assigns a new array to a enemy object. This array contains
   * x number of objects. Each object contains a currency name and
   * do we gain currency check which is either true or false.
   */

  _createClass(RewardCurrenciesCheck, [{
    key: 'createCheckObject',
    value: function createCheckObject() {

      for (var i = 0; i < $dataEnemies.length; i++) {
        var enemy = $dataEnemies[i];

        if (enemy !== null) {
          enemy.gainCurrencyOnBattleWin = [];
          this._processEnemyCurrencyReward(enemy, enemy.enemyCurrencyRewardData);
        }
      }
    }

    /**
     * Private method. Create enemy check object.
     *
     * Assigns the gain currency check object to the array of objects
     * this allows for an enemy to have multiple currencies with different
     * percentages.
     *
     * @param Object enemy
     * @param Array enemyCurrencyReward
     */
  }, {
    key: '_processEnemyCurrencyReward',
    value: function _processEnemyCurrencyReward(enemy, enemyCurrencyReward) {
      var self = this;

      enemyCurrencyReward.map(function (currencyObject) {
        if (typeof currencyObject === 'object') {
          enemy.gainCurrencyOnBattleWin.push({
            currency_Name: currencyObject.name,
            doWeGainCurrency: self._processPercentage(currencyObject)
          });
        }
      });
    }

    /**
     * Private method. check percentage.
     *
     * When no percentage is given it is set to 100, default truth.
     * when percentage is given we subtract it from 100, then random a number
     * between 0 an 100 and compare the result to the "toGetAbove" varaible.
     *
     * Example: 100 - 85 = 15, random number is 16, 16 > 15 = true.
     *
     * In the above example case the user would be rewarded the currency.
     *
     * @param Object CurrencyObject
     * @return bool
     */
  }, {
    key: '_processPercentage',
    value: function _processPercentage(currencyObject) {
      if (currencyObject.percentage !== 100) {
        var toGetAbove = 100 - currencyObject.percentage;
        var randomNumber = FlareRandomNumber.minMax(0, 100);

        if (randomNumber > toGetAbove) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    }
  }]);

  return RewardCurrenciesCheck;
})();

module.exports = RewardCurrenciesCheck;

},{"../../flare_random_number":14}],11:[function(require,module,exports){
/**
 * @namespace FlareCurrency
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Currency = require('../currencies/currency');
var FlareWindowBase = require('../../flare_window_base');

/**
 * Create the currency window.
 *
 * Create a window that is the size of the entire game box.
 * This window displays all the currencies a party has.
 *
 * Currencies not stored here is gold.
 */

var FlareCurrencyWindow = (function (_FlareWindowBase) {
  _inherits(FlareCurrencyWindow, _FlareWindowBase);

  function FlareCurrencyWindow() {
    _classCallCheck(this, FlareCurrencyWindow);

    _get(Object.getPrototypeOf(FlareCurrencyWindow.prototype), 'constructor', this).call(this);
    this.initialize();
    this.refresh();
  }

  _createClass(FlareCurrencyWindow, [{
    key: 'initialize',
    value: function initialize() {
      _get(Object.getPrototypeOf(FlareCurrencyWindow.prototype), 'initialize', this).call(this, this.tryAndCenter(), this.tryAndCenter() - 190, this.windowWidth(), this.windowHeight());
    }
  }, {
    key: 'tryAndCenter',
    value: function tryAndCenter() {
      return Graphics.boxWidth / 2 / 2;
    }
  }, {
    key: 'windowWidth',
    value: function windowWidth() {
      return Graphics.boxWidth / 2;
    }
  }, {
    key: 'windowHeight',
    value: function windowHeight() {
      return Graphics.boxWidth / 2 + 190;
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.drawText('Currencies', 10, 10, 100, 'center');

      var currencies = window.flareCurrency.getCurrencyStore();

      this.drawFlareCurrencies(currencies);
      this.resetFontSettings();
    }
  }, {
    key: 'drawFlareCurrencies',
    value: function drawFlareCurrencies(currencies) {
      var baseYForText = 70; // the y variable for drawText and drawIcon.
      this.contents.fontSize = 20;

      var self = this;
      currencies.map(function (currency) {
        if (typeof currency === 'object') {

          self.drawIcon(currency.icon, 10, baseYForText);
          self.flareDrawTextEx(currency.name, 60, baseYForText - 10);
          self.flareDrawTextEx(currency.description, 60, baseYForText + 15);
          self.flareDrawTextEx('Currently Have: ' + currency.amount, 60, baseYForText + 42, 250, 'left');

          baseYForText += 100;
        }
      });
    }
  }]);

  return FlareCurrencyWindow;
})(FlareWindowBase);

module.exports = FlareCurrencyWindow;

},{"../../flare_window_base":15,"../currencies/currency":3}],12:[function(require,module,exports){
/**
 * @namespace FlareCollection
 */

/**
 * Custom Error Handler Class.
 *
 * Use by doing: FlareError.error('Error Text'); then do:
 * FlareError.getError() in the Scene Map initializer to throw
 * errors on the start of the game.
 *
 * This class wont be useful in classes that subclass core RPG Maker
 * classes because the error handler there knows how to catch errors
 * and deal with them.
 *
 * So when would you use this? In classes that dont extend any of the
 * core RPG Maker classes.
 *
 * Alias the Scene_Map initialize method, check if the getError()
 * returns undefined or not, if not, throw a new Error with the value of
 * getError()
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlareError = (function () {
  function FlareError() {
    _classCallCheck(this, FlareError);
  }

  _createClass(FlareError, null, [{
    key: "error",

    /**
     * Use this to set a new error message.
     *
     * @param String message
     */
    value: function error(message) {
      this._error = message;
    }

    /**
     * Get the error message.
     *
     * @return undefined or string
     */
  }, {
    key: "getError",
    value: function getError() {
      return this._error;
    }
  }]);

  return FlareError;
})();

module.exports = FlareError;

},{}],13:[function(require,module,exports){
/**
 * @namespace FlareCollection
 */

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

},{}],14:[function(require,module,exports){
/**
 * @namespace FlareCollection
 */

/**
 * Create a ranom number
 *
 * Methods here are useful for creating random numbers.
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlareRandomNumber = (function () {
  function FlareRandomNumber() {
    _classCallCheck(this, FlareRandomNumber);
  }

  _createClass(FlareRandomNumber, null, [{
    key: "minMax",

    /**
     * Create random number between nim and max.
     *
     * @param Int min
     * @param Int max
     * @return int
     */
    value: function minMax(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }]);

  return FlareRandomNumber;
})();

module.exports = FlareRandomNumber;

},{}],15:[function(require,module,exports){
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

},{}]},{},[5,4,9,8]);
