var lodashFind = require('../../../node_modules/lodash/collection/find');

class SceneWindowContainer {

  static createContainer() {
    this._container = [];
  }

  static setWindowToContainer(name, windowObject) {
    this._container.push({
      name: name,
      windowObject: windowObject
    });
  }

  static emptyContainer() {
    this._container = [];
  }

  static getWindowFromContainer(name) {
    return lodashFind(this._container, function(windows) {
      return windows.name === name;
    });
  }

  static isContainerEmpty() {
    if (this._container.length > 0) {
      return false;
    }

    return true;
  }
}

module.exports = SceneWindowContainer;
