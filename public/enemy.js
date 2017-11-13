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
      
      if(this.yOffset > 0) {
        this.rotation = this.yOffset * 2 * Props.ENEMY_ROTATION_SPEED;
        this.y = swarm.getEnemyYByIndex(this.index) - this.yOffset;
        this.yOffset--;
      }
      else
        this.rotation = 0;
      
    }.bind(this));
    this.ticker.start();
  }
  
  
  attack() {    
    const x1 = this.x;
    const y1 = this.y;
    const x2 = ship.x;
    const y2 = ship.y;

    this.inPosition = false;
    TweenMax.to([this.position, this], 4, {
      bezier:{
        values:[
          {x: x1, y: y1, rotation: 0.1}, 
          {x: x2, y: y2 - 300, rotation: -1}, 
          {x: x2, y: y2, rotation: 0},
          {x: x2, y: y2 - 300, rotation: 1}, 
          {x: x1, y: y1, rotation: 0}
        ]
      }, 
      onComplete: attackComplete.bind(this)
    });    
    
    function attackComplete() {
      this.x = swarm.getEnemyXByIndex(this.index);
      this.y = swarm.getEnemyYByIndex(this.index);
      this.inPosition = true;
    }
    
    // TBD remove collision check after unsuccessful attack
    this.ticker.add(function() {
      if(isIntersecting(ship, this)) {
        this.explode();
        ship.hit();
      }
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
    TweenMax.killTweensOf(this);
    TweenMax.killTweensOf(this.position);      
    swarm.enemyCount--;
    swarm.enemies[this.index] = null;
    GameAudio.explosionSound();
    Effects.explode(this.x, this.y, Props.EXPLOSION_MEDIUM);
    this.ticker.stop();
    this.destroy();
    if(swarm.enemyCount === 0) {
      if(!mother)
        app.endGame(Props.SUCCESS_MESSAGE);
      app.nextLevel();
    }
  }
  
  hit() {
    if(!this.inPosition) {
      addNewPill(this, Props.PILL_POWER);
      app.addScore(Props.ENEMY_KILL_POINTS * 5);
      this.explode();  
      return;
    }
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
    app.game.addChild(bullet);
    app.bullets.push(bullet);
  }
}

Enemy.textures = [GameGraphics.alien1_1,
                  GameGraphics.alien1_2];
    