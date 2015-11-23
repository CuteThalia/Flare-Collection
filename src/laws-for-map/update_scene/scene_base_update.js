import FlareLawWasBrokenWindowScene from '../scenes/flare_law_was_broken_window_scene';
import LawsForMap                   from '../law_storage/laws_for_map';

/**
 * @namespace FlareLawsForMap.
 */

var oldSceneBasePrototypeCheckGameOverMethod = Scene_Base.prototype.checkGameover;
Scene_Base.prototype.checkGameover = function() {
    if (LawsForMap.getLawsForMap() !== undefined && LawsForMap.getLawsForMap().length > 0 && window._brokenLawObject !== null) {
      if ($gameParty.isAllDead()) {
        SceneManager.push(FlareLawWasBrokenWindowScene);
      }
    } else {
      oldSceneBasePrototypeCheckGameOverMethod.call(this);
    }
};
