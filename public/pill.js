function addNewPill(sprite, power) {   
  var pill = new PIXI.Sprite(GameGraphics.pillGraphics);
  
  pill.SPEED = 0;
  pill.FIRE = 1;
  pill.ASSIST = 2;
  pill.ORB = 3;
  pill.LIFE = 4;
  
  pill.powerUps = [
    pill.FIRE,pill.FIRE,pill.FIRE,pill.FIRE,pill.FIRE,pill.FIRE,pill.FIRE,pill.FIRE,pill.FIRE,pill.FIRE,
    pill.ORB,pill.ORB,pill.ORB,pill.ORB,pill.ORB,pill.ORB,pill.ORB,
    pill.SPEED,pill.SPEED,pill.SPEED,pill.SPEED,pill.SPEED,
    pill.ASSIST,pill.ASSIST,pill.ASSIST,pill.ASSIST,
    pill.LIFE
  ];
  
  pill.x = sprite.x;
  pill.y = sprite.y - (sprite.height / 2);
  pill.anchor.x = 0.5;
  pill.anchor.y = 0.5;
  pill.power = power;
  pill.speed = Props.PILL_SPEED;
  pill.ticker = new PIXI.ticker.Ticker();
  pill.type = pill.powerUps[Math.floor(Math.random() * pill.powerUps.length)];
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