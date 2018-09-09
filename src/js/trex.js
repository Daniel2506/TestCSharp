var speed = 50;
var avance = 8;
var floor = 267;
var loop;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var modal =  $('#modal');

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
        this.img.src = "img/trex.png";
    }
    draw(){
        ctx.drawImage(this.img, this.x, this.y);
    }
}
var world = new World();
var rex = new Dinosaur();


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
}

function frame ()
{
    draw();
    world.move();
}

function start ()
{
    // Ocultar modal
    modal.css('display', 'none');
    bucle = setInterval("frame()", speed);
}
