var CurrencyValueWindow = require("../windows/shop/currency_value_window");

var oldSceneShopPrototypeMoneyMethod = Scene_Shop.prototype.money;
Scene_Shop.prototype.money = function(currencyName) {
    if (currencyName !== undefined) {
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
      this._commandWindow.setHandler('buy',    this.commandBuy.bind(this, _currencyShopInfo.currency_name));
      this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
      this._commandWindow.setHandler('cancel', this.popScene.bind(this));
      this.addWindow(this._commandWindow);
    } else {
      oldSceneMapPrototypeCreateCommandWindowMethod.call(this);
    }

};

var oldSceneShopPrototypePrepare = Scene_Shop.prototype.prepare;
Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
    if (_currencyShopInfo.currency_name !== null) {
      this.prepareForCurrency(_currencyShopInfo.currency_name, purchaseOnly);
    } else {
      oldSceneShopPrototypePrepare.call(this, goods, purchaseOnly)
    }
};

var oldSceneShopProtottypeActivateBuyWindowMethod = Scene_Shop.prototype.activateBuyWindow;
Scene_Shop.prototype.activateBuyWindow = function() {
    if (_currencyShopInfo.currency_name !== null) {
      this._buyWindow.setMoney(this.money());
      this._buyWindow.show();
      this._buyWindow.activate();
      this._statusWindow.show();
    } else {
      oldSceneShopProtottypeActivateBuyWindowMethod.call(this);
    }

};

var oldSceneShopPrototypeCommandBuy = Scene_Shop.prototype.commandBuy;
Scene_Shop.prototype.commandBuy = function(currencyName) {
    if (currencyName !== undefined) {
      this._dummyWindow.hide();
      this.activateBuyWindow(currencyName);
    } else {
      oldSceneShopPrototypeCommandBuy.call(this);
    }
};

var oldSceneShopPrototypeActivateBuyWindow = Scene_Shop.prototype.activateBuyWindow;
Scene_Shop.prototype.activateBuyWindow = function(currencyName) {
    if (currencyName !== undefined) {
      this._buyWindow.setMoney(this.money(currencyName));
      this._buyWindow.show();
      this._buyWindow.activate();
      this._statusWindow.show();
    } else {
      oldSceneShopPrototypeActivateBuyWindow.call(this);
    }

};

Scene_Shop.prototype.createCurrencyWindow = function(currencyName) {
  this._curencyValueWindow = new CurrencyValueWindow(currencyName);
  this._curencyValueWindow.x = Graphics.boxWidth - this._curencyValueWindow.width;
  this.addWindow(this._curencyValueWindow);
}

Scene_Shop.prototype.prepareForCurrency = function(currencyName, purchaseOnly) {
    this._goods = []

    var itemsArray   = _itemsForCurrencieShop.items;
    var weaponsArray = _itemsForCurrencieShop.weapons;
    var armorArray   = _itemsForCurrencieShop.armors;

    for (var i = 0; i < itemsArray.length; i++) {
      var item = [0, itemsArray[i].item_id];
      this._goods.push(item);
    }

    for (var i = 0; i < weaponsArray.length; i++) {
      var weapon = [1, weaponsArray[i].weapon_id];
      this._goods.push(weapon);
    }

    for (var i = 0; i < armorArray.length; i++) {
      var armor = [2, armorArray[i].armor_id];
      this._goods.push(armor);
    }

    this._purchaseOnly = purchaseOnly;
    this._item = null;
};
