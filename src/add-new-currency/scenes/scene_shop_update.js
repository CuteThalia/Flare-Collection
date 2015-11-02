var oldSceneShopPrototypeMoneyMethod = Scene_Shop.prototype.money;
Scene_Shop.prototype.money = function() {
    if (_currencyShopInfo.currencyName !== null) {
      this._curencyValueWindow.value()
    } else {
      oldSceneShopPrototypeMoneyMethod.call(this);
    }
};

var oldSceneShopPrototypeCurrencyUnit = Scene_Shop.prototype.currencyUnit;
Scene_Shop.prototype.currencyUnit = function() {
  if (_currencyShopInfo.currency_name !== null) {
    this._curencyValueWindow.currencyName();
  } else {
    oldSceneShopPrototypeCurrencyUnit.call(this);
  }
};

var OldSceneShopPrototypeCreateMethod = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
    if (_currencyShopInfo.currency_name !== null) {
      Scene_MenuBase.prototype.create.call(this);
      this.createHelpWindow();
      this.createCurrencyWindow(_currencyShopInfo.currency_name);
      this.createCommandWindow();
      this.createDummyWindow();
      this.createNumberWindow();
      this.createStatusWindow();
      this.createBuyWindow();
      this.createCategoryWindow();
      this.createSellWindow();
      _currencyShopInfo.currency_name = null;
    } else {
      OldSceneShopPrototypeCreateMethod.call(this);
    }

};

var oldSceneMapPrototypeCreateCommandWindowMethod = Scene_Shop.prototype.createCommandWindow;
Scene_Shop.prototype.createCommandWindow = function() {
    if (_currencyShopInfo.currency_name !== null) {
      this._commandWindow = new Window_ShopCommand(this._curencyValueWindow.x, this._purchaseOnly);
      this._commandWindow.y = this._helpWindow.height;
      this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
      this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
      this._commandWindow.setHandler('cancel', this.popScene.bind(this));
      this.addWindow(this._commandWindow);
    } else {
      oldSceneMapPrototypeCreateCommandWindowMethod.call(this);
    }

};

Scene_Shop.prototype.createCurrencyWindow = function(currencyName) {
  this._curencyValueWindow = new CurrencyValueWindow(0, this._helpWindow.height, currencyName);
  this._curencyValueWindow.x = Graphics.boxWidth - this._curencyValueWindow.width;
  this.addWindow(this._curencyValueWindow);
}

// ----

var lodashFind = require('../../../node_modules/lodash/collection/find')

function CurrencyValueWindow() {
    this.initialize.apply(this, arguments);
}

CurrencyValueWindow.prototype = Object.create(Window_Base.prototype);
CurrencyValueWindow.prototype.constructor = CurrencyValueWindow;

CurrencyValueWindow.prototype.initialize = function(x, y, currencyName) {
  console.log(x, y, currencyName);
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._currencyObject = this.getCurrencyObject(currencyName);
    this.refresh();
};

CurrencyValueWindow.prototype.windowWidth = function() {
    return 240;
};

CurrencyValueWindow.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

CurrencyValueWindow.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.drawCurrencyInfo(this.value(), this.currencyName(), x, 0, width);
};

CurrencyValueWindow.prototype.value = function() {
    return this._currencyObject.amount;
};

CurrencyValueWindow.prototype.currencyName = function() {
    return this._currencyObject.name;
};

CurrencyValueWindow.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

CurrencyValueWindow.prototype.getCurrencyObject = function(currencyName) {
  var foundCurrency = lodashFind(flareCurrency.getCurrencyStore(), function(currencyObject) {
    if (currencyObject.name.indexOf(currencyName) !== -1 ||
        currencyName.indexOf(currencyObject.name) !== -1 ) {
          return currencyObject;
        }
  });

  if (foundCurrency === undefined) {
    throw new Error('We failed to find any currency by the name of: ' + currencyName);
  }

  return foundCurrency;
}

CurrencyValueWindow.prototype.drawCurrencyInfo = function(value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width - unitWidth - 6, 'left');
    this.changeTextColor(this.systemColor());
    this.drawText(unit, x + width - unitWidth, y, unitWidth, 'right');
}
