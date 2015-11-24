/**
 * @namespace FlareLawsForMap.
 */

import FlareWindowBase from '../../../flare_window_base';
import wordWrap        from 'underscore.string/wrap';

class LawDetails extends FlareWindowBase {

  constructor() {
    super();
  }

  initialize() {
    var width = (Graphics.boxWidth / 2) + 70;
    var height = Graphics.boxHeight;

    super.initialize(width - 140, 0, width, height);
  }

  refresh(lawObject) {
    this.contents.clear();
    this.drawLawInfo(lawObject);
  }

  drawLawInfo(lawObject) {
    this.contents.fontSize = 18
    var contents = lawObject.description.replace(/\\/g, '\\\\\\');
    contents = wordWrap(contents, {width: 48});

    this.flareDrawTextEx(contents, 0, 0);
    this.flareDrawTextEx("\\\c[2]----------------------------------------\\\c[0]", 0 ,150)
    this.flareDrawTextEx("\\\c[16]punishment\\\c[0]: " + lawObject.punishment, 0, 170);
    this.flareDrawTextEx("\\\c[16]amount lost when violated\\\c[0]: " + lawObject.amount, 0, 190);

    this.resetFontSettings();
  }
}

module.exports = LawDetails;
