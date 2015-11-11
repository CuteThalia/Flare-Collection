class LawsForMap {

  static storeLaw(law) {
    window._lawsForMap.push({name: law.name, punishment: law.punishment, amount: law.amount, icon: law.icon});
  }

  static getLawsForMap() {
    return window._lawsForMap;
  }
}

module.exports = LawsForMap;
