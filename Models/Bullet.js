class Bullet{

    constructor(position, velocity, uuid){
        this.position = position;
        this.velocity = velocity * 2; //Should carry velocity in the same direction as when shot only faster
        this.id = uuid
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

        push();
  
        translate(this.position.x, this.position.y);

        stroke(200)
        strokeWeight(1)
        fill(0, 0, 0)
        ellipse(0, 0, 10);
        pop();
    }
}