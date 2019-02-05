# Genetics
This project was intended to be a way to show the progress of a evolutionary algotithm in a very visual way and easy for anyone to run the code. Because of this I chose the P5.js JavaScript framework, since it's easy to create graphical animations and, since it runs on browser, it would be simple and acessible to use. 

### How it works
- The population (blue) has a simple goal: reach the goal (yeallow). When a individual hit the corners or the obstacles, they die. Every individual gets a evaluation at the end of the iteraction - when the frame counter reach the maximum. 
- The evaluation (fitness) is calculated based on how close the individual reached the goal and how much it moved - the less, the better.
- The indiviudals' DNA is a bidimensional array, referent to a diferent vector force pushing the individual, one for every frame. In the beginning, all array's elements are a random number.   
- In the end of a interaction, all population's DNA goes through a crossover process. The individual DNA is summed up with the DNA referencing the best fitness achived, then divided by two, for every array's position. And then, a mutation value is added, a pair of numbers between -0.1 and 0.1.
- The individual with the best fitness is a green square.

- User's settings at the Code/main.js

![](https://github.com/niiu/Genetics/blob/master/gen.png)


### Note
This project was made in Firefox, some functions like the usage of .ico files may broke in other browsers.
