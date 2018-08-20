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

// Stars variables
// let radius = 1;
// let starX = null;
// let starY = null;
// let starRadius = null;
// let starX_dir = 0;
// let starY_dir = 0;
// let numStar = 2000;
// let stars = [];



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
	this.dy = 0
	this.dx = 0
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








// function to animate objects
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "#000";
	c.fillRect(0, 0, innerWidth, innerHeight);


	// Draws Stars
	for (let i in stars) {
        stars[i].update();
	}

	// function starShip draws green circle attached to mouse
	tacoTruck()


	// for (let i = 0; i < bullets.length; i++) {
	// 	bullets[i].update();
	// }

	// for (let i = 0; i < monsters.length; i++) {
	// 	monsters[i].update();
	// }
}

animate();

