class CurrencyShop {

  constructor() {}

  openShopWindow(currency) {
    _currencyShopInfo.currency_name = currency;
    SceneManager.push(Scene_Shop);
    SceneManager.prepareNextScene([$dataItems]);
  }
}

module.exports = CurrencyShop;
window._currencyShopInfo = {currency_name: null};
