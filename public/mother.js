class Mother extends PIXI.Sprite {
  
  constructor() {
    super(Mother.textures[0]);
    this.x = app.renderer.width / 2;
    this.y = -100;
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
  }
  
  enter() {
    TweenMax.to(this, 1.5, {y: 50});
  }
  
  swapTexture() {
    if(this.currentTexture === 0)
      this.currentTexture = 1;
    else 
      this.currentTexture = 0;
    this.setTexture(Mother.textures[this.currentTexture]);
  }
  
  attack() {
    let loops = 4;
    setInterval(() => {
      if(loops > 0) {
        GameAudio.motherAttackSound();
        loops--;
      }
    }, 500);
    this.isAttacking = true;
    this.ticker.stop();
    const x1 = 400, y1 = 200, scale = 4, duration = 2;
       
    var timeline = new TimelineMax({onComplete: this.strafe})
      .to(this.position, duration, {x: x1, y: y1}, 0)
      .to(this.scale, duration, {x: scale, y: scale}, 0);
  }    
  
  strafe() {
    if(!mother)
      return;
    const duration = 0.5;
    const x = 50 + Math.floor(Math.random() * 650);
    const timeline = new TimelineMax({onComplete: mother.rain})
      .to(mother.position, duration, {x: 400}, 0)  
      .to(mother.position, duration, {x: x}, 1);
  }
  
  rain(offset = 20) {
    setTimeout(() => {
      if(app.paused)
        return;
      GameAudio.thrustSound();
      if(!mother)
        return;
      if(Math.random() * 8 < 1)
        mother.sendEnemy();
      const x = mother.x - (mother.width / 2) + Math.floor((mother.width * Math.random()));
      const y = mother.y + mother.height / 2;
      mother.addBullet(x, y);
      offset--;
      if(offset > 0) {
        mother.rain(offset);
      }
      else {
        let y = mother.y + 50;
        if(mother.y > 400)
          TweenMax.to(mother.position, 0.5, {y: 200, onComplete: mother.strafe});    
        else 
          TweenMax.to(mother.position, 0.2, {y: y, onComplete: mother.strafe});    
      }
    }, 200);      
  }  
  
  sendEnemy() {    
    const x1 = this.x;
    const y1 = this.y;
    const x2 = ship.x;
    const y2 = ship.y;
    
    let enemy = swarm.addEnemyType(Math.floor(Math.random() * 4) + 1);
    enemy.x = this.x;
    enemy.y = this.y;
    enemy.isAttacking = true;

    TweenMax.to([enemy.position, enemy], 3, {
      bezier: {
        type: 'Soft',
        values:[
          {x: x1, y: y1, rotation: 0},
          {x: x1, y: y1 - 200, rotation: -0.5},
          {x: x2, y: y1 - 200, rotation: -1}, 
          {x: x2, y: y2 + 200, rotation: 0},
        ]
      }, onComplete: () => { enemy.explode(false); } 
    });   
  }
  
  hit() {
    GameAudio.motherHitSound();
    this.hits++;
    if(this.hits % Props.MOTHER_PILL_HITS === 0) {
      this.addPill(Props.PILL_POWER);
      if(!this.isAttacking)
        this.hits = 0;
    }
    if(this.hits >= Props.MOTHER_MAX_HITS) {
      this.explode();
      app.endGame(Props.SUCCESS_MESSAGE);      
    }
    else
      app.addScore(Props.MOTHER_HIT_POINTS);
  }
  
  energy() {
    GameAudio.motherHitSound();
    if(this.isAttacking) {
      this.hits += 5;
    }
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
    if(!this)
       return;
    this.ticker.stop();
    app.addScore(Props.MOTHER_KILL_POINTS);
    
    if(!this.i)
      this.i = 12;
    if(this.i > 1) {
      this.i--;
      GameAudio.explosionSound();
      const x = this.x - 60 + Math.floor(Math.random() * 120); 
      const y = this.y - 40 + Math.floor(Math.random() * 80); 
      
      Effects.explode(x, y, Props.EXPLOSION_HUGE);
      setTimeout(() => { this.explode(); }, 300);
    }
    else {
      this.destroy(); 
      mother = null;
      app.endGame(Props.SUCCESS_MESSAGE);
    }
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
      Effects.explode(energy.x, energy.y, Props.EXPLOSION_HUGE);
      GameAudio.explosionSound();
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
