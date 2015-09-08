@import "../lib/utils.js"

// find and replace in selected layers
var findReplaceSelected = function(context){
  utils.init(context);
  if (utils.is.selectionEmpty()) {
    utils.UI.showMessage("No layers selected");
  } else {
    var dialogResult = replaceDialog();
    if (!dialogResult) { return; }
    if (!dialogResult["find"] || dialogResult["find"] == "") {
      utils.UI.showMessage("You should enter text to replace");
    } else {
      utils.call.selectedLayers(function(layer){
        findAndReplaceInLayerName(layer, dialogResult["find"], dialogResult["replace"]);
      });
    }
  }
};

// find and replace in all layers
var findReplaceAll = function(context){
  utils.init(context);
  var dialogResult = replaceDialog();
  if (!dialogResult) { return; }
  if (!dialogResult["find"] || dialogResult["find"] == "") {
    utils.UI.showMessage("You should enter text to replace");
  } else {
    utils.call.pageLayers(function(layer){
      findAndReplaceInLayerName(layer, dialogResult["find"], dialogResult["replace"]);
    });
  }
}

// add text to selected layer names
var appendToSelected = function(context){
  utils.init(context);
  if (utils.is.selectionEmpty()) {
    utils.UI.showMessage("No layers selected");
  } else {
    var textToAdd = utils.UI.showInput("What do you want to append to these layer's names?");
    if (!textToAdd || textToAdd == "") {
      utils.UI.showMessage("You have to enter something");
    } else {
      utils.call.selectedLayers(function(layer){
        var layerName = layer.name();
        var newName = [layerName stringByAppendingString:textToAdd];
        [layer setName:newName];
      });
    }
  }
}

// add text to the beginning of selected layer names
var prependSelected = function(context){
  utils.init(context);
  if (utils.is.selectionEmpty()) {
    utils.UI.showMessage("No layers selected");
  } else {
    var textToPrepend = utils.UI.showInput("What do you want to prepend these layer's names with?");
    if (!textToPrepend || textToPrepend == "") {
      utils.UI.showMessage("You have to enter something");
    } else {
      utils.call.selectedLayers(function(layer){
        var layerName = layer.name();
        var newName = [textToPrepend stringByAppendingString:layerName];
        [layer setName:newName];
      });
    }
  }
}

// remove copy in duplicated layers
var removeCopy = function(context){
  utils.init(context);
  utils.call.pageLayers(function(layer){
    var layerName = [layer name];
    var copyRange = [layerName rangeOfString:" copy"];
    if (copyRange.length > 0) { // hack to simulate NSNotFound
      // ignore the automatically named groups (rect copy2 + oval + foo copy)
      var plusRange = [layerName rangeOfString:" + "];
      if (plusRange.length > 0 && plusRange.location > copyRange.location) {
        log("encountered automatic group name, ignoring");
      } else {
        var newRange = NSMakeRange(0, copyRange.location);
        var newName = [layerName substringWithRange:newRange];
        log("renaming - " + layerName + " - to - " + newName);
        [layer setName:newName];
      }
    };
  });
}

// ------------------------- UTILS ----------------------- //

//find and replace text in layer name
var findAndReplaceInLayerName = function(layer, findValue, replaceValue){
  var layerName = [layer name];
  var newName = [layerName stringByReplacingOccurrencesOfString:findValue withString:replaceValue];
  [layer setName:newName];
}

// display dialog for finding and replacing
var replaceDialog = function(){
  var findField = [[NSTextField alloc] initWithFrame:NSMakeRect(0,30,298,25)];
  var replaceField = [[NSTextField alloc] initWithFrame:NSMakeRect(0,0,298,25)];
  [[findField cell] setPlaceholderString:@"Find..."];
  [[replaceField cell] setPlaceholderString:@"Replace..."];
  [replaceField setWantsLayer:true];
  [findField setWantsLayer:true];

  var fieldsView = [[NSView alloc] initWithFrame:CGRectMake(0, 0, 300, 55)];
  [fieldsView addSubview: findField];
  [fieldsView addSubview: replaceField];

  var alert = [[NSAlert alloc] init];
  [alert setMessageText:'Find and Replace'];
  [alert setInformativeText:'What text do you want to find and replace?']
  [alert addButtonWithTitle:'OK'];
  [alert addButtonWithTitle:'Cancel'];
  [alert setAccessoryView:fieldsView];
  var responseCode = [alert runModal];
  if (responseCode == 1001) {
    return;
  }
  if (responseCode == 1000) {
    var findValue = [findField stringValue];
    var replaceValue = [replaceField stringValue];

    return {find:findValue, replace:replaceValue}
  }
}
