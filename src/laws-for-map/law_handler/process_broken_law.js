var LawsForMap                   = require('../law_storage/laws_for_map');
var lodashFindWhere              = require('../../../node_modules/lodash/collection/findWhere');
var FlareLawWasBrokenWindowScene = require('../scenes/flare_law_was_broken_window_scene');
var OptionHandler                = require('../options/option_handler');

/**
 * @namespace FlareLawsForMap.
 */

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
    this._nameOfAction     = nameOfAction;
    this._actorWhobrokeLaw = actorWhoBrokeLaw
  }

  /**
   * Validate that the player actually broke a law.
   *
   * @return boolean
   */
  validatePlayerBrokeTheLaw() {

    for (var i = 0; i < LawsForMap.getLawsForMap().length; i ++) {
      if (LawsForMap.getLawsForMap()[i].cantUse.indexOf(this._nameOfAction) !== -1) {
        return true;
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
    for (var i = 0; i < LawsForMap.getLawsForMap().length; i ++) {
      if (LawsForMap.getLawsForMap()[i].cantUse.indexOf(this._nameOfAction) !== -1) {

        window._brokenLawObject = LawsForMap.getLawsForMap()[i];
        window._brokenLawObject.subject    = this._actorWhobrokeLaw._name;
        window._brokenLawObject.actionUsed = this._nameOfAction;

        return LawsForMap.getLawsForMap()[i];
      }
    }
  }

  /**
   * Punish the player based on the laws punishment and amount.
   */
  punishPlayer() {
    // If gold, take away gold.
    if (this.getBrokenLawObject().punishment === 'gold') {
      if ($gameParty._gold > 0) {
        $gameParty._gold -= this.getBrokenLawObject().amount;

        if ($gameParty._gold < 0) {
          $gameParty._gold = 0;
        }
      } else {
        // We have no more gold.
        window._lawMessageForLawBattleWindow = 'Party has no more gold.';
      }
    } else {
      // Handle non gold related punishments.
      this.handleOtherPunishments(this.getBrokenLawObject());
    }
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
