let debug;
let slider;
let ships = [];
let asteroids = [];
let bullets = [];

function setup() {
    let canvas = createCanvas(windowWidth * 0.95, windowHeight * 0.95);

    slider = createSlider(1, 50, 1, 1);
    slider.parent('slider');

    canvas.parent('canvascontainer');
    debug = select('#debug');

    // Create initial population
    for (let i = 0; i < 20; i++) {
        let x = random(width);
        let y = random(height);
        ships[i] = new Ship(x, y);
    }
    
    for (let i = 0; i < 20; i++) {
        let x = random(width);
        let y = random(height);
        asteroids[i] = new Asteroid(x, y);
    }
}

function draw() {
    background(51);

    for(let i = ships.length-1; i >= 0; i--){
        ships[i].boundaries();
        ships[i].update();
        ships[i].display();

        if(random(1) < 0.001){
            bullets.push(ships[i].shoot())
        }
    }

    for(let i = asteroids.length-1; i >= 0; i--){
        asteroids[i].boundaries();
        asteroids[i].update();
        asteroids[i].display();
    }

    for(let i = bullets.length-1; i >= 0; i--){
        bullets[i].boundaries();
        bullets[i].update();
        bullets[i].display();
    }

    
}