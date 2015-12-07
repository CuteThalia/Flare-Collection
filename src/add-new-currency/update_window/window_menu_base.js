/**
 * @namespace FlareCurrency
 */


import lodashIsUndefined  from 'lodash/lang/isUndefined';
import lodashFilter       from 'lodash/collection/filter';
import TextHandler        from '../currencies/text_handler';

var oldWindowMenuCommandProtottypeAddOriginalCommandsMethod = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
  oldWindowMenuCommandProtottypeAddOriginalCommandsMethod.call(this);

  var filteredArray = lodashFilter(flareCurrency.getCurrencyStore(), function(currency) {
    return currency.name && currency.icon && currency.description;
  });

  if (filteredArray.length === 0) {
    return;
  }

  for (var i = 0; i < flareCurrency.getCurrencyStore().length; i++) {
    if (flareCurrency.getCurrencyStore()[i].name !== "") {
      this.addCommand(TextHandler.getText().menuLabel, TextHandler.getText().menuLabel);
      return;
    }
  }
}
