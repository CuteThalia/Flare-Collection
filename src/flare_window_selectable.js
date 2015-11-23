/**
 * @namespace FlareCollection
 */

/**
 * Flares custom window selectable.
 *
 * Allows a specific level of abstraction to be addd.
 */
class FlareWindowSelectable extends Window_Selectable {

  constructor(args) {
    super(args);
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
      textState.text = textState.text.replace(/\\/g, '');
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

module.exports = FlareWindowSelectable = FlareWindowSelectable;
