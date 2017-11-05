function isIntersecting(s1, s2) {
  try {
    var r1 = s1.getBounds();
    var r2 = s2.getBounds();
    return !(r2.x > (r1.x + r1.width) || 
             (r2.x + r2.width) < r1.x || 
             r2.y > (r1.y + r1.height) ||
             (r2.y + r2.height) < r1.y);   
  }
  catch(e) { // Some issue with Pixi getBounds
    return false;
  }
}