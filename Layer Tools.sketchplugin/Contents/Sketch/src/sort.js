@import "../lib/utils.js"

// sorts layers in layer list alphabetically
var sortAlphabetically = function(context){
  utils.init(context);
  var sortByName = [NSSortDescriptor sortDescriptorWithKey:"name" ascending:1];
  var sortedLayers = [selection sortedArrayUsingDescriptors:[sortByName]];
  sortSelectedLayersInList(sortedLayers);
}

// sorts layers in layer list based on their y position on screen
var sortByVerticalPosition = function(context){
  utils.init(context);
  var sortVertically = [NSSortDescriptor sortDescriptorWithKey:"absoluteRect.rulerY" ascending:1]
  var sortedLayers = [selection sortedArrayUsingDescriptors:[sortVertically]];
  sortSelectedLayersInList(sortedLayers);
}

// sorts layers in layer list based on their x position on screen
var sortByHorizontalPosition = function(context){
  utils.init(context);
  var sortHorizontally = [NSSortDescriptor sortDescriptorWithKey:"absoluteRect.rulerX" ascending:1]
  var sortedLayers = [selection sortedArrayUsingDescriptors:[sortHorizontally]];
  sortSelectedLayersInList(sortedLayers);
}

// reverses the sorting of selected layers
var sortReverse = function(context){
  utils.init(context);
  var sortedLayers = [[selection reverseObjectEnumerator] allObjects];
  sortSelectedLayersInList(sortedLayers);
}

// ------------------------- UTILS ----------------------- //

// sorts selected layers in layer list
var sortSelectedLayersInList = function(sortedLayers){

  // make sure we have multiple layers in the same group
  if (!isMultipleSelectionInOneGroup()) {
    utils.UI.showMessage("Please select multiple layers in one group");
    return;
  }

  // save layer indices
  var parent = selection[0].parentGroup();
  var layerIndices = [];
  var loop = [selection objectEnumerator], layer;
  while (layer = [loop nextObject]){
    layerIndices.push(parent.indexOfLayer(layer));
  }
  [page deselectAllLayers];

  // remove layers from parent
  var removeLoop = [selection objectEnumerator], layerToRemove;
  while (layerToRemove = [removeLoop nextObject]){
    [layerToRemove removeFromParent];
  }

  // insert them at the corresponding index
  for (var i = 0; i < layerIndices.length; i++) {
    var index = layerIndices[i];
    var sortedLayer = sortedLayers[i];
    var layerArray = [NSArray arrayWithObject:sortedLayer];
    [parent insertLayers:layerArray atIndex:index];
    [sortedLayer select:true byExpandingSelection:true];
  }
}

// loops over selection to check if they're multiple, and part of the same group
var isMultipleSelectionInOneGroup = function(){
  if (selection.count() < 2) {
    return false;
  }
  var parent = selection[0].parentGroup();
  var loop = [selection objectEnumerator], layer;
  while (layer = [loop nextObject]){
    if (layer.parentGroup() != parent) {
      return false;
    }
  }
  return true;
}
