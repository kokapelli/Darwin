class Ship{
  // TODO
  // Make eating a dynamic activity. Should take as long as the food is big
  // Poison resistance makes poison food?
  constructor(x, y){
      this.acceleration = createVector();
      this.velocity = p5.Vector.random2D();
      this.position = createVector(x, y);
      this.r = 6;
      this.maxSpeed = 5;
      this.health;
  }


  // Can be made better by simply negating
  // Unchanged due to flickering bug
  boundaries(){
    let d = this.maxSpeed;
    let desired = null;
    if (this.position.x < d) {                 //West
        this.position.x += width;
    } else if (this.position.x > width - d) {  //East
        this.position.x -= width;
    }
  
    if (this.position.y < d) {                 //North
        this.position.y += height;
    } else if (this.position.y > height - d) { //South
        this.position.y -= height;
    }
  
    if (desired !== null) {
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
}

  dead() {
      return this.health < 0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
      let angle = this.velocity.heading() + PI / 2;

      push();

      translate(this.position.x, this.position.y);
      rotate(angle);
      
      if(debug.checked()) {

      }
      stroke(200)
      strokeWeight(1)
      beginShape();
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);

      endShape(CLOSE);

      pop();
  }
}