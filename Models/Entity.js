class Entity{
  constructor(){
      this.acceleration = createVector();
      this.velocity = createVector();
      this.position = createVector(random(width), random(height));
      this.r = 6;
      this.maxSpeed = 5;
      this.maxForce = 0.5;
      this.health = 1;
      this.intimidation = random(255)

      this.dna = [];
      this.dna[0] = random(-5, 5);
      this.dna[1] = random(-5, 5);
  }

  behaviors(good, bad){
    let steerG = this.eat(good, 0.4);
    let steerB = this.eat(bad, -0.5);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  eat(list, nutrition){
    let record = Infinity;
    let closest = -1;
    for(let i = 0; i < list.length; i++){
      let d = this.position.dist(list[i])
      if(d < record){
        record = d;
        closest = i;
      }
    }
    if(record < 5){
      list.splice(closest, 1);
      this.health += nutrition;
    } else if (closest > - 1){
      return this.seek(list[closest]);
  }

  return createVector(0, 0);
}

  dead() {
      return (this.health < 0 ||
          this.position.x > width + this.r ||
          this.position.x < -this.r ||
          this.position.y > height + this.r ||
          this.position.y < -this.r
      );
  }

  update() {
    this.health -= 0.01;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  seek(target){
    let desired = p5.Vector.sub(target, this.position)
    desired.setMag(this.maxSpeed);
    
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  display() {
      let angle = this.velocity.heading() + PI / 2;
    
      //Draw Health Bar
      push()

      let w = 40;
      let h = 4;
      let x = this.position.x - 20; //Offset Bar
      let y = this.position.y + 20; //Offset Bar

      stroke(20, 20, 20);
      strokeWeight(1)

      //Lost Health
      fill(255, 0, 0);
      rect(x, y, w, h);

      // Current Health
      fill(0, 255, 0);
      rect(x, y, w*this.health, h);




      pop()

      //Draw Entity
      push();

      translate(this.position.x, this.position.y);
      rotate(angle);
      
      //Draw Desire Line
      stroke(0, 255, 0);
      line(0, 0, 0, -this.dna[0] * 20)
      stroke(255, 0, 0);
      line(0, 0, 0, -this.dna[1] * 20)
      
      // Draw Creature
      fill(this.intimidation)
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