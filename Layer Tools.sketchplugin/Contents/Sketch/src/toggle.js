@import "../lib/utils.js"
var kToggleName = "specs";
var kLocalStorageKey = "toggleLayers";
var kLocalStorageNameKey = "toggleNameKey";
var kLocalStorageHideStyleKey = "hideStyleKey"; // false: visibility, true: opacity

var toggleLayers = function(context){
  utils.init(context);
  var localStorage = utils.localStorage.get(kLocalStorageKey);

  // get name or use default
  var toggleLayerName = kToggleName;
  if (localStorage && localStorage[kLocalStorageNameKey]) {
    toggleLayerName = localStorage[kLocalStorageNameKey];
  }

  // get layers by name
  var scope = [page children];
	var	layerPredicate = NSPredicate.predicateWithFormat("name CONTAINS %@", toggleLayerName);
	var layers = [scope filteredArrayUsingPredicate:layerPredicate];

  if (layers.count() == 0) {
    utils.UI.showMessage("There are no layers named \"" + toggleLayerName + "\" to toggle");
    return;
  }

  // see if they're visible by checking the first one
  var toggleVisibilityWithOpacity = false;
  if (localStorage && localStorage[kLocalStorageHideStyleKey] == true) {
    toggleVisibilityWithOpacity = true;
  }

  var toggleVisibility;
  if (toggleVisibilityWithOpacity) {
    toggleVisibility = (layers[0].style().contextSettings().opacity() == 0);
  } else {
    toggleVisibility = !(layers[0].isVisible());
  }

  // toggle them
  var loop = [layers objectEnumerator], layer;
  while (layer = [loop nextObject]){
    if (toggleVisibilityWithOpacity) {
      layer.style().contextSettings().opacity = toggleVisibility;
    } else {
      [layer setIsVisible:toggleVisibility];
    }
  }
}

var toggleLayersSettings = function(context){
  utils.init(context);

  var toggleLayerName = kToggleName;
  var toggleWithOpacity = false;

  // load defaults
  var localStorage = utils.localStorage.get(kLocalStorageKey);
  if (localStorage && localStorage[kLocalStorageNameKey]) {
    toggleLayerName = localStorage[kLocalStorageNameKey];
  }
  if (localStorage && localStorage[kLocalStorageHideStyleKey] == true) {
    toggleWithOpacity = true;
  }
  if (!localStorage) {
    localStorage = [[NSMutableDictionary alloc] init];
  }

  // open the dialog and save the results
  var dialogResult = toggleSettingsDialog(toggleLayerName, toggleWithOpacity);
  if (!dialogResult) { return; }
  localStorage[kLocalStorageNameKey] = dialogResult["toggleString"];
  localStorage[kLocalStorageHideStyleKey] = dialogResult["toggleByOpacity"];
  utils.localStorage.set(kLocalStorageKey, localStorage);
}

// ------------------------- UTILS ----------------------- //

var toggleSettingsDialog = function(toggleString,toggleWithOpacity){
  var stringField = [[NSTextField alloc] initWithFrame:NSMakeRect(0,30,298,25)];
  [stringField setStringValue:toggleString];
  [stringField setWantsLayer:true];

  var checkbox = [[NSButton alloc] initWithFrame:NSMakeRect(0,0,298,25)];
  [checkbox setButtonType:NSSwitchButton];
  [checkbox setTitle:"Toggle using opacity instead of visibility"];
  [checkbox setState:(toggleWithOpacity ? NSOnState : NSOffState)];
  [checkbox setWantsLayer:true];

  var fieldsView = [[NSView alloc] initWithFrame:CGRectMake(0, 0, 300, 55)];
  [fieldsView addSubview:stringField];
  [fieldsView addSubview:checkbox];

  var alert = [[NSAlert alloc] init];
  [alert setMessageText:'Toggle Layer Settings'];
  [alert setInformativeText:'Layers containing this text will be toggled']
  [alert addButtonWithTitle:'OK'];
  [alert addButtonWithTitle:'Cancel'];
  [alert setAccessoryView:fieldsView];
  var responseCode = [alert runModal];
  if (responseCode == 1001) {
    return;
  }
  if (responseCode == 1000) {
    var toggleStringValue = [stringField stringValue];
    var toggleByOpacityValue = ([checkbox state] == NSOnState);

    return {toggleString:toggleStringValue, toggleByOpacity:toggleByOpacityValue}
  }
}
