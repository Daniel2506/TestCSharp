var speed = 50;
var avance = 8;
var floor = 267;
var loop;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var modal =  $('#modal');
var nObstacles = 600;
//  Class
class Dummy {
    constructor()
    {

    }

    collision (other)
    {
        return false;
    }
}

class World {
    constructor()
    {
        this.x = 0;
        this.y = floor;
        this.tamano = 15000;
        this.espacio = 32;
        this.img = document.createElement("img");
        this.img.src = "img/mundo.png";
    }

    draw ()
    {
        var tx = this.x;
        for (var i = 0; i < this.tamano; i++) {
            ctx.drawImage(this.img, tx, this.y);
            tx += this.espacio;
        }
    }

    move()
    {
        this.x -= avance;
    }
}
class Dinosaur extends Dummy {
    constructor() {
        super();
        this.x = 35;
        this.w = 100;
        this.h = 106;
        this.y = floor - this.h;
        this.img = document.createElement("img");
        this.img.src = "img/Ballena_azul.png";
    }
    draw(){
        ctx.drawImage(this.img, this.x, this.y);
    }


}

class Obstacles extends Dummy {
    constructor(x) {
        super();
        this.x = x;

        this.hmin = 25;
        this.hmax = 40;

        this.h = this.generateNumber(this.hmin, this.hmax);
        console.log(this.h);
        this.w = this.h * (0.58);
        this.y = floor - this.h;

        this.min = 1;
        this.max = 3;
        this.n = this.generateNumber(this.min, this.max);
        console.log(this.n);

        this.dmin = 250;
        this.dmax = 400;
        this.d = this.generateNumber(this.dmin, this.dmax);

        this.next = null;

        this.img = document.createElement("img");
        this.img.src = "img/cactus.png";
    }

    generateNumber(a,b){
        return Math.floor((Math.random() * b) + a );
    }

    draw(){
        var tx = this.x;
        for (var i = 0; i < this.n; i++) {
            ctx.drawImage(this.img, tx, this.y, this.w, this.h);
            tx += this.w;
        }
        if (this.next != null) {
            this.next.draw();
        }
    }

    move(){

        this.x -= avance;

        if (this.next != null) {
            this.next.move();
        }
    }
    add(){
        if (this.next == null) {
            this.next = new Obstacles(this.x + this.d);
        }else{
            this.next.add();
        }
    }
}
var world = new World();
var rex = new Dinosaur();
var obstacles = new Obstacles(800);

for (i = 0; i < nObstacles; i++) {
    obstacles.add();
}

// Functions controller
var speedJump = 25;
var avanceJump = 5;
var checkJump = true;
var jump;

function up()
{
    rex.y -= avanceJump;
    if (rex.y <= 2)
    {
        clearInterval(jump);
        jump = setInterval("down()", speedJump);
    }
}


function down ()
{
    rex.y += avanceJump;
    if (rex.y >= (floor - rex.h) )
    {
        clearInterval(jump);
        checkJump = true;
    }
}

function startJump()
{
    jump = setInterval("up()", speedJump);
    checkJump = false;
}

//
$( "body" ).keyup(jump);
function jump (e)
{
    if (e.keyCode == 38 && checkJump) {
        startJump();
    }
}




// Function globals
function draw ()
{
    ctx.clearRect(0,0, width, height);
    world.draw();
    rex.draw();
    obstacles.draw();
}

function frame ()
{
    draw();
    world.move();
    obstacles.move();
}

function start ()
{
    // Ocultar modal
    modal.css('display', 'none');
    bucle = setInterval("frame()", speed);
}
