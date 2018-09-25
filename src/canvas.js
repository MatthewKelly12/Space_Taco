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
//         focalLength /= 1.1;
//     }
//     if (focalLength >= innerWidth) {
//         focalLength = innerWidth - 20;
//     } else if (focalLength < 100) {
//         focalLength = 100;
//     }
// }, false)

// // Slight background movement on mousemove
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

// ATTACHES X & Y COORDINATES OF THE SCROLL TO OUR MOUSE OBJECT
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




// VARIABLE TO HOLD SCORE
let score = 0;

// DRAWS 'Score:' TEXT
function scoreText() {
	c.beginPath()
	c.font = "40pt Comic Sans MS"
	c.fillStyle = "white"
	c.fillText('Score:', 20, 600, 300)
	c.fill()
}

// DRAWS ACTUAL SCORE NUMBER, STARTS AT 0
function scoreNumber () {
	c.beginPath()
	c.font = "40pt Comic Sans MS"
	c.fillStyle = "white"
	c.fillText(score, 200, 600, 300)
	c.fill()
}


// VARIABLES TO HOLD TIME
let seconds = 60
let minutes = 0


// DRAWS MINUTES
function minute () {
	c.beginPath()
	c.font = "40pt Comic Sans MS"
	c.fillStyle = "white"
	c.fillText(minutes + ":", 850, 600, 300)
	c.fill()
}

// DRAWS SECONDS
function second () {
	c.beginPath()
	c.font = "40pt Comic Sans MS"
	c.fillStyle = "white"
	c.fillText(seconds, 900, 600, 300)
	c.fill()
}

// GAME OVER
function gameOver () {
	c.beginPath()
	c.font = "150pt Comic Sans MS"
	c.fillStyle = "white"
	c.fillText('GAME OVER', 400, 400, 500)
	c.fill()
}


// STARS
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

// DRAWS STARS
Star.prototype.draw = function() {
	c.beginPath();
	c.arc(this.starX, this.starY, this.starRadius, TWO_PI, false);
	c.fillStyle = this.color;
	c.fill();
	c.closePath();
}

// CALLS DRAW FUNCTION
// ADDS MOVEMENT AND DEPTH TO STARS WITH FOCAL LENGTH FORMULA
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


// Pushes all Hipster objects into array of hipsters
let hipsters = []
let arrayRandomHipster = []


// END HIPSTERS





// POWER UPS, SUPPLIES
// Create a Supply object for supply images
function Supply(imgSupply, x, y) {
	this.imgSupply = imgSupply
	this.x = x
	this.y = y
	this.z = 3000
	this.w = 100
	this.h = 100
	this.dx = 0
	this.dy = 0
	this.dz = -8
	this.supplyW = undefined
	this.supplyH = undefined
	this.supplyX = undefined
	this.supplyY = undefined
}

// Draws images of Supply object
Supply.prototype.draw = function () {
	c.drawImage(this.imgSupply, this.supplyX, this.supplyY, this.supplyW, this.supplyH)
}

// Calls draw function and updates position and velocity of supply
Supply.prototype.update = function () {

	this.supplyX = (this.x - centerX) * (focalLength / this.z)
    this.supplyX += centerX;

    this.supplyY = (this.y - centerY) * (focalLength / this.z)
    this.supplyY += centerY;

	this.supplyW = this.w * (focalLength / this.z);
	this.supplyH = this.h * (focalLength / this.z);

    // this.supplyX += this.dx;
    // this.supplyY += this.dy;

    this.z += this.dz;

    // if (this.z <= 0) {
    //     this.z = parseInt(innerWidth)
	// }
	this.draw()
}

// END SUPPLIES


// Sets image of supplies to a variable
let hotSauce = new Image()
hotSauce.src = "./hotSauce.png"

let cheese = new Image()
cheese.src = "./cheese.png"

let avacado = new Image()
avacado.src = "./avacado.png"

let margarita = new Image()
margarita.src = "./margarita.png"

let peppers = new Image()
peppers.src = "./peppers.png"

let tomato = new Image()
tomato.src = "./tomato.png"






// Supplies array will hold all animated supply images
// arrayRandomHipster will hold all supply images until spawned for animation
let supplies = []
let arrayRandomSupplies = []



// SETS RATES TO SPAWN IMAGES OF HIPSTERS
// AND SUPPLIES ON SCREEN
// TICKER IS USED AS A COUNTER++ AND
// SPAWN RATES DEPEND ON TICKER
let hipsterSpawnRate = 50
let supplySpawnRate = 100
let ticker = 0




// INIT FUNCTION TO ANIMATE HIPSTERS AND SUPPLIES
function init() {
	// PUSHES SUPPLIES INTO ANIMATED ARRAY
	arrayRandomSupplies.push(hotSauce, cheese, avacado, peppers, tomato, margarita)

	arrayRandomHipster.push(hipsterOne)
	arrayRandomHipster.push(hipsterTwo)
	arrayRandomHipster.push(hipsterThree)
}

// LOGO
let logo = new Image()
logo.src = "./tacoTruck.png"

// DRAWS LOGO
// Shooter, img of Taco Truck attached to mouse
// function drawLogo() {
	// let d = c.drawImage(logo, 400, 30, 500, 400)
// }

// let logoArray = []
// logoArray.push()

init()

// STARTING THE GAME
// HIDE CANVAS, SHOW START SCREEN
$("#gameCanvas").hide()
let butt = document.getElementById('buttStart')
butt.onclick = ( function () {
	$("#gameCanvas").empty()
	$("#startScreen").hide()
	$("#gameCanvas").show()
	console.log('clicked')
	animate()
}
)


// FUNCTION TO ANIMATE OBJECTS
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "#000";
	c.fillRect(0, 0, innerWidth, innerHeight);





	// DRAWS STARS
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


	// // SUPPLIES
	supplies.forEach((supply, index) => {
		supply.update()
		// REMOVE SUPPLIES FROM SCREEN/ARRAY IF
		// Z COORDINATE IS PASSED FRONT OF SCREEN
		if(supply.z < 0) {
			supplies.splice(index, 1)
		}



		// COLLISION DETECTION BETWEEN SUPPLIES AND MOUSE/TACO TRUCK
		if (distance(supply.x, supply.y, mouse.x - 60, mouse.y - 60) < 200 && supply.z  <= 400) {

			// REMOVE supplies FROM SCREEN/ARRAY
			// IF COLLIDED WITH MOUSE/TACO TRUCK
			supplies.splice(index, 1);
			console.log('HOT SAUCED!')

			// SCORE GOES UP UPON COLLISION
			score += 10
		}

	})



	// TACO TRUCK IMG attached to mouse
	tacoTruck()

	// DRAWS "Score:""
	scoreText()

	// DRAWS SCORE NUMBER
	scoreNumber()


	// SHOOTS TACOS
	tacos.forEach((taco, index) => {
		taco.update()

		// REMOVES TACOS FROM SCREEN/ARRAY
		// WHEN Z DEPTH IS MORE THAN 6000
		if(taco.z > 6000) {
			tacos.splice(index, 1)
		}
	})

	// DRAWS MINUTES
	minute()

	// DRAWS SECONDS
	second()

	// SETS TIMER RATE FOR SECONDS TO DECREASE
	if (seconds < 0) {
		seconds = "00"
	} else if (ticker % 60 === 0){

		seconds -= 1
	}

	// DECREASES MINUTES WHEN SECONDS EQUAL ZERO
	if (seconds === 0) {
		minutes += -1
	}

	// TIME STOP
	if (minutes < 0 && seconds === 0) {
		minutes = 0
		seconds = 0
		ticker = 0
		gameOver()

	}

	// TICKER GOES UP EACH ANIMATION FRAME
	ticker++

	// SPAWNS RANDOM HIPSTER ON SCREEN
	// WHEN TICKER DIVIDED BY SPAWN RATE IS ZERO
	if (ticker % hipsterSpawnRate === 0) {
		const x = Math.max(100, Math.random() * canvas.width - 100)
		const y = Math.max(100, Math.random() * canvas.height - 100)
		hipsters.push(new Hipster(randomFromArray(arrayRandomHipster), x, y))
		// hipsterSpawnRate = randomIntFromRange(75, 100)
	}

	// SPAWNS RANDOM SUPPLY ON SCREEN
	// WHEN TICKER DIVIDED BY SPAWN RATE IS ZERO
	if (ticker % supplySpawnRate === 0) {
		const x = Math.max(100, Math.random() * canvas.width - 100)
		const y = Math.max(100, Math.random() * canvas.height - 100)
		supplies.push(new Supply(randomFromArray(arrayRandomSupplies), x, y))
		// supplySpawnRate = randomIntFromRange(75, 100)
	}

}



