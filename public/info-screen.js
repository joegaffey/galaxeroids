class InfoScreen extends PIXI.Sprite {
  constructor() {    
    super(GameGraphics.getBlackBGGraphics());      
    this.x = this.y = 0;
    this.width = 800;
    this.height = 600;

    let style = new PIXI.TextStyle({
      fontFamily: 'PressStart',
      fontSize: 22,
      fill: ['#FF4444']
    });

    this.title = new PIXI.Text(`GALAXEROIDS`, style);
    this.title.x = 400;
    this.title.y = 150;
    this.title.anchor.set(0.5, 0);
    this.addChild(this.title);

    style = new PIXI.TextStyle({
      fontFamily: 'PressStart',
      fontSize: 14,
      fill: ['#FFFFFF']
    });

    this.score = new PIXI.Text(`SCORE ${app.score}`, style);
    this.score.x = 400;
    this.score.y = 190;
    this.score.anchor.set(0.5, 0);
    this.addChild(this.score);

    style = new PIXI.TextStyle({
      fontFamily: 'PressStart',
      fontSize: 14,
      lineHeight: 20,
      fill: ['#888888']
    });

    this.message = new PIXI.Text(`
             Keyboard  Joystick  Touch

Move         ← →       D-pad     
Fire         Z         A/X        
Orb          X         B/Y       
Start/Pause  Enter     Start     
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

    this.button.interactive = true;
    this.button.touchstart = this.button.click = function (e) {
      console.log('test');
      app.unPause();
    };
    this.addChild(this.button);
    
    this.controls = this.getControls();
    this.controls.x = 580;
    this.controls.y = 250;
    this.addChild(this.controls);
  }
  
  setScore() {
    this.score.setText(`SCORE ${app.score}`);
  }
  
  getControls() {
    const controls = new PIXI.Container();
    
    const leftControl = new PIXI.Sprite(GameGraphics.leftControlGraphics);
    leftControl.x = 23;
    leftControl.y = 8;
    leftControl.anchor.set(0, 0);
    controls.addChild(leftControl);
    
    const rightControl = new PIXI.Sprite(GameGraphics.rightControlGraphics);
    rightControl.x = 43;
    rightControl.y = 8;
    rightControl.anchor.set(0, 0);
    controls.addChild(rightControl);
    
    const shootControl = new PIXI.Sprite(GameGraphics.getEnergyGraphics());
    shootControl.x = 40;
    shootControl.y = 28;
    shootControl.scale.x = shootControl.scale.y = 1.9;
    shootControl.tint = 0xFF0000; 
    shootControl.anchor.set(0.5, 0);
    controls.addChild(shootControl);

    const orbControl = new PIXI.Sprite(GameGraphics.getEnergyGraphics());
    orbControl.x = 40;
    orbControl.y = 48;
    orbControl.scale.x = orbControl.scale.y = 1.9;
    orbControl.tint = 0x00FF00; 
    orbControl.anchor.set(0.5, 0);
    controls.addChild(orbControl);
    
    const pauseControl = new PIXI.Sprite(GameGraphics.getPauseGraphics());
    pauseControl.x = 40;
    pauseControl.y = 70;
    pauseControl.scale.x = pauseControl.scale.y = 0.25;
    pauseControl.anchor.set(0.5, 0);
    controls.addChild(pauseControl);
    return controls;
  }
}