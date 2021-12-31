var GameAudio = {};
GameAudio.level = 0.2;

window.onload = initAudio;

function initAudio() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  GameAudio.context = new AudioContext();
  
  var bufferLoader = new BufferLoader(GameAudio.context,
    [
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2Fshoot.wav?1499375807873',
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2Ffastinvader1.wav?1499375911936',
      'https://cdn.glitch.com/f55a21aa-208f-4d8d-9979-9758d85ca2b9%2FhitAlien.mp3?1512083761887',
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2Fufo_highpitch.wav?1499375910630',
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2Fexplosion.wav?1499375911491',
      'https://cdn.glitch.com/f55a21aa-208f-4d8d-9979-9758d85ca2b9%2Fsound-frogger-hop.mp3?1511994094518',
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2Fpacman_eatghost.wav?1504903948517',
      'https://cdn.glitch.com/f55a21aa-208f-4d8d-9979-9758d85ca2b9%2FsaucerSmall.wav?1511979283826',
      'https://cdn.glitch.com/f55a21aa-208f-4d8d-9979-9758d85ca2b9%2FsaucerBig.wav?1511979284354',
      'https://cdn.glitch.com/f55a21aa-208f-4d8d-9979-9758d85ca2b9%2Fpacman_eatfruit.wav?1511979283539',
      'https://cdn.glitch.com/f55a21aa-208f-4d8d-9979-9758d85ca2b9%2Fthrust.wav?1511992065618',
      'https://cdn.glitch.com/f55a21aa-208f-4d8d-9979-9758d85ca2b9%2Fintro8000.mp3?1512083249049'
    
      // './assets/shoot.wav',
      // './assets/fastinvader1.wav',
      // './assets/hitAlien.mp3',
      // './assets/ufo_highpitch.wav',
      // './assets/explosion.wav',
      // './assets/sound-frogger-hop.wav',      
      // './assets/pacman_eatghost.wav',
      // './assets/saucerSmall.wav',
      // './assets/saucerBig.wav',
      // './assets/pacman_eatfruit.wav',
      // './assets/thrust.wav',
      // './assets/intro8000.mp3'    
    ],
    GameAudio.finishedLoading);
  bufferLoader.load();
}

GameAudio.finishedLoading = function(bufferList) {
  GameAudio.bufferList = bufferList;
}

GameAudio.shootSound = function() {
  GameAudio.playSound(0, 0.3); 
}

GameAudio.moveSound = function() {
  GameAudio.playSound(1, 1); 
}

GameAudio.alienHitSound = function() {
  GameAudio.playSound(2, 4);
}

GameAudio.pillCollectSound = function() {
  GameAudio.playSound(5, 5); 
}

GameAudio.motherHitSound = function() {
  if(Math.random() > 0.5)
    GameAudio.playSound(7, 1);
  else
    GameAudio.playSound(8, 1);
}

GameAudio.motherAttackSound = function() {
  GameAudio.playSound(9, 1); 
}

GameAudio.cellHitSound = function() {
  GameAudio.playSound(2, 0.5);
}

GameAudio.explosionSound = function() {
  GameAudio.playSound(4, 1);
}

GameAudio.assistSound = function() {
  GameAudio.playSound(6, 1);
}

GameAudio.thrustSound = function() {
  GameAudio.playSound(10, 1);
}

GameAudio.introSound = function() {
  GameAudio.playSound(11, 1);
}

GameAudio.playSound = function(i, gain) {
  try {
    var source = GameAudio.context.createBufferSource();
    source.buffer = GameAudio.bufferList[i];
    var gainNode = GameAudio.context.createGain();
    gainNode.gain.value = gain * GameAudio.level;
    gainNode.connect(GameAudio.context.destination)
    source.connect(gainNode);
    source.start(0);
  }
  catch(e) { 
    console.log(e); 
  }
}