//Represent obstacles in the field
function Obstacles(){
	this.obsNumber = ObstaclesNumber; //number of obstacles
	this.obstacles = []; //array of obstacles

    this.obsGen = function() { //generate obstacles
		if(randomObstacles) this.obsGenRandom();
		else this.obsGenNotRandom();
    }
    this.obsGenNotRandom = function() { //generate obstacles
        for(var i=0; i<this.obsNumber; i++){
            this.obstacles.push(new ObsBall());
            this.obstacles[i].setPos(this.obsNumber, i); //randomly distributed in the width range and height range
        }
    };


	this.obsGenRandom = function(){ //generate obstacles
		for(var i=0; i<this.obsNumber; i++){
			this.obstacles.push(new ObsBall());
			this.obstacles[i].setRandomPos(w-1, h-1); //randomly distributed in the width range and height range
		}
	};

	this.show = function(){ //show obstacles in the screen
		for(var i=0; i<this.obsNumber; i++){
			this.obstacles[i].display();
		}
	};

	this.colision = function(x, y){ //check if Individual crashed in the obstacle
		for(var i=0; i<this.obsNumber; i++){
			if(dist(this.obstacles[i].pos.x, this.obstacles[i].pos.y, x, y) < this.obstacles[i].size){
				return 1;
			}
		}
	};
}