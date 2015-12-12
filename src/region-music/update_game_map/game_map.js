import lodashIsUndefined from 'lodash/lang/isUndefined';
import lodashIncludes    from 'lodash/collection/includes';

Game_Map.prototype.regionId = function(x, y) {
    if (!lodashIsUndefined(FlarePlayMusicOnRegionTouch._getMusicHandlerInstance())) {
      var musicHandler = FlarePlayMusicOnRegionTouch._getMusicHandlerInstance();
      var id           = this.isValid(x, y) ? this.tileId(x, y, 5) : 0;

      var foundItem = lodashIncludes(musicHandler.getRegions(), id);

      if (foundItem && !FlarePlayMusicOnRegionTouch.isMusicPlaying()) {
        musicHandler.playMusic();
        FlarePlayMusicOnRegionTouch.setMusicToPlay(true);
      }

      if (FlarePlayMusicOnRegionTouch.isMusicPlaying()) {
        var foundItem = lodashIncludes(musicHandler.getFadeOutRegions(), id);

        if (foundItem) {
          musicHandler.fadeOutSpecifiedTypeOnRegionTouch();
          FlarePlayMusicOnRegionTouch.setMusicToPlay(false);
        }
      }
    }

    return this.isValid(x, y) ? this.tileId(x, y, 5) : 0;
};
