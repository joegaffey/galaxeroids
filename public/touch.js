document.body.addEventListener('touchstart', showControls);

function showControls() {
  document.body.removeEventListener('touchstart', showControls);
  var touchControls = new TouchControls();
  app.controls.addChild(touchControls);

  
  // Handling for itch.io iframe - not working
  if(GameAudio.context.state === 'suspended') {
    GameAudio.context.start();
    
  // Other workaround attempts 
  // if(GameAudio.context.state === 'suspended') {
  //   try {
  //     initAudio();
  //   }
  //   catch(e) { console.log(e); }      
  // }
  // if(GameAudio.context.state === 'suspended') {
  //   GameAudio.context.resume().then(function() {
  //     GameAudio.pillCollectSound();
  //   },
  //   function(reason) {
  //     console.log(reason); 
  //   });       
  // 
  }
}