var canvas = document.getElementById('canvas')
  , ctx = canvas.getContext('2d')
  , center = {x: canvas.width / 2, y: canvas.height / 2};

var gridBlocks = [];

canvas.width = window. innerWidth - 20;
canvas.height = window.innerHeight - 20;
canvas.imageSmoothingEnabled = true;

window.onload = () => {
  window.onresize = (event) => {
    canvas.width = canvas.width = window.innerWidth - 10;
    canvas.height = canvas.height = window.innerHeight - 10;
    center = {x: canvas.width / 2, y: canvas.height / 2};

    gridBlocks = [];
    drawBlocks(100);
  };

  drawBlocks(100);
  loop();
}

function loop() {
  requestAnimationFrame(loop);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for(var i = i; i < gridBlocks.length; i++) {
    gridBlocks[i].update();
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
      ctx.lineTo(this.x + this.blockWidth, this.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Left Side
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.extrusion, this.y  - this.extrusion);
      ctx.lineTo(this.x - this.extrusion, this.y2 - this.extrusion);
      ctx.lineTo(this.x, this.y + blockHeight);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  this.extrude = function() {
    this.extrusion = 1;
  }

  this.update = function(){
    if(this.y > canvas.height) {
      this.y = roundTo((Math.random() * canvas.height), 45);
    }

    this.y += this.dy;
    this.x2 = this.x + blockHeight;
    this.y2 = this.y + blockWidth;

    this.draw();
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
    gridBlocks.push(new Block(x, y, 40, 40));
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
