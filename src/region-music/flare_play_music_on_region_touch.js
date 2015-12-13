
import MusicHandler      from './system/handler/music_handler';
import lodashIsUndefined from 'lodash/lang/isUndefined';

/*:
 * @plugindesc Allows you to play music on region touch.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @help
 *
 * Playing music on region touch is super simple. All you
 * have to do is the following:
 *
 * Paint down a couple regions, one or more is fine. These are the regions
 * that when a player touches the sound will play.
 *
 * Paint down a couple other regions. One or more is fine.
 * These are the regions that when a player touches, the
 * music fades out.
 *
 * Next create a parallel event, add the following code:
 *
 * FlarePlayMusicOnRegionTouch.playMusic(
 *  regions, type, name, volume, pitch, pan
 * );
 *
 * FlarePlayMusicOnRegionTouch.fadeOutOnRegions(
 *  regions, type, length
 * );
 *
 * - Regions is an array of regions, it must be an array.
 *   Example: [1,2,3] or [1]
 * - type is: BGS, ME, SE, BGM as a string.
 * - name is the name of the file you want to play.
 *   If this doesnt exist and erro is thrown.
 *
 * - volume, 0 - 100
 * - pitch, 0 - 100
 * - pan, the higher it is the more to the right it plays,
 *   the lower more to the left. Pass in 0 for
 *   for equal speaker play.
 *
 * - length, for fadeOut. The length (default 15) of how
 *   long the music takes to
 *   fade out for BGM and BGS and ME. The higher the length,
 *   the longer it takes.
 *
 * Example:
 *
 *   FlarePlayMusicOnRegionTouch.playMusic(
 *     [19], 'BGS', 'River', 50, 100, 0
 *   )
 *
 *   FlarePlayMusicOnRegionTouch.fadeOutOnRegions(
 *     [20], 'BGS', 2
 *   )
 *
 * The above states that, turn on BGS River at volume 50 with pitch
 * of 100 and pan of 0, when the player touches region 19.
 *
 * Then  we, turn off  (or fade out) BGS music when the player touches
 * region 20 at a length of 2 seconds.
 *
 */

/**
 * Class for dealing with music on region touch.
 */
class FlarePlayMusicOnRegionTouch {

  /**
   * Plays music when the user touches any of the regions listed.
   *
   * @param array regions
   * @param string type
   * @param int volume
   * @param int pitch
   * @param int pan
   */
  static playMusic(regions, type, name, volume, pitch, pan) {
    if (Array.isArray(regions)) {
      throw new Error('regions must be an array: [1,...,x] or [1]');
    }

    var musicHandler = new MusicHandler(regions, type, name, volume, pitch, pan);
    this._setMusicHandlerInstance(musicHandler);
  }

  /**
   * Fades out the music when the player touches any of the regions specified.
   *
   * @param Array regions
   * @param string type
   * @param int length
   */
  static fadeOutOnRegions(regions, type, length) {
    if (Array.isArray(regions)) {
      throw new Error('regions must be an array: [1,...,x] or [1]');
    }

    if (lodashIsUndefined(this._getMusicHandlerInstance())) {
      throw new Error('Cannot fade out music on specified regions, because we dont know which regions to fade in music on.');
    }

    if (lodashIsUndefined(length)) {
      length = 15;
    }

    this._getMusicHandlerInstance().fadeOutMusic(regions, type, length);
  }

  /**
   * Set the music to playing.
   *
   * @param boolean
   */
  static setMusicToPlay(playing) {
    this._musicIsPlaying = playing;
  }

  /**
   * Is the music playing?
   *
   * @return boolean
   */
  static isMusicPlaying() {
    if (lodashIsUndefined(this._musicIsPlaying)) {
      return false;
    }

    return this._musicIsPlaying
  }

  /**
   * Create a music handler instance.
   *
   * @param MusicHandler musicClass
   */
  static _setMusicHandlerInstance(musicClass) {
    if (musicClass instanceof MusicHandler) {
      this._musicHandler = musicClass;
    } else {
      throw new Error(musicClass + 'is not an instance of MusicHandler class');
    }
  }

  /**
   * Get the Music Handler instance.
   *
   * @return undefined or MusicHandler
   */
  static _getMusicHandlerInstance() {
    return this._musicHandler;
  }
}

window.FlarePlayMusicOnRegionTouch = FlarePlayMusicOnRegionTouch;
