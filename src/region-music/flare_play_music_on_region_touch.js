
import MusicHandler      from './system/handler/music_handler';
import lodashIsUndefined from 'lodash/lang/isUndefined';

/*:
 * @plugindesc Allows you to play music on region touch.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @help
 */

class FlarePlayMusicOnRegionTouch {

  static playMusic(regions, type, name, volume, pitch, pan) {
    var musicHandler = new MusicHandler(regions, type, name, volume, pitch, pan);
    this._setMusicHandlerInstance(musicHandler);
  }

  static fadeOutOnRegions(regions, type, length) {
    if (lodashIsUndefined(this._getMusicHandlerInstance())) {
      throw new Error('Cannot fade out music on specified regions, because we dont know which regions to fade in music on.');
    }

    if (lodashIsUndefined(length)) {
      length = 15;
    }

    this._getMusicHandlerInstance().fadeOutMusic(regions, type, length);
  }

  static setMusicToPlay(playing) {
    this._musicIsPlaying = playing;
  }

  static isMusicPlaying() {
    if (lodashIsUndefined(this._musicIsPlaying)) {
      return false;
    }

    return this._musicIsPlaying
  }

  static _setMusicHandlerInstance(musicClass) {
    if (musicClass instanceof MusicHandler) {
      this._musicHandler = musicClass;
    } else {
      throw new Error(musicClass + 'is not an instance of MusicHandler class');
    }
  }

  static _getMusicHandlerInstance() {
    return this._musicHandler;
  }
}

window.FlarePlayMusicOnRegionTouch = FlarePlayMusicOnRegionTouch;
