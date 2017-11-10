class Lives {
  
  constructor() {
    this.lives = Props.PLAYER_LIVES;
    this.livesContainer = new PIXI.Container();
    app.game.addChild(this.livesContainer);    
    this.render();
  }
  
  render() {
    this.livesContainer.removeChildren();
    for(var i = 0; i < this.lives; i++) {
      let life = new PIXI.Sprite(GameGraphics.getShipGraphics());
      life.x = 10 + i * 15;
      life.y = 10;
      life.scale.x = life.scale.y = 0.6;
      life.tint = 0x44AAFF;
      this.livesContainer.addChild(life);
    }
  }
  
  dec() {
    if(this.lives <= 0) {
      app.endGame(Props.DEATH_MESSAGE);
      return;
    }
    this.lives--;  
    this.render();
  }

  inc() {
    if(this.lives >= Props.PLAYER_MAX_LIVES)
      return;
    this.lives++;  
    this.render();
  }
  
  reset() {
    this.lives = Props.PLAYER_LIVES;
    this.render();
  }
}