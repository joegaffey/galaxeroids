Effects = {};
Effects.explosionTextures = [];

Effects.onAssetsLoaded = function() {
  for (var i = 0; i < 13; i++) {
    var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i+1) + '.png');
    Effects.explosionTextures.push(texture);
  }
}

PIXI.loader
    .add('spritesheet', 'explosion-sprites.json')
    .load(Effects.onAssetsLoaded);

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
  app.stage.addChild(explosion);
} 