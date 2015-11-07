var saveAs = require('../../node_modules/filesaver.js/FileSaver');

require('../../node_modules/blueimp-canvas-to-blob/js/canvas-to-blob');

class MapExporter {

  static exportCurrentMap(width, height) {

    var imageInformation = Bitmap.snap(SceneManager._scene)._context.canvas.toDataURL('image/png');

    var splitInformationFromImage = imageInformation.split(',');
    var atobInformation = atob(splitInformationFromImage[1]);
    var atobInformationLength = atobInformation.length;
    var uint8Array = new Uint8Array(atobInformationLength);

    for (var i = 0; i < atobInformationLength; i++) {
      uint8Array[i] = atobInformation.charCodeAt(i);
    }

    var blobData = new Blob([uint8Array], {type: 'image/png'});
    saveAs.saveAs(blobData, 'map.png');
  }
}

window.MapExporter = MapExporter;

module.exports = MapExporter;
