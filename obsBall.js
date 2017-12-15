//Type of Obstacle
function ObsBall(){
	this.pos = createVector(); //positon
	this.size = 10;

	this.setPos = function(n, i){
	    if(i < 30){
            this.pos.x = w/2+(i*10);
            this.pos.y = h-30-(i*10);
		}
		else if(i < 50) {
            this.pos.x = w/4+(i*10);
            this.pos.y = h-200-(i*10);
		}
		else{
            this.pos.x = w-(i*10);
            this.pos.y = h+100-(i*10);

		}
	};

	this.setRandomPos = function(w, h){ //random position
		this.pos.x = random(w);
		this.pos.y = random(h);
	};

	this.display = function(){ //show in the screen
		fill(200, 60, 60);
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	};
}