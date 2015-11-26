/**
 * @namespace FlareLawsForMap.
 */

import FlareWindowSelectable from '../../../flare_window_selectable';
import wordWrap              from 'underscore.string/wrap';
import ShowRewardData        from '../helper/show_reward_data';

class ItemsForLawSelectable extends FlareWindowSelectable {

  constructor() {
    super();
  }

  initialize() {
    var width  = (Graphics.boxWidth / 2) - 70;
    var height = 150;
    var data   = new ShowRewardData();

    this._rewards = [];

    super.initialize(width - 140, (Graphics.boxHeight / 2) + 80, width, height);
    data.processForWindow();

    if (data.getWeaponNames().length > 0) {
      this._rewards.push(data.getWeaponNames());
    }

    if (data.getArmorNames().length > 0) {
      this._rewards.push(data.getArmorNames());
    }

    if (data.getItemNames().length > 0) {
      this._rewards.push(data.getItemNames());
    }

    if (data.getGoldAmount().length > 0) {
      this._rewards.push(data.getGoldAmount());
    }

    if (data.getXpAmount().length > 0) {
      this._rewards.push(data.getXpAmount());
    }

    // flatten the array.
    this._rewards = [].concat.apply([], this._rewards);

    this.refresh();
  }

  isCursorMovable() {
    return true;
  }

  maxItems() {
    return this._rewards.length;
  }

  itemHeight() {
    return 105;
  }

  isCurrentItemEnabled() {
    return this.isEnabled(this._rewards);
  }

  drawItem(index) {
    var reward = this._rewards[index];

    if (!reward) {
      return;
    }

    this.drawRewardToScreen(reward, index);
  }

  drawRewardToScreen(reward, index) {
    var rectangle = this.itemRect(index);
    this.contents.fontSize = 18;

    if (reward instanceof 'object') {
      this.drawIcon(reward.icon, 10, rectangle.y + 20 );
      this.drawText(reward.name, 60, rectangle.y + 20);

      if (!lodashIsUndefined(reward.belongsToCurrency)) {
        this.flareDrawTextEx('\\\c[14]Belongs to currency\\\c[0]: ' + reward.belongsToCurrency, 10, rectangle.y + 60);
        this.flareDrawTextEx('\\\c[14]And costs\\\c[0]: ' + reward.currencyCosts, 10, rectangle.y + 80);
      } else {
        this.flareDrawTextEx('\\\c[14]Sold in shops for\\\c[0]: ' + reward.price, 10, rectangle.y + 60);
      }
    }

    this.resetFontSettings();
  }
}

module.exports = ItemsForLawSelectable;
