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
        this.img.src = "storage/mundo.png";
        //this.img = "../storage/mundo.png";
    }

    draw ()
    {
        var tx = this.x;
        for (var i = 0; i < this.tamano; i++) {
            console.log('world');
            ctx.drawImage(this.img, tx, this.y);
            tx += this.espacio;
        }
    }
}
var world = new World();

// Function globals
function draw ()
{
    ctx.clearRect(0,0, width, height);
    world.draw();
}

function frame ()
{
    draw();
}

function start ()
{
    // Ocultar modal
    console.log(this.modal);
    modal.css('display', 'none');
    bucle = setInterval("frame()", speed);
}
