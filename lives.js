 class Lives extends PIXI.Container {
  
  constructor() {
    super();
    this.lives = Props.PLAYER_LIVES;

    let miniShip = new PIXI.Sprite(GameGraphics.getShipGraphics());
    miniShip.x = 15;
    miniShip.y = 10;
    miniShip.scale.x = miniShip.scale.y = 0.7;
    miniShip.anchor.set(0.5, 0);
    this.addChild(miniShip);
    
    this.livesText = new PIXI.Text('x' + this.lives, style);
    this.livesText.x = 25;
    this.livesText.y = 10;
    this.livesText.anchor.set(0, 0);
    this.addChild(this.livesText);
    
    app.game.addChild(this);    
  }
  
  dec() {
    if(this.lives <= 0) {
      ship.explode();
      return;
    }
    ship.setInvincible(true);
    this.lives--;  
    this.livesText.text = 'x' + this.lives;
  }

  inc() {
    if(this.lives >= Props.PLAYER_MAX_LIVES)
      return;
    this.lives++;  
    this.livesText.text = 'x' + this.lives;
  }
  
  reset() {
    this.removeChildren();
    this.lives = Props.PLAYER_LIVES;
  }
}