  /**
 * @namespace FlareNotification.
 */

// Plugin Options.
var FlareNotificationWindow = PluginManager.parameters('Flare-NotificationWindow');

/**
 * Notifiation Options.
 *
 * Set options such as how long till the next window and how long till
 * a window fades out after it fades in.
 */
class NotificationOptions {

  static createNotificationOptions() {
    this.getGoldInformation(FlareNotificationWindow);
    this.getItemInformation(FlareNotificationWindow);
    this.getWeaponInformation(FlareNotificationWindow);
    this.getPartyInformation(FlareNotificationWindow);
    this.getActorHPInformation(FlareNotificationWindow);
    this.getActorMPInformation(FlareNotificationWindow);
    this.getActorTPInformation(FlareNotificationWindow);
    this.getActorStateInformation(FlareNotificationWindow);
    this.getRecoverAllInformation(FlareNotificationWindow);
    this.getXpInformation(FlareNotificationWindow);
    this.getLevelGainInformation(FlareNotificationWindow);

    this._notificationOptions = {
      timeTillNextWindow:                     FlareNotificationWindow['Till Next Notification?'],
      fadeOutTime:                            FlareNotificationWindow['How Long Till Notification Fade Out?'],
      stickToTop:                             FlareNotificationWindow['Should I stay at the top?'],
      fadeOutCalculation:                     FlareNotificationWindow['Calulation For Fade out'],
      showWindow:                             FlareNotificationWindow['Show Window?'],
      showGoldNotificationEvent:              FlareNotificationWindow['Display Gold Notification Event?'],
      goldNotificationWindowWidth:            parseInt(FlareNotificationWindow['Gold Notification Width']),
      goldNotificationFontSize:               parseInt(FlareNotificationWindow['Gold Notification Font Size']),
      goldNotificationWindowMoveDown:         this._goldNotificationWindowMoveDown,
      goldNotificationWindowFadeOut:          this._goldNotificationWindowFadeOut,
      goldNotificationLossWindowText:         FlareNotificationWindow['Gold Notification Text (Loss)'],
      goldNotificationGainWindowText:         FlareNotificationWindow['Gold Notification Text (Gained)'],
      showItemNotificationEvent:              FlareNotificationWindow['Display Item Notification Event?'],
      itemNotificationWindowWidth:            parseInt(FlareNotificationWindow['Item Notification Width']),
      itemNotificationFontSize:               parseInt(FlareNotificationWindow['Item Notification Font Size']),
      itemNotificationWindowMoveDown:         this._itemNotificationWindowMoveDown,
      itemNotificationWindowFadeOut:          this._itemNotificationWindowFadeOut,
      itemNotificationWindowTextGain:         FlareNotificationWindow['Notification Text (Loss)'],
      itemNotificationWindowTextLoss:         FlareNotificationWindow['Item Notification Text (Gained)'],
      itemNotificationWindowColor:            parseInt(FlareNotificationWindow['Item Notification Text (color)']),
      showWeaponNotificationEvent:            FlareNotificationWindow['Display Weapon Notification Event?'],
      weaponNotificationWindowWidth:          parseInt(FlareNotificationWindow['Weapon Notification Width']),
      weaponNotificationFontSize:             parseInt(FlareNotificationWindow['Weapon Notification Font Size']),
      weaponNotificationWindowMoveDown:       this._weaponNotificationWindowMoveDown,
      weaponNotificationWindowFadeOut:        this._weaponNotificationWindowFadeOut,
      showArmorNotificationEvent:             FlareNotificationWindow['Display Armor Notification Event?'],
      armorNotificationWindowWidth:           parseInt(FlareNotificationWindow['Armor Notification Width']),
      armorNotificationFontSize:              parseInt(FlareNotificationWindow['Armor Notification Font Size']),
      armorNotificationWindowMoveDown:        this._armorNotificationWindowMoveDown,
      armorNotificationWindowFadeOut:         this._armorNotificationWindowFadeOut,
      showPartyMemberJoiningParty:            FlareNotificationWindow['Display Party Notification Event?'],
      partyNotificationWindowWidth:           parseInt(FlareNotificationWindow['Party Notification Width']),
      partyNotificationFontSize:              parseInt(FlareNotificationWindow['Party Notification Font Size']),
      partyNotificationWindowMoveDown:        this._partyNotificationWindowMoveDown,
      partyNotificationWindowFadeOut:         this._partyNotificationWindowFadeOut,
      showHpChangingForActor:                 FlareNotificationWindow['Display HP Notification Event?'],
      hpNotificationWindowWidth:              parseInt(FlareNotificationWindow['HP Notification Width']),
      hpNotificationFontSize:                 parseInt(FlareNotificationWindow['HP Notification Font Size']),
      hpNotificationWindowMoveDown:           this._hpNotificationWindowMoveDown,
      hpNotificationWindowFadeOut:            this._hpNotificationWindowFadeOut,
      showMpChangingForActor:                 FlareNotificationWindow['Display MP Notification Event?'],
      mpNotificationWindowWidth:              parseInt(FlareNotificationWindow['MP Notification Width']),
      mpNotificationFontSize:                 parseInt(FlareNotificationWindow['MP Notification Font Size']),
      mpNotificationWindowMoveDown:           this._mpNotificationWindowMoveDown,
      mpNotificationWindowFadeOut:            this._mpNotificationWindowFadeOut,
      showTpChangingForActor:                 FlareNotificationWindow['Display TP Notification Event?'],
      tpNotificationWindowWidth:              parseInt(FlareNotificationWindow['TP Notification Width']),
      tpNotificationFontSize:                 parseInt(FlareNotificationWindow['TP Notification Font Size']),
      tpNotificationWindowMoveDown:           this._tpNotificationWindowMoveDown,
      tpNotificationWindowFadeOut:            this._tpNotificationWindowFadeOut,
      showStateChangingForActor:              FlareNotificationWindow['Display State Notification Event?'],
      stateNotificationWindowWidth:           parseInt(FlareNotificationWindow['State Notification Width']),
      stateNotificationFontSize:              parseInt(FlareNotificationWindow['State Notification Font Size']),
      stateNotificationWindowMoveDown:        this._stateNotificationWindowMoveDown,
      stateNotificationWindowFadeOut:         this._stateNotificationWindowFadeOut,
      showRecoverAllForActor:                 FlareNotificationWindow['Display Recover All Notification Event?'],
      recoverAllNotificationWindowWidth:      parseInt(FlareNotificationWindow['Recover All Notification Width']),
      recoverAllNotificationFontSize:         parseInt(FlareNotificationWindow['Recover All Notification Font Size']),
      recoverAllNotificationWindowMoveDown:   this._recoverAllNotificationWindowMoveDown,
      recoverAllNotificationWindowFadeOut:    this._recoverAllNotificationWindowFadeOut,
      showXpForActor:                         FlareNotificationWindow['Display Xp Notification Event?'],
      xPNotificationWindowWidth:              parseInt(FlareNotificationWindow['Xp Notification Width']),
      xPNotificationFontSize:                 parseInt(FlareNotificationWindow['Xp Notification Font Size']),
      xPNotificationWindowMoveDown:           this._xPNotificationWindowMoveDown,
      xPNotificationWindowFadeOut:            this._xPNotificationWindowFadeOut,
      showLevelGainForActor:                  FlareNotificationWindow['Display Level gain Notification Event?'],
      levelGainNotificationWindowWidth:       parseInt(FlareNotificationWindow['Level gain Notification Width']),
      levelGainNotificationFontSize:          parseInt(FlareNotificationWindow['Level gain Notification Font Size']),
      levelGainNotificationWindowMoveDown:    this._levelGainNotificationWindowMoveDown,
      levelGainNotificationWindowFadeOut:     this._levelGainNotificationWindowFadeOut,
    };
  }

  static getNotificationOptions() {
    return this._notificationOptions;
  }

  static getGoldInformation(pluginOptions) {
    this._goldNotificationWindowMoveDown = false;
    this._goldNotificationWindowFadeOut  = false;

    if (pluginOptions['Gold Notification Stay At The Top?'] === "true") {
      this._goldNotificationWindowMoveDown = true;
    }

    if (pluginOptions['Gold Notification Should Fadeout?'] === "true") {
      this._goldNotificationWindowFadeOut = true;
    }
  }

  static getItemInformation(pluginOptions) {
    this._itemNotificationWindowMoveDown = false;
    this._itemNotificationWindowFadeOut  = false;

    if (pluginOptions['Item Notification Stay At The Top?'] === "true") {
      this._itemNotificationWindowMoveDown = true;
    }

    if (pluginOptions['Item Notification Should Fadeout?'] === "true") {
      this._itemNotificationWindowFadeOut = true;
    }
  }

  static getWeaponInformation(pluginOptions) {
    this._weaponNotificationWindowMoveDown = false;
    this._weaponNotificationWindowFadeOut  = false;

    if (pluginOptions['Weapon Notification Stay At The Top?'] === "true") {
      this._weaponNotificationWindowMoveDown = true;
    }

    if (pluginOptions['Weapon Notification Should Fadeout?'] === "true") {
      this._weaponNotificationWindowFadeOut = true;
    }
  }

  static getArmorInformation(pluginOptions) {
    this._armorNotificationWindowMoveDown = false;
    this._armorNotificationWindowFadeOut  = false;

    if (pluginOptions['Armor Notification Stay At The Top?'] === "true") {
      this._armorNotificationWindowMoveDown = true;
    }

    if (pluginOptions['Armor Notification Should Fadeout?'] === "true") {
      this._armorNotificationWindowFadeOut = true;
    }
  }

  static getPartyInformation(pluginOptions) {
    this._partyNotificationWindowMoveDown = false;
    this._partyNotificationWindowFadeOut  = false;

    if (pluginOptions['Party Notification Stay At The Top?'] === "true") {
      this._partyNotificationWindowMoveDown = true;
    }

    if (pluginOptions['Party Notification Should Fadeout?'] === "true") {
      this._partyNotificationWindowFadeOut = true;
    }
  }

  static getActorHPInformation(pluginOptions) {
    this._hpNotificationWindowMoveDown = false;
    this._hpNotificationWindowFadeOut  = false;

    if (pluginOptions['HP Notification Stay At The Top?'] === "true") {
      this._hpNotificationWindowMoveDown = true;
    }

    if (pluginOptions['HP Notification Should Fadeout?'] === "true") {
      this._hpNotificationWindowFadeOut = true;
    }
  }

  static getActorMPInformation(pluginOptions) {
    this._mpNotificationWindowMoveDown = false;
    this._mpNotificationWindowFadeOut  = false;

    if (pluginOptions['MP Notification Stay At The Top?'] === "true") {
      this._mpNotificationWindowMoveDown = true;
    }

    if (pluginOptions['MP Notification Should Fadeout?'] === "true") {
      this._mpNotificationWindowFadeOut = true;
    }
  }

  static getActorTPInformation(pluginOptions) {
    this._tpNotificationWindowMoveDown = false;
    this._tpNotificationWindowFadeOut  = false;

    if (pluginOptions['TP Notification Stay At The Top?'] === "true") {
      this._tpNotificationWindowMoveDown = true;
    }

    if (pluginOptions['TP Notification Should Fadeout?'] === "true") {
      this._tpNotificationWindowFadeOut = true;
    }
  }

  static getActorStateInformation(pluginOptions) {
    this._stateNotificationWindowMoveDown = false;
    this._stateNotificationWindowFadeOut  = false;

    if (pluginOptions['State Notification Stay At The Top?'] === "true") {
      this._stateNotificationWindowMoveDown = true;
    }

    if (pluginOptions['State Notification Should Fadeout?'] === "true") {
      this._stateNotificationWindowFadeOut = true;
    }
  }

  static getRecoverAllInformation(pluginOptions) {
    this._recoverAllNotificationWindowMoveDown = false;
    this._recoverAllNotificationWindowFadeOut  = false;

    if (pluginOptions['Recover All Notification Stay At The Top?'] === "true") {
      this._recoverAllNotificationWindowMoveDown = true;
    }

    if (pluginOptions['Recover All Notification Should Fadeout?'] === "true") {
      this._recoverAllNotificationWindowFadeOut = true;
    }
  }

  static getXpInformation(pluginOptions) {
    this._xPNotificationWindowMoveDown = false;
    this._xPNotificationWindowFadeOut  = false;

    if (pluginOptions['Xp Notification Stay At The Top?'] === "true") {
      this._xPNotificationWindowMoveDown = true;
    }

    if (pluginOptions['Xp Notification Should Fadeout?'] === "true") {
      this._xPNotificationWindowFadeOut = true;
    }
  }

  static getLevelGainInformation(pluginOptions) {
    this._levelGainNotificationWindowMoveDown = false;
    this._levelGainNotificationWindowFadeOut  = false;

    if (pluginOptions['Level Gain Notification Stay At The Top?'] === "true") {
      this._levelGainNotificationWindowMoveDown = true;
    }

    if (pluginOptions['Level Gain Notification Should Fadeout?'] === "true") {
      this._levelGainNotificationWindowFadeOut = true;
    }
  }
}

// Private global object.
window._NotificationOptions = NotificationOptions;

module.exports = NotificationOptions
