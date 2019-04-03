class Asteroid {

    constructor(x, y) {
        this.position = createVector(x, y);
        this.size = random(1, 3)
        this.velocity = p5.Vector.random2D();
        this.maxSpeed = 5;

    }

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

    update() {
        this.position.add(this.velocity);
    }

    display() {
        let angle = this.velocity.heading() + PI / 2;

        push();
  
        translate(this.position.x, this.position.y);
        rotate(angle);

        stroke(200)
        strokeWeight(1)
        ellipse(0, 0, this.size * 10);
        pop();
    }
}