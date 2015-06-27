var onRun = function(context){
  var doc = context.document;
  var selectedLayers = context.selection;
  var selectedCount = selectedLayers.count();

  if (selectedCount == 0) {
    [doc showMessage:'No layers are selected.'];
  } else {
    var dialogResult = showDialog();
    if (!dialogResult["find"] || dialogResult["find"] == "") {
      [doc showMessage:"You should enter text to replace"];
    } else {
      for (var i = 0; i < selectedCount; i++) {
        var currentLayer = selectedLayers[i];
        var currentName = [currentLayer name];
        var newName = [currentName stringByReplacingOccurrencesOfString:dialogResult["find"] withString:dialogResult["replace"]];
        [currentLayer setName:newName];
      }
    }
  }
}

var showDialog = function(){
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
  [alert setMessageText:'Find and Replace in Layer names'];
  [alert setInformativeText:'What text do you want to find and replace?']
  [alert addButtonWithTitle:'OK'];
  [alert addButtonWithTitle:'Cancel'];
  [alert setAccessoryView:fieldsView];
  [alert runModal];

  var findValue = [findField stringValue];
  var replaceValue = [replaceField stringValue];

  return {find:findValue, replace:replaceValue}
}
