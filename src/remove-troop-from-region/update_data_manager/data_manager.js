import lodashIsUndefined from 'lodash/lang/isUndefined';
import EncounterHolder   from '../system/container/encounter_holder';

var oldDataManagerMakeSaveContentsMethod = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
  var contents = oldDataManagerMakeSaveContentsMethod.call(this);

  if (!lodashIsUndefined(FlareRemoveTroopFromRegion.getMutatedContainer())) {
    contents.encounterData = FlareRemoveTroopFromRegion.getMutatedContainer();
  }

  return contents;
};

var oldDataManagerExtractSaveContentMethod = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    oldDataManagerExtractSaveContentMethod.call(this, contents);

    if (!lodashIsUndefined(contents.encounterData)) {
      EncounterHolder.loadArray(contents.encounterData);
    }
};
