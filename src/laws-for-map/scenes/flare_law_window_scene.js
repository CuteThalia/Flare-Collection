/**
 * @namespace FlareLawsForMap.
 */

import FlareLawWindow        from '../windows/laws_window_selectable';
import FlareLawDetails       from '../windows/details/laws_details';
import FlareItemsForLawTitle from '../windows/details/items_for_laws_title';
import SceneWindowContainer  from '../../scene_window_container';


/**
 * Creates a scene for a window that shows all the laws.
 */
class FlareLawWindowScene extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create(this);

    this.createLawWindowForParty();
  }

  update() {
    super.update(this);

    if (Input.isTriggered("cancel")) {
      this._flareLawWindow.close();
      this.popScene();
    }
  }

  createLawWindowForParty() {
    SceneWindowContainer.emptyContainer();

    this._flareLawWindow        = new FlareLawWindow();
    this._flareLawDetails       = new FlareLawDetails();
    this._flareLawItemsTitle    = new FlareItemsForLawTitle();

    SceneWindowContainer.setWindowToContainer('law-details', this._flareLawDetails);

    this.addWindow(this._flareLawDetails)
    this.addWindow(this._flareLawWindow);
    this.addWindow(this._flareLawItemsTitle)
  }
}

module.exports = FlareLawWindowScene;
