/**
 * Make music play when user touches region.
 */
class MusicHandler {

  /**
   * Core constructor.
   *
   * @param array regions
   * @param string type
   * @param string name
   * @param int volume
   * @param int pitch
   * @param int pan
   */
  constructor(regions, type, name, volume, pitch, pan) {
    this._musicType      = type;
    this._musicObject    = {name: name, volume: volume, pitch: pitch, pan: pan};
    this._regions        = regions;
    this._fadeOutType    = null;
    this._fadeOutRegions = null;
    this._fadeOutLength  = 0;
  }

  /**
   * Use the AudioManager to play music.
   */
  playMusic() {
    switch(this._musicType) {
      case 'BGM':
        return AudioManager.playBgm(this._musicObject);
      case 'BGS':
        return AudioManager.playBgs(this._musicObject);
      case 'SE':
        return AudioManager.playSe(this._musicObject);
      case 'ME':
        return AudioManager.playMe(this._musicObject);
    }
  }

  /**
   * Set up the fade out music information.
   *
   * @param array regions
   * @param string type
   * @param int length
   */
  fadeOutMusic(regions, type, length) {
    this._fadeOutRegions  = regions;
    this._fadeOutType     = type;
    this._fadeOutLength   = length
  }

  /**
   * Fade out music over time.
   */
  fadeOutSpecifiedTypeOnRegionTouch() {
    if (this._fadeOutType && this._fadeOutLength > 0) {
      switch(this._musicType) {
        case 'BGM':
          return AudioManager.fadeOutBgm(this._fadeOutLength);
        case 'BGS':
          return AudioManager.fadeOutBgs(this._fadeOutLength);
        case 'SE':
          return AudioManager.stopSe();
        case 'ME':
          return AudioManager.fadeOutMe(this._fadeOutLength);
      }
    }
  }

  /**
   * Get the regions
   *
   * @return array or undefined
   */
  getRegions() {
    return this._regions;
  }

  /**
   * Get the fade out regions.
   *
   * @return array or undefined
   */
  getFadeOutRegions() {
    return this._fadeOutRegions;
  }
}

module.exports = MusicHandler;
