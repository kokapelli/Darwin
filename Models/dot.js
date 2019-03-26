class Dot{

  constructor(posX, posY, radius) {
    this.posX = posX;
    this.posY = posY;
    this.veloX = 0;
    this.veloY = 0;
    this.radius = radius;
    this.acceleration = 0.1;
    this.max_speed = 5;
    this.selected = false;

  
    this.body = Bodies.circle(posX, posY, radius, {
      friction: 1,
      restitution: 0.6
    });
    this.id = this.body.id

    Matter.World.add(world, this.body);

    this.show = function() {
      var pos = this.body.position;
      var angle = this.body.angle;
      this.move()
      this.check_boundary()

      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      strokeWeight(1);
      stroke(255);
      
      if(this.selected){
        fill(0, 255, 0)
      }
      else{
        fill(127);
      }
      ellipse(0, 0, this.radius*2); //Body
      line(0, 0, this.radius, 0)
      pop();
    }
  }

  check_boundary(){

  }



  move(){
    //console.log(this.body)
    //this.veloX +=  (1 * this.acceleration)
    //this.veloY +=  (1 * this.acceleration)

    Body.setVelocity(this.body, {x: this.veloX, y: this.veloY})
    this.check_speed()
  }

  check_speed(){
    // Clamping the max speed
    if(this.veloX >= this.max_speed){
      this.veloX = this.max_speed;
    }

    if(this.veloY >= this.max_speed){
      this.veloY = this.max_speed;
    }
  }
}