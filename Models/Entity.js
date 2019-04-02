let mr = 0.01; // Mutation Rate

class Entity{
  // TODO
  // Make eating a dynamic activity. Should take as long as the food is big
  // Poison resistance makes poison food?
  constructor(x, y, dna){
      this.acceleration = createVector();
      this.velocity = p5.Vector.random2D();
      this.position = createVector(x, y);
      this.r = 6;
      this.maxSpeed = 5;
      this.maxForce = 0.5;
      this.health = 1;
      this.intimidation = random(255)

      this.dna = [];
      //TODO
      //Change dna to a range between 0 and 1
      if(dna == undefined){
        this.dna[0] = random(-2, 2); //Food Weight
        this.dna[1] = random(-2, 2); //Poison Weight
        this.dna[2] = random(10, 100); //Food Perception
        this.dna[3] = random(10, 100); //Poison Perception       
    } else {
      //Mutation
      this.dna[0] = dna[0];
      if(random(1) < mr){
        this.dna[0] += random(-0.1, 0.1);
      }
      this.dna[1] = dna[1];
      if(random(1) < mr){
        this.dna[1] += random(-0.1, 0.1);
      }
      this.dna[2] = dna[2];
      if(random(1) < mr){
        this.dna[1] += random(-10, 10);
      }
      this.dna[3] = dna[3];
      if(random(1) < mr){
        this.dna[1] += random(-10, 10);
      }
    }
  }


  clone(){
    if(random(1) < 0.001) {
    return new Entity(this.position.x, this.position.y, this.dna);
    } else {
      return null;
    }
}

  boundaries(){
    let d = 10;
    let desired = null;
    if (this.position.x < d) {
      desired = createVector(this.maxSpeed, this.velocity.y);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.maxSpeed, this.velocity.y);
    }
  
    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxSpeed);
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxSpeed);
    }
  
    if (desired !== null) {
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  behaviors(good, bad){
    let steerG = this.eat(good, 0.4, this.dna[2]);
    let steerB = this.eat(bad, -0.5, this.dna[3]);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  eat(list, nutrition, perception){
    let record = Infinity;
    let closest = null;
    for(let i = list.length-1; i >= 0; i--){
      let d = this.position.dist(list[i])
      if(d < this.maxSpeed) {  //maxSpeed used so the entity does not jump over the object
        list.splice(i, 1);
        this.health += nutrition;
      } else {      
        if(d < record && d < perception){
          record = d;
          closest = list[i];
        }
      }
    } 

  if (closest != null){
    return this.seek(closest);
  }

  return createVector(0, 0);
}

  dead() {
      return this.health < 0;
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

  update() {
    this.health -= 0.005;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
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
      
      if(debug.checked()) {
        noFill();
        stroke(0, 255, 0, 100);
        ellipse(0, 0, this.dna[2] * 2)
        line(0, 0, 0, -this.dna[0] * 20)

        stroke(255, 0, 0, 100);
        ellipse(0, 0, this.dna[3] * 2)
        line(0, 0, 0, -this.dna[1] * 20)

        //Vision
        stroke(255, 255, 255, 100);
        fill(255, 255, 255, 100);
        strokeWeight(4)
        // Decreasing Start and increasing End increases field
        // Start -180 and End 0 equals front 180 vision
        // width and height determines range
        arc(0, 0, 180, 180, radians(-160), radians(-20)); 
      }

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