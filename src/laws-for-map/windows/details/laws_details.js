/**
 * @namespace FlareLawsForMap.
 */

import FlareWindowBase   from '../../../flare_window_base';
import wordWrap          from 'underscore.string/wrap';
import lodashIsUndefined from 'lodash/lang/isUndefined';

class LawDetails extends FlareWindowBase {

  constructor() {
    super();
  }

  initialize() {
    var width  = (Graphics.boxWidth / 2) + 70;
    var height = (Graphics.boxHeight / 2) - 80;

    super.initialize(width - 140, 0, width, height);
  }

  refresh(lawObject) {
    this.contents.clear();
    this.drawLawInfo(lawObject);
  }

  drawLawInfo(lawObject) {
    this.contents.fontSize = 18

    if (lodashIsUndefined(lawObject.description)) {
      throw new Error('All Laws MUST have a description, please add the description: attribute to the law tag.');
    }

    var contents = lawObject.description.replace(/\\/g, '\\\\\\');
    contents = wordWrap(contents, {width: 48});

    this.flareDrawTextEx(contents, 0, 0);

    this.flareDrawTextEx("\\\c[2]----------------------------------------\\\c[0]", 0 ,120)
    this.flareDrawTextEx("\\\c[16]punishment\\\c[0]: " + lawObject.punishment, 0, 140);
    this.flareDrawTextEx("\\\c[16]amount lost when violated\\\c[0]: " + lawObject.amount, 0, 170);
  }
}

module.exports = LawDetails;
