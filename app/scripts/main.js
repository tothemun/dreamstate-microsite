let canvas = document.getElementById('canvas')
  , ctx = canvas.getContext('2d')
  , center = {x: canvas.width / 2, y: canvas.height / 2};

let blocks = [];

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
      blocks[i].extrude();
    }

    blocks[i].update();
  }
}

class Block {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dy = 0;
    this.extrusion = 0;
    this.extrusionDepth = 10;
  }

  draw() {
    const { extrusion, height, width, x, x2, y, y2 } = this;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x, y, height, width);
    ctx.stroke();

    if(extrusion != 0) {
      // Top Side
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - extrusion, y - extrusion);
      ctx.lineTo(x2 - extrusion, y - extrusion);
      ctx.lineTo(x + width, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Left Side
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - extrusion, y  - extrusion);
      ctx.lineTo(x - extrusion, y2 - extrusion);
      ctx.lineTo(x, y + height);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  update() {
    const { draw, dy, x, y} = this;
    let { x2, y2 } = this;

    if(y > canvas.height) {
      y = roundTo((Math.random() * canvas.height), 45);
    }

    y += dy;
    x2 = x + height;
    y2 = y + width;

    draw();
  }

  extrude() {
    this.extrusion = 1;
  }
}

function drawBlocks(a) {
  for(let i = 0; i <= a; ++i) {
    const x = roundTo(
      randomNumBias(0, canvas.width, 0.4, 2),
      40
    );
    const y = roundTo(
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
   const random = Math.random() * (max - min) + min;
   const difference = random - bias;
   const mixer = Math.pow(Math.random(), influence);
   const toBeRemoved = difference * mixer;
   return random - toBeRemoved;
}
