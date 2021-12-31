class Swarm {
  constructor() {  
    this.enemies = [];
    this.width = app.renderer.width;
    this.height = app.renderer.height; 
    this.columns = Math.floor(this.width / Props.ENEMY_GAP) - Props.SWARM_COLUMNS_MARGIN;
    this.xPos = Props.SWARM_COLUMNS_MARGIN / 2 * Props.ENEMY_GAP;
    this.yPos = Props.SWARM_TOP;
    this.xShift = 0;
    this.direction = 1;       
    this.enemyCount = 0;
    this.deadEnemies = [];
    this.previousPositions = [];
  }
   
  addEnemyType(type) {
    if(!mother)
      return null;
    if(type === 0) {
      this.enemies.push(null);
      return null;
    }
    var enemy = this.getEnemyByType(type);
    var i = this.enemies.length;
    enemy.index = i;
    this.enemies.push(enemy);
    app.game.addChild(enemy);
    this.enemyCount++;
    return enemy;
  }
  
  getEnemyByType(type) {
    var enemy;
    if(type === 1) {
      enemy = new Enemy(GameGraphics.alien0_1);
      enemy.textures = [GameGraphics.alien0_1, GameGraphics.alien0_2];
      enemy.scale.x = enemy.scale.y = 1.5;
    }
    else if(type === 2) {
      enemy = new Enemy(GameGraphics.alien1_1);
      enemy.textures = [GameGraphics.alien1_1, GameGraphics.alien1_2];
      enemy.scale.x = enemy.scale.y = 1.5;
    }
    else if(type === 3) {
      enemy = new Enemy(GameGraphics.alien2_1);
      enemy.textures = [GameGraphics.alien2_1, GameGraphics.alien2_2];
      enemy.scale.x = enemy.scale.y = 1.5;
    }
    else if(type === 4) {
      enemy = new Enemy(GameGraphics.alien3_1);
      enemy.textures = [GameGraphics.alien3_1, GameGraphics.alien3_2];
      enemy.scale.x = enemy.scale.y = 1.5;
    }
    else if(type === 5) {
      enemy = new Enemy(GameGraphics.alien4_1);
      enemy.textures = [GameGraphics.alien4_1, GameGraphics.alien4_2];
      enemy.scale.x = enemy.scale.y = 1.5;
    }
    enemy.maxHits = type;
    return enemy;
  }
  
  addEnemyRows(rowsArr) {
    GameAudio.motherAttackSound();
    this.columns = rowsArr[0].length;
    this.width = this.columns * Props.ENEMY_GAP;
    this.xPos = (app.renderer.width / 2) - (this.width / 2);
    rowsArr.forEach((row, i) => {
      // setTimeout(() => {
        this.addEnemyRow(row);
      // }, i * 500);     
    });
  }
  
  addEnemyRow(rowArr) {
    rowArr.forEach((type, i) => {
      // setTimeout(() => {
        const enemy = this.addEnemyType(type);  
        if(enemy) {
          enemy.x = mother.x;
          enemy.y = mother.y; 
          enemy.moveToPosition();
        }
      // }, i * 100);
    });
  }
  
  destroyEnemy(i) {
    this.enemies[i].explode();
  }

  removeEnemy(enemy) {
    gsap.killTweensOf(enemy);
    this.enemyCount--;
    this.deadEnemies.push(enemy);
    this.enemies[enemy.index] = null;
    if(this.enemyCount === 0 && currentLevel < levels.length) {
      app.nextLevel();
    }
  }
  
  acrobatics(count) {
    const flyers = this.getLiveEnemies(count);
    flyers.forEach(enemy => { 
      enemy.inPosition = false; 
      enemy.isFlying = true;
    });
    if(flyers.length <= 0)
      return;
      
    var i = Math.floor(Math.random() * 3);
    switch(i) {
      case 0: 
        this.fig8(flyers);
        break;
      case 1: 
        this.loop(flyers);
        break;        
      case 2: 
        this.dive(flyers);
        break;        
    }
  }
      
  fly(flyers, path, duration, delay) {
    gsap.to(flyers, {
      motionPath: {
        path: path,
        autoRotate: false,
      },
      duration: duration,
      ease:Linear.easeNone,
      stagger: {
        each: delay,
        onComplete: function() {
          this.targets()[0].moveToPosition();
        }
      }
    });    
  }
  
  loop(flyers) {
    const path = [
      {x: 100, y: 250, rotation: -0.5},
      {x: 700, y: 250, rotation: -1}, 
      {x: 400, y: 200, rotation: 0}
    ];
    
    this.fly(flyers, path, 2.5, 0.1);
  }
   
  fig8(flyers) {    
    const path = [
      {x: 200, y: 350, rotation: 0}, 
      {x: 100, y: 250, rotation: 0},
      {x: 200, y: 100, rotation: 0},
      {x: 500, y: 350, rotation: 0},
      {x: 600, y: 250, rotation: 0},
      {x: 500, y: 100, rotation: 0}
    ];
    
    this.fly(flyers, path, 2.5, 0.1);
  }
  
  dive(flyers) {    
    const x1 = 400, y1 = -100;
    const x2 = ship.x, y2 = -100;
    const x3 = ship.x, y3 = 900;
    const x4 = 400, y4 = 400;     
    
    const path = [
      {x: x1, y: y1, rotation: 0}, 
      {x: x2, y: y2, rotation: 0},
      {x: x3, y: y3, rotation: 0},
      {x: x4, y: y4, rotation: 0}
    ];
    
    this.fly(flyers, path, 5, 0.1);    
  }

  getLiveEnemies(count) {
    const live = [];
    let i = 0;
    this.enemies.forEach(enemy => { 
      if(enemy && !enemy.isFlying && i < count) {
        i++;
        live.push(enemy); 
      }
    });
    return live;
  }
  
  getEnemyXByIndex(i) {
    return this.xPos + (i % this.columns) * Props.ENEMY_GAP;
  }
  
  getEnemyYByIndex(i) {
    return this.yPos + (Math.floor(i / this.columns)) * Props.ENEMY_GAP;
  }
  
  shiftDown() {
    this.xShift = 0;
    if(this.yPos > 300)
      return;
    this.yPos += Props.SWARM_V_STEP;   
    this.enemies.forEach(function(enemy, i) {
      if(enemy && enemy.inPosition) {
        enemy.position.y = this.getEnemyYByIndex(i);       
      }
    }.bind(this));
  }

  shiftLeft() {
    this.xPos -= Props.SWARM_H_STEP;   
    this.xShift--;
    this.enemies.forEach(function(enemy, i) {
      if(enemy && enemy.inPosition) {
        enemy.swapTexture();
        enemy.position.x = this.getEnemyXByIndex(i);
      }
    }.bind(this));
  }

  shiftRight() {
    this.xPos += Props.SWARM_H_STEP;   
    this.xShift++;
    this.enemies.forEach(function(enemy, i) {
      if(enemy && enemy.inPosition) {
        enemy.swapTexture();
        enemy.position.x = this.getEnemyXByIndex(i);
      }
    }.bind(this));
  } 
  
  getRandomEnemy() {
    let enemy = null;
    let i = 0;
    while(!enemy) {
      i++;
      if(i > this.enemies.length)
        return null;
      enemy = this.enemies[Math.floor(Math.random() * this.enemies.length)];
    }
    return enemy;
  }
  
  getLowestEnemy() {
    let enemy = null;
    let i = this.enemies.length;
    while(!enemy) {
      if(i > this.enemies.length)
        return null;
      enemy = this.enemies[i];
      i--;
    }
    return enemy;
  }

  reset() {
    this.enemies.forEach(enemy => {
      if(enemy) {
        gsap.killTweensOf(enemy);
        app.ticker.remove(enemy.tick);
        enemy.destroy();
      }
    });
    this.enemies = [];
    this.deadEnemies.forEach(enemy => {
      if(enemy) {
        gsap.killTweensOf(enemy);
        app.ticker.remove(enemy.tick);
        enemy.destroy();
      }
    });
    this.deadEnemies = [];
    this.enemyCount = 0;
    this.yPos = Props.SWARM_TOP;
    this.xPos = 0;
  }
  
  move() {
    if(this.enemyCount === 0)
      return;
    if((this.direction === 1 && this.xShift > Props.SWARM_MAX_SHIFT) || 
       (this.direction === -1 && this.xShift < -Props.SWARM_MAX_SHIFT)) {
      this.shiftDown();
      this.direction *= -1; 
    }
    else if(this.direction === 1)
      this.shiftRight();
    else
      this.shiftLeft();
  }

  checkHit(bullet) {
    this.enemies.forEach(function(enemy, i) {
      if(enemy && bullet && isIntersecting(bullet, enemy)) {
        enemy.hit();
        app.ticker.remove(bullet.tick);
        bullet.destroy(); 
        return;
      }
    }.bind(this));
  }
  
  checkEnergy(energy) {
    this.enemies.forEach(function(enemy, i) {
      if(energy && enemy && isIntersecting(energy, enemy)) {
        GameAudio.explosionSound();
        Effects.explode(energy.x, energy.y, Props.EXPLOSION_HUGE * 1.5);
        app.ticker.remove(energy.tick);
        energy.destroy(); 
        const nearby = this.getWithinRange(enemy.position, 60);
        nearby.forEach(nearEnemy => { 
          if(nearEnemy)
            nearEnemy.explode(false); 
        });
        return;
      }
    }.bind(this));
  }
  
  getWithinRange(position, range) {
    const withinRange = [];
    this.enemies.forEach(enemy => {
      if(enemy && Math.abs(enemy.x - position.x) < range && Math.abs(enemy.y - position.y) < range) {
        withinRange.push(enemy);
      }
    });    
    return withinRange;
  }
}