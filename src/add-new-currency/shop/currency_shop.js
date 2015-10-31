class CurrencyShop {

  constructor() {}

  openShopWindow(currency) {
    SceneManager.push(Scene_Shop);
    SceneManager.prepareNextScene([$dataItems]);
  }
}

module.exports = CurrencyShop;
