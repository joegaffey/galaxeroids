class Lives {
  
  constructor() {
    this.lives = Props.PLAYER_LIVES;
    this.livesContainer = new PIXI.Container();
    app.game.addChild(this.livesContainer);    
    this.render();
  }
  
  render() {
    let miniShip = new PIXI.Sprite(GameGraphics.getShipGraphics());
    miniShip.x = 15;
    miniShip.y = 10;
    miniShip.scale.x = miniShip.scale.y = 0.6;
    miniShip.tint = 0x44AAFF;
    miniShip.anchor.set(0.5, 0);
    this.livesContainer.addChild(miniShip);
    
    this.livesText = new PIXI.Text('x' + this.lives, style);
    this.livesText.x = 55;
    this.livesText.y = 10;
    this.livesText.anchor.set(1, 0);
    this.livesContainer.addChild(this.livesText);
    
    
    // this.livesContainer.removeChildren();
    // for(var i = 0; i < this.lives; i++) {
    //   let life = new PIXI.Sprite(GameGraphics.getShipGraphics());
    //   life.x = 10 + i * 15;
    //   life.y = 10;
    //   life.scale.x = life.scale.y = 0.6;
    //   life.tint = 0x44AAFF;
    //   this.livesContainer.addChild(life);
    // }
  }
  
  dec() {
    if(this.lives <= 0) {
      app.endGame(Props.DEATH_MESSAGE);
      return;
    }
    this.lives--;  
    this.livesText.setText('x' + this.lives);
  }

  inc() {
    if(this.lives >= Props.PLAYER_MAX_LIVES)
      return;
    this.lives++;  
    this.livesText.setText('x' + this.lives);
  }
  
  reset() {
    this.livesContainer.removeChildren();
    this.lives = Props.PLAYER_LIVES;
    this.render();
  }
}