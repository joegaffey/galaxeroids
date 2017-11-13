document.body.addEventListener('touchstart', showControls);

function showControls() {
  document.querySelector('.controls').style.display = 'block';
  document.body.removeEventListener('touchstart', showControls);
  document.body.addEventListener('touchstart', Controls.handlePause);
}

var fireButton = document.querySelector('.fireControl');
fireButton.addEventListener('touchstart', function(ev) { 
  ev.stopPropagation();
  Controls.handleFire();
});

var chargeButton = document.querySelector('.chargeControl');
chargeButton.addEventListener('touchstart', function(ev) { 
  ev.stopPropagation();
  Controls.handleCharge();
});

var leftButton = document.querySelector('.leftControl');
leftButton.addEventListener('touchstart', function(ev) { 
  ev.stopPropagation();
  Controls.handleLeft();
});

leftButton.addEventListener('touchend', function(ev) { 
  ev.stopPropagation();
  Controls.handleLeftEnd();
});

var rightButton = document.querySelector('.rightControl');
rightButton.addEventListener('touchstart', function(ev) { 
  ev.stopPropagation();
  Controls.handleRight();
});

rightButton.addEventListener('touchend', function(ev) { 
  ev.stopPropagation();
  Controls.handleRightEnd();
});