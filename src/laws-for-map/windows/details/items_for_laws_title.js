/**
 * @namespace FlareLawsForMap.
 */

import FlareWindowBase       from '../../../flare_window_base';
import wordWrap              from 'underscore.string/wrap';

class ItemsForLawTitle extends FlareWindowBase {

  constructor() {
    super();
  }

  initialize() {
    var width  = (Graphics.boxWidth / 2) + 70;
    var height = 100
    super.initialize(width - 140, (Graphics.boxHeight / 2) - 80, width, height);
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

    this.flareDrawTextEx(text, 0 ,10);
  }
}

module.exports = ItemsForLawTitle;
