var JudgePoints = require('../add_judge_points');

var oldSceneMapPrototypeOnMapLoadedMethod = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
  oldSceneMapPrototypeOnMapLoadedMethod.call(this);
  var flareJudgePoints = new JudgePoints();
  flareJudgePoints.grabMapInformation();
}
