document.body.addEventListener('touchstart', showControls);

function showControls() {
  document.body.removeEventListener('touchstart', showControls);
  var touchControls = new TouchControls();
  app.stage.addChild(touchControls);
}