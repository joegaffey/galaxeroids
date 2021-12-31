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
    app.game.addChild(this);
  }
  
  enter() {
    gsap.to(this, 1.5, {y: 50, onComplete: () => this.startTicker() });  
  }

  startTicker() {
    this.tick = () => {
      if(!app.paused && mother) {
        this.pillTimeout++;
        this.x += this.direction * Props.MOTHER_SPEED;
        if(this.x > Props.STAGE_HRES - this.width /2)
          this.direction = -1;
        if(this.x < this.width /2)
          this.direction = 1;
      }
    };
    app.ticker.add(this.tick);
  }
  
  swapTexture() {
    if(this.currentTexture === 0)
      this.currentTexture = 1;
    else 
      this.currentTexture = 0;
    this.texture = Mother.textures[this.currentTexture];
  }
  
  attack() {
    app.ticker.remove(this.tick);
    let loops = 4;
    setInterval(() => {
      if(loops > 0) {
        GameAudio.motherAttackSound();
        loops--;
      }
    }, 500);
    this.addHealthBar();
    this.isAttacking = true;
    const x1 = 400, y1 = 200, scale = 4, duration = 2;

    this.timeline = gsap.timeline({onComplete: () => mother.strafe() });
    this.timeline.to(mother.position, duration, {x: x1, y: y1}, 0);
    this.timeline.to(mother.scale, duration, {x: scale, y: scale}, 0);
  }    
  
  strafe() {
    const duration = 0.5;
    const x = 50 + Math.floor(Math.random() * 650);
    
    this.timeline = new gsap.timeline({onComplete: () => mother.rain() });
    this.timeline.to(mother.position, duration, {x: 400}, 0) ;
    this.timeline.to(mother.position, duration, {x: x}, 1);
  }
  
  rain(offset = 20) {
    setTimeout(() => {
      if(app.paused || !this.isAttacking)
        return;
      GameAudio.thrustSound();
      if(Math.random() * 8 < 1)
      this.sendEnemy();
      const x = this.x - (this.width / 2) + Math.floor((this.width * Math.random()));
      const y = this.y + this.height / 2;
      this.addBullet(x, y);
      offset--;
      if(offset > 0) {
        this.rain(offset);
      }
      else {
        let y = this.y + 50;
        if(this.y > 400)
          gsap.to(this.position, 0.5, { y: 200, onComplete: this.strafe });    
        else 
          gsap.to(this.position, 0.2, { y: y, onComplete: this.strafe });    
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

    const path = [
      {x: x1, y: y1, rotation: 0},
      {x: x1, y: y1 - 200, rotation: -0.5},
      {x: x2, y: y1 - 200, rotation: -1}, 
      {x: x2, y: y2 + 200, rotation: 0},
    ];

    gsap.to(enemy, {
      motionPath: {
        path: path,
        autoRotate: false,
      },
      duration: 4,
      onComplete: () => enemy.explode(false)
    });
  }
  
  addHealthBar() {
    this.health = new PIXI.Sprite(GameGraphics.getHealthGraphics());
    this.health.anchor.x = 0.5;
    this.health.y = -15;
    this.health.tint = 0xFF0000;
    this.health.startWidth = this.health.width;
    
    this.health.update = () => {
      let hitRatio = (Props.MOTHER_MAX_HITS - this.hits) / Props.MOTHER_MAX_HITS;
      this.health.width = this.health.startWidth * hitRatio;
    };
    this.addChild(this.health);
  }
  
  hit() {
    GameAudio.motherHitSound();
    if(this.isAttacking) {
      this.hits++;
      this.health.update();
    }
    if(this.hits % Props.MOTHER_PILL_HITS === 0) {
      this.addPill(Props.PILL_POWER);
      if(!this.isAttacking)
        this.hits = 0;
    }
    if(this.hits >= Props.MOTHER_MAX_HITS) {
      this.endSequence();   
    }
    else
      app.addScore(Props.MOTHER_HIT_POINTS);
  }
  
  energy() {
    GameAudio.motherHitSound();
    if(this.isAttacking) {
      this.hits += 5;
      this.health.update();
    }
    if(this.hits >= Props.MOTHER_MAX_HITS) {
      this.endSequence();
    }
    else
      app.addScore(Props.MOTHER_HIT_POINTS * 5);
  }
  
  shoot() {
    this.addBullet(this.x, this.y + this.height / 2);
  }

  endSequence() {
    this.isAttacking = false;
    app.ticker.remove(this.tick);
    this.timeline.clear();
    gsap.killTweensOf(this);
    this.explosionCount = 12;
    app.addScore(Props.MOTHER_KILL_POINTS);
    this.explode();
  }
  
  explode() {      
    if(this.explosionCount > 1) {
      this.explosionCount--;
      GameAudio.explosionSound();
      const x = this.x - 60 + Math.floor(Math.random() * 120); 
      const y = this.y - 40 + Math.floor(Math.random() * 80);       
      Effects.explode(x, y, Props.EXPLOSION_HUGE);
      setTimeout(() => { this.explode(); }, 400);
    }
    else {
      app.endGame(Props.SUCCESS_MESSAGE);
    }
  }
  
  checkHit(bullet) {
    if(bullet && isIntersecting(bullet, this)) {
      Effects.explode(bullet.x, bullet.y, Props.EXPLOSION_TINY);
      app.ticker.remove(bullet.tick);
      bullet.destroy(); 
      this.hit();
    }
  }
  
  checkEnergy(energy) {
    if(energy && isIntersecting(energy, this)) {
      Effects.explode(energy.x, energy.y, Props.EXPLOSION_HUGE);
      GameAudio.explosionSound();
      app.ticker.remove(energy.tick);
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
    };
    app.ticker.add(bullet.tick);
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
    app.ticker.remove(this.tick);
    this.destroy();
  }
}

Mother.textures = [GameGraphics.mother1,
                   GameGraphics.mother2];
