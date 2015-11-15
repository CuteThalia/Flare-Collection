var FlareWindowSelectable = require('../../../flare_window_selectable');

/**
 * Window for when a player breaks a law.
 */
class BrokenLawWindow extends FlareWindowSelectable {
  constructor(lawObject) {
    super();

    this._law = lawObject;
    this.initialize();
  }

  initialize() {
    super.initialize(this.centreX, 100, this.width(), this.height());
  }

  centreX() {
    return Graphics.boxWidth / 2;
  }

  width() {
    return this.centreX;
  }

  height() {
    return 250
  }

  refresh() {
    this.drawBrokenLawText()
  }

  drawBrokenLawText() {
    this.drawText(lawObject.name + 'has been broken.', 0 , 20, 250, 50);
    this.drawText('A fine of: ' + law.amount + 'has been issued for your: ' + law.punishment, 0, 40, 500, 50);

    if (window._lawMessageForLawBattleWindow !== null) {
      drawText(window._lawMessageForLawBattleWindow, 0, 60, 500);
    }
  }
}
