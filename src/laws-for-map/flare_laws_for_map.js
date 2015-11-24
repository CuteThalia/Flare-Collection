/**
 * @namespace FlareLawsForMap.
 */

import LawManagement  from './law_storage/laws_for_map';
import OptionsHandler from './options/option_handler';

/*:
 * @plugindesc Allows you to have a set of laws for a map.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @param Death State ID
 * @desc typically one, but you might have changed it ...
 * Default: 1
 * @default 1
 *
 * @param How many laws per map?
 * @desc default is 3 random laws.
 * Default: 3
 * @default 3
 *
 * @help
 *
 * You can have as many laws as you want, any less then 3 (default) we will show them, any more
 * then three will randomly be picked every time you enter the map.
 *
 * How to set up a law:
 *
 * <law
 *    name:"something"
 *    punishment:"gold"
 *    amount: 700
 *    icon: 26
 *    cantUse: "potion, attack, Fire"
 *    description: "I am required or the system will blow up, I can be long text with \c[5]color\c[0]."
 *  >
 *
 * ===============================================================
 * The above will be parsed by the parser if placed into the
 * the note box as it looks here.
 * ===============================================================
 *
 * - Keep the names the law short. The can't use should also be short,
 * any thing longer then the window doesn't wrap.
 *
 * - Items, weapons, skills must all match the name of the
 * the thing you want to create a law against.
 *
 * - You can ONLY have three "can't use" in the law. Any more I
 * cut it off.
 *
 * You can set up any number of laws for a map, how ever when the user
 * leaves around re-enters that map if you have more then three laws for
 * a map, I will randomize what laws are on that map and display only three.
 *
 * So if you set 50 laws for a map, you will only see three at any given time.
 *
 * All laws "cantUse" must be unique, that is if you have two laws with the same cantUse
 * but the first deals 1000 hp damage and the second takes 4000 gold, then we will take the first one,
 * because its find and return on first found.
 *
 * ==  What can a player not use? ==
 *
 * For battles: Attak, Item Name, Skill Name, Special Name
 * For out of battles: Item Name, Skill Name, Special Name
 *
 * Any skill name that targets a player or enemy can be used as a "cantUse" any thing like wait or a skill
 * that targets no one cannot be used.
 *
 * Enemies cannot break laws. Only players can.
 *
 * === Available Punishments ===
 *
 * You can punish on ONE of the following:
 *
 * gold, hp, mp, tp, xp
 *
 * You cannot punish th player multiple times for a single crime.
 *
 * You cannot remove weapons or armor or items from a player when
 * punishing them.
 *
 * === Cant Use ===
 *
 * How does this work? Well lets say you have an item that the player cannot
 * use on the map, or in battle.
 *
 * You would add it to the list of cantUse in the law and then when ever a player
 * uses said item either in battle or on the map they will be told they have broken
 * a law.
 *
 * -- Laws Can Kill! --
 *
 * If you tell a law that it will do x amount of damage to a player and the players
 * hp falls below 0 or to 0, we will kill the player. If every one in the party
 * is dead and you are on a map, you get the law  window saying hat the final
 * law was that you broke, who broke it and that the game is over.
 *
 * -- Laws can level you down --
 *
 * We allow you to punish on hp, mp, tp, gold and xp. when you state to punish
 * a player on xp, we will level that actor down based on if there xp falls
 * too low.
 *
 * -- Out of gold --
 *
 * If you punish on gold and tha party runs out, well then we tell you that
 * you have been fined x gold, but that the party is out of gold.
 *
 * === Regarding Battles ===
 *
 * When you are in battle and you use something like attack or gaurd and you
 * have it set as a can't use, then we will tell the player that
 * person x broke a law and they are being punished x by amount y.
 *
 * Again remember that laws can kill.
 *
 * Also note, it doesn't matter if you hit or not, as long as you have done
 * the action then you are as good as guilty.
 */

/**
 * Contains public faceing data about laws on said map.
 */
class FlareLawsForMap {

  /**
   * Get the laws for the map.
   *
   * @return array of objects.
   */
  static getLawsForMap() {
    return LawManagement.getLawsForMap();
  }
}

// Set up the options.
OptionsHandler.createOptionsStorage();

// Opens this up for the user.
window.FlareLawsForMap = FlareLawsForMap;
