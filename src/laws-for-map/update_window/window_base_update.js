import LawsForMap from '../law_storage/laws_for_map';

/**
 * @namespace FlareLawsForMap.
 */

var oldWindowBasePrototypeDrawGaugeMethod = Window_Base.prototype.drawGauge
Window_Base.prototype.drawGauge = function(dx, dy, dw, rate, color1, color2) {
  if (LawsForMap.getLawsForMap() !== undefined && LawsForMap.getLawsForMap().length > 0) {
    var color3 = this.gaugeBackColor();
    var fillW = Math.max(0, Math.floor(dw * rate));
    var gaugeH = this.gaugeHeight();
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;

    if (eval(Yanfly.Param.GaugeOutline)) {
      this.contents.fillRect(dx, gaugeY-1, dw+2, gaugeH+2, color3);
      dx += 1;
    } else {
      var fillW = Math.max(0, Math.floor(dw * rate));
      var gaugeY = dy + this.lineHeight() - gaugeH - 2;
      this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
    }


    if (isNaN(fillW)) {
      this.contents.gradientFillRect(dx, gaugeY, 0, gaugeH, color1, color2);
    } else {
      this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
    }

  } else {
    oldWindowBasePrototypeDrawGaugeMethod.call(this, dx, dy, dw, rate, color1, color2);
  }
};
