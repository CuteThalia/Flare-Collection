class MusicHandler {

  constructor(regions, type, name, volume, pitch, pan) {
    this._musicType      = type;
    this._musicObject    = {name: name, volume: volume, pitch: pitch, pan: pan};
    this._regions        = regions;
    this._fadeOutType    = null;
    this._fadeOutRegions = null;
    this._fadeOutLength  = 0;
  }

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

  fadeOutMusic(regions, type, length) {
    this._fadeOutRegions  = regions;
    this._fadeOutType     = type;
    this._fadeOutLength   = length
  }

  fadeOutSpecifiedTypeOnRegionTouch() {
    if (this._fadeOutType && this._fadeOutLength > 0) {
      switch(this._musicType) {
        case 'BGM':
          return AudioManager.fadeOutBgm(this._fadeOutLength);
        case 'BGS':
          return AudioManager.fadeOutBgs(this._fadeOutLength);
        case 'SE':
          while (this._fadeOutLength > 0) {
            if (this._musicObject.volume > 0) {
              AudioManager.playSe(this._musicObject);
              this._musicObject.volume -= 10
              this._fadeOutLength --
            } else {
              return AudioManager.stopSe();
            }
          }
          return AudioManager.stopSe();
        case 'ME':
          return AudioManager.fadeOutMe(this._fadeOutLength);
      }
    }
  }

  getRegions() {
    return this._regions;
  }

  getFadeOutRegions() {
    return this._fadeOutRegions;
  }
}

module.exports = MusicHandler;
