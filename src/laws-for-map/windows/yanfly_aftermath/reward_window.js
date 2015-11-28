/**
 * @namespace FlareCurrency
 */

import lodashClone              from 'lodash/lang/clone';
import lodashIsUndefined        from 'lodash/lang/isUndefined';
import lodashFind               from 'lodash/collection/find';
import FlareWindowSelectable    from '../../../flare_window_selectable';
import CompiledStorageContainer from '../../reward_storage/compiled_storage_container';

/**
 * Creates the Flare Law Reward window for Yanfly Aftermath.
 */
class LawRewardWindowYanfly extends FlareWindowSelectable {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    var width     = Graphics.boxWidth
    var height    = Graphics.boxHeight;
    this._rewards = CompiledStorageContainer.getContainer()

    super.initialize(0, 0, width, height);
    this.refresh();
  }

  isCursorMovable() {
    return true;
  }

  maxItems() {
    return this._rewards.length;
  }

  itemHeight() {
    return 85;
  }

  isCurrentItemEnabled() {
    return this.isEnabled(this._rewards);
  }

  drawItem(index) {
    var reward = this._rewards[index];

    if (!reward) {
      return;
    }

    this.drawRewardsToScreen(reward, index);
  }


  drawRewardsToScreen(reward, index) {
    var rectangle = this.itemRect(index);
    this.contents.fontSize = 18;

    if (typeof reward === 'object') {
      if (!lodashIsUndefined(reward['xp'])) {
        this.flareDrawTextEx('\\\c[16]Bonus Xp gained (By all Actors (already given)):\\\c[0] ' + reward.xp, 10, rectangle.y + 20);
      } else if (!lodashIsUndefined(reward['gold'])) {
        this.flareDrawTextEx('\\\c[16]Bonus Gold gained:\\\c[0] ' + reward.gold, 10, rectangle.y + 20);
      } else {
        this.flareDrawTextEx('\\\c[14]You gained\\\c[0]:', 10, rectangle.y + 20);
        this.drawIcon(reward.iconIndex, 125, rectangle.y + 20 );
        this.drawText(reward.name, 175, rectangle.y + 20);
      }
    }

    this.resetFontSettings();
  }
}

module.exports = LawRewardWindowYanfly;
