var ProcessBrokenLaw = require('../law_handler/process_broken_law');

var oldGameActionPrototypeApplyMethod = Game_Action.prototype.apply
Game_Action.prototype.apply = function(target) {
    if (window._lawsForMap !== undefined && window._lawsForMap.length > 0) {
      var result = target.result();
      this.subject().clearResult();
      result.clear();
      result.used = this.testApply(target);
      result.missed = (result.used && Math.random() >= this.itemHit(target));
      result.evaded = (!result.missed && Math.random() < this.itemEva(target));
      result.physical = this.isPhysical();
      result.drain = this.isDrain();

      if (result.isHit()) {
          if (this.item().damage.type > 0) {
              result.critical = (Math.random() < this.itemCri(target));
              var value = this.makeDamageValue(target, result.critical);
              this.executeDamage(target, value);
          }

          this.applyPunishmentIfLawIsBroken(this.item(), this.subject(), target);
      }
    } else {
      oldGameActionPrototypeApplyMethod.call(this, target);
    }
}

Game_Action.prototype.applyPunishmentIfLawIsBroken = function(item, subject, target) {
  var processWhatShouldHappenOnHit = new ProcessBrokenLaw(item.name, subject);
  console.log(subject);

  // Punish the user for breaking a law, assuming they have.
  if (subject instanceof Game_Actor && target instanceof Game_Actor &&
    processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw()) {

    // Punish for items, spells and others that target the player or players.
    processWhatShouldHappenOnHit.punishPlayer();
    processWhatShouldHappenOnHit.openMessageWindow();
    
  } else if (target instanceof Game_Enemy &&
    processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw()) {

    // Punish the player for those that effect the enemy.
    $gameMessage.add("\\c[9]" + subject._name + "\\c[0]" + ' has \\c[14]broken a law\\c[0] prohibiting the use of: ' + item.name + 's');
    processWhatShouldHappenOnHit.punishPlayer();
  } else {
    item.effects.forEach(function(effect) {
        this.applyItemEffect(target, effect);
    }, this);

    this.applyItemUserEffect(target);
  }
}
