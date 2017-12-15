
//General Configuration, you can change it!
//-------------------------------------------------------------------------------\
var pop_size = 100; //popualtion size 											 |
var frameLimit = 500; //lifespan in frames                                       |
var ObstaclesNumber = 0; //number of random obstacles                           |
var randomObstacles = false; //true = generate obstacles in random positions     |
var maxGen = 200;//                                                              |
//Screen dimension                                                               |
var w = 1000; //width of the screen X											 |
var h = 800; //height of the screen Y                                            |
//Goal position                                                                  |
var goalx = 200; //goal x position                                               |
var goaly = 200; //goal y position                                               |
//Initial position                                                               |
var initialX = w-50; //initial x position								         |
var initialY = h-50; //initial y position              				             |
// 																				 |
var simoes = false;//                                                            |
//-------------------------------------------------------------------------------/

//global variables, do no change it! - or do, it's your problem, not mine
var population = []; //vector of Individuals
var count = 0; //frames counter
var genCounter = 0; //generation counter
var best_one; //the best Individual highest fitness
var obst; //Obstacles
var averageFitness = 0;
var table;//for saving data
var newRow; //for saving data
var tableSaveCounter = 0;


//executed in the code's start
function setup() {
	frameRate(60);

	table = new p5.Table();
	table.addColumn('Generation');
    table.addColumn('Best Fitness');
    table.addColumn('average Fitness');


	createCanvas(w, h); //create the background
	textSize(30);
	for(var i=0; i<pop_size; i++){ //create population
		population.push(new Individual());
	}
	obst = new Obstacles; //create obstacles
	obst.obsGen();
	img = loadImage("skull.ico");
	img2 = loadImage("Simoes.png")
    save(population[0].pos, "test");
}

//loop executed in every frame
function draw() {

	if(genCounter > maxGen){
		//saveTable(table, 'info' + tableSaveCounter + '.csv');
		table.clearRows();
		tableSaveCounter++;
		for(var i = 0; i<population.length; i++){
			population[i].resetDNA();
			genCounter = 0;
		}
	}
	background(230); //background color

	fill(255, 255, 0); //goal color
	
	if(simoes){
		imageMode(CENTER);
		image(img2, goalx+5, goaly+75, img2.width/2, img2.height/2);
	}
	else ellipse(goalx, goaly, 10, 10); //goal format

	
	fill(10); //text color

	//Population Information
	text("Population: " + pop_size, 30, 30);
	text("Time: " + floor(count/60), 30, 60);
	text("Generation: " + genCounter, 30, 90);
	text(count+"/"+frameLimit, 30, h-30);
    if(genCounter > 0){
        text("Best Fitness:       " + nf(best_one.fit, 2, 10), w-450, 30);
        text("Average Fitness: " + nf(averageFitness, 2, 10), w-450, 60);
	}

	count++; //count every frame
	obst.show();//show obstacles
	for(i=0; i<population.length; i++){ //for every Individual
		population[i].update(); //update it's position and speed
		if(population[i] === best_one) population[i].display(1); //if it's the best individual
		else population[i].display(0); //if it's not
		if(obst.colision(population[i].pos.x, population[i].pos.y)){ //if it crashed
			population[i].death(); //individual dies
		}
	}

    max = -1; //for math;
	if(count === frameLimit){ //when reach lifespan's end
		var localFit;
		averageFitness = 0;
		//find the best individual
		for(i=0; i<population.length; i++){
			localFit = population[i].fitness();
			averageFitness += localFit;
			if(localFit>= max){
				max = localFit;
				best_one = population[i];
			}
		}
		averageFitness /= pop_size;
		//crossover with the best individual
		for(i=0; i<population.length; i++) {
            if (population[i] !== best_one) population[i].crossover();
            population[i].reset();
        }

        newRow = table.addRow();
		newRow.setNum('Generation', genCounter);
        newRow.setNum('Best Fitness', max);
        newRow.setNum('average Fitness', averageFitness);

		count = 0; //reset frame counter
		genCounter++; //next generation
	}
}
