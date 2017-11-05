class Lives {
  
  constructor() {
    this.lives = Props.PLAYER_LIVES;
    this.livesEl = document.querySelector('.lives');
    this.renderLives();
  }
  
  renderLives() {
    this.livesEl.innerHTML = '';
    for(var i = 0; i < this.lives; i++) {
      var img = document.createElement('IMG');
      img.src = 'ship.svg';
      img.style.maxHeight = '15px';
      img.style.maxWidth = '15px';
      this.livesEl.appendChild(img);
    }
  }
  
  dec() {
    if(this.lives <= 0) {
      app.stop(Props.DEATH_MESSAGE);
      return;
    }
    this.lives--;  
    this.renderLives();
  }

  inc() {
    if(this.lives >= Props.PLAYER_MAX_LIVES)
      return;
    this.lives++;  
    this.renderLives();
  }
  
  reset() {
    this.lives = Props.PLAYER_LIVES;
    this.renderLives();
  }
}