var FlareWindowBase = require('../../../flare_window_base');

class BrokenLawWindow extends FlareWindowBase {
  constructor() {
    super();
    this.initialize();
    this.refresh();
  }

  initialize() {
    super.initialize(this.tryAndCenter() - 40, this.tryAndCenter() - 20, this.windowWidth(), this.windowHeight());
    this._law = window._brokenLawObject;
  }

  tryAndCenter() {
    return (Graphics.boxWidth / 2) / 2;
  }

  windowWidth() {
    return Graphics.boxWidth / 2 + 70;
  }

  windowHeight() {
    return 250;
  }

  refresh() {
    this.contents.clear();

    this.drawText('Law was broken!', 10, 10, 250, 'left');

    this.contents.fontSize = 18;
    this.drawIcon(this._law.icon, 10, 70)
    this.flareDrawTextEx('Law was broken: ' + '\\c[14]' + this._law.name + '\\c[0]', 48, 70);
    this.flareDrawTextEx('Law Prohibs the use of: ' + '\\c[18]' + this._law.cantUse + ' \\c[0]', 20, 110);
    this.flareDrawTextEx('\\c[9]' + this._law.subject + '\\c[0]' + ' used: ' + '\\c[10]' + this._law.actionUsed + '\\c[0]', 20, 140);
    this.flareDrawTextEx('The punishment is: ' + '\\c[20]' + this._law.punishment + '\\c[0]' + ' at a cost of: ' + '\\c[20]' +  this._law.amount + '\\c[0]', 10, 180);
    this.resetFontSettings();

  }
}

module.exports = BrokenLawWindow;
