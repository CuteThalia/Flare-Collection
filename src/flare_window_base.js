/**
 * All Flare based items use this window base.
 *
 * Flare Window Base extends the Window Base Class
 * and adds some additional generic helper methods
 * that are useful for creating windows and their contents.
 */
class FlareWindowBase extends Window_Base {

  constructor() {
    super();
  }

  /**
   * Custom drawtextEx function.
   *
   * We do not reset font settings, which is what the default method does.
   * I dont like giant text in my windows.
   *
   * It is usp to the implementor to call: this.resetFontSettings();
   */
  flareDrawTextEx(text, x, y) {
    if (text) {
      var textState = { index: 0, x: x, y: y, left: x };
      textState.text = this.convertEscapeCharacters(text);
      textState.height = this.calcTextHeight(textState, false);
      while (textState.index < textState.text.length) {
          this.processCharacter(textState);
      }
      return textState.x - x;
    } else {
        return 0;
    }
  }

}

module.exports = FlareWindowBase;
