var canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var tx  =  canvas.width;
var ty = canvas.height;
var ctx = canvas.getContext('2d');

var mousex = 0;
var mousey = 0;
const gravity = 0.99;

addEventListener('mousemove',function(event){//event has to be set as a parameter in modern JS.
    mousex = event.clientX; // Output: x-coordenates of mouse pointer inside window.
    mousey = event.clientY; // Output: y-coordenates of mouse pointer inside window.
    
});

function randomColor(){
    // Math.round() is used because rgba only accepts integers(?)
    let color = 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.random() +')';
    return color;
}
class Ball {
    constructor() {
        this.color = randomColor();
        this.radius = Math.random() * 20 + 14; // Creates a ball with random radius between 20 and 34
        this.startRadius = this.radius; // this property was created with the intention of remebering the initial radius.
        this.x = Math.random() * (tx - this.radius * 2) + this.radius;
        // (tx-this.radius*2) --> scales the x-coordante of the ball wherever it does not exceed the canvas boundaries.
        // + this.radius --> sets the center of the ball wherever it does not exceed the left canvas boundary
        this.y = Math.random() * (ty - this.radius * 2);
        // (tx-this.radius*2) --> Not necessary to specify the bottom edge as the animation() function takes care of it.
        this.dx = Math.random() * 5; // Horizontal Speed. This variable will update the circle's center of the next frame. All the ball will go to the right until they hit the right edge.
        this.dy = Math.random() * 2; // Vertical speed. This variable will update the circle's center of the next frame.
        this.vel = Math.random() / 5; // This will "add" to the new vertical position until making it positive again towards to the ground.

        // This is basically the gravity aceleration representation.
        this.update = function () {
            ctx.beginPath(); //Asures the ball is an independent path. good practice
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); // draws a circle (centerX, centerY, radius, startpoint, endpoint)
            ctx.fillStyle = this.color;
            ctx.fill(); // Fills the circle. This is also the way of setting a plain background, but with rectangles.
        };
    }
}

var balls = [];
for (let i = 0; i < 2; i++){
    balls.push(new Ball());
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, tx, ty);
    for(let i = 0; i < balls.length; i++){
        balls[i].update();
        //balls[i].x += balls[i].dx;
        balls[i].y += balls[i].dy;
        if(balls[i].y + balls[i].radius >= ty){
            balls[i].dy = - balls[i].dy * gravity;
        } else{
            balls[i].dy += balls[i].vel;
        }
    }    
    
}

animate();









