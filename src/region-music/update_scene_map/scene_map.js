import lodashIsUndefined from 'lodash/lang/isUndefined';
import lodashIncludes    from 'lodash/collection/includes';

var oldSceneMapPrototypeUpdateMethod = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
  oldSceneMapPrototypeUpdateMethod.call(this);

  // Do we have a Music Handler instance?
  if (!lodashIsUndefined(FlarePlayMusicOnRegionTouch._getMusicHandlerInstance())) {

    // Grab some info.
    var musicHandler = FlarePlayMusicOnRegionTouch._getMusicHandlerInstance();
    var foundItem = lodashIncludes(musicHandler.getRegions(), $gamePlayer.regionId());

    // Musics not playing and we found that player is on region x.
    // Play music and then state "yes we are playing music".
    if (foundItem && !FlarePlayMusicOnRegionTouch.isMusicPlaying()) {
      musicHandler.playMusic();
      FlarePlayMusicOnRegionTouch.setMusicToPlay(true);
    }

    // Music is plating and player is on region y.
    // Fade out or stop music and then state: No we are not playing music.
    if (FlarePlayMusicOnRegionTouch.isMusicPlaying()) {
      var foundItem = lodashIncludes(musicHandler.getFadeOutRegions(), $gamePlayer.regionId());

      if (foundItem) {
        musicHandler.fadeOutSpecifiedTypeOnRegionTouch();
        FlarePlayMusicOnRegionTouch.setMusicToPlay(false);
      }
    }
  }
};
