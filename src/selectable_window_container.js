import lodashIsUndefined from 'lodash/lang/isUndefined';

class SelectableWindowContainer {

  static emptyContainer() {
    this._windowObjectContainer = {};
  }

  static setKeyValue(key, value) {
    this._windowObjectContainer[key] = value;
  }

  static getKeyValue(key) {
    if (lodashIsUndefined(this._windowObjectContainer)) {
      return false;
    }

    if (lodashIsUndefined(this._windowObjectContainer[key])) {
      return false;
    }
    
    return this._windowObjectContainer[key];
  }
}

module.exports = SelectableWindowContainer;
