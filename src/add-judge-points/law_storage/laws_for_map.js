class LawsForMap {

  static storeLaw(law) {

    var lawCannotUse     = law.cantUse.split(',');
    lawCannotUse.length  = 3;
    window._lawCannotUse = lawCannotUse;

    window._lawsForMap.push({
      name: law.name,
      punishment: law.punishment,
      amount: law.amount,
      icon: law.icon,
      cantUse: law.cantUse
    });
  }

  static getLawsForMap() {
    return window._lawsForMap;
  }
}

window._lawCannotUse = [];
module.exports = LawsForMap;
