var FlareLawWasBrokenWindowScene = require('../scenes/flare_law_was_broken_window_scene');

var oldSceneBasePrototypeCheckGameOverMethod = Scene_Base.prototype.checkGameover;
Scene_Base.prototype.checkGameover = function() {
    if (window._lawsForMap !== undefined && window._lawsForMap.length > 0) {
      if ($gameParty.isAllDead()) {
        SceneManager.push(FlareLawWasBrokenWindowScene);
      }
    } else {
      if ($gameParty.isAllDead()) {
          SceneManager.goto(Scene_Gameover);
      }
    }
};
