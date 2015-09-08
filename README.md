Sketch Layer Tools
=============

A box for random useful sketch commands meant to make work with layers easier. Contains most of my previous commands and plugins combined, plus a bunch of new ones

### Select
Select layers based on various conditions

- **All Shapes** Selects all shape layers on the current page
- **All Text Layers** Selects all the text layers on the current page
- **All Artboards**  Selects all the artboards on the current page
- **All Layer Groups** Selects all the layer groups on the current page
- **All Bitmap Layers** Selects all the bitmap layers on the current page
- **Same Fill Color** Selects all the layers that have the same fill color as the layer that's currently selected (only takes into account the bottommost fill)
- **Same Border Color** Selects all the layers that have the same border color as the selected layer (only takes into account the bottommost border)
- **Layers Starting With…**  Selects all of the layers starting with a given text. Good for selecting all 'Rectangle' layers for example
- **Layers Ending With…** Same as above but looks for layers whose name ends with a given text
- **Layers with Text in Name…**  Selects all of the layers whose name contains a given text
- **Select Parent Artboards** (cmd+shift+A) Selects artboards that contain currently selected layers or groups. You can just draw a selection rectangle and hit the shortcut instead of selecting artboards one by one. Useful for moving many artboards around at once


### Toggle
Useful for turning a bunch of layers on and off at once

- **Toggle Layers** (cmd+L) Previously known as Toggle Specs. Toggles visibility of all of the layer groups and layers in your document that contain the word "_specs_". Other than specs this could be useful with hidden guides.
- **Toggle Layers Settings…*** Lets you change the default name that _Toggle Layers_ is looking for, as well as whether it should use visibility or opacity as the way to hide them.

### Sort in List
Sorts layers in the layer list within their parent group, not affecting other, unselected layers in the group
- **Selected Alphabetically** Sorts selected layers in the layer list alphabetically
- **Selected by Vertical Position** Sorts selected layers in the layer list based on their Y position
- **Selected by Horizontal Position** Sorts selected layers in the layer list based on their X position
- **Reverse Selected** Reverses the sorting of selected layers within their group


### Rename
Good for manipulating a lot of layer names at once

- **Find and Replace in Selected** - Goes through all selected layers and replaces some text with another based on your input. Great for batch renaming a bunch of layers
- **Find and Replace in All** - Goes through _all_ the layers in the current page, finds and replaces a particular text
- **Append to Selected Layer Names…** - Adds a text you put in to the names of all selected layers
- **Prepend Selected Layer Names…** - Same as above, but adds it _in front_ of the layer names
- **Remove 'copy' from All Layer Names** - Removes the _copy, copy 2 ..._ from automatically duplicated layers. _Pro tip:_ If you don't want Sketch to automatically add this to your layer names, uncheck "Rename duplicated layers" from Sketch's 'Layers' tab in Preferences.
