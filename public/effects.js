var Effects = {};
Effects.explosionTextures = [];

Effects.createExplosionGraphics = function() {
  var sheet = PIXI.BaseTexture.fromImage("https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2F8bitExplode.png?1503090470892");
  // var sheet = PIXI.BaseTexture.fromImage("./assets/8bitExplode.png");
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
  var explosion = new PIXI.extras.AnimatedSprite(Effects.explosionTextures);
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