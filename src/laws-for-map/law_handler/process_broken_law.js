/**
 * @namespace FlareLawsForMap.
 */

import LawsForMap                   from '../law_storage/laws_for_map';
import lodashFindWhere              from 'lodash/collection/findWhere';
import FlareLawWasBrokenWindowScene from '../scenes/flare_law_was_broken_window_scene';
import OptionHandler                from '../options/option_handler';
import StoreNoGoldMessage           from '../law_storage/store_no_gold_message';
import slugify                      from 'underscore.string/slugify';
import BrokenLawObject              from './helper/store_broken_law_object';

/**
 * When a player breaks a law, we need to punish the actor.
 */
class ProcessBrokenLaw {

  /**
   * Set up the name of the action and the actor who broke the law
   *
   * @param string nameOfAction
   * @param Game_Actor actorWhoBrokeTheLaw
   */
  constructor(nameOfAction, actorWhoBrokeLaw) {
    this._nameOfAction     = slugify(nameOfAction);
    this._actorWhobrokeLaw = actorWhoBrokeLaw
  }

  /**
   * Validate that the player actually broke a law.
   *
   * @return boolean
   */
  validatePlayerBrokeTheLaw() {
    for (var i = 0; i < LawsForMap.getLawsForMap().length; i ++) {
      var cantUse = LawsForMap.getLawsForMap()[i].cantUse

      if (cantUse.indexOf(',') === -1) {
        if (slugify(cantUse) === this._nameOfAction) {
          return true;
        }
      } else {
        cantUse = cantUse.split(',');
        for (var j = 0; j < cantUse.length; j++) {
          if (slugify([cantUse[j]]) === this._nameOfAction) {
            return true;
          }
        }
      }
    }

    return false;
  }

  /**
   * Get the actual broken law object.
   *
   * @return object lawObject
   */
  getBrokenLawObject() {
    BrokenLawObject.emptyContainer();

    for (var i = 0; i < LawsForMap.getLawsForMap().length; i ++) {
      var cantUse = LawsForMap.getLawsForMap()[i].cantUse

      if (cantUse.indexOf(',') === -1) {
        if (slugify(cantUse) === this._nameOfAction) {
            BrokenLawObject.setObject(LawsForMap.getLawsForMap()[i]);
            BrokenLawObject.setKeyValue('subject', this._actorWhobrokeLaw._name);
            BrokenLawObject.setKeyValue('actionUsed', this._nameOfAction);

            return LawsForMap.getLawsForMap()[i];
        }
      } else {
        cantUse = cantUse.split(',');
        for (var j = 0; j < cantUse.length; j++) {
          if (slugify([cantUse[j]]) === this._nameOfAction) {
            BrokenLawObject.setObject(LawsForMap.getLawsForMap()[i]);
            BrokenLawObject.setKeyValue('subject', this._actorWhobrokeLaw._name);
            BrokenLawObject.setKeyValue('actionUsed', this._nameOfAction);

            return LawsForMap.getLawsForMap()[i];
          }
        }
      }
    }
  }

  /**
   * Punish the player based on the laws punishment and amount.
   */
  punishPlayer() {
    // If gold, take away gold.
    if (this.getBrokenLawObject().punishment === 'gold') {
      if ($gameParty._gold !== 0) {
        $gameParty._gold -= this.getBrokenLawObject().amount;

        if ($gameParty._gold < 0) {
          $gameParty._gold = 0;
        }
      }
    } else {
      // Handle non gold related punishments.
      this.handleOtherPunishments(this.getBrokenLawObject());
    }
  }

  /**
   * Check if the party has gold.
   *
   * When a law is broken and punishment is gold. We want to check if
   * the party has gold before we display a message.
   *
   * You can store the message for use later on. Use the
   *  static class to fetch.
   *
   * @param true/false
   * @return false if no gold.
   */
  checkForGoldBeforePunish(storeMessage) {
    if (this.getBrokenLawObject().punishment === 'gold') {
      if ($gameParty._gold === 0) {
        if (!storeMessage) {
          $gameMessage.add('Party has no gold to take.');
        } else {
          StoreNoGoldMessage.createStorage();
          StoreNoGoldMessage.setMessage('Party has no gold to take.');
        }
      }
    }

    return false;
  }

  /**
   * Open a window displaying the broken law.
   *
   * Useful for menu related tasks.
   */
  openMessageWindow() {
    if (SceneManager._scene instanceof Scene_Item) {
      SceneManager.push(FlareLawWasBrokenWindowScene);
    } else if (SceneManager._scene instanceof Scene_Skill) {
      SceneManager.push(FlareLawWasBrokenWindowScene);
    }
  }

  /**
   * Handle various punishments for player.
   *
   * Determine which punishment we need and then punish by the laws
   * amount.
   *
   * In the case of HP we show the broken law window BEFORE game over if done through
   * the menu.
   *
   * @param Object lawObject
   */
  handleOtherPunishments(lawObject) {
    switch(lawObject.punishment) {
      case 'hp':
        var health = this._actorWhobrokeLaw._hp;
        health -= lawObject.amount

        if (health <= 0) {
          this._actorWhobrokeLaw.die();
          this._actorWhobrokeLaw.addState(OptionHandler.getOptions().death_state_id);
        } else {
          this._actorWhobrokeLaw._hp = health;
        }
        break;
      case 'mp':
        var mp = this._actorWhobrokeLaw._mp;
        mp -= lawObject.amount

        if (mp <= 0) {
          this._actorWhobrokeLaw._mp = 0;
        } else {
          this._actorWhobrokeLaw._mp = mp;
        }

        break;
      case 'tp':
        var tp = this._actorWhobrokeLaw._tp;
        tp -= lawObject.amount

        if (tp <= 0) {
          this._actorWhobrokeLaw._tp = 0;
        } else {
          this._actorWhobrokeLaw._tp = tp;
        }
        break;
      case 'xp':
        this._actorWhobrokeLaw.changeExp(-lawObject.amount, true);
        break;
    }
  }
}

module.exports = ProcessBrokenLaw;

// Don't touch.
window._lawMessageForLawBattleWindow = null;
window._brokenLawObject = null;
