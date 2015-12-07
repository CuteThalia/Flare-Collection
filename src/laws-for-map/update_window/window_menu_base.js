/**
 * @namespace FlareLawsForMap.
 */

import LawsForMap        from '../law_storage/laws_for_map';
import lodashIsUndefined from 'lodash/lang/isUndefined';

var oldWindowMenuCommandProtottypeAddOriginalCommandsMethod = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
  oldWindowMenuCommandProtottypeAddOriginalCommandsMethod.call(this);

  if (!lodashIsUndefined(LawsForMap.getLawsForMap()) && LawsForMap.getLawsForMap().length > 0) {
    this.addCommand('Laws', 'Laws');
  }
}
