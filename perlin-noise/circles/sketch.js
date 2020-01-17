const GAP = 3;
const LIMIT = 120;
let count;
let xoff;

function setup() {
  createCanvas(650, 650);
  noFill();
  count = 0;
  xoff = 0.0;
  background(0);
}

function draw() {
  stroke(255);
  if (count < LIMIT) {
    circle(width / 2, height / 1.3 - count * GAP, noise(xoff) * 120 + 120)
    count += 1
    xoff = xoff + 0.03;
  }
}