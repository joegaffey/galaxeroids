var GameGraphics = {};

GameGraphics.alien0SheetURL = './assets/sprites.png';
GameGraphics.alien1SheetURL = './assets/Alien1.png';
GameGraphics.alien2SheetURL = './assets/Alien2.png';
GameGraphics.alien3SheetURL = './assets/Alien3.png';
GameGraphics.alien4SheetURL = './assets/Alien4.png';
GameGraphics.motherSheetURL = './assets/AlienMother.png';
GameGraphics.shipImageURL = './assets/ship1.png';

GameGraphics.pillGraphics = PIXI.Texture.from('pill.svg');

GameGraphics.alien0Sheet = new PIXI.BaseTexture.from(GameGraphics.alien0SheetURL);
GameGraphics.alien0_1 = new PIXI.Texture(GameGraphics.alien0Sheet, new PIXI.Rectangle(0, 0, 19, 19));
GameGraphics.alien0_2 = new PIXI.Texture(GameGraphics.alien0Sheet, new PIXI.Rectangle(20, 0, 19, 19));

GameGraphics.alien1Sheet = new PIXI.BaseTexture.from(GameGraphics.alien1SheetURL);
GameGraphics.alien1_1 = new PIXI.Texture(GameGraphics.alien1Sheet, new PIXI.Rectangle(0, 0, 20, 20));
GameGraphics.alien1_2 = new PIXI.Texture(GameGraphics.alien1Sheet, new PIXI.Rectangle(0, 20, 20, 20));

GameGraphics.alien2Sheet = new PIXI.BaseTexture.from(GameGraphics.alien2SheetURL);
GameGraphics.alien2_1 = new PIXI.Texture(GameGraphics.alien2Sheet, new PIXI.Rectangle(0, 0, 20, 20));
GameGraphics.alien2_2 = new PIXI.Texture(GameGraphics.alien2Sheet, new PIXI.Rectangle(0, 20, 20, 20));

GameGraphics.alien3Sheet = new PIXI.BaseTexture.from(GameGraphics.alien3SheetURL);
GameGraphics.alien3_1 = new PIXI.Texture(GameGraphics.alien3Sheet, new PIXI.Rectangle(0, 0, 20, 20));
GameGraphics.alien3_2 = new PIXI.Texture(GameGraphics.alien3Sheet, new PIXI.Rectangle(0, 20, 20, 20));

GameGraphics.alien4Sheet = new PIXI.BaseTexture.from(GameGraphics.alien4SheetURL);
GameGraphics.alien4_1 = new PIXI.Texture(GameGraphics.alien4Sheet, new PIXI.Rectangle(0, 0, 20, 20));
GameGraphics.alien4_2 = new PIXI.Texture(GameGraphics.alien4Sheet, new PIXI.Rectangle(0, 20, 20, 20));

GameGraphics.motherSheet = new PIXI.BaseTexture.from(GameGraphics.motherSheetURL);
GameGraphics.mother1 = new PIXI.Texture(GameGraphics.motherSheet, new PIXI.Rectangle(0, 0, 40, 19));
GameGraphics.mother2 = new PIXI.Texture(GameGraphics.motherSheet, new PIXI.Rectangle(0, 20, 40, 20));


GameGraphics.getShipGraphics = function() {
  return new PIXI.Texture.from(GameGraphics.shipImageURL);
}

GameGraphics.drawBulletGraphics = function(app) {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(4, 4, 3, 10);
  graphics.endFill();
  graphics.boundsPadding = 0;
  GameGraphics.bulletGraphics = app.renderer.generateTexture(graphics);
}

GameGraphics.getBulletGraphics = function() {
  return GameGraphics.bulletGraphics;
}

GameGraphics.getBlackBGGraphics = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0x000000);
  graphics.alpha = 0.8;
  graphics.drawRect(0, 0, 800, 600);
  graphics.endFill();
  graphics.boundsPadding = 0;
  return app.renderer.generateTexture(graphics);
}

GameGraphics.drawShipBulletGraphics = function(app) {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(4, 2, 4, 2);
  graphics.beginFill(0xFFFF00);
  graphics.drawRect(4, 4, 4, 2);
  graphics.beginFill(0xFF9900);
  graphics.drawRect(4, 6, 4, 4);
  graphics.beginFill(0x990000);
  graphics.drawRect(4, 10, 4, 5);
  graphics.endFill();
  graphics.boundsPadding = 0;
  GameGraphics.shipBulletGraphics = app.renderer.generateTexture(graphics);
}

GameGraphics.getShipBulletGraphics = function() {
  return GameGraphics.shipBulletGraphics;
}

GameGraphics.getScanLines = function() {
  var graphics = new PIXI.Graphics();
  graphics.lineStyle(2, 0x333333, 0.2);
  let i = 0;
  while(i < 600) {
    graphics.moveTo(0, i * 4);
    graphics.lineTo(800, i * 4);
    i++;
  }
  graphics.endFill();
  graphics.boundsPadding = 0;
  return app.renderer.generateTexture(graphics);
}

GameGraphics.drawEnergyGraphics = function(app) {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawCircle(0, 0, 4);
  graphics.endFill();
  graphics.boundsPadding = 0;
  GameGraphics.energyGraphics = app.renderer.generateTexture(graphics);
}

GameGraphics.getEnergyGraphics = function() {
  return GameGraphics.energyGraphics;
}

GameGraphics.getButtonGraphics = function(colour) {
  var graphics = new PIXI.Graphics();
  graphics.lineStyle(1.5, 0xFFFFFF, 1);
  graphics.drawCircle(0, 0, 30);
  graphics.lineStyle(3, colour, 1);
  graphics.drawCircle(0, 0, 24);
  graphics.boundsPadding = 2;
  return app.renderer.generateTexture(graphics);
}

GameGraphics.getJoyBaseGraphics = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
   
  graphics.moveTo(0, 50);
  graphics.lineTo(10, 40);
  graphics.lineTo(10, 60);
  graphics.lineTo(0, 50);
  
  graphics.moveTo(100, 50);
  graphics.lineTo(90, 40);
  graphics.lineTo(90, 60);
  graphics.lineTo(100, 50);
  
  graphics.moveTo(50, 20);
  graphics.lineStyle(1.5, 0xFFFFFF, 1);
  graphics.lineTo(50, 80);
  
  graphics.endFill();
  return app.renderer.generateTexture(graphics);
}

GameGraphics.getPauseGraphics = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(0, 0, 20, 60);
  graphics.drawRect(40, 0, 20, 60);
  graphics.endFill();
  return app.renderer.generateTexture(graphics);
}

GameGraphics.getHealthGraphics = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(0, 0, 20, 2);
  graphics.endFill();
  return app.renderer.generateTexture(graphics);
}

GameGraphics.getMotherGraphics = function() {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(30, 10, 60, 20);
  graphics.endFill();
  graphics.boundsPadding = 0;
  return app.renderer.generateTexture(graphics);
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
  return app.renderer.generateTexture(graphics);
}