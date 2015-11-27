/**
 * @namespace FlareLawsForMap.
 */

import FlareWindowSelectable      from '../../../flare_window_selectable';
import wordWrap                   from 'underscore.string/wrap';
import ShowRewardData             from '../helper/show_reward_data';
import lodashIsUndefined          from 'lodash/lang/isUndefined';
import SelectableWindowContainer  from '../../../selectable_window_container';

class ItemsForLawSelectable extends FlareWindowSelectable {

  constructor() {
    super();
  }

  initialize() {
    var width  = (Graphics.boxWidth / 2) - 70;
    var height = 290;
    var data   = new ShowRewardData();

    this._rewards = [];

    super.initialize(width, (Graphics.boxHeight / 2) + 20, width + 140, height);
    data.processForWindow();

    if (data.getWeaponNames().length > 0) {
      this._rewards.push(data.getWeapons());
    }

    if (data.getArmorNames().length > 0) {
      this._rewards.push(data.getArmors());
    }

    if (data.getItemNames().length > 0) {
      this._rewards.push(data.getItems());
    }

    if (data.getGoldAmount().length > 0) {
      this._rewards.push(data.getGoldAmount());
    }

    if (data.getXpAmount().length > 0) {
      this._rewards.push(data.getXpAmount());
    }

    // flatten the array.
    this._rewards = [].concat.apply([], this._rewards);

    this.refresh();
  }

  update() {
    super.update();

    if (Input.isTriggered("cancel")) {
      SelectableWindowContainer.setKeyValue('parentCursorIsMovable', true);
      SelectableWindowContainer.setKeyValue('cursorIsMovable', false);

      this._cursorIsMovable = false;
    }
  }

  isCursorMovable() {
    if (lodashIsUndefined(SelectableWindowContainer.getKeyValue('cursorIsMovable'))) {
      return false;
    } else {
      return SelectableWindowContainer.getKeyValue('cursorIsMovable');
    }
  }

  maxItems() {
    return this._rewards.length;
  }

  itemHeight() {
    return 105;
  }

  isCurrentItemEnabled() {
    return this.isEnabled(this._rewards);
  }

  drawItem(index) {
    var reward = this._rewards[index];

    if (!reward) {
      return;
    }

    this.drawRewardToScreen(reward, index);
  }

  drawRewardToScreen(reward, index) {
    var rectangle = this.itemRect(index);
    this.contents.fontSize = 18;

    if (typeof reward === 'object') {
      this.drawIcon(reward.iconIndex, 10, rectangle.y + 20 );
      this.drawText(reward.name, 60, rectangle.y + 20);

      if (!lodashIsUndefined(reward.belongsToCurrency)) {
        this.flareDrawTextEx('\\\c[14]Belongs to currency\\\c[0]: ' + reward.belongsToCurrency, 10, rectangle.y + 60);
        this.flareDrawTextEx('\\\c[14]And costs\\\c[0]: ' + reward.currencyCost, 10, rectangle.y + 80);
      } else {
        this.flareDrawTextEx('\\\c[14]Sold in shops for\\\c[0]: ' + reward.price, 10, rectangle.y + 60);
      }
    }

    this.resetFontSettings();
  }
}

module.exports = ItemsForLawSelectable;
