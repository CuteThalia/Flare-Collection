/**
 * @namespace FlareLawsForMap.
 */

import FlareWindowBase       from '../../../flare_window_base';
import wordWrap              from 'underscore.string/wrap';

/**
 * Crestes the window that states law rewards will be calculated on battle win.
 */
class ClaculatedLaws extends FlareWindowBase {

  constructor() {
    super();
  }

  initialize() {
    var width  = (Graphics.boxWidth / 2) - 70;
    var height = 290;

    super.initialize(width, (Graphics.boxHeight / 2) + 20, width + 140, height);
    this.refresh();
  }

  refresh() {
    this.contents.clear();
    this.drawRewardData();
  }

  drawRewardData() {
    this.contents.fontSize = 18

    var text = "\\\c[14]All rewards for this map will be calculated after each battle. Rewards are randomized.\\\c[0]"
    text = wordWrap(text, {width: 52});

    this.flareDrawTextEx(text, 0 ,10);
  }
}

module.exports = ClaculatedLaws;
