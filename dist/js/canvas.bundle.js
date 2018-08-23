/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import tacoTruck from './tacoTruck'
// import Star from './stars'

var canvas = document.querySelector("canvas");

var c = canvas.getContext("2d");

var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
canvas.width = innerWidth;
canvas.height = innerHeight;

// Calculates and returns the distance bewteen two points
function distance(x1, y1, x2, y2) {
	var xDist = x2 - x1;
	var yDist = y2 - y1;

	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Defines our mouse object which will be attached to x and y
// coordinates on a 'mousemove' event listener
var mouse = {
	x: undefined,
	y: undefined
};

var TWO_PI = Math.PI * 2;
var centerX = innerWidth / 2;
var centerY = innerHeight / 2;
var focalLength = 400;

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
	mouse.x = event.x;
	mouse.y = event.y;
});

var imgTacoTruck = new Image();
imgTacoTruck.src = "./tacoTruck.png";

// Shooter, green circle attached to mouse
function tacoTruck() {
	c.drawImage(imgTacoTruck, mouse.x - 60, mouse.y - 60, 120, 120);
}

// Stars
var numStar = 2000;
var stars = [];

// Constructor function for stars background
function Star(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.dx = 0;
	this.dy = 0;
	this.dz = -20;
	this.radius = 1;
	this.color = "#fff";
	this.starRadius = undefined;
	this.starX = undefined;
	this.starY = undefined;
}

// Function that draws the stars
Star.prototype.draw = function () {
	c.beginPath();
	c.arc(this.starX, this.starY, this.starRadius, TWO_PI, false);
	c.fillStyle = this.color;
	c.fill();
	c.closePath();
};

// Adds travel and depth to stars with focal length formula
Star.prototype.update = function () {
	this.draw();

	this.starX = (this.x - centerX) * (focalLength / this.z);
	this.starX += centerX;

	this.starY = (this.y - centerY) * (focalLength / this.z);
	this.starY += centerY;

	this.starRadius = this.radius * (focalLength / this.z);

	// Adds slight movement of stars background
	// upon mousemove
	this.starX += this.dx;
	this.starY += this.dy;

	// Makes stars move "into space"
	this.z += this.dz;

	// Redirects stars to start over
	if (this.z <= 0) {
		this.z = parseInt(innerWidth);
	}
};

// X, Y, Z Values for stars
// stars get pushed into stars array
for (var i = 0; i < numStar; i++) {
	var x = Math.random() * innerWidth;
	var y = Math.random() * innerWidth;
	var z = Math.random() * innerWidth;
	stars.push(new Star(x, y, z));
}
// End stars


// // Bullets
// // // Constructor function for bullets to be shot from the mouse
// function Bullet(x, y, z) {
//     this.x = x;
//     this.y = y;
// 	this.z = z;
// 	this.dx = 0;
// 	this.dy = 0;
// 	this.dz = 75;
//     this.radius = 20;
// 	this.color = "yellow"
// 	this.bulletRadius = undefined
// 	this.bulletX = undefined
// 	this.bulletY = undefined


// // 	// Function that draws the bullet
// 	this.draw = function() {
// 		c.beginPath();
// 		c.arc(this.bulletX, this.bulletY, this.bulletRadius, TWO_PI, false);
// 		c.fillStyle = this.color;
// 		c.fill();
// 		c.closePath();
// 	}

// // 	// Adds travel and depth to bullets with focal length formula
//     this.update = function () {
// 		this.draw();

//         this.bulletX = (this.x - centerX) * (focalLength / this.z)
//         this.bulletX += centerX;

//         this.bulletY = (this.y - centerY) * (focalLength / this.z)
//         this.bulletY += centerY;

//         this.bulletRadius = this.radius * (focalLength / this.z);

// // 		// Makes bullet move "into space"
//        	this.z += this.dz;


// // 		// Detects collision between bullets and monsters
// // 		// Monsters turn orange upon collision
//         // if (distance(this.x, this.y, monster1.x, monster1.y) < 100 && (this.z - monster1.z) >= 0) {
//         //     monster1.color = "orange";
//         // }
//     }

// }

// // bullets array that holds bullets fired from the mouse click
// // bullets.update() gets called in the animate function on canvas.js
// let bullets = [];

// // // Upon mouse click bullets are fired from the mouse into "space"
// window.addEventListener('click', function () {
//    bullets.push(new Bullet(mouse.x, mouse.y, 100))
// });

// // End Bullets


// TACO
// Sets image of taco to variable
var tacoImg = new Image();
tacoImg.src = "./taco.png";

// Create a taco object for taco images
function Taco(img, x, y) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.z = 100;
	this.w = 70;
	this.h = 70;
	this.dx = 0;
	this.dy = 0;
	this.dz = 60;
	this.tacoX = undefined;
	this.tacoY = undefined;
	this.tacoW = undefined;
	this.tacoH = undefined;
}

// Draws images of Taco object
Taco.prototype.draw = function () {
	c.drawImage(this.img, this.tacoX, this.tacoY, this.tacoW, this.tacoH);
};

// Calls draw function and updates position and velocity of Taco
Taco.prototype.update = function () {

	this.tacoX = (this.x - centerX) * (focalLength / this.z);
	this.tacoX += centerX;

	this.tacoY = (this.y - centerY) * (focalLength / this.z);
	this.tacoY += centerY;

	this.tacoW = this.w * (focalLength / this.z);
	this.tacoH = this.h * (focalLength / this.z);

	this.tacoX += this.dx;
	this.tacoY += this.dy;

	this.z += this.dz;

	if (this.z <= 0) {
		this.z = parseInt(innerWidth);
	}
	this.draw();
};

// tacos array that holds tacos fired from the mouse click
// tacos.update() gets called in the animate function on canvas.js
var tacos = [];

// // Upon mouse click tacos are fired from the mouse into "space"
window.addEventListener('click', function () {
	tacos.push(new Taco(tacoImg, mouse.x - 60, mouse.y - 60));
});

// END TACO


// HIPSTERS

// Sets images of hipsters to variables
var hipsterOne = new Image();
hipsterOne.src = "./hipsterOne.png";

var hipsterTwo = new Image();
hipsterTwo.src = "./hipsterTwo.png";

var hipsterThree = new Image();
hipsterThree.src = "./hipsterThree.png";

// Create a Hipster object for hipster images
function Hipster(imgHipster, x, y) {
	this.imgHipster = imgHipster;
	this.x = x;
	this.y = y;
	this.z = 3000;
	this.w = 100;
	this.h = 100;
	this.dx = 0;
	this.dy = 0;
	this.dz = -6;
	this.hipsterW = undefined;
	this.hipsterH = undefined;
	this.hipsterX = undefined;
	this.hipsterY = undefined;
}

// Draws images of Hipster object
Hipster.prototype.draw = function () {
	c.drawImage(this.imgHipster, this.hipsterX, this.hipsterY, this.hipsterW, this.hipsterH);
};

// Calls draw function and updates position and velocity of hipster
Hipster.prototype.update = function () {

	this.hipsterX = (this.x - centerX) * (focalLength / this.z);
	this.hipsterX += centerX;

	this.hipsterY = (this.y - centerY) * (focalLength / this.z);
	this.hipsterY += centerY;

	this.hipsterW = this.w * (focalLength / this.z);
	this.hipsterH = this.h * (focalLength / this.z);

	this.hipsterX += this.dx;
	this.hipsterY += this.dy;

	this.z += this.dz;

	if (this.z <= 0) {
		this.z = parseInt(innerWidth);
	}
	this.draw();
};

// Creates new Hipster objects and sets to variables
var hipOne = new Hipster(hipsterOne, 200, 400);
var hipTwo = new Hipster(hipsterTwo, 500, 200);
var hipThree = new Hipster(hipsterThree, 600, 500);
console.log(hipOne);

// Pushes all Hipster objects into array of hipsters
var hipsters = [];
hipsters.push(hipOne);
hipsters.push(hipTwo);
hipsters.push(hipThree);

// END HIPSTERS


// function to animate objects
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = "#000";
	c.fillRect(0, 0, innerWidth, innerHeight);

	// Draws Stars
	for (var _i in stars) {
		stars[_i].update();
	}

	// // HIPSTERS
	for (var _i2 = 0; _i2 < hipsters.length; _i2++) {
		hipsters[_i2].update();
	}

	// function starShip draws green circle attached to mouse
	tacoTruck();

	// Shoots bullets
	for (var _i3 = 0; _i3 < tacos.length; _i3++) {
		tacos[_i3].update();
	}
}

animate();

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map