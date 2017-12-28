try {
  var myFont = new FontFace('PressStart', 'url(https://cdn.glitch.com/f55a21aa-208f-4d8d-9979-9758d85ca2b9%2FPressStart2P.ttf?1509802747753)');
  // var myFont = new FontFace('PressStart', 'url(./assets/PressStart2P.ttf)');
  myFont.load().then(function(font) {
    document.fonts.add(font);
  });
}
catch(e) {
  console.log(e);
}

var app = new PIXI.Application();

app.renderer = PIXI.autoDetectRenderer(Props.STAGE_HRES, Props.STAGE_VRES, { transparent: true });

app.paused = true;
app.gameover = false;
app.score = 0;

document.addEventListener('visibilitychange', function() {
  if(document.visibilityState === 'hidden') {
    app.pause();
  }
  else if( document.visibilityState === 'visible') {
    app.ticker.update();
  }
});

var graphicsCanvas = document.querySelector('.graphicsCanvas');
graphicsCanvas.appendChild(app.view);


app.stars = new Stars();
app.stage.addChild(app.stars);

app.game = new PIXI.Container();
app.stage.addChild(app.game);

var style = new PIXI.TextStyle({
  fontFamily: 'PressStart',
  fontSize: 14,
  fill: ['#888888']
});

app.scoreText = new PIXI.Text(app.score, style);
app.scoreText.x = 790;
app.scoreText.y = 10;
app.scoreText.anchor.set(1, 0);
app.stage.addChild(app.scoreText);

app.messageText = new PIXI.Text('', style);
app.messageText.x = 400;
app.messageText.y = 10;
app.messageText.anchor.set(0.5, 0);
app.stage.addChild(app.messageText);

app.middleMessageText = new PIXI.Text('', style);
app.middleMessageText.x = 400;
app.middleMessageText.y = 300;
app.middleMessageText.anchor.set(0.5, 0.5);
app.stage.addChild(app.middleMessageText);

var scanLinesSprite = new PIXI.Sprite(GameGraphics.getScanLines());
app.stage.addChild(scanLinesSprite);

app.showMessage = function(msg) {
  app.messageText.setText(msg);
  setTimeout(function() {
    app.messageText.setText('');
  }, 2000);
}

app.showMiddleMessage = function(msg) {
  app.middleMessageText.setText(msg);
  setTimeout(function() {
    app.middleMessageText.setText('');
  }, 2000);
}

function resize() {
  if (window.innerWidth / window.innerHeight >= Props.STAGE_RATIO) {
    var w = window.innerHeight * Props.STAGE_RATIO;
    var h = window.innerHeight;
  } 
  else {
    var w = window.innerWidth;
    var h = window.innerWidth / Props.STAGE_RATIO;
  }
  app.renderer.view.style.width = w + 'px';
  app.renderer.view.style.height = h - Props.STAGE_VERT_OFFSET + 'px';
}
window.onresize = resize;
resize();

var ship = new Ship();    
var mother = new Mother(); 
var swarm = new Swarm();
var assist = new Assist();
var lives = new Lives(); 

app.bullets = [];
app.pills = [];

app.controls = new PIXI.Container();
app.stage.addChild(app.controls);

app.info = new PIXI.Container();
app.stage.addChild(app.info);

app.infoScreen = new InfoScreen();
app.info.addChild(app.infoScreen);

setInterval(function() { 
  if(app.paused)
    return;
  if(mother) {
    mother.swapTexture();
    GameAudio.moveSound();
  }
  swarm.move();
}, Props.SWARM_MOVE_INTERVAL);

setInterval(function() { 
  if(!app.paused) {
    var enemy = swarm.getRandomEnemy();
    if(enemy)
      enemy.shoot();
  }
}, Math.floor(Props.SWARM_SHOOT_INTERVAL + Math.random() * Props.SWARM_SHOOT_INTERVAL));

setInterval(function() { 
  if(!app.paused) {
    if(Math.random() > 0.5) {
      var enemy = swarm.getRandomEnemy();
      if(enemy)
        enemy.attack();
    }
    else {
      swarm.acrobatics(3 + Math.floor(Math.random() * (swarm.enemyCount - 3)));
    }
  }
}, Math.floor(5000 + Math.random() * 5000));

setInterval(function() { 
  if(!app.paused) {
    if(mother && mother.x !== app.renderer.width / 2)
      mother.shoot();
  }
}, Math.floor(Props.MOTHER_SHOOT_INTERVAL + Math.random() * Props.MOTHER_SHOOT_INTERVAL));

app.nextLevel = function() {
  currentLevel++;
  swarm.reset();
  swarm = new Swarm();
    
  if(currentLevel < levels.length) {
    app.showMiddleMessage('GET READY!!!');
    setTimeout(function() {
      swarm.addEnemyRows(levels[currentLevel].swarm.rows);  
    }, 2000);
  }
  else {
    mother.attack();
  }
}
var currentLevel = -1;

app.reset = function() {
  app.gameover = false;
  TweenMax.killAll();
  if(mother) {
    mother.reset();
  }
  if(swarm)
    swarm.reset();
  if(ship)
    ship.reset();
  assist.reset();
  lives.reset();
  
  app.bullets.forEach(bullet => {
    if(bullet) {
      bullet.ticker.stop();
      app.game.removeChild(bullet);
    }
  });
  app.bullets = [];
  
  app.pills.forEach(pill => {
    if(pill) {
      pill.ticker.stop();
      app.game.removeChild(pill);
    }
  });
  app.pills = [];
  
  app.game.children.forEach(function(child) {
    child.destroy();
  });  
  
  app.updateScore(0);
  app.infoScreen.gameMessage.text = '';
  
  mother = new Mother();
  ship = new Ship();
  assist = new Assist();
  swarm = new Swarm();
  lives = new Lives();
  currentLevel = -1;
}

app.gameover = true;

app.unPause = function() {    
  if(app.gameover) {
    GameAudio.introSound();
    app.reset();
    app.nextLevel();
    mother.enter();
    setTimeout(() => { mother.ticker.start(); }, 3000);
  }
  app.infoScreen.visible = false;
  app.paused = false;
  app.ticker.start();
  TweenMax.resumeAll();
}

app.pause = function() {
  app.infoScreen.visible = true;
  setTimeout(function() {
    app.ticker.stop();
    app.paused = true;
    TweenMax.pauseAll();
  }, 100);
}

app.updateScore = function(score) {
  app.score = score;
  app.scoreText.text = app.score;
  app.infoScreen.setScore(app.score);
}

app.addScore = function(score) {
  app.score += score;
  app.scoreText.text = app.score;
  app.infoScreen.setScore(app.score);
}

app.minusScore = function(score) {
  if(app.score > score)
     app.score -= score;
  else
    app.score = 0;
  app.scoreText.text = app.score;
  app.infoScreen.setScore(app.score);
}

app.endGame = function(msg) {
  app.gameover = true;
  app.infoScreen.gameMessage.text = msg;
  app.pause();
}