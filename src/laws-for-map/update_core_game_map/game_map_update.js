/**
 * @namespace FlareLawsForMap.
 */

import AddLawsForMap        from '../add_laws_for_map';
import GatherReward         from '../gather_reward';
import CreateRewardStorage  from '../reward_storage/create_reward_storage';
import OptionHandler        from '../options/option_handler';

var oldGameMapPrototypeSetupMethod = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  oldGameMapPrototypeSetupMethod.call(this, mapId);

  // Process laws for map.
  var flarAddLawsForMap = new AddLawsForMap();
  flarAddLawsForMap.grabMapInformation();

  if (OptionHandler.getOptions().before_or_after === 'before') {
    //Gather reward data.
    var gatherReward = new GatherReward();
    gatherReward.processPotentialRewards();

    // Now we need reward items.
    new CreateRewardStorage();
  }
};
