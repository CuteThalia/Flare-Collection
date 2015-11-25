class RewardStorage {

  static createContainer() {
    this._container = [];
  }

  static setToStorage(item) {
    this._container.push(item);
  }

  static getContainer() {
    return this._container;
  }
}

module.exports = RewardStorage;
