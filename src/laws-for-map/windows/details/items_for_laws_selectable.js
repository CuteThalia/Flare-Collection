/**
 * @namespace FlareLawsForMap.
 */

import FlareWindowSelectable      from '../../../flare_window_selectable';
import wordWrap                   from 'underscore.string/wrap';
import RewardProcessor            from '../../reward_storage/reward_processor';
import lodashIsUndefined          from 'lodash/lang/isUndefined';
import SelectableWindowContainer  from '../../../selectable_window_container';
import CompiledStorageContainer   from '../../reward_storage/compiled_storage_container';

/**
 * Creates a list of items including xp and gold
 */
class ItemsForLawSelectable extends FlareWindowSelectable {

  constructor() {
    super();
  }

  initialize() {
    var width  = (Graphics.boxWidth / 2) - 70;
    var height = 290;
    var data   = new RewardProcessor();

    this._rewards = CompiledStorageContainer.getContainer();

    super.initialize(width, (Graphics.boxHeight / 2) + 20, width + 140, height);
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

      if (!lodashIsUndefined(reward.belongsToCurrency) && reward.belongsToCurrency !== null) {
        this.flareDrawTextEx('\\\c[14]Belongs to currency\\\c[0]: ' + reward.belongsToCurrency, 10, rectangle.y + 60);
        this.flareDrawTextEx('\\\c[14]And costs\\\c[0]: ' + reward.currencyCost, 10, rectangle.y + 80);
      } else {

        if (!lodashIsUndefined(reward['xp'])) {
          this.flareDrawTextEx('\\\c[16]Xp to gain:\\\c[0] ' + reward.xp, 10, rectangle.y + 20);
        } else if (!lodashIsUndefined(reward['gold'])) {
          this.flareDrawTextEx('\\\c[16]Gold to gain:\\\c[0] ' + reward.gold, 10, rectangle.y + 20);
        } else {
          this.flareDrawTextEx('\\\c[14]Sold in shops for\\\c[0]: ' + reward.price, 10, rectangle.y + 60);
        }
      }

    }

    this.resetFontSettings();
  }
}

module.exports = ItemsForLawSelectable;
