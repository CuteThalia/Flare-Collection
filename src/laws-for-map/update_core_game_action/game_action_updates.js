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

          // Punish the user for breaking a law, assuming they have.
          if (this.subject() instanceof Game_Actor && target instanceof Game_Actor) {
            this.applyPunishment(this.item().name, this.subject())
          } else if (target instanceof Game_Enemy ) {
            this.applyPunishment(this.item().name, this.subject())
          }

          this.item().effects.forEach(function(effect) {
              this.applyItemEffect(target, effect);
          }, this);

          this.applyItemUserEffect(target);
      }
    } else {
      oldGameActionPrototypeApplyMethod.call(this, target);
    }
}

Game_Action.prototype.applyPunishment = function(itemName, subject) {
  var processWhatShouldHappenOnHit = new ProcessBrokenLaw(itemName, subject);
  if (processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw()) {
    processWhatShouldHappenOnHit.punishPlayer();
  }
}
