/**
 * @namespace FlareLawsForMap.
 */

import FlareWindowSelectable from '../../../flare_window_base';
import wordWrap              from 'underscore.string/wrap';
import ShowRewardData        from '../helper/show_reward_data';

class ItemsForLaw extends FlareWindowSelectable {

  constructor() {
    super();
  }

  initialize() {
    var width  = (Graphics.boxWidth / 2) + 70;
    var height = Graphics.boxHeight / 2;
    var data   = new ShowRewardData();

    this._rewards = [];

    super.initialize(width - 140, Graphics.boxHeight / 2, width, height);
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

    console.log(this._rewards);
    this.refresh();
  }

  refresh() {
    this.contents.clear();
    this.drawRewardData();
  }

  drawRewardData() {
    this.contents.fontSize = 18

    var text = "\\\c[14]All rewards below are rewarded assuming you break no laws associated with this map.\\\c[0]"
    text = wordWrap(text);

    this.flareDrawTextEx(text, 0 ,10)
    this.flareDrawTextEx('\\\c[2]----------------------------------------\\\c[0]', 0, 50);
  }
}

module.exports = ItemsForLaw;
