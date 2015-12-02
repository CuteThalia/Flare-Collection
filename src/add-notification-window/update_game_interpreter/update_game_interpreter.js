import NotificationOptions from '../notification_options/notification_options';

// Change Gold
Game_Interpreter.prototype.command125 = function() {
    var value = this.operateValue(this._params[0], this._params[1], this._params[2]);
    var text  = '';

    if (value < 0) {
      text = "\\c[16]Party Loses Gold in the amount of\\c[0]: " + Math.abs(value);
    } else {
      text = "\\c[16]Party Gains Gold in the amount of\\c[0]: " + Math.abs(value);
    }

    this.processNotificationEvents(text, "showGoldNotificationEvent", value, {
      moveDown:       NotificationOptions.getNotificationOptions().goldNotificationWindowMoveDown,
      fadeOut:        NotificationOptions.getNotificationOptions().goldNotificationWindowFadeOut,
      windowOptions:  {
        windowWidth: NotificationOptions.getNotificationOptions().goldNotificationWindowWidth,
        fontSize:    NotificationOptions.getNotificationOptions().goldNotificationFontSize
      }
    });

    $gameParty.gainGold(value);
    return true;
};

// Items
Game_Interpreter.prototype.command126 = function() {
    var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
    var text  = '';

    if (value < 0) {
      text = "\\c[16]Party Loses "+Math.abs(value)+" \\i["+$dataItems[this._params[0]].iconIndex+"] \\c[0]" + $dataItems[this._params[0]].name + "(s)";
    } else {
      text = "\\c[16]Party Gains "+Math.abs(value)+" \\i["+$dataItems[this._params[0]].iconIndex+"] \\c[0]" + $dataItems[this._params[0]].name + "(s)";
    }

    this.processNotificationEvents(text, "showItemNotificationEvent", value, {
      moveDown:       NotificationOptions.getNotificationOptions().itemNotificationWindowMoveDown,
      fadeOut:        NotificationOptions.getNotificationOptions().itemNotificationWindowFadeOut,
      windowOptions:  {
        windowWidth: NotificationOptions.getNotificationOptions().itemNotificationWindowWidth,
        fontSize:    NotificationOptions.getNotificationOptions().itemNotificationFontSize
      }
    });

    $gameParty.gainItem($dataItems[this._params[0]], value);
    return true;
};

// Weapons
Game_Interpreter.prototype.command127 = function() {
    var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
    var text  = '';

    if (value < 0) {
      text = "\\c[16]Party Loses "+Math.abs(value)+" \\i["+$dataWeapons[this._params[0]].iconIndex+"] \\c[0]" + $dataWeapons[this._params[0]].name + "(s)";
    } else {
      text = "\\c[16]Party Gains "+Math.abs(value)+" \\i["+$dataWeapons[this._params[0]].iconIndex+"] \\c[0]" + $dataWeapons[this._params[0]].name + "(s)";
    }

    this.processNotificationEvents(text, "showWeaponNotificationEvent", value, {
      moveDown:       NotificationOptions.getNotificationOptions().weaponNotificationWindowMoveDown,
      fadeOut:        NotificationOptions.getNotificationOptions().weaponNotificationWindowFadeOut,
      windowOptions:  {
        windowWidth: NotificationOptions.getNotificationOptions().weaponNotificationWindowWidth,
        fontSize:    NotificationOptions.getNotificationOptions().weaponNotificationFontSize
      }
    });

    $gameParty.gainItem($dataWeapons[this._params[0]], value, this._params[4]);
    return true;
};

// Armors
Game_Interpreter.prototype.command128 = function() {
    var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
    var text  = '';

    if (value < 0) {
      text = "\\c[16]Party Loses "+Math.abs(value)+" \\i["+$dataArmors[this._params[0]].iconIndex+"] \\c[0]" + $dataArmors[this._params[0]].name + "(s)";
    } else {
      text = "\\c[16]Party Gains "+Math.abs(value)+" \\i["+$dataArmors[this._params[0]].iconIndex+"] \\c[0]" + $dataArmors[this._params[0]].name + "(s)";
    }

    this.processNotificationEvents(text, "showArmorNotificationEvent", value, {
      moveDown:       NotificationOptions.getNotificationOptions().armorNotificationWindowMoveDown,
      fadeOut:        NotificationOptions.getNotificationOptions().armorNotificationWindowFadeOut,
      windowOptions:  {
        windowWidth: NotificationOptions.getNotificationOptions().armorNotificationWindowWidth,
        fontSize:    NotificationOptions.getNotificationOptions().armorNotificationFontSize
      }
    });

    $gameParty.gainItem($dataArmors[this._params[0]], value, this._params[4]);
    return true;
};

// Party
Game_Interpreter.prototype.command129 = function() {
    var actor = $gameActors.actor(this._params[0]);
    var text  = '';

    if (actor) {
        if (this._params[1] === 0) {  // Add
            if (this._params[2]) {   // Initialize
                $gameActors.actor(this._params[0]).setup(this._params[0]);
            }

            text = $gameActors.actor(this._params[0]).name() + "\\c[16] Has chosen to join your party!\\c[0]";

            this.processNotificationEvents(text, "showPartyMemberJoiningParty", value, {
              moveDown:       NotificationOptions.getNotificationOptions().partyNotificationWindowMoveDown,
              fadeOut:        NotificationOptions.getNotificationOptions().partyNotificationWindowFadeOut,
              windowOptions:  {
                windowWidth: NotificationOptions.getNotificationOptions().partyNotificationWindowWidth,
                fontSize:    NotificationOptions.getNotificationOptions().partyNotificationFontSize
              }
            });

            $gameParty.addActor(this._params[0]);
        } else {  // Remove
            text = $gameActors.actor(this._params[0]).name() + "\\c[16] Has chosen to leave your party.\\c[0]";

            this.processNotificationEvents(text, "showPartyMemberJoiningParty", value, {
              moveDown:       NotificationOptions.getNotificationOptions().partyNotificationWindowMoveDown,
              fadeOut:        NotificationOptions.getNotificationOptions().partyNotificationWindowFadeOut,
              windowOptions:  {
                windowWidth: NotificationOptions.getNotificationOptions().partyNotificationWindowWidth,
                fontSize:    NotificationOptions.getNotificationOptions().partyNotificationFontSize
              }
            });

            $gameParty.removeActor(this._params[0]);
        }
    }
    return true;
};

/**
 * Allows us to process notification options.
 *
 * @param string type - The type for the message, might be weapons, armors, items, gold and so on.
 * @param strink showKey - The key to be used to find if we should show the notification.
 * @param int value - value for the notification window.
 * @param object options - options for the notification window.
 */
Game_Interpreter.prototype.processNotificationEvents = function(text, showKey, value, options) {
  if (NotificationOptions.getNotificationOptions()[showKey]) {
    if (value < 0) {
      FlareNotification.notify(
        text,
        options.moveDown,
        options.fadeOut,
        options.windowOptions
      );
    } else {
      FlareNotification.notify(
        text,
        options.moveDown,
        options.fadeOut,
        options.windowOptions
      );
    }
  }
}
