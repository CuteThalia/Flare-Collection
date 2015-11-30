/**
 * @namespace FlareCurrency
 */

var oldWindowMenuCommandProtottypeAddOriginalCommandsMethod = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
  oldWindowMenuCommandProtottypeAddOriginalCommandsMethod.call(this);

  for (var i = 0; i < flareCurrency.getCurrencyStore().length; i++) {
    if (flareCurrency.getCurrencyStore()[i].name !== "") {
      this.addCommand('Currencies', 'Currencies');
      return;
    }
  }
}
