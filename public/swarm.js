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
        enemy.scale.x = enemy.scale.y = 1.5;
        app.game.addChild(enemy);
        this.enemyCount++;
        this.moveEnemyIntoPosition(enemy, i);
        return;
      }
    }
  }
  
  addEnemyType(type, col, row) {
    if(!mother)
      return;
    if(type === 0) {
      this.enemies.push(null);
      return;
    }
    var enemy;
    if(type === 1) {
      enemy = new Enemy(GameGraphics.alien0_1);
      enemy.textures = [GameGraphics.alien0_1, GameGraphics.alien0_2];
      enemy.scale.x = enemy.scale.y = 1.5;
    }
    else if(type === 2) {
      enemy = new Enemy(GameGraphics.alien1_1);
      enemy.textures = [GameGraphics.alien1_1, GameGraphics.alien1_2];
      enemy.scale.x = enemy.scale.y = 0.8;
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
    var i = this.enemies.length;
    enemy.index = i;
    enemy.x = this.getEnemyXByIndex(i);
    enemy.y = this.getEnemyYByIndex(i);
    this.enemies.push(enemy);
    app.game.addChild(enemy);
    this.enemyCount++;
    this.moveEnemyIntoPosition(enemy, i);
  }
  
  addEnemies(n) {
    for(var i = 0; i < n; i++) 
      this.addEnemy();
  }
  
  addEnemyRows(rowsArr) {
    this.columns = rowsArr[0].length;
    this.width = this.columns * Props.ENEMY_GAP;
    this.xPos = (app.renderer.width / 2) - (this.width / 2);
    rowsArr.forEach(function(row, i){
      this.addEnemyRow(row, i);     
    }.bind(this));
  }
  
  addEnemyRow(rowArr, row){
    rowArr.forEach(function(type, col) {
      this.addEnemyType(type, col, row);  
    }.bind(this)); 
  }
  
  destroyEnemy(i) {
    this.enemies[i].explode();
  }
  
  acrobatics() {
    if(this.isFlying) {
      this.isFlying = false; //Workaround for onCompleteAll not getting called sometimes
      return;
    }
    this.isFlying = true;
    var i = Math.floor(Math.random() * 3);
    switch(i) {
      case 0: 
          this.fig8();
          break;
      case 1: 
          this.loop();
          break;        
      case 2: 
          this.dive();
          break;        
    }
  }
    
  loop() {
    const x1 = 100;
    const y1 = 250;
    const x2 = 700;
    const y2 = 250;
    const x3 = 400;
    const y3 = 200;
    
    const duration = 2.5;
    const delay = 0.1;
    
    const flyers = this.getLiveEnemies();
    flyers.forEach(enemy => { 
      enemy.inPosition = false; 
      enemy.isFlying = true;
    });
    
    TweenMax.staggerTo(flyers, duration, {
      bezier: {
          type: 'Soft',
          values:[
            {x: x1, y: y1, rotation: -0.5},
            {x: x2, y: y2, rotation: -1}, 
            {x: x3, y: y3, rotation: 0}
          ]
        }, 
        ease: Linear.easeNone,
        onComplete: this.acrobaticsComplete
      },delay, this.acrobaticsCompleteAll
    );      
  }
   
  fig8() {    
    const x1 = 200, y1 = 350;
    const x2 = 100, y2 = 250;
    const x3 = 200, y3 = 100;
    const x4 = 500, y4 = 350;
    const x5 = 600, y5 = 250;        
    const x6 = 500, y6 = 100;        
    
    const duration = 2.5;
    const delay = 0.1;
    
    const flyers = this.getLiveEnemies();
    flyers.forEach(enemy => { 
      enemy.inPosition = false; 
      enemy.isFlying = true;
    });
    
    TweenMax.staggerTo(flyers, duration, {
      bezier: {
          type: 'Soft',
          values:[
            {x: x1, y: y1, rotation: 0}, 
            {x: x2, y: y2, rotation: 0},
            {x: x3, y: y3, rotation: 0},
            {x: x4, y: y4, rotation: 0},
            {x: x5, y: y5, rotation: 0},
            {x: x6, y: y6, rotation: 0}
          ]
        }, 
        ease: Linear.easeNone,
        onComplete: this.acrobaticsComplete
      },delay, this.acrobaticsCompleteAll
    );      
  }
  
  dive() {    
    const x1 = 400, y1 = -100;
    const x2 = ship.x, y2 = -100;
    const x3 = ship.x, y3 = 900;
    const x4 = 400, y4 = 400;        
    
    const duration = 5;
    const delay = 0.1;
    
    const flyers = this.getLiveEnemies();
    flyers.forEach(enemy => { 
      enemy.inPosition = false; 
      enemy.isFlying = true;
    });
    
    TweenMax.staggerTo(flyers, duration, {
      bezier: {
          type: 'Soft',
          values:[
            {x: x1, y: y1, rotation: 0}, 
            {x: x2, y: y2, rotation: 0},
            {x: x3, y: y3, rotation: 0},
            {x: x4, y: y4, rotation: 0}
          ]
        }, 
        ease: Linear.easeNone,
        onComplete: this.acrobaticsComplete
      },delay, this.acrobaticsCompleteAll
    );      
  }
  
  sequenceComplete() { 
    this.target.inPosition = true;
    this.target.isFlying = false;
  }
  
  acrobaticsCompleteAll() {
    swarm.isFlying = false; 
  }
    
  acrobaticsComplete() {
    const enemy = this.target;
    TweenMax.to(this.target, 0.4, {
      bezier: {
        type: 'Soft',
        values:[
          {x: enemy.x, y: enemy.y}, 
          {x: swarm.getEnemyXByIndex(enemy.index), y: swarm.getEnemyYByIndex(enemy.index)},
        ]
      },
      onComplete: swarm.sequenceComplete
    });
  } 

  getLiveEnemies() {
    const live = [];
    this.enemies.forEach(enemy => { 
      if(enemy)
        live.push(enemy); 
    });
    return live;
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
    this.enemies.forEach(function(enemy) {
      if(enemy) {
        enemy.ticker.stop();
        enemy.destroy();
      }
    });
    this.enemies.splice(0, this.enemies.length);
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
        energy.ticker.stop();
        energy.destroy(); 
        enemy.explode();
        return;
      }
    }.bind(this));
  }
}