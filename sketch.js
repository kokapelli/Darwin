let population;
let lifespan = 500;
let lifeP;
let count = 0;

let maxForce = 0.4;

function setup() {
    createCanvas(windowWidth * 0.95, windowHeight * 0.95);
    dot = new Dot();
    population = new Population(50);
    lifeP = createP();
    target = createVector(width/2, 50);
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);

  if(count == lifespan){
    population.evaluate();
    population.selection();
    count = 0;
  }
  count++;

  ellipse(target.x, target.y, 16, 16)
}