Window_ShopBuy.prototype.initialize = function(x, y, height, shopGoods, currencyName) {
    var width = this.windowWidth();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._shopGoods = shopGoods;
    this._money = 0;
    this._currencyName = currencyName || null;
    this.refresh();
    this.select(0);
};

var oldWindowShopBuyPrototypePrice = Window_ShopBuy.prototype.price;
Window_ShopBuy.prototype.price = function(item, curencyName, selling) {
  if (curencyName !== null && !selling) {
    return this._price[this._data.indexOf(item)] || 0;
  } else if (curencyName !== null && selling) {
    return item.currencyCost || 0;
  } else {
    return oldWindowShopBuyPrototypePrice.call(this, item);
  }
};

var oldWindowShopBuyPrototypeMakeItemList = Window_ShopBuy.prototype.makeItemList;
Window_ShopBuy.prototype.makeItemList = function() {
  if (this._currencyName !== null) {
    this._data = [];
    this._price = [];
    this._shopGoods.forEach(function(goods) {
        var item = null;
        switch (goods[0]) {
        case 0:
            item = $dataItems[goods[1]];
            break;
        case 1:
            item = $dataWeapons[goods[1]];
            break;
        case 2:
            item = $dataArmors[goods[1]];
            break;
        }
        if (item) {
            this._data.push(item);
            this._price.push(item.currencyCost);
        }
    }, this);
  } else {
    oldWindowShopBuyPrototypeMakeItemList.call(this);
  }
};
