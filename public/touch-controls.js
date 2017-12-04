class TouchControls extends PIXI.Container {
  
  constructor() {
    super();
    this.alpha = 0.3;
    
    this.fireButton = new PIXI.Sprite(GameGraphics.getButtonGraphics(0xFF0000));
    this.fireButton.interactive = true;
    this.fireButton.buttonMode = true;
    this.fireButton.anchor.set(0.5);
    this.fireButton.x = 730;
    this.fireButton.y = 450;
    this.fireButton.scale.x = this.fireButton.scale.y = 1.5;
    this.fireButton.on('pointerdown', this.onFire, false);
    
    this.orbButton = new PIXI.Sprite(GameGraphics.getButtonGraphics(0x00FF00));
    this.orbButton.interactive = true;
    this.orbButton.buttonMode = true;
    this.orbButton.anchor.set(0.5);
    this.orbButton.x = 600;
    this.orbButton.y = 500;
    this.orbButton.scale.x = this.orbButton.scale.y = 1.25;
    this.orbButton.on('pointerdown', this.onOrb, false);
    
    this.pauseButton = new PIXI.Sprite(GameGraphics.getPauseGraphics());
    this.pauseButton.interactive = true;
    this.pauseButton.buttonMode = true;
    this.pauseButton.anchor.set(0.5);
    this.pauseButton.x = 40;
    this.pauseButton.y = 60;
    this.pauseButton.scale.x = this.pauseButton.scale.y = 0.75;
    this.pauseButton.on('pointerdown', this.onPause, false);
    
    this.JOY_X = 150;
    this.JOY_Y = 450;
    
    this.joystickBase = new PIXI.Sprite(GameGraphics.getJoyBaseGraphics());
    this.joystickBase.anchor.set(0.5);
    this.joystickBase.x = this.JOY_X;
    this.joystickBase.y = this.JOY_Y;
    this.joystickBase.scale.x = this.joystickBase.scale.y = 1.5;
    
    this.joystick = new PIXI.Sprite(GameGraphics.getButtonGraphics(0x0000FF));
    this.joystick.interactive = true;
    this.joystick.anchor.set(0.5);
    this.joystick.x = this.joystick.prevX = this.JOY_X;
    this.joystick.y = this.JOY_Y;
    this.joystick.scale.x = this.joystick.scale.y = 1.5;
    this.joystick.on('pointerdown', this.onJoyMoveStart.bind(this), false)
    this.joystick.on('pointermove', this.onJoyMove.bind(this), false);  
    this.joystick.on('pointerup', this.onJoyRelease.bind(this), false)
    this.joystick.on('pointerupoutside', this.onJoyRelease.bind(this), false);
    
    this.joystickArea = new PIXI.Sprite();
    this.joystickArea.interactive = true;
    this.joystickArea.anchor.set(0);
    this.joystickArea.x = this.joystickArea.y = 0;
    this.joystickArea.width = app.renderer.width / 2;
    this.joystickArea.height = app.renderer.height;
    this.joystickArea.on('pointerdown', this.onJoyMoveStart.bind(this), false)
    this.joystickArea.on('pointermove', this.onJoyMove.bind(this), false);  
    this.joystickArea.on('pointerup', this.onJoyRelease.bind(this), false)
    this.joystickArea.on('pointerupoutside', this.onJoyRelease.bind(this), false);
    
    this.addChild(this.fireButton);
    this.addChild(this.orbButton);
    this.addChild(this.joystickArea);    
    this.addChild(this.joystickBase);    
    this.addChild(this.joystick);    
    this.addChild(this.pauseButton);    
  }

  onJoyMove(event) {
    if(this.isJoyMoving) {
      this.moveJoy(event);
    }
  }
  
  moveJoy(event) {
    if(event.data.global.x > app.renderer.width /2)
      return;
    this.joystick.x = event.data.global.x;
    if(this.joystick.x > this.joystick.prevX) {
      Controls.handleRight();   
    }
    else if(this.joystick.x < this.joystick.prevX) {
      Controls.handleLeft();   
    }
    this.joystick.prevX = this.joystick.x;
  }
  
  onJoyMoveStart(event) {
    this.isJoyMoving = true;
    this.moveJoy(event);
  }
  
  onJoyRelease() {
    this.isJoyMoving = false;
    
    this.joystick.x = this.joystick.prevX = this.JOY_X;
    this.joystick.y = this.JOY_Y;
    
    Controls.handleStop();
  } 
  
  onFire() {
    Controls.handleFire();
  }
  
  onPause() {
    Controls.handlePause()
  }
  
  onOrb() {
    Controls.handleCharge()
  }

}
