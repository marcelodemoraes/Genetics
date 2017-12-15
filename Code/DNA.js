function DNA(){ //class
	//Generates DNA, genes array(it's the force applied every frame)
	//A gene per frame
	this.genes = [];
	for(var i = 0; i < frameLimit; i++){
		this.genes[i] = p5.Vector.random2D();
		this.genes[i].setMag(0.2);
	}
}