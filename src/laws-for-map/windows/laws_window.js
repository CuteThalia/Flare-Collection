/**
 * @namespace FlareLawsForMap.
 */

import FlareWindowBase from '../../lib/windows/flare_window_base';
import LawsForMap      from '../law_storage/laws_for_map';

/**
 * Creates a window displaying the laws for said map.
 */
class LawWindow extends FlareWindowBase {
  constructor() {
    super();
    this.initialize();
    this.refresh();
  }

  initialize() {
    super.initialize(this.tryAndCenter() - 40, this.tryAndCenter() - 190, this.windowWidth(), this.windowHeight());
    this._randomlyPickedLaws = [];
  }

  tryAndCenter() {
    return (Graphics.boxWidth / 2) / 2;
  }

  windowWidth() {
    return Graphics.boxWidth / 2 + 70;
  }

  windowHeight() {
    return Graphics.boxWidth / 2 + 190;
  }

  refresh() {
    this.contents.clear();

    this.drawText('Laws For Region', 10, 10, 250, 'left');

    var laws = LawsForMap.getLawsForMap();

    if (laws.length > 0) {
      if (laws.length > 3) {
        // randomize
      } else {
        this.contents.fontSize = 18;
        this.drawLaws(laws);
        this.resetFontSettings();
      }
    } else {
      this.contents.fontSize = 18;
      this.flareDrawTextEx('\\c[14]No Current Laws For Region\\c[0]', 14, 60, 450, 'left');
      this.resetFontSettings();
    }
  }

  drawLaws(laws) {
    var baseYForText       = 70; // the y variable for drawText and drawIcon.
    this.contents.fontSize = 20;

    var self = this;
    var count = 0;
    laws.map(function(law){
        if (Array.isArray(law.cantUse)) {
          law.cantUse.toString();
        }

        if (count === 1) {
          self.drawIcon(law.icon, 20, baseYForText + 35);
          self.drawText("Law:", 60, baseYForText + 35);
        } else if (count === 2) {
          self.drawIcon(law.icon, 20, baseYForText + 85);
          self.drawText("Law:", 60, baseYForText + 85);
        } else {
          self.drawIcon(law.icon, 20, baseYForText - 10);
          self.drawText("Law:", 60, baseYForText - 10);
        }


        if (count === 1) {
          self.drawSecondLaw(baseYForText, law);
        } else if (count === 2) {
          self.drawThirdLaw(baseYForText, law);
        } else {
          self.flareDrawTextEx("Type:", 20, baseYForText + 25);
          self.flareDrawTextEx("\\c[8]"  + law.name  + "\\c[0]", 150, baseYForText + 25);
          self.flareDrawTextEx("Punishment:", 20, baseYForText + 45);
          self.flareDrawTextEx("\\c[14]" + law.punishment + "\\c[0]", 150, baseYForText + 45);
          self.flareDrawTextEx("Amount:", 20, baseYForText + 70);
          self.flareDrawTextEx("\\c[16]" + law.amount + "\\c[0]", 150, baseYForText + 70);
          self.flareDrawTextEx("Cannot Use:", 20, baseYForText + 90);
          self.flareDrawTextEx("\\c[18]" + law.cantUse + "\\c[0]", 150, baseYForText + 90);
          self.flareDrawTextEx("\\c[20] -----------------------------------------  \\c[0]", 10, baseYForText + 110)
        }

        baseYForText += 100;
        count += 1;
    });
  }

  drawSecondLaw(baseYForText, law) {
    this.flareDrawTextEx("Type:", 20, baseYForText + 70);
    this.flareDrawTextEx("\\c[8]"  + law.name  + "\\c[0]", 150, baseYForText + 70);
    this.flareDrawTextEx("Punishment:", 20, baseYForText + 90);
    this.flareDrawTextEx("\\c[14]" + law.punishment + "\\c[0]", 150, baseYForText + 90);
    this.flareDrawTextEx("Amount:", 20, baseYForText + 115);
    this.flareDrawTextEx("\\c[16]" + law.amount + "\\c[0]", 150, baseYForText + 115);
    this.flareDrawTextEx("Cannot Use:", 20, baseYForText + 135);
    this.flareDrawTextEx("\\c[18]" + law.cantUse + "\\c[0]", 150, baseYForText + 135);
    this.flareDrawTextEx("\\c[20] -----------------------------------------  \\c[0]", 10, baseYForText + 160);
  }

  drawThirdLaw(baseYForText, law) {
    this.flareDrawTextEx("Type:", 20, baseYForText + 120);
    this.flareDrawTextEx("\\c[8]"  + law.name  + "\\c[0]", 150, baseYForText + 120);
    this.flareDrawTextEx("Punishment:", 20, baseYForText + 140);
    this.flareDrawTextEx("\\c[14]" + law.punishment + "\\c[0]", 150, baseYForText + 140);
    this.flareDrawTextEx("Amount:", 20, baseYForText + 160);
    this.flareDrawTextEx("\\c[16]" + law.amount + "\\c[0]", 150, baseYForText + 160);
    this.flareDrawTextEx("Cannot Use:", 20, baseYForText + 180);
    this.flareDrawTextEx("\\c[18]" + law.cantUse + "\\c[0]", 150, baseYForText + 180);
    this.flareDrawTextEx("\\c[20] -----------------------------------------  \\c[0]", 10, baseYForText + 200);
  }
}

module.exports = LawWindow;
