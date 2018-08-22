// let monsterX = null;
// let monsterY = null;
// let monster_Final_Radius = null;
// let monsterX_dir = 0;
// let monsterY_dir = 0;
// let monsterRadius = 20;


// // Constructor function for monsters/targets
// function Monster(x, y, z) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//     this.radius = monsterRadius;
//     this.color = "blue"

// 	this.draw = function() {
// 		c.beginPath();
// 		c.arc(monsterX, monsterY, monster_Final_Radius, TWO_PI, false);
// 		c.fillStyle = this.color;
// 		c.fill();
// 		c.closePath();
// 	}

// 	// Adds travel and depth to stars with focal length formula
//     this.update = function () {
//         monsterX = (this.x - centerX) * (focalLength / this.z)
//         monsterX += centerX;

//         monsterY = (this.y - centerY) * (focalLength / this.z)
//         monsterY += centerY;

//         monster_Final_Radius = monsterRadius * (focalLength / this.z);

//         monsterX += starX_dir;
//         monsterY += starY_dir;

//         this.z += -10;

//         if (this.z <= 0) {
//             this.z = parseInt(innerWidth)
//         }
//         this.draw();
//     }

// }

// let monsters = [];
// let monster1;

// // X, Y, Z Values for monsters/targets
// // gets pushed into monsters array
// for (let i = 0; i < 1; i++) {
//     let x = Math.random() * (innerWidth);
//     let y = Math.random() * (innerHeight);
//     let z = 2000
// 	monster1 = new Monster(x,y,z);
// 	monsters.push(monster1)
// }
