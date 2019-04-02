class FoodSpawner{

    constructor(){
        this.position = createVector(random(width), random(height));
        this.fruit = [];
        this.spawnRate = random(0.001, 0.005) // The rate at which new fruit appears
        this.size = random(50, 150)

        for(let i = 0; i < 2; i++){
            let x = floor(randomGaussian(this.position.x, this.size))
            let y = floor(randomGaussian(this.position.y, this.size))
            
            let f = new Food(x, y)
            this.fruit.push(f)
        }
    }



    update() {
        if(random(1) < this.spawnRate){
            let x = floor(randomGaussian(this.position.x, this.size/2))
            let y = floor(randomGaussian(this.position.y, this.size/2))
            let spawned = new Food(x, y);
            this.fruit.push(spawned)

        }
        // TODO determine spawn location ot nearby with gaussian distrib
        // Randomly spawn a new fruit next to it
        //if(random(1) <= this.spawnRate){
        //    new fruit(random(width), random(width)); //Fix
        //}
      }

    display(){
        push()
        fill(255, 255, 255, 25);
        stroke(200)
        ellipse(this.position.x, this.position.y, this.size, this.size);
        pop()
    }
}