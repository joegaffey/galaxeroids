class Ship extends PIXI.Sprite {
  
  constructor() {    
    super(GameGraphics.getShipGraphics());
    this.shootDelay = Props.SHIP_SHOOT_DELAY;
    this.firePower = 0;
       
    this.orbs = 3;
    this.renderOrbs();
    
    this.position.x = Props.STAGE_HRES / 2;
    this.position.y = Props.STAGE_VRES - Props.SHIP_VERT_ADJUST;
    this.scale.x = this.scale.y = 2;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.speed = 0;
    this.speedBoost = 0;
    this.direction = 1;
    this.isInvincible = false;
    this.invincibilityAlpha = 1;
    
    this.init();
    app.game.addChild(this);
  }
  
  init() {    
    app.ticker.add(() => {
      ship.shootDelay--;
      if(app.paused) {
        ship.speed = 0;
        return;
      }
      if(ship.isInvincible) {
        if(ship.invincibilityAlpha <= 0) {
          ship.invincibilityAlpha = 1;
        } 
        else {
          ship.invincibilityAlpha -= 0.1;
        }
        ship.alpha = ship.invincibilityAlpha;
      }
      ship.position.x += ship.speed;
      if(ship.position.x <= ship.width / 2 || ship.position.x >= Props.STAGE_HRES - ship.width / 2)
        ship.position.x -= ship.speed;
    });
  }
  
  renderOrbs() {
    let orb = new PIXI.Sprite(GameGraphics.getEnergyGraphics());
    orb.x = 80;
    orb.y = 10;
    orb.scale.x = 1.5;
    orb.scale.y = 1.5;
    orb.tint = 0x00FF00;
    orb.anchor.set(0.5, 0);
    app.game.addChild(orb);
    
    this.orbText = new PIXI.Text('x' + this.orbs, style);
    this.orbText.x = 90;
    this.orbText.y = 10;
    this.orbText.anchor.set(0, 0);
    app.game.addChild(this.orbText);
  }
  
  incOrbs() {
    this.orbs++;
    this.orbText.text = 'x' + this.orbs;
  }
  
  decOrbs() {
    if(this.orbs > 0) {
      this.orbs--;
      this.orbText.text = 'x' + this.orbs;
    }
  }
  
  shoot() {
    if(this.shootDelay <= 0) {
      GameAudio.shootSound();
      this.addBullet(this.x, this.y - this.height / 2);
      this.shootDelay = Props.SHIP_SHOOT_DELAY - this.firePower;
    }
  }
  
  charge() {
    this.addEnergy(this.x, this.y - this.height / 2);
  }
  
  reset() {
    this.orbText.destroy();
    this.firePower = 0;
    this.speedBoost = 0;
    this.destroy();
  }
  
  addBullet(x, y) {    
    var bullet = new PIXI.Sprite(GameGraphics.getShipBulletGraphics());
    bullet.x = x;
    bullet.y = y;
    bullet.anchor.x = 0.5;
    bullet.anchor.y = 0.5;
    bullet.speed = Props.BULLET_SPEED;    
    bullet.tick = () => {
      if(app.paused)
         return;
      bullet.y -= bullet.speed;
      if(bullet.y < 0) {
        app.ticker.remove(bullet.tick);
        bullet.destroy();
      }
      else {
        swarm.checkHit(bullet);
        if(mother)
           mother.checkHit(bullet);
      }
    }
    app.ticker.add(bullet.tick);
    
    app.game.addChild(bullet);
    app.bullets.push(bullet);
  }
  
  addEnergy(x, y) {    
    if(this.orbs <= 0)
       return;
    GameAudio.shootSound();
    this.decOrbs();
    var energy = new PIXI.Sprite(GameGraphics.getEnergyGraphics());
    energy.x = x;
    energy.y = y;
    energy.tint = 0x00FF00;
    energy.anchor.x = 0.5;
    energy.anchor.y = 0.5;
    energy.speed = Props.BULLET_SPEED;    
    energy.tick = () => {
      if(app.paused)
         return;
      energy.y -= energy.speed;
      if(energy.y < 0) {
        app.ticker.remove(energy.tick);
        energy.destroy();
      }
      else {
        swarm.checkEnergy(energy);
        if(mother)
           mother.checkEnergy(energy);
      }
    }
    app.ticker.add(energy.tick);
    app.game.addChild(energy);
  }
  
  checkHit(bullet) {
    if(!this.isInvincible && isIntersecting(bullet, this)) {
      app.ticker.remove(bullet.tick);
      bullet.destroy(); 
      this.hit();
      return;
    }
  }
  
  checkPillHit(pill) {
    if(isIntersecting(pill, this)) {
      if(pill.type === pill.ASSIST) {
        app.showMessage('WINGMAN');
        assist.destroyEnemies(pill.power);
      }
      else if(pill.type === pill.SPEED) {
        if(this.speedBoost <= Props.SHIP_MAX_SPEED) {
          app.showMessage('SPEED +1');
          this.speedBoost += Props.SHIP_SPEED_STEP;
        }
        else
          app.showMessage('MAX SPEED');
      }
      else if(pill.type === pill.FIRE) {
        if(this.firePower < Props.FIRE_MAX) {
          app.showMessage('FIRE +1');
          this.firePower += Props.FIRE_STEP;
        }
        else
          app.showMessage('MAX FIRE');
      }
      else if(pill.type === pill.ORB) {
          app.showMessage('DESTRUCTORB');
          this.incOrbs();
      }
      else if(pill.type === pill.LIFE) {
        if(lives.lives < Props.PLAYER_MAX_LIVES) {
          app.showMessage('1UP !!!');
          lives.inc();
        }
        else
          app.showMessage('MAX LIVES');
      }
      app.ticker.remove(pill.tick);
      pill.destroy();
      GameAudio.pillCollectSound();
      app.addScore(Props.PILL_COLLECT_POINTS);
      return;
    }
  }
  
  checkCollision(enemy) {
    if(!this.isInvincible && enemy && isIntersecting(enemy, this)) {
      enemy.explode();
      this.hit();
    }
  }

  hit() {
    this.speed = 0;
    let messages = ['AYE CARUMBA!', 'OUCH!!!', 'THAT\'S GOTTA HURT!', 'YIKES!'];
    let msg = messages[Math.floor(Math.random() * messages.length)];
    app.showMessage(msg);
    Effects.explode(this.x, this.y, Props.EXPLOSION_HUGE);
    GameAudio.explosionSound();
    lives.dec();
    this.firePower = 0;
    this.speedBoost = 0;
  }
  
  setInvincible(bool) {
    this.isInvincible = bool;
    if(this.isInvincible){
      setTimeout(() => {
        this.isInvincible = false;
        this.alpha = 1;
      }, 3000);
    }
      
  }
  
  explode() {
    if(!this.i)
      this.i = 8;
    if(this.i > 1) {
      this.i--;
      GameAudio.explosionSound();
      const x = this.x - 40 + Math.floor(Math.random() * 80); 
      const y = this.y - 40 + Math.floor(Math.random() * 80); 
      
      Effects.explode(x, y, Props.EXPLOSION_HUGE);
      ship.speed = 0;
      setTimeout(() => { this.explode(); }, 400);
    }
    else
      app.endGame(Props.DEATH_MESSAGE);
  }
}