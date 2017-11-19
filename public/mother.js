class Mother extends PIXI.Sprite {
  
  constructor() {
    super(Mother.textures[0]);
    this.x = app.renderer.width / 2;
    this.y = 50;
    this.anchor.x = this.anchor.y = 0.5;
    this.scale.x = this.scale.y = 2;
    this.hits = 0;
    this.currentTexture = 0;
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
  
  swapTexture() {
    if(this.currentTexture === 0)
      this.currentTexture = 1;
    else 
      this.currentTexture = 0;
    this.setTexture(Mother.textures[this.currentTexture]);
  }
  
  attack() {
    this.isAttacking = true;
    this.ticker.stop();
    const x1 = 400, y1 = 200, scale = 4, duration = 2;
       
    var timeline = new TimelineMax({onComplete: this.strafe})
      .to(this.position, duration, {x: x1, y: y1}, 0)
      .to(this.scale, duration, {x: scale, y: scale}, 0);
  }    
  
  strafe() {
    const duration = 1;
    const x = 50 + Math.floor(Math.random() * 650);
    const timeline = new TimelineMax({onComplete: mother.rain})
      .to(mother.position, duration, {x: 400, delay: 1}, 0)  
      .to(mother.position, duration, {x: 100, delay: 1}, 1)
      .to(mother.position, duration, {x: 600, delay: 1}, 2)
      .to(mother.position, duration, {x: x, delay: 1}, 3);
  }
  
  rain(offset = 20) {
    setTimeout(() => {
      const x = mother.x - (mother.width / 2) + Math.floor((mother.width * Math.random()));
      const y = mother.y + mother.height / 2;
      mother.addBullet(x, y);
      offset--;
      if(offset > 0)
        mother.rain(offset);
      else
        mother.strafe();
    }, 200);      
  }
  
  hit() {
    GameAudio.motherHitSound();
    if(this.isAttacking)
      this.hits++;
    if(this.hits % Props.MOTHER_PILL_HITS === 0)
      this.addPill(Props.PILL_POWER);
    if(this.hits >= Props.MOTHER_MAX_HITS) {
      this.explode();
    }
    else
      app.addScore(Props.MOTHER_HIT_POINTS);
  }
  
  energy() {
    GameAudio.motherHitSound();
    if(this.isAttacking)
      this.hits += 5;
    if(this.hits >= Props.MOTHER_MAX_HITS) {
      this.explode();
    }
    else
      app.addScore(Props.MOTHER_HIT_POINTS * 5);
  }
  
  shoot() {
    this.addBullet(this.x, this.y + this.height / 2);
  }
  
  explode() {
    this.ticker.stop();
    GameAudio.explosionSound();
    Effects.explode(this.x, this.y, Props.EXPLOSION_HUGE);
    app.addScore(Props.MOTHER_KILL_POINTS);
    app.endGame(Props.SUCCESS_MESSAGE);
    this.destroy(); 
    mother = null;
  }
  
  checkHit(bullet) {
    if(bullet && isIntersecting(bullet, this)) {
      Effects.explode(bullet.x, bullet.y, Props.EXPLOSION_TINY);
      bullet.ticker.stop();
      bullet.destroy(); 
      this.hit();
    }
  }
  
  checkEnergy(energy) {
    if(energy && isIntersecting(energy, this)) {
      Effects.explode(energy.x, energy.y, Props.EXPLOSION_SMALL);
      energy.ticker.stop();
      energy.destroy(); 
      this.energy();
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

Mother.textures = [GameGraphics.mother1,
                  GameGraphics.mother2];
