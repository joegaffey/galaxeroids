function addNewPill(sprite, power) {   
  var pill = new PIXI.Sprite(PIXI.Texture.fromImage('pill.svg', undefined, undefined, Props.PILL_SCALE));
  
  pill.SPEED = 0;
  pill.FIRE = 1;
  pill.ASSIST = 2;
  
  pill.x = sprite.x;
  pill.y = sprite.y;
  pill.anchor.x = 0.5;
  pill.anchor.y = 0.5;
  pill.power = power;
  pill.speed = Props.PILL_SPEED;
  pill.ticker = new PIXI.ticker.Ticker();
  pill.type = Math.floor(Math.random() * 3);
  pill.ticker.add(function() {
    if(app.paused)
       return;
    if(!pill)
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
  app.game.addChild(pill);
}