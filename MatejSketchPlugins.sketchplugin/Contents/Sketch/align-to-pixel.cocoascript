var onRun = function(context) {            
  var selection = context.selection; 
  var loop = [selection objectEnumerator]
  while (layer = [loop nextObject]) {
    roundedY = Math.round(layer.frame().y());
    roundedX = Math.round(layer.frame().x());

    layer.frame().y = roundedY;
    layer.frame().x = roundedX;
  }
}
