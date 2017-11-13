var canvas = document.getElementById('canvas')
  , ctx = canvas.getContext('2d')
  , center = {x: canvas.width / 2, y: canvas.height / 2};

var blocks = [];

canvas.width = window. innerWidth - 20;
canvas.height = window.innerHeight - 20;
canvas.imageSmoothingEnabled = true;

window.onload = () => {
  window.onresize = (event) => {
    canvas.width = canvas.width = window.innerWidth - 10;
    canvas.height = canvas.height = window.innerHeight - 10;
    center = {x: canvas.width / 2, y: canvas.height / 2};

    blocks = [];
    drawBlocks(100);
  };

  drawBlocks(100);
  loop();
}

function loop() {
  requestAnimationFrame(loop);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < blocks.length; i++) {
    const occurence = 0.00005;
    if(randomNumBias(0, 1, 0, 1) < occurence) {
      console.log('hi')
      blocks[i].extrude();
    }

    blocks[i].update();
  }
}

function Block(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.dy = 0;
  this.extrusion = 0;
  this.extrusionDepth = 10;

  this.draw = function() {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.height, this.width);
    ctx.stroke();

    if(this.extrusion != 0) {
      // Top Side
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.extrusion, this.y - this.extrusion);
      ctx.lineTo(this.x2 - this.extrusion, this.y - this.extrusion);
      ctx.lineTo(this.x + this.width, this.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Left Side
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.extrusion, this.y  - this.extrusion);
      ctx.lineTo(this.x - this.extrusion, this.y2 - this.extrusion);
      ctx.lineTo(this.x, this.y + height);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  this.update = function(){
    if(this.y > canvas.height) {
      this.y = roundTo((Math.random() * canvas.height), 45);
    }

    this.y += this.dy;
    this.x2 = this.x + this.height;
    this.y2 = this.y + this.width;

    this.draw();
  }

  this.extrude = function() {
    this.extrusion = 1;
  }
}

function drawBlocks(a) {
  for(var i=0; i <= a; ++i) {
    var x = roundTo(
      randomNumBias(0, canvas.width, 0.4, 2),
      40
    );
    var y = roundTo(
      randomNumBias(0, canvas.height, 0.4, 100),
      40
    );

    blocks.push(new Block(x, y, 40, 40));
  }
}

function roundTo(value, roundTo) {
  return Math.floor(value / roundTo) * roundTo;
}

function randomNumBias(min, max, bias, influence) {
   var random = Math.random() * (max - min) + min;
   var difference = random - bias;
   var mixer = Math.pow(Math.random(), influence);
   var toBeRemoved = difference * mixer;
   return random - toBeRemoved;
}
