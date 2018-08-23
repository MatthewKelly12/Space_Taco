// // Monsters
// // let monsterX = null;
// // let monsterY = null;
// // let monster_Final_Radius = null;
// // let monsterX_dir = 0;
// // let monsterY_dir = 0;
// // let monsterRadius = 20;


// // Constructor function for monsters/targets
// function Monster(x, y, z) {
//     this.x = x;
//     this.y = y;
// 	this.z = z;
// 	this.dx = 0;
//     this.dy = 0;
//     this.dz = -10;
//     this.radius = 20
// 	this.color = "blue"
// 	this.monsterRadius = undefined
// 	this.monsterX = undefined
// 	this.monsterY = undefined

// 	this.draw = function() {
// 		c.beginPath();
// 		c.arc(this.monsterX, this.monsterY, this.monsterRadius, TWO_PI, false);
// 		c.fillStyle = this.color;
// 		c.fill();
// 		c.closePath();
// 	}

// 	// Adds travel and depth to stars with focal length formula
//     this.update = function () {
//         this.monsterX = (this.x - centerX) * (focalLength / this.z)
//         this.monsterX += centerX;

//         this.monsterY = (this.y - centerY) * (focalLength / this.z)
//         this.monsterY += centerY;

//         this.monsterRadius = this.radius * (focalLength / this.z);

//         this.monsterX += this.dx;
//         this.monsterY += this.dy;

//         this.z += this.dz;

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

// // END MONSTERS