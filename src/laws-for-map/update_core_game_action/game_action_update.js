var ProcessBrokenLaw = require('../law_handler/process_broken_law');

/**
 * @namespace FlareLawsForMap.
 */

var oldGameActionPrototypeInitializeMethod = Game_Action.prototype.initialize;
Game_Action.prototype.initialize = function(subject, forcing) {
  oldGameActionPrototypeInitializeMethod.call(this, subject, forcing);
  this._calledOnce = false;
}

var oldGameActionPrototypeApplyMethod = Game_Action.prototype.apply
Game_Action.prototype.apply = function(target) {
    oldGameActionPrototypeApplyMethod.call(this, target);

    if (this._calledOnce === false) {
      this.applyPunishmentIfLawIsBroken(this.item(), this.subject(), target);
      this._calledOnce = true;
    }
}

/**
 * If the user broke a law then apply the punishment.
 *
 * Its simple really. If the user targets self or another game actor
 * and breaks a law, punish.
 *
 * If the user targets the enemy and the law is broken, punish.
 *
 * In game battles we show game messages.
 *
 * On the map we show a window.
 */
Game_Action.prototype.applyPunishmentIfLawIsBroken = function(item, subject, target) {
  var processWhatShouldHappenOnHit = new ProcessBrokenLaw(item.name, subject);

  // Punish the user for breaking a law, assuming they have.
  if (subject instanceof Game_Actor && target instanceof Game_Actor &&
    processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw() && !$gameParty.inBattle()) {

    // Punish for items, spells and others that target the player or players.
    processWhatShouldHappenOnHit.checkForGoldBeforePunish(true);
    processWhatShouldHappenOnHit.openMessageWindow();
    processWhatShouldHappenOnHit.punishPlayer();

  } else if ((target instanceof Game_Enemy &&
    processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw()) ||
    (subject instanceof Game_Actor && target instanceof Game_Actor &&
      processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw()) &&
    $gameParty.inBattle()) {
    var brokenLawObject = processWhatShouldHappenOnHit.getBrokenLawObject();

    // Punish the player for those that effect the enemy.
    $gameMessage.add("\\c[9]" + subject._name + "\\c[0]" + ' has \\c[14]broken a law\\c[0] prohibiting the use of: ' + "\\c[18]" + item.name + 's\\c[0]');
    $gameMessage.add("\\c[14] Punishment is: \\c[0]" +  "\\c[20]" + brokenLawObject.punishment + "\\c[0] in the amount of: " + "\\c[20]" + brokenLawObject.amount + "\\c[0]");

    // Display no more gold message and punish the player.
    processWhatShouldHappenOnHit.checkForGoldBeforePunish(false);
    processWhatShouldHappenOnHit.punishPlayer();

  } else {
    item.effects.forEach(function(effect) {
        this.applyItemEffect(target, effect);
    }, this);

    this.applyItemUserEffect(target);
  }
}
