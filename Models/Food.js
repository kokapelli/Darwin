class Food{
    // TODO
    // Add a food spawner and apply gaussing distribution & SpawnRate
    // Change the color according to nutrition
    // Check whether nutrition updates automatically

    constructor(x, y){
        this.position = createVector(x, y);
        this.growthRate = random(0.01, 0.05) // The rate at which the food is becoming more mature
        this.size = 1;                       // Size should grow with time
        this.nutrition = this.size;          // Nutrition should grow with size
        this.maxSize = random(1, 20)

    }

    update() {
        if(this.size < this.maxSize){
        this.size += this.size * this.growthRate
        } 
        else { 
            this.size = this.maxSize 
        }
        // TODO determine spawn location ot nearby with gaussian distrib
        // Randomly spawn a new food next to it
        //if(random(1) <= this.spawnRate){
        //    new Food(random(width), random(width)); //Fix
        //}
      }

    display() {
        push()
        fill(255, 255, 255);
        stroke(200)
        strokeWeight(1)
        ellipse(this.position.x, this.position.y, this.size, this.size);
        pop()
    }
}