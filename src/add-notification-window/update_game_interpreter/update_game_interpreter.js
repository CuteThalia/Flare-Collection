import NotificationOptions from '../notification_options/notification_options'

Game_Interpreter.prototype.command125 = function() {
    var value = this.operateValue(this._params[0], this._params[1], this._params[2]);

    if (value < 0) {
      FlareNotification.notify("\\c[16]Looses Gold\\c[0]: " + Math.abs(value), NotificationOptions.getNotificationOptions().windowGainMoveDown, NotificationOptions.getNotificationOptions().windowGainFadeOut, {windowWidth: NotificationOptions.getNotificationOptions().windowGainWidth, fontSize: NotificationOptions.getNotificationOptions().windowGainFontSize});
    } else {
      FlareNotification.notify("\\c[16]Gains Gold\\c[0]: " + value, NotificationOptions.getNotificationOptions().windowGainMoveDown, NotificationOptions.getNotificationOptions().windowGainFadeOut, {windowWidth: NotificationOptions.getNotificationOptions().windowGainWidth, fontSize: NotificationOptions.getNotificationOptions().windowGainFontSize});
    }

    $gameParty.gainGold(value);
    return NotificationOptions.getNotificationOptions().windowGainFadeOut;
};

// Change Items
Game_Interpreter.prototype.command126 = function() {
    var value = this.operateValue(this._params[1], this._params[2], this._params[3]);

    if (value < 0) {
      FlareNotification.notify("\\c[16]Looses Item (Amount: "+Math.abs(value)+") \\c[0]: " + "\\i["+$dataItems[this._params[0]].iconIndex+"] " + $dataItems[this._params[0]].name, NotificationOptions.getNotificationOptions().windowGainMoveDown, NotificationOptions.getNotificationOptions().windowGainFadeOut, {windowWidth: NotificationOptions.getNotificationOptions().windowGainWidth, fontSize: NotificationOptions.getNotificationOptions().windowGainFontSize});
    } else {
      FlareNotification.notify("\\c[16]Gains Item (Amount: "+value+") \\c[0]: " + "\\i["+$dataItems[this._params[0]].iconIndex+"] " + $dataItems[this._params[0]].name, NotificationOptions.getNotificationOptions().windowGainMoveDown, NotificationOptions.getNotificationOptions().windowGainFadeOut, {windowWidth: NotificationOptions.getNotificationOptions().windowGainWidth, fontSize: NotificationOptions.getNotificationOptions().windowGainFontSize});
    }

    $gameParty.gainItem($dataItems[this._params[0]], value);
    return NotificationOptions.getNotificationOptions().windowGainFadeOut;
};

// Change Weapons
Game_Interpreter.prototype.command127 = function() {
    var value = this.operateValue(this._params[1], this._params[2], this._params[3]);

    if (value < 0) {
      FlareNotification.notify("\\c[16]Looses Weapon (Amount: "+Math.abs(value)+") \\c[0]: " + "\\i["+$dataItems[this._params[0]].iconIndex+"] " + $dataItems[this._params[0]].name, NotificationOptions.getNotificationOptions().windowGainMoveDown, NotificationOptions.getNotificationOptions().windowGainFadeOut, {windowWidth: NotificationOptions.getNotificationOptions().windowGainWidth, fontSize: NotificationOptions.getNotificationOptions().windowGainFontSize});
    } else {
      FlareNotification.notify("\\c[16]Gains Weapon (Amount: "+value+") \\c[0]: " + "\\i["+$dataItems[this._params[0]].iconIndex+"] " + $dataItems[this._params[0]].name, NotificationOptions.getNotificationOptions().windowGainMoveDown, NotificationOptions.getNotificationOptions().windowGainFadeOut, {windowWidth: NotificationOptions.getNotificationOptions().windowGainWidth, fontSize: NotificationOptions.getNotificationOptions().windowGainFontSize});
    }

    $gameParty.gainItem($dataWeapons[this._params[0]], value, this._params[4]);
    return NotificationOptions.getNotificationOptions().windowGainFadeOut;
};

// Change Armors
Game_Interpreter.prototype.command128 = function() {
    var value = this.operateValue(this._params[1], this._params[2], this._params[3]);

    if (value < 0) {
      FlareNotification.notify("\\c[16]Looses Armor (Amount: "+Math.abs(value)+") \\c[0]: " + "\\i["+$dataItems[this._params[0]].iconIndex+"] " + $dataItems[this._params[0]].name, NotificationOptions.getNotificationOptions().windowGainMoveDown, NotificationOptions.getNotificationOptions().windowGainFadeOut, {windowWidth: NotificationOptions.getNotificationOptions().windowGainWidth, fontSize: NotificationOptions.getNotificationOptions().windowGainFontSize});
    } else {
      FlareNotification.notify("\\c[16]Gains Armor (Amount: "+value+") \\c[0]: " + "\\i["+$dataItems[this._params[0]].iconIndex+"] " + $dataItems[this._params[0]].name, NotificationOptions.getNotificationOptions().windowGainMoveDown, NotificationOptions.getNotificationOptions().windowGainFadeOut, {windowWidth: NotificationOptions.getNotificationOptions().windowGainWidth, fontSize: NotificationOptions.getNotificationOptions().windowGainFontSize});
    }

    $gameParty.gainItem($dataArmors[this._params[0]], value, this._params[4]);
    return NotificationOptions.getNotificationOptions().windowGainFadeOut;
};
