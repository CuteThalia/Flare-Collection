/**
 * Create the currency window.
 *
 * Create a window that is the size of the entire game box.
 * This window displays all the currencies a party has.
 *
 * Currencies not stored here is gold.
 */
class FlareCurrencyWindow extends Window_Base {
  constructor() {
    super();

    this.initialize();
    this.refresh();
  }

  initialize() {
    super.initialize(0, 0, this.windowWidth(), this.windowHeight());
  }

  windowWidth() {
    return Graphics.boxWidth;
  }

  windowHeight() {
    return Graphics.boxHeight;
  }

  refresh() {
    this.drawText('Hello World', 150, 200, 100, 'center');
    this.drawText('Hello World', 150, 300, 100, 'center');
    this.drawText('Hello World', 300, 300, 100, 'center');
    this.drawText('Hello World', 450, 300, 100, 'center');
  }
}

module.exports = FlareCurrencyWindow;
