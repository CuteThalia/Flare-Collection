import CompiledStorageContainer   from './compiled_storage_container';
import RewardProcessor            from './reward_processor';

/**
 * Store all the reward objects.
 *
 * We want to be able to access the list of rewards regardless if we are in a scene_window_container
 * or if we are in battle being rold that we gained x amount of rewards.
 *
 * This container will be able to be used across the whole board.
 */
class CreateRewardStorage {

  /**
   * This allows you to call the class as a function.
   */
  constructor() {
    this._data = new RewardProcessor();

    CompiledStorageContainer.emptyContainer();

    this._data.processAndStore();
    this._createStorageOfObjects();
  }

  /**
   * Process all the weapons and armors and items
   *
   * This will allow us to create reward objects that can be used across the whole game.
   */
  _createStorageOfObjects() {
    var rewards = [];
    if (this._data.getWeapons().length > 0) {
      rewards.push(this._data.getWeapons());
    }

    if (this._data.getArmors().length > 0) {
      rewards.push(this._data.getArmors());
    }

    if (this._data.getItems().length > 0) {
      rewards.push(this._data.getItems());
    }

    if (this._data.getGoldAmount() !== 0) {
      rewards.push({gold: this._data.getGoldAmount()});
    }

    if (this._data.getXpAmount() !== 0) {
      rewards.push({xp: this._data.getXpAmount()});
    }

    // flatten the array.
    rewards = [].concat.apply([], rewards);
    CompiledStorageContainer.setContainer(rewards);
  }
}

module.exports = CreateRewardStorage;
