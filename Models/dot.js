class Dot{

  constructor(dna) {
    this.pos = createVector(width/2, height);
    this.vel = createVector();
    this.acc = createVector();

    this.fitness = 0;
    this.doneTime = 0;
    this.done = false;
    this.crashed = false;
    this.finished = false;

    if(dna){
      this.dna = dna;
    } else{
      this.dna = new DNA();
    }
  }

  applyForce(force){
    this.acc.add(force);
  }

  calculateFitness(){
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, height, 0);

    if(this.done){
      this.fitness *= 2;
      this.fitness *= (this.fitness/this.doneTime)*200;
    }
    if(this.crashed){
      this.fitness *= 0.1;
    }
  }

  update(){

    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if(d < 10){
      this.done = true;
      this.doneTime = count;
      this.calculateFitness();
      this.finished = true;
      createP("doneTime: " + this.doneTime)
    }

    if(this.pos.x > width || this.pos.x < 0){
      this.crashed = true;
      this.calculateFitness();
      this.finished = true;
    }

    if(this.pos.y > height || this.pos.y < 0){
      this.crashed = true;
      this.calculateFitness();
      this.finished = true;
    }

    this.applyForce(this.dna.genes[count]);
    if(!this.done && !this.crashed){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  show(){
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    ellipse(0, 0, 10);
    pop();
  }
}
