var GameAudio = {};

window.onload = initAudio;

function initAudio() {
  GameAudio.context = new AudioContext();
  
  // Glitch CDN URLs. For other hosting replace with links to assets folder
  var bufferLoader = new BufferLoader(GameAudio.context,
    [
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2Fshoot.wav?1499375807873',
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2Ffastinvader1.wav?1499375911936',
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2FextraShip.wav?1501607283115',
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2Fufo_highpitch.wav?1499375910630',
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2Fexplosion.wav?1499375911491',
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2Fsound-frogger-hop.wav?1501606884861',
      'https://cdn.glitch.com/1e654918-0ade-40b8-9a8e-674df6feb199%2Fpacman_eatghost.wav?1504903948517'
    
      // './assets/shoot.wav',
      // './assets/fastinvader1.wav',
      // './assets/extraShip.wav',
      // './assets/ufo_highpitch.wav',
      // './assets/explosion.wav',
      // './assets/sound-frogger-hop.wav'      
      // './assets/pacman_eatghost.wav'
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
  GameAudio.playSound(5, 2); 
}

GameAudio.motherHitSound = function() {
  GameAudio.playSound(3, 0.6); 
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

GameAudio.playSound = function(i, gain) {
  var source = GameAudio.context.createBufferSource();
  source.buffer = GameAudio.bufferList[i];
  var gainNode = GameAudio.context.createGain()
  gainNode.gain.value = gain;
  gainNode.connect(GameAudio.context.destination)
  source.connect(gainNode)
  source.start(0);
}