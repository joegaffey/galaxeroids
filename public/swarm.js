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
    this.isFlying = false;
    this.deadEnemies = [];
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
    rowsArr.forEach(function(row, i){
      this.addEnemyRow(row, i);     
    }.bind(this));
    // this.moveEnemiesIntoPosition();
  }
  
//   moveEnemiesIntoPosition() {
//     this.enemies.forEach((enemy) => {
//       if(enemy) {
//         enemy.x = mother.x;
//         enemy.y = mother.y;
//         var x1 = swarm.getEnemyXByIndex(enemy.index);
//         var y1 = swarm.getEnemyYByIndex(enemy.index);

//         TweenMax.to(enemy, 0.5, {x: x1, y: y1});
//         enemy.inPosition = true;
//       }
//     });
//   }
  
  addEnemyRow(rowArr){
    rowArr.forEach(function(type) {
      const enemy = this.addEnemyType(type);  
      if(enemy)
        this.moveEnemyIntoPosition(enemy, enemy.index);
    }.bind(this)); 
  }
  
  destroyEnemy(i) {
    this.enemies[i].explode();
  }
  
  acrobatics() {
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
    console.log();
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
    this.isFlying = false;
    this.deadEnemies.forEach(enemy => {
      if(enemy)
        enemy.dispose();
    });
    this.deadEnemies = [];
    this.enemies.forEach(enemy => {
      if(enemy) {
        enemy.dispose();
      }
    });
    this.enemies = [];
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
        Effects.explode(energy.x, energy.y, Props.EXPLOSION_HUGE);
        energy.destroy(); 
        const nearby = this.getWithinRange(enemy.position, 60);
        nearby.forEach(nearEnemy => { 
          if(nearEnemy)
            nearEnemy.explode(); 
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