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
          var processWhatShouldHappenOnHit = new ProcessBrokenLaw(this.item().name);
          processWhatShouldHappenOnHit.punishPlayer();

          this.item().effects.forEach(function(effect) {
              this.applyItemEffect(target, effect);
          }, this);

          this.applyItemUserEffect(target);
      }
    } else {
      oldGameActionPrototypeApplyMethod.call(this, target);
    }
};
