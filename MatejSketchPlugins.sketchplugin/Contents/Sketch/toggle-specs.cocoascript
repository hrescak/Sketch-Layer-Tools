var layerprefix = "specs";
var visibility = nil;

var onRun = function (context) {
  var doc = context.document;
  var pages = [doc pages];
  var pageLoop = [pages objectEnumerator];
    while (page = [pageLoop nextObject]) {
    hideOrShowSpecs(page);
  }
}

function hideOrShowSpecs(layer){
  //show or hide layer if it matches prefix
  var layername = [layer name];
  if (layername.substr(0, layerprefix.length) == layerprefix){
    // determine whether to toggle all specs on or off
    if (visibility == nil) {
      visibility = [layer isVisible] ? false : true;
    }
    [layer setIsVisible: visibility];
  }

  // iterate over children recursively if we can
  if ([layer class] == "MSArtboardGroup" || [layer class] == "MSLayerGroup" || [layer class] == "MSPage"]{
    var childLayers = [layer layers].array();
    if (childLayers){
      var loop = [childLayers objectEnumerator];
       while (item = [loop nextObject]) {
        hideOrShowSpecs(item);  
      }
    }
  }
}