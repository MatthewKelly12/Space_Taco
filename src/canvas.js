// import tacoTruck from './tacoTruck'
// import Star from './stars'
// import utils from './utils'

let canvas = document.querySelector("canvas");

let c = canvas.getContext("2d");

let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
canvas.width = innerWidth;
canvas.height = innerHeight;

// Calculates and returns the distance bewteen two points
function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Returns a random number bewteen min and max
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Returns random value from array
function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)]
}


// Defines our mouse object which will be attached to x and y
// coordinates on a 'mousemove' event listener
let mouse = {
    x: undefined,
    y: undefined
}

let TWO_PI = Math.PI * 2;
let centerX = innerWidth / 2;
let centerY = innerHeight / 2;
let focalLength = 400





// Zoom in
// canvas.addEventListener('mousewheel', function (event) {
//     if (event.deltaY < 0) {
//         focalLength *= 1.1;
//     } else {
//         focalLength /= 1.1
//     }
//     if (focalLength >= innerWidth) {
//         focalLength = innerWidth - 20;
//     } else if (focalLength < 100) {
//         focalLength = 100;
//     }
// }, false)

// Slight background movement on mousemove
// window.addEventListener('mousemove', function (event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
//     if (mouse.x < centerX) {
//         starX_dir += 1;
//     } else if (mouse.x > centerX) {
//         starX_dir += -1;
//     }
//     if (mouse.y < centerY) {
//         starY_dir += 1;
//     } else if (mouse.y > centerY) {
//         starY_dir += -1;
//     }
// })

addEventListener('mousemove', function (event) {
	mouse.x = event.x
	mouse.y = event.y
})

// TACO TRUCK
let imgTacoTruck = new Image()
imgTacoTruck.src = "./tacoTruck.png"



// Shooter, img of Taco Truck attached to mouse
function tacoTruck() {
    c.drawImage(imgTacoTruck, mouse.x - 60, mouse.y - 60, 120, 120)
}

// Variable to show score on screen
let score = 0;

// Draws 'Score:' text
function scoreText() {
	c.beginPath()
	c.font = "40pt Comic Sans MS"
	c.fillStyle = "white"
	c.fillText('Score:', 20, 600, 300)
	c.fill()
}

// Draws actual score number, starts at 0
function scoreNumber () {
	c.beginPath()
	c.font = "40pt Comic Sans MS"
	c.fillStyle = "white"
	c.fillText(score, 200, 600, 300)
	c.fill()
}










// Stars
let numStar = 2000;
let stars = [];

// Constructor function for stars background
function Star(x, y, z) {
    this.x = x;
    this.y = y;
	this.z = z;
	this.dx = 0
	this.dy = 0
	this.dz = -20
    this.radius = 1;
	this.color = "#fff"
	this.starRadius = undefined
	this.starX = undefined
	this.starY = undefined
}

	// Function that draws the stars
Star.prototype.draw = function() {
	c.beginPath();
	c.arc(this.starX, this.starY, this.starRadius, TWO_PI, false);
	c.fillStyle = this.color;
	c.fill();
	c.closePath();
}

	// Adds travel and depth to stars with focal length formula
Star.prototype.update = function () {
	this.draw();

	this.starX = (this.x - centerX) * (focalLength / this.z)
	this.starX += centerX;

	this.starY = (this.y - centerY) * (focalLength / this.z)
	this.starY += centerY;

	this.starRadius = this.radius * (focalLength / this.z)

	// Adds slight movement of stars background
	// upon mousemove
    this.starX += this.dx;
    this.starY += this.dy;

	// Makes stars move "into space"
	this.z += this.dz;

	// Redirects stars Z coordinate
	// to start over at value of screen width
    if (this.z <= 0) {
        this.z = parseInt(innerWidth)
    }
}

// X, Y, Z Values for stars
// stars get pushed into stars array
for (let i = 0; i < numStar; i++) {
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerWidth;
    let z = Math.random() * innerWidth;
    stars.push(new Star(x,y,z));
}
// End stars






// TACO
// Sets image of taco to variable
let tacoImg = new Image()
tacoImg.src = "./taco.png"

// Create a taco object for taco images
function Taco(img, x, y) {
	this.img = img
	this.x = x
	this.y = y
	this.z = 100
	this.w = 70
	this.h = 70
	this.dx = 0
	this.dy = 0
	this.dz = 60
	this.tacoX = undefined
	this.tacoY = undefined
	this.tacoW = undefined
	this.tacoH = undefined
}

// Draws images of Taco object
Taco.prototype.draw = function () {
	c.drawImage(this.img, this.tacoX, this.tacoY, this.tacoW, this.tacoH)
}

// Calls draw function and updates position and velocity of Taco
Taco.prototype.update = function () {

	this.tacoX = (this.x - centerX) * (focalLength / this.z)
    this.tacoX += centerX;

    this.tacoY = (this.y - centerY) * (focalLength / this.z)
    this.tacoY += centerY;

	this.tacoW = this.w * (focalLength / this.z);
	this.tacoH = this.h * (focalLength / this.z);

    this.tacoX += this.dx;
    this.tacoY += this.dy;

    this.z += this.dz;

    if (this.z <= 0) {
        this.z = parseInt(innerWidth)
	}
	this.draw()
}


// tacos array that holds tacos fired from the mouse click
// tacos.update() gets called in the animate function on canvas.js
let tacos = [];

// // Upon mouse click tacos are fired from the mouse into "space"
window.addEventListener('click', function () {
   tacos.push(new Taco(tacoImg, mouse.x - 60, mouse.y -60))
});

// END TACO








// HIPSTERS
// Create a Hipster object for hipster images
function Hipster(imgHipster, x, y) {
	this.imgHipster = imgHipster
	this.x = x
	this.y = y
	this.z = 3000
	this.w = 100
	this.h = 100
	this.dx = 0
	this.dy = 0
	this.dz = -8
	this.hipsterW = undefined
	this.hipsterH = undefined
	this.hipsterX = undefined
	this.hipsterY = undefined
}


// Draws images of Hipster object
Hipster.prototype.draw = function () {
	c.drawImage(this.imgHipster, this.hipsterX, this.hipsterY, this.hipsterW, this.hipsterH)
}

// Calls draw function and updates position and velocity of hipster
Hipster.prototype.update = function () {

	this.hipsterX = (this.x - centerX) * (focalLength / this.z)
    this.hipsterX += centerX;

    this.hipsterY = (this.y - centerY) * (focalLength / this.z)
    this.hipsterY += centerY;

	this.hipsterW = this.w * (focalLength / this.z);
	this.hipsterH = this.h * (focalLength / this.z);

    // this.hipsterX += this.dx;
    // this.hipsterY += this.dy;

    this.z += this.dz;

    // if (this.z <= 0) {
    //     this.z = parseInt(innerWidth)
	// }
	this.draw()
}

// Sets images of hipsters to variables
let hipsterOne = new Image()
hipsterOne.src = "./hipsterOne.png"

let hipsterTwo = new Image()
hipsterTwo.src = "./hipsterTwo.png"

let hipsterThree = new Image()
hipsterThree.src = "./hipsterThree.png"

// Creates new Hipster objects and sets to variables
// let hipOne = new Hipster(hipsterOne, 200, 400)
// let hipTwo = new Hipster(hipsterTwo, 500, 200)
// let hipThree = new Hipster(hipsterThree, 600, 500)
// console.log(hipOne)

// Pushes all Hipster objects into array of hipsters
let hipsters = []
let arrayRandomHipster = []
// hipsters.push(hipOne)
arrayRandomHipster.push(hipsterOne)
arrayRandomHipster.push(hipsterTwo)
arrayRandomHipster.push(hipsterThree)

// END HIPSTERS







let hipsterSpawnRate = 100
let ticker = 0


// function to animate objects
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "#000";
	c.fillRect(0, 0, innerWidth, innerHeight);



	// Draws Stars
	for (let i in stars) {
        stars[i].update();
	}



	// // HIPSTERS
	hipsters.forEach((hipster, index) => {
		hipster.update()
		// REMOVE HIPSTERS FROM SCREEN/ARRAY IF
		// Z COORDINATE IS PASSED FRONT OF SCREEN
		if(hipster.z < 0) {
			hipsters.splice(index, 1)
		}
		// COLLISION DETECTION BETWEEN HIPSTERS AND TACOS
		tacos.forEach((taco, index) => {
		if (distance(hipster.x, hipster.y, taco.x, taco.y) < 80 && (hipster.z - taco.z) <= 10) {
			// REMOVE HIPSTERS FROM SCREEN/ARRAY
			// IF COLLIDED WITH TACOS
			hipsters.splice(index, 1);
			// SCORE GOES UP UPON COLLISION
			score += 5
		}
		})
	})

	// function starShip draws green circle attached to mouse
	tacoTruck()

	// Draws "Score:"
	scoreText()

	// Draws score number
	scoreNumber()


	// Shoots tacos
	tacos.forEach((taco, index) => {
		taco.update()
		if(taco.z > 6000) {
			tacos.splice(index, 1)
		}
	})


	ticker++
	if (ticker % hipsterSpawnRate === 0) {
	// 	// const radius = 12
		const x = Math.max(100, Math.random() * canvas.width - 100)
		const y = Math.max(100, Math.random() * canvas.height - 100)
		hipsters.push(new Hipster(randomFromArray(arrayRandomHipster), x, y))
		// hipsterSpawnRate = randomIntFromRange(75, 100)
	}

}

animate();

