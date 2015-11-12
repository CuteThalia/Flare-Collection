var LawsForMap      = require('../law_storage/laws_for_map');
var lodashFindWhere = require('../../../node_modules/lodash/collection/findWhere');

class ProcessBrokenLaw {

  constructor(nameOfAction, actorWhoBrokeLaw) {
    this._nameOfAction     = nameOfAction;
    this._actorWhobrokeLaw = actorWhoBrokeLaw
  }

  validatePlayerBrokeTheLaw() {

    for (var i = 0; i < LawsForMap.getLawsForMap().length; i ++) {
      if (LawsForMap.getLawsForMap()[i].cantUse.indexOf(this._nameOfAction)) {
        return true;
      }
    }

    return false;
  }

  getBrokenLawObject() {
    for (var i = 0; i < LawsForMap.getLawsForMap().length; i ++) {
      if (LawsForMap.getLawsForMap()[i].cantUse.indexOf(this._nameOfAction)) {
        window._brokenLawObject = LawsForMap.getLawsForMap()[i];
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

  /**
   * Handle various punishments for player.
   */
  handleOtherPunishments(lawObject) {
    switch(lawObject.punishment) {
      case 'hp':
        var health = this._actorWhobrokeLaw._hp;
        health -= lawObject.amount

        if (health <= 0) {
          this._actorWhobrokeLaw._hp = 0;
          this._actorWhobrokeLaw.die();
          this._actorWhobrokeLaw.performCollapse();
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
