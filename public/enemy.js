class Enemy extends PIXI.Sprite {
  constructor() {
    super(Enemy.textures[0]);
    this.currentTexture = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.hits = 0;
    this.inPosition = false;
    this.startX = 0;
    this.starty = 0;
    this.yOffset = 0;
    
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(function() {
      if(app.paused)
        return;
      
      this.scale.x = 1 - (this.hits * Props.ENEMY_DECAY_RATE);  
      this.scale.y = 1 - (this.hits * Props.ENEMY_DECAY_RATE);  
      
      if(this.yOffset > 0) {
        this.rotation = this.yOffset * 2 * Props.ENEMY_ROTATION_SPEED;
        this.y = swarm.getEnemyYByIndex(this.index) - this.yOffset;
        this.yOffset--;
      }
      else
        this.rotation = 0;
      
    }.bind(this));
    this.ticker.start();
    
    this.ticker.add(function(delta) {
      PIXI.tweenManager.update();
    });
  }
  
  attack() {    
    const x = this.x;
    const y = this.y;
    const destX = ship.x;
    const destY = ship.y;
    
    const path = new PIXI.tween.TweenPath();
    path.moveTo(x, y);

    path.bezierCurveTo(0, 0, + 50, + 50, destX, destY);
    path.bezierCurveTo(destX, destY, destX + 50, destY + 50, x, y);
    
    path.closed = true;
    
    var gPath = new PIXI.Graphics();
    gPath.lineStyle(1, 0xffffff, 1);
    gPath.drawPath(path);
    app.stage.addChild(gPath);

    this.tween = PIXI.tweenManager.createTween(this);
    this.tween.easing = PIXI.tween.Easing.inOutSine();
    this.tween.path = path;
    this.tween.time = 3000;
    
    this.tween.from({rotation: 0});
    this.tween.to({rotation: PIXI.DEG_TO_RAD * 180});
    
    // TBD remove collision check after unsuccessful attack
    this.ticker.add(function() {
      if(isIntersecting(ship, this)) {
        this.explode();
        ship.hit();
      }
    }.bind(this));
    
    this.inPosition = false;
    
    this.tween.start(function() {
      this.x = swarm.getEnemyXByIndex(this.index);
      this.y = swarm.getEnemyYByIndex(this.index);
      this.inPosition = true;
    }.bind(this));
  }
  
  swapTexture() {
    if(this.currentTexture === 0)
      this.currentTexture = 1;
    else 
      this.currentTexture = 0;
    this.setTexture(Enemy.textures[this.currentTexture]);
  }
  
  moveToStartPosition() {
    if(app.paused)
      return;
    if(Math.abs(this.x - this.startX) < Props.ENEMY_SPEED && Math.abs(this.y - this.startY) < Props.ENEMY_SPEED) {
      this.inPosition = true;
      this.x = swarm.getEnemyXByIndex(this.index);
      this.y = swarm.getEnemyYByIndex(this.index);
      ship.checkCollision(this);
      this.ticker.remove(this.moveToStartPosition, this);
    }
    else {   
      var dirX = this.startX - this.x;
      var dirY = this.startY - this.y;

      var distance = Math.sqrt(dirX * dirX + dirY * dirY);
      dirX = dirX / distance;
      dirY = dirY / distance;

      this.x += dirX * Props.ENEMY_SPEED;
      this.y += dirY * Props.ENEMY_SPEED;
      ship.checkCollision(this);
    }
  }
  
  explode() {
    if(this.tween)
      this.tween.stop();
    swarm.enemyCount--;
    swarm.enemies[this.index] = null;
    GameAudio.explosionSound();
    Effects.explode(this.x, this.y, Props.EXPLOSION_MEDIUM);
    this.ticker.stop();
    this.destroy();
    if(swarm.enemyCount === 0 && !mother)
      app.stop(Props.SUCCESS_MESSAGE);
  }
  
  hit() {
    if(this.hits === 0 && !this.inPosition)
      addNewPill(this, Props.PILL_POWER);
    this.hits++;
    if(this.hits === Props.ENEMY_MAX_HITS) {
      app.addScore(Props.ENEMY_KILL_POINTS);
      this.explode();      
    }
    else {
      Effects.explode(this.x, this.y, Props.EXPLOSION_TINY);
      app.addScore(Props.ENEMY_HIT_POINTS);
      this.yOffset += 50;
      GameAudio.alienHitSound();
    }
  }
  
  shoot() {
    this.addEnemyBullet(this.x, this.y + this.height / 2);
  }
  
  addEnemyBullet(x, y) {    
    var bullet = new PIXI.Sprite(GameGraphics.getBulletGraphics());
    bullet.x = x;
    bullet.y = y;
    bullet.anchor.x = 0.5;
    bullet.anchor.y = 0.5;
    bullet.speed = Props.ENEMY_BULLET_SPEED;
    bullet.ticker = new PIXI.ticker.Ticker();
    bullet.ticker.add(function() {
      if(app.paused)
         return;
      bullet.y += bullet.speed;
      if(bullet.y > app.renderer.height) {
        bullet.ticker.stop();
        bullet.destroy();
      }
      else {
        ship.checkHit(bullet);
      }
    });
    bullet.ticker.start();
    app.stage.addChild(bullet);
  }
}

Enemy.textures = [GameGraphics.getEnemyGraphics0(),
                  GameGraphics.getEnemyGraphics1()];
    