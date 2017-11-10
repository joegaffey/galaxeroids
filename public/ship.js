class Ship extends PIXI.Sprite {
  constructor() {    
    super(GameGraphics.getShipGraphics());
    this.shootDelay = Props.SHIP_SHOOT_DELAY;
    this.orbs = 3;
    this.renderOrbs();
    
    this.x = Props.STAGE_HRES / 2;
    this.y = Props.STAGE_VRES - Props.SHIP_VERT_ADJUST;
    this.scale.x = this.scale.y = 2;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.speed = 0;
    this.direction = 1;
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(function() {
      this.shootDelay--;
      if(app.paused)
        this.speed = 0;
      this.x += this.speed;
      if(this.x <= this.width / 2 || this.x >= Props.STAGE_HRES - this.width / 2)
        this.x -= this.speed;
    }.bind(this));
    this.ticker.start();
    app.game.addChild(this);
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
    this.orbText.x = 120;
    this.orbText.y = 10;
    this.orbText.anchor.set(1, 0);
    app.game.addChild(this.orbText);
  }
  
  incOrbs() {
    this.orbs++;
    this.orbText.setText('x' + this.orbs);
  }
  
  decOrbs() {
    if(this.orbs > 0) {
      this.orbs--;
      this.orbText.setText('x' + this.orbs);
    }
  }
  
  shoot() {
    if(this.shootDelay <= 0) {
      GameAudio.shootSound();
      this.addBullet(this.x, this.y - this.height / 2);
      this.shootDelay = Props.SHIP_SHOOT_DELAY;
    }
  }
  
  charge() {
    this.addEnergy(this.x, this.y - this.height / 2);
  }
  
  reset() {
    this.ticker.stop();
    this.orbText.destroy();
    this.destroy();
  }
  
  addBullet(x, y) {    
    var bullet = new PIXI.Sprite(GameGraphics.getShipBulletGraphics());
    bullet.x = x;
    bullet.y = y;
    bullet.anchor.x = 0.5;
    bullet.anchor.y = 0.5;
    bullet.speed = Props.BULLET_SPEED;
    bullet.ticker = new PIXI.ticker.Ticker();
    bullet.ticker.add(function() {
      if(app.paused)
         return;
      bullet.y -= bullet.speed;
      if(bullet.y < 0) {
         bullet.ticker.stop();
         bullet.destroy(); 
      }
      else {
        swarm.checkHit(bullet);
        if(mother)
           mother.checkHit(bullet);
      }
    });
    bullet.ticker.start();
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
    energy.ticker = new PIXI.ticker.Ticker();
    energy.ticker.add(function() {
      if(app.paused)
         return;
      energy.y -= energy.speed;
      if(energy.y < 0) {
         energy.ticker.stop();
         energy.destroy(); 
      }
      else {
        swarm.checkEnergy(energy);
        if(mother)
          mother.checkEnergy(energy);
      }
    });
    energy.ticker.start();
    app.game.addChild(energy);
  }
  
  checkHit(bullet) {
    if(isIntersecting(bullet, this)) {
      bullet.ticker.stop();
      Effects.explode(bullet.x, bullet.y, Props.EXPLOSION_MEDIUM);
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
        if(Props.SHIP_SPEED <= 4) {
          app.showMessage('SPEED +1');
          Props.SHIP_SPEED++;
        }
        else
          app.showMessage('MAX SPEED');
      }
      else if(pill.type === pill.FIRE) {
        if(Props.SHIP_SHOOT_DELAY >= 5) {
          app.showMessage('FIRE +1');
          Props.SHIP_SHOOT_DELAY-=3;
        }
        else
          app.showMessage('MAX FIRE');
      }
      else if(pill.type === pill.ORB) {
          app.showMessage('DESTRUCTORB');
          this.incOrbs();
      }
      pill.ticker.stop();
      pill.destroy(); 
      GameAudio.pillCollectSound();
      app.addScore(Props.PILL_COLLECT_POINTS);
      return;
    }
  }
  
  checkCollision(enemy) {
    if(enemy && isIntersecting(enemy, this)) {
      enemy.explode();
      this.hit();
    }
  }

  hit() {
    this.speed = 0;
    let messages = ['AYE CARUMBA!', 'OUCH!!!', 'THAT\'S GOTTA HURT!', 'YIKES!'];
    let msg = messages[Math.floor(Math.random() * messages.length)];
    app.showMessage(msg);
    GameAudio.explosionSound();
    lives.dec();
    // app.pause();
    // setTimeout(function() {
    //   app.unPause();
    // }, 2000);
  }
}