var canvas = document.getElementById('canvas')
  , ctx = canvas.getContext('2d')
  , center = {x: canvas.width / 2, y: canvas.height / 2};

var blocks = []
  , gridBlocks = [];

canvas.width = window. innerWidth - 20;
canvas.height = window.innerHeight - 20;
canvas.imageSmoothingEnabled = true;

window.onload = () => {
  window.onresize = (event) => {
    canvas.width = canvas.width = window.innerWidth - 10;
    canvas.height = canvas.height = window.innerHeight - 10;
    center = {x: canvas.width / 2, y: canvas.height / 2};

    gridBlocks = [];
    drawGrid(100);
  };

  drawBlocks(25);
  drawGrid(100);
  loop();
}

function loop() {
  requestAnimationFrame(loop);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 1; i < blocks.length; i++){
    blocks[i].update();
  }

  for(var i = i; i < gridBlocks.length; i++) {
    gridBlocks[i].draw();
  }
}

function Block(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.draw = function() {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.height, this.width);
    ctx.stroke();
    ctx.restore();
  }
}

function FallingBlock(x, y, dx, blockWidth, blockHeight) {
  this.x = x;
  this.y = y;
  this.x2 = x + blockHeight;
  this.y2 = y + blockWidth;
  this.dx = dx;
  this.blockWidth = blockWidth;
  this.blockHeight = blockHeight;
  this.mod = 10;

  this.draw = function() {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#fb6aab';
    ctx.fillStyle = 'black';




    // Top Side
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.mod, this.y - this.mod);
    ctx.lineTo(this.x2 - this.mod, this.y - this.mod);
    ctx.lineTo(this.x + this.blockWidth, this.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Left Side
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.mod, this.y  - this.mod);
    ctx.lineTo(this.x - this.mod, this.y2 - this.mod);
    ctx.lineTo(this.x, this.y + blockHeight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Front Side
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.blockWidth, this.blockWidth);
    ctx.strokeRect(this.x, this.y, this.blockWidth, this.blockWidth);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }

  this.update = function(){
    if(this.y > canvas.height) {
      this.y = roundTo((Math.random() * canvas.height), 45);
    }

    this.y += this.dx;
    this.x2 = this.x + blockHeight;
    this.y2 = this.y + blockWidth;

    this.draw();
  }
}

function drawBlocks(a) {
  for (var i = 0; i <= a; ++i) {
    var x = roundTo(Math.floor(Math.random() * canvas.width), 40);
    var y = roundTo(Math.floor(Math.random() * canvas.height), 40);
    var dx = (Math.random() + 0.2 ) * 1;

    blocks.push(new FallingBlock(x, y, dx, 40, 40));
  }
}

function drawGrid(a) {
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
