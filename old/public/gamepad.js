var gpIndex = -1;

var JOY_AXIS = 0;
var browser = navigator.userAgent.toLowerCase();
if(browser.indexOf('firefox') > -1) {
  JOY_AXIS = 1;    
}

setInterval (function() {
  detectGamepad();  
}, 1000);

function detectGamepad() {
  if(gpIndex > -1)
    return;
  var pads = navigator.getGamepads();
  for(var i in pads) {
    if(pads[i] && pads[i].connected && pads[i].timestamp > 0) {
      gpIndex = i;
      window.requestAnimationFrame(checkGamepad);
      break;
    }
  }
}
detectGamepad();

var resetPause = true;
var resetReset = true;
var resetCharge = true;

function checkGamepad(timestamp) {
  var gp = navigator.getGamepads()[gpIndex];  
  
  var analogueLR = gp.axes[JOY_AXIS];
  try {
    if(analogueLR < -0.5) 
      Controls.handleLeft();  
    else if(analogueLR > 0.5) 
      Controls.handleRight();
    else
      Controls.handleStop();
    
    if(gp.buttons[0].value === 1 || gp.buttons[2].value === 1) {
      Controls.handleFire();
    }
    
    if(gp.buttons[1].value === 1 || gp.buttons[3].value === 1) {
      if(resetCharge) {
        Controls.handleCharge();
        resetCharge = false;
      }
    }    
    else
      resetCharge = true;
    
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