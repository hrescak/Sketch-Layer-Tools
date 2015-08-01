var kDefaultKey = "relativeCopy";
var selection,doc,plugin;

var copyRelative = function(context){
 selection = context.selection;
 doc = context.document;
 plugin = context.plugin;

 if (selection.count() == 0) {
   [doc showMessage:"You have to select an object"]
 } else if (selection.count() > 1){
   [doc showMessage:"You have to select just one object"]
 } else {
   var selectedLayer = selection[0];
   var layerPos = {x:selectedLayer.rect().origin.x, y:selectedLayer.rect().origin.y};
   saveDefault(kDefaultKey, layerPos);
   [NSApp sendAction:'copy:' to:nil from:doc];
   [doc showMessage:"Layer " + selectedLayer.name() + " copied at " + layerPos.x + ", " + layerPos.y];
 }
}

var pasteRelative = function(context){
  [NSApp sendAction:'paste:' to:nil from:doc];
  selection = context.selection;
  log(selection);
}

var loadDefault = function(key){
  var defaults = [NSUserDefaults standardUserDefaults];
  var defaultValue = [defaults objectForKey: [plugin identifier] + '.' + key];
  return defaultValue;
}

var saveDefault = function(key, data){
  var defaults = [NSUserDefaults standardUserDefaults];
  var response = [defaults setObject:data forKey: [plugin identifier] + '.' + key];
  [defaults synchronize];
  return response;
}
