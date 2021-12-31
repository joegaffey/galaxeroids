class Enemy extends PIXI.Sprite {
  
  constructor(texture) {
    super(texture);
    this.currentTexture = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.hits = 0;
    this.inPosition = false;
    this.yOffset = 0;
    
    this.tick = () => {
      if(app.paused)
        return;      
      if(this.yOffset > 0) {
        this.rotation = this.yOffset * 2 * Props.ENEMY_ROTATION_SPEED;
        if(!this.isFlying)
          this.y = swarm.getEnemyYByIndex(this.index) - this.yOffset;
        this.yOffset--;
        if(this.yOffset === 0) {
          this.rotation = 0;
          if(!this.isFlying)
            this.inPosition = true;    
        }
      }      
      if(this.y > 500) 
        ship.checkCollision(this);
    } 
    app.ticker.add(this.tick);
  }  
  
  attack() {    
    if(this.isflying)
      return;
    const x1 = this.x;
    const y1 = this.y;
    const x2 = ship.x;
    const y2 = ship.y;
    
    const path = [
      {x: x1, y: y1, rotation: 0},
      {x: x1, y: y1 - 100, rotation: -0.5},
      {x: x2, y: y2 - 100, rotation: -1}, 
      {x: x2, y: y2, rotation: 0},
      {x: x2, y: y2 - 100, rotation: 1}, 
      {x: x1, y: y1, rotation: 0}
    ];
    
    this.inPosition = false;
    this.isAttacking = true;
    
    gsap.to(this, {
      motionPath: {
        path: path,
        autoRotate: false,
      },
      duration: 4,
      onComplete: () => this.moveToPosition()
    });
  }
  
  moveToPosition() {    
    const path = [
      {x: this.x, y: this.y}, 
      {x: swarm.getEnemyXByIndex(this.index), y: swarm.getEnemyYByIndex(this.index)},
    ];
    
    gsap.to(this, {
      motionPath: {
        path: path,
        autoRotate: false,
      },
      duration: 0.5,
      onComplete: () => { 
        this.inPosition = true;
        this.isAttacking = false;
      }
    });      
  }  
  
  swapTexture() {
    if(this.currentTexture === 0)
      this.currentTexture = 1;
    else 
      this.currentTexture = 0;
    this.texture= this.textures[this.currentTexture];
  }
  
  explode(effects = true) {
    this.visible = false;
    if(effects) {
      GameAudio.explosionSound();
      Effects.explode(this.x, this.y, Props.EXPLOSION_MEDIUM);        
    }
    app.ticker.remove(this.tick);
    swarm.removeEnemy(this);
  }
  
  hit() {
    if(this.isAttacking) {
      addNewPill(this, Props.PILL_POWER);
      app.addScore(Props.ENEMY_KILL_POINTS * 5);
      this.explode();  
      return;
    }
    if(this.isFlying) {
      app.addScore(Props.ENEMY_KILL_POINTS * 5);
      this.explode();  
      return;
    }
    this.hits++;
    if(this.hits === this.maxHits) {
      app.addScore(Props.ENEMY_KILL_POINTS);  
      this.explode();      
    }
    else {
      Effects.explode(this.x, this.y, Props.EXPLOSION_TINY);
      app.addScore(Props.ENEMY_HIT_POINTS);
      this.yOffset += 50;
      this.inPosition = false;    
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
    bullet.tick = () => {
      if(app.paused)
         return;
      bullet.y += bullet.speed;
      if(bullet.y > app.renderer.height) {
        app.ticker.remove(bullet.tick);
        bullet.destroy();
      }
      else {
        ship.checkHit(bullet);
      }
    }
    app.ticker.add(bullet.tick);
    app.game.addChild(bullet);
    app.bullets.push(bullet);
  }
}
    