class Controls {
  static handleFire() {
    if(app.paused)
      return;
    ship.shoot();
  }

  static handleCharge() {
    if(app.paused)
      return;
    ship.charge();
  }

  static handlePause() {
    if(app.paused)
      app.unPause();
    else
      app.pause();
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