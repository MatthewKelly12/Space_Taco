// let radius = 1;
// let starX = null;
// let starY = null;
// let starRadius = null;
// let starX_dir = 0;
// let starY_dir = 0;
// let numStar = 2000;
// let stars = [];

// *** moved from canvasjs to make work
// let TWO_PI = Math.PI * 2;
// let centerX = innerWidth / 2;
// let centerY = innerHeight / 2;
// let focalLength = 400


// Constructor function for stars background
// function star(x, y, z) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//     this.radius = radius;
//     this.color = "#fff"

	// Function that draws the stars
	// this.draw = function() {
	// 	c.beginPath();
	// 	c.arc(starX, starY, starRadius, TWO_PI, false);
	// 	c.fillStyle = this.color;
	// 	c.fill();
	// 	c.closePath();
	// }

	// Adds travel and depth to stars with focal length formula
    // this.update = function () {
    //     starX = (this.x - centerX) * (focalLength / this.z)
    //     starX += centerX;

    //     starY = (this.y - centerY) * (focalLength / this.z)
    //     starY += centerY;

    //     starRadius = radius * (focalLength / this.z);

		// Adds slight movement of stars background
		// upon mousemove
        // starX += starX_dir;
        // starY += starY_dir;

		// Makes stars move "into space"
		// this.z += -20;

		// Redirects stars to start over
        // if (this.z <= 0) {
        	// this.z = parseInt(innerWidth)
        // }
//         this.draw();
// 	}

// }

// X, Y, Z Values for stars
// stars get pushed into stars array
// for (let i = 0; i < numStar; i++) {
//     let x = Math.random() * innerWidth;
//     let y = Math.random() * innerWidth;
//     let z = Math.random() * innerWidth;
//     stars.push(new star(x,y,z));
// }
// Stars copied
// let radius = 1;
// let starX = null;
// let starY = null;
// let starRadius = null;
// let starX_dir = 0;
// let starY_dir = 0;




module.exports = Star