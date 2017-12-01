class Stars extends PIXI.Container {
  constructor() {
    super();
    this.stars = [];
    
    for(let i = 0; i < 250; i++) {
      this.addStar();
    }    
    
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(() => {
      this.stars.forEach((star, i) => {
        if(star) {          
          star.y++;
          if(star.y > app.renderer.height) {
            star.destroy();
            this.addStar();
            this.stars.splice(i, 1);
          }
        }
      });
    });
    this.ticker.start();
  }
  
  addStar() {
    let star = new PIXI.Sprite(GameGraphics.getEnergyGraphics());
    star.scale.x = star.scale.y = 0.4 * Math.random();
    star.alpha = 0.5;
    star.x = Math.floor(Math.random() * app.renderer.width);
    star.y = Math.floor(Math.random() * app.renderer.height);    
    this.addChild(star);
    this.stars.push(star);
  }
}