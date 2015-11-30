/**
 * @namespace FlareCurrency
 */

import TextHandler        from '../currencies/text_handler';
import lodashIsUndefined  from 'lodash/lang/isUndefined';

var oldWindowMenuCommandProtottypeAddOriginalCommandsMethod = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
  oldWindowMenuCommandProtottypeAddOriginalCommandsMethod.call(this);

  if (lodashIsUndefined(TextHandler.getText())) {
    return;
  }

  for (var i = 0; i < flareCurrency.getCurrencyStore().length; i++) {
    if (flareCurrency.getCurrencyStore()[i].name !== "") {
      this.addCommand(TextHandler.getText().menuLabel, TextHandler.getText().menuLabel);
      return;
    }
  }
}
