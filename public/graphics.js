var GameGraphics = {};

GameGraphics.getBulletGraphics = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(4, 4, 3, 10);
  graphics.endFill();
  graphics.boundsPadding = 0;
  return graphics.generateTexture();
}

GameGraphics.getEnergyGraphics = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawCircle(0, 0, 4);
  graphics.endFill();
  graphics.boundsPadding = 0;
  return graphics.generateTexture();
}

GameGraphics.getEnemyGraphics0 = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(10, 10, 20, 25);
  graphics.endFill();
  graphics.boundsPadding = 0;
  return graphics.generateTexture();
}

GameGraphics.getEnemyGraphics1 = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(10, 10, 25, 20);
  graphics.endFill();
  graphics.boundsPadding = 0;
  return graphics.generateTexture();
}

GameGraphics.getMotherGraphics = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(30, 10, 60, 20);
  graphics.endFill();
  graphics.boundsPadding = 0;
  return graphics.generateTexture();
}

GameGraphics.getShipGraphics = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawCircle(0, 0, 10);
  graphics.endFill();
  graphics.boundsPadding = 0;
  return graphics.generateTexture();
}

GameGraphics.getAssistGraphics = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0x44AAFF);
  graphics.moveTo(0,0);
  graphics.lineTo(20, 15);
  graphics.lineTo(100, 15);
  graphics.lineTo(120, 0);
  graphics.lineTo(100, -15);
  graphics.lineTo(20, -15);
  graphics.lineTo(0, 0);
  graphics.drawEllipse(60, -5, 30, 25);
  graphics.endFill();
  graphics.beginFill(0x000000);
  graphics.drawCircle(20, 0, 4);
  graphics.drawCircle(40, 0, 4);
  graphics.drawCircle(60, 0, 4);
  graphics.drawCircle(80, 0, 4);
  graphics.drawCircle(100, 0, 4);
  graphics.endFill();
  graphics.boundsPadding = 0;
  return graphics.generateTexture();
}