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

    this._notificationOptions = {
      timeTillNextWindow:               FlareNotificationWindow['Till Next Notification?'],
      fadeOutTime:                      FlareNotificationWindow['How Long Till Notification Fade Out?'],
      stickToTop:                       FlareNotificationWindow['Should I stay at the top?'],
      fadeOutCalculation:               FlareNotificationWindow['Calulation For Fade out'],
      showWindow:                       FlareNotificationWindow['Show Window?'],
      showGoldNotificationEvent:        FlareNotificationWindow['Display Gold Notification Event?'],
      goldNotificationWindowWidth:      parseInt(FlareNotificationWindow['Gold Notification Width']),
      goldNotificationFontSize:         parseInt(FlareNotificationWindow['Gold Notification Font Size']),
      goldNotificationWindowMoveDown:   this._goldNotificationWindowMoveDown,
      goldNotificationWindowFadeOut:    this._goldNotificationWindowFadeOut,
      showItemNotificationEvent:        FlareNotificationWindow['Display Item Notification Event?'],
      itemNotificationWindowWidth:      parseInt(FlareNotificationWindow['Item Notification Width']),
      itemNotificationFontSize:         parseInt(FlareNotificationWindow['Item Notification Font Size']),
      itemNotificationWindowMoveDown:   this._itemNotificationWindowMoveDown,
      itemNotificationWindowFadeOut:    this._itemNotificationWindowFadeOut,
      showWeaponNotificationEvent:      FlareNotificationWindow['Display Weapon Notification Event?'],
      weaponNotificationWindowWidth:    parseInt(FlareNotificationWindow['Weapon Notification Width']),
      weaponNotificationFontSize:       parseInt(FlareNotificationWindow['Weapon Notification Font Size']),
      weaponNotificationWindowMoveDown: this._weaponNotificationWindowMoveDown,
      weaponNotificationWindowFadeOut:  this._weaponNotificationWindowFadeOut,
      showArmorNotificationEvent:       FlareNotificationWindow['Display Armor Notification Event?'],
      armorNotificationWindowWidth:     parseInt(FlareNotificationWindow['Armor Notification Width']),
      armorNotificationFontSize:        parseInt(FlareNotificationWindow['Armor Notification Font Size']),
      armorNotificationWindowMoveDown:  this._armorNotificationWindowMoveDown,
      armorNotificationWindowFadeOut:   this._armorNotificationWindowFadeOut,
      showPartyMemberJoiningParty:      FlareNotificationWindow['Display Party Notification Event?'],
      partyNotificationWindowWidth:     parseInt(FlareNotificationWindow['Party Notification Width']),
      partyNotificationFontSize:        parseInt(FlareNotificationWindow['Party Notification Font Size']),
      partyNotificationWindowMoveDown:  this._partyNotificationWindowMoveDown,
      partyNotificationWindowFadeOut:   this._partyNotificationWindowFadeOut
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
}

// Private global object.
window._NotificationOptions = NotificationOptions;

module.exports = NotificationOptions
