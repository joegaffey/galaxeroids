document.body.addEventListener('touchstart', showControls);

function showControls() {
  document.querySelector('.controls').style.display = 'block';
  document.body.removeEventListener('touchstart', showControls);
}

var fireButton = document.querySelector('.fireControl');
fireButton.addEventListener('touchstart', Controls.handleFire);

var chargeButton = document.querySelector('.chargeControl');
chargeButton.addEventListener('touchstart', Controls.handleCharge);

var leftButton = document.querySelector('.leftControl');
leftButton.addEventListener('touchstart', Controls.handleLeft);
leftButton.addEventListener('touchend', Controls.handleLeftEnd);

var rightButton = document.querySelector('.rightControl');
rightButton.addEventListener('touchstart', Controls.handleRight);
rightButton.addEventListener('touchend', Controls.handleRightEnd);