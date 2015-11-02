class CurrencyShop {

  constructor() {}

  openShopWindow(currency) {
    SceneManager.push(Scene_Shop);
    SceneManager.prepareNextScene([$dataItems]);
    _currencyShopInfo.currency_name = currency;
  }
}

module.exports = CurrencyShop;
window._currencyShopInfo = {currency_name: null};
