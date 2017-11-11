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
    miniShip.scale.x = miniShip.scale.y = 0.7;
    miniShip.anchor.set(0.5, 0);
    this.livesContainer.addChild(miniShip);
    
    this.livesText = new PIXI.Text('x' + this.lives, style);
    this.livesText.x = 25;
    this.livesText.y = 10;
    this.livesText.anchor.set(0, 0);
    this.livesContainer.addChild(this.livesText);
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