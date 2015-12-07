/**
 * @namespace FlareCurrency
 */

import CurrencyValueWindow from "../windows/shop/currency_value_window";
import CurrencyShopInfo    from "../shop/helper/currency_shop_info_container";
import lodashIsUndefined   from "lodash/lang/isUndefined";

Scene_Shop.prototype.createCurrencyWindow = function(currencyName) {
  this._curencyValueWindow = new CurrencyValueWindow(currencyName);
  this._curencyValueWindow.x = Graphics.boxWidth - this._curencyValueWindow.width;
  this.addWindow(this._curencyValueWindow);
}


var OldSceneShopPrototypeCreateMethod = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
    if (!lodashIsUndefined(CurrencyShopInfo.getCurrency()) && CurrencyShopInfo.getCurrency() !== null) {
      Scene_MenuBase.prototype.create.call(this);
      this.createHelpWindow();
      this.createCurrencyWindow(CurrencyShopInfo.getCurrency());
      this.createCommandWindow(CurrencyShopInfo.getCurrency());
      this.createDummyWindow();
      this.createNumberWindow(CurrencyShopInfo.getCurrency());
      this.createStatusWindow();
      this.createBuyWindow(CurrencyShopInfo.getCurrency());
      this.createCategoryWindow();
      this.createSellWindow(CurrencyShopInfo.getCurrency());
      CurrencyShopInfo.emptyContainer();
    } else {
      OldSceneShopPrototypeCreateMethod.call(this);
    }
};

var oldSceneMapPrototypeCreateCommandWindowMethod = Scene_Shop.prototype.createCommandWindow;
Scene_Shop.prototype.createCommandWindow = function(currencyName) {
    if (!lodashIsUndefined(currencyName)) {
      this._commandWindow = new Window_ShopCommand(this._curencyValueWindow.x, this._purchaseOnly);
      this._commandWindow.y = this._helpWindow.height;
      this._commandWindow.setHandler('buy',    this.commandBuy.bind(this, currencyName));
      this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
      this._commandWindow.setHandler('cancel', this.popScene.bind(this));
      this.addWindow(this._commandWindow);
    } else {
      oldSceneMapPrototypeCreateCommandWindowMethod.call(this);
    }
};

var oldSceneShopPrototypeCommandBuy = Scene_Shop.prototype.commandBuy;
Scene_Shop.prototype.commandBuy = function(currencyName) {
    if (!lodashIsUndefined(currencyName)) {
      this._dummyWindow.hide();
      this.activateBuyWindow(currencyName);
    } else {
      oldSceneShopPrototypeCommandBuy.call(this);
    }
};

var oldSceneShopProtottypeActivateBuyWindowMethod = Scene_Shop.prototype.activateBuyWindow;
Scene_Shop.prototype.activateBuyWindow = function(currencyName) {
    if (!lodashIsUndefined(currencyName)) {
      this._buyWindow.setMoney(this.money(currencyName));
      this._buyWindow.show();
      this._buyWindow.activate();
      this._statusWindow.show();
    } else {
      oldSceneShopProtottypeActivateBuyWindowMethod.call(this);
    }

};

var oldSceneShopPrototypeCreateBuyWindow = Scene_Shop.prototype.createBuyWindow;
Scene_Shop.prototype.createBuyWindow = function(currencyName) {
    if (!lodashIsUndefined(currencyName)){
      var wy = this._dummyWindow.y;
      var wh = this._dummyWindow.height;
      this._buyWindow = new Window_ShopBuy(0, wy, wh, this._goods, currencyName);
      this._buyWindow.setHelpWindow(this._helpWindow);
      this._buyWindow.setStatusWindow(this._statusWindow);
      this._buyWindow.hide();
      this._buyWindow.setHandler('ok',     this.onBuyOk.bind(this, currencyName));
      this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
      this.addWindow(this._buyWindow);
  } else {
    oldSceneShopPrototypeCreateBuyWindow.call(this);
  }
};

var oldSceneShopPrototypeCreateSellWindow = Scene_Shop.prototype.createSellWindow;
Scene_Shop.prototype.createSellWindow = function(currencyName) {
  if (!lodashIsUndefined(currencyName)) {
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._sellWindow = new Window_ShopSell(0, wy, Graphics.boxWidth, wh);
    this._sellWindow.setHelpWindow(this._helpWindow);
    this._sellWindow.hide();
    this._sellWindow.setHandler('ok',     this.onSellOk.bind(this, currencyName));
    this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
    this._categoryWindow.setItemWindow(this._sellWindow);
    this.addWindow(this._sellWindow);
  } else {
    oldSceneShopPrototypeCreateSellWindow.call(this);
  }
};

var oldSceneShopPrototypeCreateNumberWindow = Scene_Shop.prototype.createNumberWindow;
Scene_Shop.prototype.createNumberWindow = function(currencyName) {
    if (!lodashIsUndefined(currencyName)) {
      var wy = this._dummyWindow.y;
      var wh = this._dummyWindow.height;
      this._numberWindow = new Window_ShopNumber(0, wy, wh);
      this._numberWindow.hide();
      this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this, currencyName));
      this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this, currencyName));
      this.addWindow(this._numberWindow);
  } else {
    oldSceneShopPrototypeCreateNumberWindow.call(this);
  }
};

var oldSceneShopPrototypeOnBuyOkMethod = Scene_Shop.prototype.onBuyOk;
Scene_Shop.prototype.onBuyOk = function(currencyName) {
    if (!lodashIsUndefined(currencyName)) {
      this._item = this._buyWindow.item();
      this._buyWindow.hide();
      this._numberWindow.setup(this._item, this.maxBuy(currencyName), this.buyingPrice(currencyName));
      this._numberWindow.setCurrencyUnit(this.currencyUnit(currencyName), currencyName);
      this._numberWindow.show();
      this._numberWindow.activate();
    } else {
      oldSceneShopPrototypeOnBuyOkMethod.call(this);
    }
};

var oldSceneShopPrototypeOnSellOk = Scene_Shop.prototype.onSellOk;
Scene_Shop.prototype.onSellOk = function(currencyName) {
  if (!lodashIsUndefined(currencyName)) {
    this._item = this._sellWindow.item();
    this._categoryWindow.hide();
    this._sellWindow.hide();
    this._numberWindow.setup(this._item, this.maxSell(currencyName), this.sellingPrice(), currencyName);
    this._numberWindow.setCurrencyUnit(this.currencyUnit(currencyName), currencyName);
    this._numberWindow.show();
    this._numberWindow.activate();
    this._statusWindow.setItem(this._item);
    this._statusWindow.show();
  } else {
    oldSceneShopPrototypeOnSellOk.call(this);
  }
};

var oldSceneShopPrototypeOnNumberOkMethod = Scene_Shop.prototype.onNumberOk;
Scene_Shop.prototype.onNumberOk = function(currencyName) {
    if (!lodashIsUndefined(currencyName)) {
      SoundManager.playShop();
      switch (this._commandWindow.currentSymbol()) {
      case 'buy':
          this.doBuy(this._numberWindow.number(), currencyName);
          break;
      case 'sell':
          this.doSell(this._numberWindow.number(), currencyName);
          break;
      }
      this.endNumberInput(currencyName);
      this._curencyValueWindow.refresh();
      this._statusWindow.refresh();
    } else {
      oldSceneShopPrototypeOnNumberOkMethod.call(this);
    }
};

var oldSceneShopPrototypeOnNumberCancel = Scene_Shop.prototype.onNumberCancel;
Scene_Shop.prototype.onNumberCancel = function(currencyName) {
    if (!lodashIsUndefined(currencyName)) {
      SoundManager.playCancel();
      this.endNumberInput(currencyName);
    } else {
      oldSceneShopPrototypeOnNumberCancel.call(this);
    }
};

var oldSceneShopPrototypeDobuyMethod = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number, currencyName) {
  if (!lodashIsUndefined(currencyName)) {
    var cost = number * this.buyingPrice(currencyName, false);

    FlareCurrencies.addAmount(currencyName, -cost);
    $gameParty.gainItem(this._item, number);
  } else {
    oldSceneShopPrototypeDobuyMethod.call(this, number);
  }
};

var oldSceneShopPrototypeDoSellMethod = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number, currencyName) {
  if (!lodashIsUndefined(currencyName)) {
    var cost = number * this.buyingPrice(currencyName, true);

    FlareCurrencies.addAmount(currencyName, cost);
    $gameParty.loseItem(this._item, number);
  } else {
    oldSceneShopPrototypeDoSellMethod.call(this, number);
  }
};

var oldSceneShopPrototypeEndNumberInput = Scene_Shop.prototype.endNumberInput;
Scene_Shop.prototype.endNumberInput = function(currencyName) {
    if (!lodashIsUndefined(currencyName)) {
      this._numberWindow.hide();
      switch (this._commandWindow.currentSymbol()) {
      case 'buy':
          this.activateBuyWindow(currencyName);
          break;
      case 'sell':
          this.activateSellWindow(currencyName);
          break;
      }
    } else {
      oldSceneShopPrototypeEndNumberInput.call(this);
    }
};

var oldSceneShopPrototypeMaxbuyMethod = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function(currencyName) {
  if (!lodashIsUndefined(currencyName)) {
    var max = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item);
    var price = this.buyingPrice(currencyName);
    if (price > 0) {
        return Math.min(max, Math.floor(this.money(currencyName) / price));
    } else {
        return max;
    }
  } else {
    oldSceneShopPrototypeMaxbuyMethod.call(this);
  }
};

var oldSceneShopPrototypeMoneyMethod = Scene_Shop.prototype.money;
Scene_Shop.prototype.money = function(currencyName) {
    if (!lodashIsUndefined(currencyName)) {
      return this._curencyValueWindow.value()
    } else {
      return oldSceneShopPrototypeMoneyMethod.call(this);
    }
};

var oldSceneShopPrototypeCurrencyUnitMethod = Scene_Shop.prototype.currencyUnit;
Scene_Shop.prototype.currencyUnit = function(currencyName) {
    if (!lodashIsUndefined(currencyName)) {
      return this._curencyValueWindow.currencyIcon();
    } else {
      return oldSceneShopPrototypeCurrencyUnitMethod.call(this);
    }
};

var oldSceneShopPrototypeBuyingPrice = Scene_Shop.prototype.buyingPrice;
Scene_Shop.prototype.buyingPrice = function(currencyName, selling) {
  if (!lodashIsUndefined(currencyName) && !selling) {
    return this._buyWindow.price(this._item, currencyName);
  } else if (currencyName !== undefined && selling) {
    return this._buyWindow.price(this._item, currencyName, selling);
  } else {
    return oldSceneShopPrototypeBuyingPrice.call(this);
  }
};
