var FlareWindowBase = require('../../flare_window_base');

class LawWindow extends FlareWindowBase {
  constructor() {
    super();
    this.initialize();
    this.refresh();
  }

  initialize() {
    super.initialize(this.tryAndCenter() - 70, this.tryAndCenter() - 190, this.windowWidth(), this.windowHeight());
    this._randomlyPickedLaws = [];
  }

  tryAndCenter() {
    return (Graphics.boxWidth / 2) / 2;
  }

  windowWidth() {
    return Graphics.boxWidth / 2 + 150;
  }

  windowHeight() {
    return Graphics.boxWidth / 2 + 190;
  }

  refresh() {
    this.contents.clear();

    this.drawText('Laws For Region', 10, 10, 250, 'left');

    var laws = window._lawsForMap;

    if (laws.length > 0) {
      if (laws.length > 3) {
        // randomize
      } else {
        this.drawLaws(laws);
        this.resetFontSettings();
      }
    } else {
      this.drawText('No Current Laws For Region', 10, 30, 450, 'left');
    }
  }

  drawLaws(laws) {
    var baseYForText       = 70; // the y variable for drawText and drawIcon.
    this.contents.fontSize = 20;

    var self = this;
    laws.map(function(law){

        self.drawIcon(law.icon, 20, baseYForText - 10)
        self.drawText("Law:", 60, baseYForText - 10)
        self.flareDrawTextEx("Type:", 20, baseYForText + 25);
        self.flareDrawTextEx("\\c[8]"  + law.name  + "\\c[0]", 150, baseYForText + 25);
        self.flareDrawTextEx("Punishment:", 20, baseYForText + 45);
        self.flareDrawTextEx("\\c[14]" + law.punishment + "\\c[0]", 150, baseYForText + 45);
        self.flareDrawTextEx("Amount:", 20, baseYForText + 70);
        self.flareDrawTextEx("\\c[16]" + law.amount + "\\c[0]", 150, baseYForText + 70);
        self.flareDrawTextEx("\\c[20] ------------------- \\c[0]", 10, baseYForText + 90);

        baseYForText += 100;
    });
  }
}

module.exports = LawWindow;
