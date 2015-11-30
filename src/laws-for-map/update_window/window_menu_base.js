/**
 * @namespace FlareLawsForMap.
 */

import RewardStorage     from '../reward_storage/reward_storage';
import lodashIsUndefined from 'lodash/lang/isUndefined';

var oldWindowMenuCommandProtottypeAddOriginalCommandsMethod = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
  oldWindowMenuCommandProtottypeAddOriginalCommandsMethod.call(this);

  if (!lodashIsUndefined(RewardStorage.getContainer())) {
    this.addCommand('Laws', 'Laws');
  }
}
