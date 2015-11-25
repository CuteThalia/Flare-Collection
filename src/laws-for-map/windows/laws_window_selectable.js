/**
 * @namespace FlareLawsForMap.
 */

import FlareWindowSelecatble from '../../flare_window_selectable';
import LawsForMap            from '../law_storage/laws_for_map';
import SceneWindowContainer  from '../../scene_window_container';

class LawsWindowSelectable extends FlareWindowSelecatble {

  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    var width  = (Graphics.boxWidth / 2) - 70;
    var height = Graphics.boxHeight;
    this._lawsForMap = null;

    this._getlawsForMap();

    super.initialize(0, 0, width, height);
    this.refresh();
  }

  isCursorMovable() {
    return true;
  }

  maxItems() {
    return this._lawsForMap.length;
  }

  itemHeight() {
    return 85;
  }

  isCurrentItemEnabled() {
    return this.isEnabled(this._lawsForMap);
  }

  drawItem(index) {
    var law = this._lawsForMap[index];

    if (!law) {
      return;
    }

    this.drawLawToScreen(law, index);
  }

  cursorUp() {
    super.cursorUp(this);
    SceneWindowContainer.getWindowFromContainer('law-details').windowObject.refresh(this._lawsForMap[this.index()]);
  }

  cursorDown() {
    super.cursorDown(this);
    SceneWindowContainer.getWindowFromContainer('law-details').windowObject.refresh(this._lawsForMap[this.index()]);
  }

  drawLawToScreen(law, index) {
    var rectangle = this.itemRect(index);
    this.contents.fontSize = 18;
    this.drawIcon(law.icon, 10, rectangle.y + 20 );
    this.drawText(law.name, 60, rectangle.y + 20);
    this.flareDrawTextEx('\\\c[14]cant Use\\\c[0]: ' + law.cantUse, 10, rectangle.y + 60);
    this.resetFontSettings();
  }


  _getlawsForMap() {
    this._lawsForMap = LawsForMap.getLawsForMap();
  }
}

module.exports = LawsWindowSelectable;
