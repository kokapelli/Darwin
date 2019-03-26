// module aliases
const Render = Matter.Render
const engine = Matter.Engine.create()
const world = engine.world;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Bounds = Matter.Bounds;
const Detector = Matter.Detector;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const SAT = Matter.SAT;
const Vertices = Matter.Vertices;


var dots = [];
let boundary;


function setup() {
    let canvas = createCanvas(windowWidth * 0.95, windowHeight * 0.95);
    frameRate(60);
    rectMode(CENTER);
    fill(255);

    boundary = new WorldBoundary();
    boundary.add_to_world();
    world.gravity.scale = 0

    
    let canvas_mouse = Mouse.create(canvas.elt);
    canvas_mouse.pixelRatio = pixelDensity();
    let options = {
      mouse: canvas_mouse
    }

    mConstraint = MouseConstraint.create(engine, options)
    Matter.World.add(world, mConstraint);
}

function keyPressed() {
  dots.push(new Dot(mouseX, mouseY, random(10, 40)));
}

function mousePressed() {

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
  background(color(100, 100, 100));
  boundary.display();
  for (var i = 0; i < dots.length; i++) {
    dots[i].show();
    //Body.applyForce(dots[i].body, {x:dots[i].body.position.x, y: dots[i].body.position.y}, {x: 0.05, y: 0.05})
    //Body.setAngularVelocity(dots[i].body, 0.1)
  }

  //Select Object
  if(mConstraint.body){
    body = mConstraint.body

    for (var i = 0; i < dots.length; i++) {
        if(body.id == dots[i].id){
          if(dots[i].selected == true){
            dots[i].selected = false
          }
          else
            dots[i].selected = true
      }
    }
  }

  Matter.Engine.update(engine);
}