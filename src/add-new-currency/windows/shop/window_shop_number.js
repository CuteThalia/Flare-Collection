var oldWindowShopNumberPrototTypeSetCurrencyUnit = Window_ShopNumber.prototype.setCurrencyUnit;
Window_ShopNumber.prototype.setCurrencyUnit = function(currencyUnit, currencyName) {
    this._currencyName = currencyName;
    oldWindowShopNumberPrototTypeSetCurrencyUnit.call(this, currencyUnit);
};

var oldWindowShopNumberPrototTypeDrawTotalPrice = Window_ShopNumber.prototype.drawTotalPrice;
Window_ShopNumber.prototype.drawTotalPrice = function() {
    if (this._currencyName !== undefined){
      var total = this._price * this._number;
      var width = this.contentsWidth() - this.textPadding();
      this.drawCurrencyInfo(total, this._currencyUnit, 0, this.priceY(), width);
    } else {
      oldWindowShopNumberPrototTypeDrawTotalPrice.call(this);
    }
};

Window_ShopNumber.prototype.drawCurrencyInfo = function(value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width - unitWidth - 6, 'right');
    this.changeTextColor(this.systemColor());
    this.drawIcon(unit, x + width - unitWidth, y);
}
