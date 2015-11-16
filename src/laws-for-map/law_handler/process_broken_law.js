var LawsForMap                   = require('../law_storage/laws_for_map');
var lodashFindWhere              = require('../../../node_modules/lodash/collection/findWhere');
var FlareLawWasBrokenWindowScene = require('../scenes/flare_law_was_broken_window_scene');

class ProcessBrokenLaw {

  constructor(nameOfAction, actorWhoBrokeLaw) {
    this._nameOfAction     = nameOfAction;
    this._actorWhobrokeLaw = actorWhoBrokeLaw
  }

  validatePlayerBrokeTheLaw() {

    for (var i = 0; i < LawsForMap.getLawsForMap().length; i ++) {
      if (LawsForMap.getLawsForMap()[i].cantUse.indexOf(this._nameOfAction) !== -1) {
        return true;
      }
    }

    return false;
  }

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

  punishPlayer() {
    if (this.getBrokenLawObject().punishment === 'gold') {
      if ($gameParty._gold > 0) {
        $gameParty._gold -= this.getBrokenLawObject().amount;

        if ($gameParty._gold < 0) {
          $gameParty._gold = 0;
        }
      } else {
        window._lawMessageForLawBattleWindow = 'Party has no more gold.';
      }
    } else {
      this.handleOtherPunishments(this.getBrokenLawObject());
    }
  }

  openMessageWindow() {
    if (SceneManager._scene instanceof Scene_Item) {
      SceneManager.push(FlareLawWasBrokenWindowScene);
    } else if (SceneManager._scene instanceof Scene_Skill) {
      SceneManager.push(FlareLawWasBrokenWindowScene);
    }
  }

  /**
   * Handle various punishments for player.
   */
  handleOtherPunishments(lawObject) {
    switch(lawObject.punishment) {
      case 'hp':
        var health = this._actorWhobrokeLaw._hp;
        health -= lawObject.amount

        if (health <= 0) {
          this._actorWhobrokeLaw.die();
          window._isDeadFromBreakingLaw = true;
          window._subjectWhoBrokeLaw = this._actorWhobrokeLaw;
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

window._lawMessageForLawBattleWindow = null;
window._brokenLawObject = null;
window._subjectWhoBrokeLaw = null;
window._isDeadFromBreakingLaw = false;
