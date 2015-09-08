@import "../lib/utils.js"

// select all shape layers
var selectAllShapes = function(context){
  utils.init(context);
  selectLayersOfType("MSShapeGroup");
}

// select all groups
var selectAllGroups = function(context){
  utils.init(context);
  selectLayersOfType("MSLayerGroup");
}

// select all artboards
var selectAllArtboards = function(context){
  utils.init(context);
  selectLayersOfType("MSArtboardGroup");
}

// select all text layers
var selectAllTextLayers = function(context){
  utils.init(context);
  selectLayersOfType("MSTextLayer");
}

// select all bitmap layers
var selectAllBitmapLayers = function(context){
  utils.init(context);
  selectLayersOfType("MSBitmapLayer");
}

// select layer with the same fill color
var selectSameFill = function(context){
  utils.init(context);
  if (utils.is.selectionEmpty()) {
    utils.UI.showMessage("No layers selected");
    return;
  } else if (utils.is.multipleSelected()) {
    utils.UI.showMessage("Multiple layers selected, taking style of first one");
  }

  var selectedLayerFills = selection[0].style().fills();
  if (!selectedLayerFills || selectedLayerFills.count() == 0) {
    utils.UI.showError("Selected object has no fill color");
    return;
  }
  var fillColor = selectedLayerFills.firstObject().color();

  selectLayersUsingPredicate("(style.fills.firstObject.color == %@)", fillColor);
}

// select layer with the same border color
var selectSameBorder = function(context){
  utils.init(context);
  if (utils.is.selectionEmpty()) {
    utils.UI.showMessage("No layers selected");
    return;
  } else if (utils.is.multipleSelected()) {
    utils.UI.showMessage("Multiple layers selected, taking style of first one");
  }

  var selectedLayerBorders = selection[0].style().borders();
  if (!selectedLayerBorders || selectedLayerBorders.count() == 0) {
    utils.UI.showError("Selected object has no border color");
    return;
  }
  var borderColor = selectedLayerBorders.firstObject().color();

  selectLayersUsingPredicate("(style.borders.firstObject.color == %@)", borderColor);
}

// select layers starting with {string}
var selectStartingWith = function(context){
  utils.init(context);
  var startingWith = utils.UI.showInput("What are the layers starting with?");
  if (!startingWith || startingWith == "") {
    utils.UI.showMessage("You have to enter something");
  } else {
    [page deselectAllLayers];
    selectLayersUsingPredicate("name BEGINSWITH %@", startingWith);
  }
}

// select layers ending with {string}
var selectEndingWith = function(context){
  utils.init(context);
  var endingWith = utils.UI.showInput("What are the layers ending with?");
  if (!endingWith || endingWith == "") {
    utils.UI.showMessage("You have to enter something");
  } else {
    [page deselectAllLayers];
    selectLayersUsingPredicate("name ENDSWITH %@", endingWith);
  }
}

// select layers containing {string}
var selectContaining = function(context){
  utils.init(context);
  var containing = utils.UI.showInput("What should the layers contain?");
  if (!containing || containing == "") {
    utils.UI.showMessage("You have to enter something");
  } else {
    [page deselectAllLayers];
    selectLayersUsingPredicate("name CONTAINS %@", containing);
  }
}

// select parent artboard(s)
var selectParentArtboards = function(context){
  utils.init(context);
  utils.call.selectedLayers(function(layer){
    var artboardToSelect = null;

    if ([layer class] == "MSArtboardGroup") {
      artboardToSelect = layer;
    } else {
      var layerParentGroup = [layer parentGroup];
      while (layerParentGroup){
        if ([layerParentGroup class] == "MSArtboardGroup"){
          artboardToSelect = layerParentGroup;
          break;
        }
        layerParentGroup = [layerParentGroup parentGroup];
      }
    }

    if (artboardToSelect) {
      [layer select:false byExpandingSelection:true];
      [artboardToSelect select:true byExpandingSelection:true];
    }
  });
}

// ------------------------- UTILS ----------------------- //

var selectLayersOfType = function(layerType) {
  selectLayersUsingPredicate("(className == %@)", layerType);
}

var selectLayersUsingPredicate = function(predicate, object){
  var scope = [page children];
	var	layerPredicate = NSPredicate.predicateWithFormat(predicate, object);
	var layers = [scope filteredArrayUsingPredicate:layerPredicate];

	[[doc currentPage] deselectAllLayers];

	var loop = [layers objectEnumerator], layer;
	while (layer = [loop nextObject]) {
		[layer select:true byExpandingSelection:true]
	}
}
