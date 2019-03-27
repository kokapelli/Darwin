class Population{

    constructor(popSize) {
        this.dots = [];
        this.popSize = popSize;
        this.matingPool = [];
        this.highestFitness = 0;
        this.fastestDone = 0;

        for(let i = 0; i < this.popSize; i++){
            this.dots[i] = new Dot();
        }
    }

    run(){
        for(let i = 0; i < this.popSize; i++){
            if(!this.dots[i].finished){
                this.dots[i].update();
            }
            this.dots[i].show();
        }
    }

    evaluate(){
        let maxFit = 0;
        for(let i = 0; i < this.popSize; i++){
            if(!this.dots[i].finished){
                this.dots[i].calculateFitness();
            }
            if(this.dots[i].fitness > maxFit){
                maxFit = this.dots[i].fitness
                if(maxFit > this.highestFitness){
                    this.highestFitness = maxFit;
                }
            }
        }
        createP(maxFit)
        for(let i = 0; i < this.popSize; i++){
            this.dots[i].fitness /= maxFit;
        }

        this.matingPool = [];

        for(let i = 0; i < this.popSize; i++){
            let n = this.dots[i].fitness * 100;
            for(let j = 0; j < n; j++){
                this.matingPool.push(this.dots[i]);
            }
        }
    }
    selection(){
        let newDots = [];
        for(let i = 0; i < this.dots.length; i++){
            let parentA = random(this.matingPool).dna;
            let parentB = random(this.matingPool).dna;
            let child = parentA.crossover(parentB);    
            child.mutation();
            newDots[i] = new Dot(child);      
        }
        this.dots = newDots;
    }
}