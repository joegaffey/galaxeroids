var app = new PIXI.Application();

// Use canvas renderer to avoid cross origin issues with webgl
// Change to auto renderer to enable webgl in suported hosting environments 
// app.renderer = PIXI.autoDetectRenderer(Props.STAGE_HRES, Props.STAGE_VRES, { transparent: true });
app.renderer = new PIXI.CanvasRenderer(Props.STAGE_HRES, Props.STAGE_VRES, { transparent: true });

app.paused = true;
app.score = 0;

document.addEventListener('visibilitychange', function() {
  if( document.visibilityState == 'hidden') {
    app.pause();
  }
});

app.pause = function() {
  app.ticker.stop();
  app.paused = true;
  app.showDialog();
}

var graphicsCanvas = document.querySelector('.graphicsCanvas');
graphicsCanvas.appendChild(app.view);

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


var scanLinesSprite = new PIXI.Sprite(GameGraphics.getScanLines());
app.stage.addChild(scanLinesSprite);

function resize() {
    if (window.innerWidth / window.innerHeight >= Props.STAGE_RATIO) {
        var w = window.innerHeight * Props.STAGE_RATIO;
        var h = window.innerHeight;
    } else {
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

setInterval(function() { 
  if(!app.paused)
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
    var enemy = swarm.getRandomEnemy();
    if(enemy)
       enemy.attack();
  }
}, Math.floor(5000 + Math.random() * 5000));

setInterval(function() { 
  if(!app.paused) {
    if(mother)
      mother.shoot();
  }
}, Math.floor(Props.MOTHER_SHOOT_INTERVAL + Math.random() * Props.MOTHER_SHOOT_INTERVAL));

app.nextLevel = function() {
  currentLevel++;
  if(currentLevel < levels.length) {
    swarm.reset();
    setTimeout(function() {
      swarm.addEnemyRows(levels[currentLevel].swarm.rows);  
    }, 1000);
  }
}

var currentLevel = -1;
app.nextLevel();

app.reset = function() {
  if(mother) {
    mother.reset();
  }
  swarm.reset();
  ship.reset();
  assist.reset();
  lives.reset();
  
  app.bullets.forEach(function(bullet) {
    if(bullet) {
      bullet.ticker.stop();
      app.game.removeChild(bullet);
      //bullet.destroy(); 
    }
  });
  app.bullets = [];
  
  app.game.children.forEach(function(child) {
    child.destroy();
  });  
  
  app.updateScore(0);
  
  mother = new Mother();
  ship = new Ship();
  assist = new Assist();
  swarm = new Swarm();
  currentLevel = -1;
  app.nextLevel();
}

app.showDialog = function(message) {
  if(message) {
    document.querySelector('#scoreMessage').innerText = 'You scored ' + app.score + ' points';
    document.querySelector('#optMessage').innerText = message;
  }
  document.querySelector('.modal').style.display = 'block';
}

app.hideDialog = function() {
  document.querySelector('.modal').style.display = 'none';
}

app.unPause = function() {  
  if(app.stopped) {
    app.stopped = false;
    app.reset();
  }
  app.paused = false;
  app.ticker.start();
  app.hideDialog();
  document.querySelector('#optMessage').innerText = '';
  document.querySelector('#scoreMessage').innerText = '';
}

app.updateScore = function(score) {
  app.score = score;
  app.scoreText.text = app.score;
}

app.addScore = function(score) {
  app.score += score;
  app.scoreText.text = app.score;
}

app.minusScore = function(score) {
  if(app.score > score)
     app.score -= score;
  else
    app.score = 0;
  app.scoreText.text = app.score;
}

app.stop = function(message) {
  app.ticker.stop();
  app.paused = true;
  app.stopped = true;
  app.showDialog(message);
}