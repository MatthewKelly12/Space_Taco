// let bulletX = null;
// let bulletY = null;
// let bullet_Final_Radius = null;
// let bulletRadius = 20;

// // Constructor function for bullets to be shot from the mouse
// function Bullet(x, y, z) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//     this.radius = bulletRadius;
//     this.color = "yellow"

// 	// Function that draws the bullet
// 	this.draw = function() {
// 		c.beginPath();
// 		c.arc(bulletX, bulletY, bullet_Final_Radius, TWO_PI, false);
// 		c.fillStyle = this.color;
// 		c.fill();
// 		c.closePath();
// 	}

// 	// Adds travel and depth to bullets with focal length formula
//     this.update = function () {
//         bulletX = (this.x - centerX) * (focalLength / this.z)
//         bulletX += centerX;

//         bulletY = (this.y - centerY) * (focalLength / this.z)
//         bulletY += centerY;

//         bullet_Final_Radius = bulletRadius * (focalLength / this.z);

// 		// Makes bullet move "into space"
//        	this.z += 75;

//     	this.draw();

// 		// Detects collision between bullets and monsters
// 		// Monsters turn orange upon collision
//         if (distance(this.x, this.y, monster1.x, monster1.y) < 100 && (this.z - monster1.z) >= 0) {
//             monster1.color = "orange";
//         }
//     }

// }

// // bullets array that holds bullets fired from the mouse click
// // bullets.update() gets called in the animate function on canvas.js
// let bullets = [];

// // Upon mouse click bullets are fired from the mouse into "space"
// window.addEventListener('click', function () {
//    bullets.push(new Bullet(mouse.x, mouse.y, 100))
// });
