var onRun = function(context) {            
  var selection = context.selection; 

  for (var i=0; i<selection.count(); i++) {
    var layer = selection[i];
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
  }
}