class Mother extends PIXI.Sprite {
  constructor() {
    super(GameGraphics.getMotherGraphics());
    this.tint = 0xFF0000;
    this.x = app.renderer.width / 2;
    this.y = 40;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.hits = 0;
    this.direction = 1;
    this.pillTimeout = Props.PILL_DELAY;
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(function() {
      if(!app.paused) {
        this.pillTimeout++;
        this.x += this.direction * Props.MOTHER_SPEED;
        if(this.x > Props.STAGE_HRES - this.width /2)
          this.direction = -1;
        if(this.x < this.width /2)
          this.direction = 1;
      }
    }.bind(this));
    app.game.addChild(this);
    this.ticker.start();
  }
  
  hit() {
    GameAudio.motherHitSound();
    this.hits++;
    if(!Props.SERVER_AVAILABLE && this.hits % Props.MOTHER_PILL_HITS === 0)
      this.addPill(Props.PILL_POWER);
    if(this.hits === Props.MOTHER_MAX_HITS) {
      this.explode();
    }
    else
      app.addScore(Props.MOTHER_HIT_POINTS);
  }
  
  shoot() {
    this.addBullet(this.x, this.y + this.height / 2);
  }
  
  explode() {
    this.ticker.stop();
    GameAudio.explosionSound();
    Effects.explode(this.x, this.y, Props.EXPLOSION_HUGE);
    app.addScore(Props.MOTHER_KILL_POINTS);
    if(swarm.enemyCount === 0)
      app.stop(Props.SUCCESS_MESSAGE);
    this.destroy(); 
    mother = null;
  }
  
  checkHit(bullet) {
    if(bullet && isIntersecting(bullet, this)) {
      bullet.ticker.stop();
      Effects.explode(bullet.x, bullet.y, Props.EXPLOSION_TINY);
      bullet.destroy(); 
      if(this.hit() && swarm.enemyCount === 0)
        app.stop(Props.SUCCESS_MESSAGE);       
    }
  }
  
  checkEnergy(energy) {
    if(energy && isIntersecting(energy, this)) {
      energy.ticker.stop();
      energy.destroy(); 
      swarm.addEnemy();
      app.minusScore(Props.MOTHER_HIT_POINTS);
    }
  }
  
  addBullet(x, y) {    
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
  
  addPill(power) {    
    if(this.pillTimeout <= Props.PILL_DELAY)
      return;
    this.pillTimeout = 0;
    addNewPill(this, power);
  }
  
  reset() {
    this.ticker.stop();
    this.destroy();
  }
}
