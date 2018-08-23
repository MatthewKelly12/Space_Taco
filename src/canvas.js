// import tacoTruck from './tacoTruck'
// import Star from './stars'

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




// Shooter, green circle attached to mouse
function tacoTruck() {
    c.beginPath();
    c.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2)
    c.fillStyle = "green";
    c.fill();
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

	// Redirects stars to start over
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







// Bullets
// // Constructor function for bullets to be shot from the mouse
function Bullet(x, y, z) {
    this.x = x;
    this.y = y;
	this.z = z;
	this.dx = 0;
	this.dy = 0;
	this.dz = 75;
    this.radius = 20;
	this.color = "yellow"
	this.bulletRadius = undefined
	this.bulletX = undefined
	this.bulletY = undefined


// 	// Function that draws the bullet
	this.draw = function() {
		c.beginPath();
		c.arc(this.bulletX, this.bulletY, this.bulletRadius, TWO_PI, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}

// 	// Adds travel and depth to bullets with focal length formula
    this.update = function () {
		this.draw();

        this.bulletX = (this.x - centerX) * (focalLength / this.z)
        this.bulletX += centerX;

        this.bulletY = (this.y - centerY) * (focalLength / this.z)
        this.bulletY += centerY;

        this.bulletRadius = this.radius * (focalLength / this.z);

// 		// Makes bullet move "into space"
       	this.z += this.dz;



// 		// Detects collision between bullets and monsters
// 		// Monsters turn orange upon collision
        // if (distance(this.x, this.y, monster1.x, monster1.y) < 100 && (this.z - monster1.z) >= 0) {
        //     monster1.color = "orange";
        // }
    }

}

// bullets array that holds bullets fired from the mouse click
// bullets.update() gets called in the animate function on canvas.js
let bullets = [];

// // Upon mouse click bullets are fired from the mouse into "space"
window.addEventListener('click', function () {
   bullets.push(new Bullet(mouse.x, mouse.y, 100))
});

// End Bullets




// Monsters
// let monsterX = null;
// let monsterY = null;
// let monster_Final_Radius = null;
// let monsterX_dir = 0;
// let monsterY_dir = 0;
// let monsterRadius = 20;


// Constructor function for monsters/targets
function Monster(x, y, z) {
    this.x = x;
    this.y = y;
	this.z = z;
	this.dx = 0;
    this.dy = 0;
    this.dz = -10;
    this.radius = 20
	this.color = "blue"
	this.monsterRadius = undefined
	this.monsterX = undefined
	this.monsterY = undefined

	this.draw = function() {
		c.beginPath();
		c.arc(this.monsterX, this.monsterY, this.monsterRadius, TWO_PI, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}

	// Adds travel and depth to stars with focal length formula
    this.update = function () {
        this.monsterX = (this.x - centerX) * (focalLength / this.z)
        this.monsterX += centerX;

        this.monsterY = (this.y - centerY) * (focalLength / this.z)
        this.monsterY += centerY;

        this.monsterRadius = this.radius * (focalLength / this.z);

        this.monsterX += this.dx;
        this.monsterY += this.dy;

        this.z += this.dz;

        if (this.z <= 0) {
            this.z = parseInt(innerWidth)
        }
        this.draw();
    }

}

let monsters = [];
let monster1;

// X, Y, Z Values for monsters/targets
// gets pushed into monsters array
for (let i = 0; i < 1; i++) {
    let x = Math.random() * (innerWidth);
    let y = Math.random() * (innerHeight);
    let z = 2000
	monster1 = new Monster(x,y,z);
	monsters.push(monster1)
}

// END MONSTERS




// HIPSTERS

// Sets images of hipsters to variables
let hipsterOne = new Image()
hipsterOne.src = "./hipsterOne.png"

let hipsterTwo = new Image()
hipsterTwo.src = "./hipsterTwo.png"

let hipsterThree = new Image()
hipsterThree.src = "./hipsterThree.png"

// Create a Hipster object for hipster images
function Hipster(imgHipster, x, y) {
	this.imgHipster = imgHipster
	this.x = x
	this.y = y
	this.z = 2000
	this.w = 100
	this.h = 100
	this.dx = 0
	this.dy = 0
	this.dz = -10
	this.hipsterW = undefined
	this.hipsterH = undefined
	this.hipsterX = undefined
	this.hipsterY = undefined


// Draws images of Hipster object
	this.draw = function () {
	c.drawImage(this.imgHipster, this.hipsterX, this.hipsterY, this.hipsterW, this.hipsterH)
	}

// Calls draw function and updates position and velocity of hipster
	this.update = function () {

	this.hipsterX = (this.x - centerX) * (focalLength / this.z)
        this.hipsterX += centerX;

        this.hipsterY = (this.y - centerY) * (focalLength / this.z)
        this.hipsterY += centerY;

		this.hipsterW = this.w * (focalLength / this.z);
		this.hipsterH = this.h * (focalLength / this.z);

        this.hipsterX += this.dx;
        this.hipsterY += this.dy;

        this.z += this.dz;

        if (this.z <= 0) {
            this.z = parseInt(innerWidth)
		}
		this.draw()
	}
}

// Creates new Hipster objects and sets to variables
let hipOne = new Hipster(hipsterOne, 200, 400)
let hipTwo = new Hipster(hipsterTwo, 500, 200)
let hipThree = new Hipster(hipsterThree, 600, 500)
console.log(hipOne)

// Pushes all Hipster objects into array of hipsters
let hipsters = []
hipsters.push(hipOne)
hipsters.push(hipTwo)
hipsters.push(hipThree)

// END HIPSTERS










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
	for (let i = 0; i < hipsters.length; i++) {
		hipsters[i].update();
	}

	// function starShip draws green circle attached to mouse
	tacoTruck()


	// Shoots bullets
	for (let i = 0; i < bullets.length; i++) {
		bullets[i].update();
	}


	// MONSTERS
	for (let i = 0; i < monsters.length; i++) {
		monsters[i].update();
	}




}

animate();

