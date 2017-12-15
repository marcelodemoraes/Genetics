
//General Configuration, you can change it!
//-------------------------------------------------------------------------------\
var pop_size = 250; //popualtion size 											 |
var frameLimit = 500; //lifespan in frames                                       |
var ObstaclesNumber = 70; //number of random obstacles                           |
var randomObstacles = false; //true = generate obstacles in random positions     |
//                                                                               |
//Screen dimension                                                               |
var w = 1000; //width of the screen X											 |
var h = 800; //height of the screen Y                                            |
//                                                                               |
//                                                                               |
var goalx = 200; //goal x position                                               |
var goaly = 200; //goal y position                                               |
//                                                                               |
var initialX = w-50; //initial x position								         |
var initialY = h-50; //initial y position                                        |
//-------------------------------------------------------------------------------/

//global variables, do no change it! - or do, it's your problem, not mine
var population = []; //vector of Individuals
var count = 0; //frames counter
var genCounter = 0; //generation counter
var best_one; //the best Individual highest fitness
var obst; //Obstacles


//executed in the code's start
function setup() {
	frameRate(60);
	createCanvas(w, h); //create the background
	textSize(30);
	for(var i=0; i<pop_size; i++){ //create population
		population.push(new Individual());
	}
	obst = new Obstacles; //create obstacles
	obst.obsGen();
	img = loadImage("skull.ico");
	img2 = loadImage("Simoes.png")
}

//loop executed in every frame
function draw() {
	background(230); //background color

	fill(255, 255, 0); //goal color
	imageMode(CENTER);
    image(img2, goalx-40, goaly+65, img2.width/3, img2.height/3);
	ellipse(goalx, goaly, 10, 10); //goal format
	fill(10); //text color

	//Population Information
	text("Population: " + pop_size, 30, 30);
	text("Time: " + floor(count/60), 30, 60);
	text("Generation: " + genCounter, 30, 90);
	text(count, 30, h-30);
    if(genCounter > 0) text("Best Fitness: " + nf(best_one.fit, 2, 10), w-400, 30);

	count++; //count every frame


	obst.show();//show obstacles
	for(var i=0; i<population.length; i++){ //for every Individual
		population[i].update(); //update it's position and speed
		if(population[i] === best_one) population[i].display(1); //if it's the best individual
		else population[i].display(0); //if it's not
		if(obst.colision(population[i].pos.x, population[i].pos.y)){ //if it crashed
			population[i].death(); //individual dies
		}
	}

	if(count === frameLimit){ //when reach lifespan's end
        max = -1; //for math;
		//find the best individual
		for(i=0; i<population.length; i++){
			if(population[i].fitness() >= max){
				max = population[i].fitness();
				best_one = population[i];
			}
		}
		//crossover with the best individual
		for(i=0; i<population.length; i++) {
            if (population[i] !== best_one) population[i].crossover();
            population[i].reset();
        }
		count = 0; //reset frame counter
		genCounter++; //next generation
	}
}


