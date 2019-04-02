let population = [];
let food = [];
let poison = [];
let superFood = null;

let debug;

function setup() {
    let canvas = createCanvas(windowWidth * 0.95, windowHeight * 0.95);

    canvas.parent('canvascontainer');
    debug = select('#debug');

    for(let i = 0; i < 50; i++){
        let x = random(width);
        let y = random(height);
        food.push(createVector(x, y));
    }

    for(let i = 0; i < 10; i++){
        let x = random(width);
        let y = random(height);
        poison.push(createVector(x, y));
    }

    // Create initial population
    for (let i = 0; i < 20; i++) {
        let x = random(width);
        let y = random(height);
        population[i] = new Entity(x, y);
    }

    superFood = new Food(random(width), random(height));
}

function draw() {
    background(51);

    if(random(1) <= 0.05){
        let x = random(width);
        let y = random(height);
        food.push(createVector(x, y));
    }


    for(var i = 0; i < food.length; i++){
        fill(0, 255, 0);
        noStroke()
        ellipse(food[i].x, food[i].y, 8, 8);
    }

    for(var i = 0; i < poison.length; i++){
        fill(255, 0, 0);
        noStroke()
        ellipse(poison[i].x, poison[i].y, 8, 8);
    }


    for(let i = population.length-1; i >= 0; i--){
        population[i].boundaries();
        population[i].behaviors(food, poison);
        population[i].update();
        population[i].display();

        //Spawn clones
        let newEntity = population[i].clone();
        if(newEntity != null){
            population.push(newEntity);
        }

        if(population[i].dead()){
            let x = population[i].position.x;
            let y = population[i].position.y;
            food.push(createVector(x, y));
            population.splice(i, 1);
        }
    }

    superFood.update()
    superFood.display()


}