const stripSize = 20;
const terrain = [];
let w;
let h;
let rows;
let columns;
let yoff = 0;

function setup() {
  createCanvas(1200, 600, WEBGL);
  w = width * 2;
  h = height * 1.5;
  rows = h / stripSize;
  columns = w / stripSize;

  yoff += 0.1;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for(let x = 0; x < columns; x++) {
      if (!terrain[x]) {
        terrain[x] = []
      }
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100)
      xoff += 0.2;
    }
    yoff += 0.2;
  }
}

function draw() {
  background(20);
  rotateX(PI/3);
  translate(-w/2, -h/2);
  stroke(255);
  noFill();

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for(let x = 0; x < columns; x++) {
      vertex(x * stripSize, y * stripSize, terrain[x][y]);
      vertex(x * stripSize, (y + 1) * stripSize, terrain[x][y + 1]);
    }
    endShape();
  }
}