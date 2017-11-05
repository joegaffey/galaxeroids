var lastKey = -1;

window.addEventListener('keyup', function (e) {
  if(e.keyCode === 32) {
    Controls.handleFire();
  }
  else if(e.keyCode === 17) {
    Controls.handleCharge();
  }
  else if(e.keyCode === 13) {
    Controls.handlePause();        
  }
  else if (e.keyCode === 37  && lastKey === 37) 
    Controls.handleLeftEnd();  
  else if (e.keyCode === 39 && lastKey === 39) 
    Controls.handleRightEnd();
});

window.addEventListener('keydown', function (e) {
  if (e.keyCode === 37) {
    Controls.handleLeft();
    lastKey = e.keyCode;
  }
  else if (e.keyCode === 39) { 
    Controls.handleRight();
    lastKey = e.keyCode;
  }
});

// function keyAction(key) {
//     document.querySelector("#result").append(key + " ");
// }

// var keyTimerMap = {};
// var keyDelay = 50;
// window.addEventListener('keydown', function(e) {
//    	if (!keyTimerMap[e.keyCode]) {
//         keyTimerMap[e.keyCode] = setInterval(function() {
//             keyAction(e.keyCode);
//         }, keyDelay);
//     }
// });

// window.addEventListener('keyup', function(e) {
//     var timer = keyTimerMap[e.keyCode];
//     if (timer) {
//         clearInterval(timer);
//         delete keyTimerMap[e.keyCode];
//     }
// });