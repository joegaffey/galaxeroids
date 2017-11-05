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
  }
  
  addEnemy() {
    if(!mother)
      return;
    for(var i  = 0; i < this.enemies.length + 1; i++) {
      if(!this.enemies[i]) {
        var enemy = new Enemy();
        enemy.index = i;
        enemy.x = this.getEnemyXByIndex(i);
        enemy.y = this.getEnemyYByIndex(i);
        enemy.tint = Props.ENEMY_COLORS[(Math.floor(i / this.columns)) % Props.ENEMY_COLORS.length];
        this.enemies[i] = enemy;
        app.stage.addChild(enemy);
        this.enemyCount++;
        this.moveEnemyIntoPosition(enemy, i);
        return;
      }
    }
  }
  
  addEnemies(n) {
    for(var i = 0; i < n; i++) 
      this.addEnemy();
  }
  
  destroyEnemy(i) {
    this.enemies[i].explode();
  }
  
  getEnemyXByIndex(i) {
    return this.xPos + (i % this.columns) * Props.ENEMY_GAP;
  }
  
  getEnemyYByIndex(i) {
    return this.yPos + (Math.floor(i / this.columns)) * Props.ENEMY_GAP;
  }
  
  moveEnemyIntoPosition(enemy, i) {
    enemy.x = mother.x;
    enemy.y = mother.y; 
    enemy.startX = this.getEnemyXByIndex(i);
    enemy.startY = this.getEnemyYByIndex(i);
    enemy.ticker.add(enemy.moveToStartPosition, enemy);
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
    let i = this.enemyCount;
    while(!enemy && i >= -1) {
      enemy = this.enemies[i];
      i--;
    }
    return enemy;
  }

  reset() {
    this.enemies.forEach(function(enemy) {
      if(enemy) {
        enemy.ticker.stop();
        enemy.destroy();
      }
    });
    this.enemies.splice(0, this.enemies.length);
    this.yPos = 0;
    this.xPos = 0;
    swarm = new Swarm();
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
    GameAudio.moveSound();
  }

  checkHit(bullet) {
    this.enemies.forEach(function(enemy, i) {
      if(enemy && bullet && isIntersecting(bullet, enemy)) {
        enemy.hit();
        bullet.ticker.stop();
        bullet.destroy(); 
        return;
      }
    }.bind(this));
  }
  
  checkEnergy(energy) {
    this.enemies.forEach(function(enemy, i) {
      if(energy && enemy && isIntersecting(energy, enemy)) {
        if(enemy.hits > 0) {
          energy.ticker.stop();
          energy.destroy(); 
          enemy.hits--;
          if(enemy.hits == 0)
            enemy.rotation = 0;
          app.minusScore(Props.ENEMY_HIT_POINTS);
        }
        return;
      }
    }.bind(this));
  }
}