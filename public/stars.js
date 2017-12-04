class Stars extends PIXI.Container {
  constructor() {
    super();
    this.stars = [];
    this.starTexture = GameGraphics.getEnergyGraphics();
    
    for(let i = 0; i < 250; i++) {
      this.addStar();
    }    
    
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(() => {
      this.stars.forEach((star, i) => {
        if(star) {          
          star.y++;
          if(star.y > app.renderer.height) {
            this.placeStar(star);
          }
        }
      });
    });
    this.ticker.start();
  }
  
  addStar() {
    let star = new PIXI.Sprite(this.starTexture);
    star.alpha = 0.5;
    this.placeStar(star);
    this.addChild(star);
    this.stars.push(star);
  }
  
  placeStar(star) {
    star.scale.x = star.scale.y = 0.4 * Math.random();
    star.x = Math.floor(Math.random() * app.renderer.width);
    star.y = Math.floor(Math.random() * app.renderer.height);    
  }
}