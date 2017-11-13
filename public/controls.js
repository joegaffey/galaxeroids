class Controls {
  static handleFire(ev) {
    if(app.paused)
      return;
    ship.shoot();
  }

  static handleCharge(ev) {
    if(app.paused)
      return;
    ship.charge();
  }

  static handlePause(ev) {
    if(app.paused)
      app.appStart();
    else
      app.pause();
  }
  
  static handleReset(ev) {
    if(app.paused) {
      app.reset();
      app.appStop();
    }
  }

  static handleLeft(ev) {
    ship.speed = -Props.SHIP_SPEED -ship.speedBoost;
  }

  static handleLeftEnd() {
    ship.speed = 0;
  }

  static handleRight() {
    ship.speed = Props.SHIP_SPEED + ship.speedBoost;
  }

  static handleRightEnd() {
    ship.speed = 0;
  }

  static handleStop() {
    ship.speed = 0;
  }
}