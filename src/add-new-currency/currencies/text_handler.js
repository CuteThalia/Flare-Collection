/**
 * @namespace FlareCurrency
 */

class TexHandler {

  static storeText(flarePluginOptions) {
    this._currencyText = {
      menuLabel:            flarePluginOptions['Label For Menu'],
      currentlyHave:        flarePluginOptions['Currently Have'],
      helpText:             flarePluginOptions['Help Text'],
      shopsSellFor:         flarePluginOptions['Shops sell for text'],
      areSellingFor:        flarePluginOptions['Shops are selling for text'],
      currencyShopsSelling: flarePluginOptions['Currency Shops Selling This item']
    }
  }

  static getText() {
    return this._currencyText;
  }
}

module.exports = TexHandler;
