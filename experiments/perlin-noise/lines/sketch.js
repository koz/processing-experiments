let xoff = 0;
const yVariant = 2
const yStart = 10

function setup() {
  createCanvas(790, 1120);
}

function draw() {
  background(255);
  noFill();
  stroke(0);
  for (y = yStart; y < height; y += yStart) {
    beginShape()
    for (x = 0; x < width; x++) {
      vertex(x, map(noise(xoff), 0, 1, y, y + yVariant))
      xoff += 0.5;
    }
    endShape()
  }
  noLoop()
}