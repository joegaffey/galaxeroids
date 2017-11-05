var gpIndex = -1;
var pads = navigator.getGamepads();
for(var i in pads) {
  if(pads[i] && pads[i].timestamp > 0) {
    gpIndex = i;
    break;
  }
}

var resetPause = true;
var resetReset = true;

var shootDelay = Props.SHIP_SHOOT_DELAY;

function checkGamepad() {
  shootDelay--;
  var gp = navigator.getGamepads()[gpIndex];
  var analogueLR = gp.axes[0];
  try {
    if(analogueLR < -0.5) 
      Controls.handleLeft();  
    else if(analogueLR > 0.5) 
      Controls.handleRight();
    else
      Controls.handleStop();
    
    if(gp.buttons[0].value === 1) {
      if(shootDelay <= 0) {
        Controls.handleFire();
        shootDelay = Props.SHIP_SHOOT_DELAY;
      }
    }
    
    if(gp.buttons[1].value === 1) {
      if(shootDelay <= 0) {
        Controls.handleCharge();
        shootDelay = Props.SHIP_SHOOT_DELAY;
      }
    }    
    
    if(gp.buttons[2].value === 1) {
      if(shootDelay <= 0) {
        Controls.handleFire();
        shootDelay = Props.SHIP_SHOOT_DELAY;
      }
    }
    
    if(gp.buttons[3].value === 1) {
      if(shootDelay <= 0) {
        Controls.handleCharge();
        shootDelay = Props.SHIP_SHOOT_DELAY;
      }
    } 
    
    if(gp.buttons[8].value === 1) {
      if(resetReset) {
        Controls.handleReset();
        resetReset = false;
      }
    }
    else
      resetReset = true;
    
    if(gp.buttons[9].value === 1) {
      if(resetPause) {
        Controls.handlePause();
        resetPause = false;
      }
    }
    else
      resetPause = true;
  }
  catch(e) { console.log(e); }
  window.requestAnimationFrame(checkGamepad);
}
if(gpIndex > -1)
  window.requestAnimationFrame(checkGamepad);
