var FlareLawWasBrokenWindowScene = require('../scenes/flare_law_was_broken_window_scene');

var oldSceneBasePrototypeCheckGameOverMethod = Scene_Base.prototype.checkGameover;
Scene_Base.prototype.checkGameover = function() {
    if (window._lawsForMap !== undefined && window._lawsForMap.length > 0 && window._brokenLawObject !== null) {
      if ($gameParty.isAllDead()) {
        SceneManager.push(FlareLawWasBrokenWindowScene);
      }
    } else {
      oldSceneBasePrototypeCheckGameOverMethod.call(this);
    }
};
