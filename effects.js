var Effects = {};
Effects.explosionTextures = [];

Effects.createExplosionGraphics = function() {
  var sheet = PIXI.Texture.from("./assets/8bitExplode.png");
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(0, 4, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(36, 4, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(72, 4, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(108, 4, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(144, 4, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(180, 4, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(0, 40, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(36, 40, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(72, 40, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(108, 40, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(144, 40, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(180, 40, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(0, 76, 36, 36)));  
  Effects.explosionTextures.push(new PIXI.Texture(sheet, new PIXI.Rectangle(36, 76, 36, 36)));  
}
Effects.createExplosionGraphics();

Effects.explode = function(x, y, size) {
  var explosion = new PIXI.AnimatedSprite(Effects.explosionTextures);
  explosion.x = x;
  explosion.y = y;
  explosion.loop = false;
  explosion.animationSpeed = Props.EXPLOSION_SPEED;
  explosion.onComplete = explosion.destroy;
  explosion.anchor.set(0.5);
  explosion.rotation = Math.random() * Math.PI;
  explosion.scale.set(size + Math.random() * Props.EXPLOSION_SCALE);
  explosion.play();
  app.game.addChild(explosion);
}