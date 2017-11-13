class InfoScreen extends PIXI.Sprite {
    constructor() {    
      super(GameGraphics.getBlackBGGraphics());      
      this.x = this.y = 0;
      this.width = 800;
      this.height = 600;
      
      let style = new PIXI.TextStyle({
        fontFamily: 'PressStart',
        fontSize: 18,
        fill: ['#FF4444']
      });
      
      this.title = new PIXI.Text(`GALAXEROIDS`, style);
      this.title.x = 400;
      this.title.y = 170;
      this.title.anchor.set(0.5, 0);
      this.addChild(this.title);
      
      style = new PIXI.TextStyle({
        fontFamily: 'PressStart',
        fontSize: 14,
        lineHeight: 20,
        fill: ['#888888']
      });
      
      this.message = new PIXI.Text(`
             Keyboard  Joystick  Touch

Move         ← →       axes0     Arrows
Fire         Z         joy0      Red 
Orb          X         joy1      Green
Start/Pause  Enter     joy9      Tap screen
      `, style);
      
      this.message.x = 400;
      this.message.y = 200;
      this.message.anchor.set(0.5, 0);
      this.addChild(this.message);
      
      this.gameMessage = new PIXI.Text('', style);
      this.gameMessage.x = 400;
      this.gameMessage.y = 100;
      this.gameMessage.anchor.set(0.5, 0);
      this.addChild(this.gameMessage);      
      
      style = new PIXI.TextStyle({
        fontFamily: 'PressStart',
        fontSize: 14,
        lineHeight: 20,
        fill: ['#44FF44']
      });
      
      this.button = new PIXI.Text(`PRESS START`, style);
      this.button.x = 400;
      this.button.y = 380;
      this.button.anchor.set(0.5, 0);
      this.addChild(this.button);
    }
}