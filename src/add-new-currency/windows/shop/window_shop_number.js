/**
 * @namespace FlareCurrency
 */
import CurrencyShopInfo    from "../../shop/helper/currency_shop_info_container";

var oldWindowShopNumberPrototTypeSetCurrencyUnitMethod = Window_ShopNumber.prototype.setCurrencyUnit;
Window_ShopNumber.prototype.setCurrencyUnit = function(currencyUnit, currencyName) {
    if (currencyName !== undefined) {
      this._currencyName = currencyName;
      CurrencyShopInfo.setCurrentAmountOfCurrency(FlareCurrencies.getCurrentCurrencyAmount(this._currencyName));
    }

    oldWindowShopNumberPrototTypeSetCurrencyUnitMethod.call(this, currencyUnit);
};

var oldWindowShopNumberPrototypeSetup = Window_ShopNumber.prototype.setup;
Window_ShopNumber.prototype.setup = function(item, max, price) {
    if (max === undefined) {
      max = $gameParty.maxItems(item) - $gameParty.numItems(item);

      if (price > 0) {
          if (CurrencyShopInfo.getAmount() !== undefined) {
            max = Math.min(max, Math.floor(CurrencyShopInfo.getAmount() / price));
          } else {
            max = Math.min(max, Math.floor($gameParty._gold / price));
          }
      }
    }

    oldWindowShopNumberPrototypeSetup.call(this, item, max, price);
};


var oldWindowShopNumberPrototTypeDrawTotalPriceMethod = Window_ShopNumber.prototype.drawTotalPrice;
Window_ShopNumber.prototype.drawTotalPrice = function() {
    if (this._currencyName !== undefined){
      var total = this._price * this._number;
      var width = this.contentsWidth() - this.textPadding();
      this.drawCurrencyInfo(total, this._currencyUnit, 0, this.priceY(), width);
    } else {
      oldWindowShopNumberPrototTypeDrawTotalPriceMethod.call(this);
    }
};

Window_ShopNumber.prototype.drawCurrencyInfo = function(value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width - unitWidth - 6, 'right');
    this.changeTextColor(this.systemColor());
    this.drawIcon(unit, x + width - unitWidth, y);
}

Window_ShopNumber.prototype.processNumberChange = function() {
    if (this.isOpenAndActive()) {
        if (Input.isRepeated('right')) {
            this.changeNumber(1, this._max);
        }
        if (Input.isRepeated('left')) {
            this.changeNumber(-1, this._max);
        }
        if (Input.isRepeated('up')) {
            this.changeNumber(10, this._max);
        }
        if (Input.isRepeated('down')) {
            this.changeNumber(-10, this._max);
        }
    }
};

var oldWindowShopNumberPrototTypeChangeNumberMethod = Window_ShopNumber.prototype.changeNumber;
Window_ShopNumber.prototype.changeNumber = function(amount, max) {

  var lastNumber = this._number;
  this._number = (this._number + amount).clamp(1, max);
  if (this._number !== lastNumber) {
    SoundManager.playCursor();
    this.refresh();
  }
};
