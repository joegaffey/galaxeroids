function addNewPill(sprite, power) {    
  var pill = new PIXI.Sprite(PIXI.Texture.fromImage('pill.svg', undefined, undefined, Props.PILL_SCALE));
  pill.x = sprite.x;
  pill.y = sprite.y;
  pill.anchor.x = 0.5;
  pill.anchor.y = 0.5;
  pill.power = power;
  pill.speed = Props.PILL_SPEED;
  pill.ticker = new PIXI.ticker.Ticker();
  pill.ticker.add(function() {
    if(app.paused)
       return;
    pill.y += pill.speed;
    if(pill.y > app.renderer.height) {
      pill.ticker.stop();
      pill.destroy();
    }
    else {
      ship.checkPillHit(pill);
    }
  });
  pill.ticker.start();
  app.stage.addChild(pill);
}