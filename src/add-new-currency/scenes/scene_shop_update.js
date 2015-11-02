var CurrencyValueWindow = require("../windows/shop/currency_value_window");

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
  this._curencyValueWindow = new CurrencyValueWindow(currencyName);
  this._curencyValueWindow.x = Graphics.boxWidth - this._curencyValueWindow.width;
  this.addWindow(this._curencyValueWindow);
}
