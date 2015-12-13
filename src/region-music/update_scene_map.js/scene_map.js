import lodashIsUndefined from 'lodash/lang/isUndefined';
import lodashIncludes    from 'lodash/collection/includes';

var oldSceneMapPrototypeUpdateMethod = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
  oldSceneMapPrototypeUpdateMethod.call(this);

  if (!lodashIsUndefined(FlarePlayMusicOnRegionTouch._getMusicHandlerInstance())) {

    var musicHandler = FlarePlayMusicOnRegionTouch._getMusicHandlerInstance();
    var foundItem = lodashIncludes(musicHandler.getRegions(), $gamePlayer.regionId());

    if (foundItem && !FlarePlayMusicOnRegionTouch.isMusicPlaying()) {
      musicHandler.playMusic();
      FlarePlayMusicOnRegionTouch.setMusicToPlay(true);
    }

    if (FlarePlayMusicOnRegionTouch.isMusicPlaying()) {
      var foundItem = lodashIncludes(musicHandler.getFadeOutRegions(), $gamePlayer.regionId());

      if (foundItem) {
        musicHandler.fadeOutSpecifiedTypeOnRegionTouch();
        FlarePlayMusicOnRegionTouch.setMusicToPlay(false);
      }
    }
  }
};
