/**
 * @namespace FlareCurrency
 */
import CurrencyShopInfo    from "../../shop/helper/currency_shop_info_container";

var oldWindowShopNumberPrototypeSetCurrencyUnitMethod = Window_ShopNumber.prototype.setCurrencyUnit;
Window_ShopNumber.prototype.setCurrencyUnit = function(currencyUnit, currencyName) {
    if (currencyName !== undefined) {
      this._currencyName = currencyName;
      CurrencyShopInfo.setCurrentAmountOfCurrency(FlareCurrencies.getCurrentCurrencyAmount(this._currencyName));
    }

    oldWindowShopNumberPrototypeSetCurrencyUnitMethod.call(this, currencyUnit);
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

var oldWindowShopNumberPrototypeDrawTotalPriceMethod = Window_ShopNumber.prototype.drawTotalPrice;
Window_ShopNumber.prototype.drawTotalPrice = function() {
    if (this._currencyName !== undefined){
      var total = this._price * this._number;
      var width = this.contentsWidth() - this.textPadding();
      this.drawCurrencyInfo(total, this._currencyUnit, 0, this.priceY(), width);
    } else {
      oldWindowShopNumberPrototypeDrawTotalPriceMethod.call(this);
    }
};

Window_ShopNumber.prototype.drawCurrencyInfo = function(value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width - unitWidth - 6, 'right');
    this.changeTextColor(this.systemColor());
    this.drawIcon(unit, x + width - unitWidth, y);
}
