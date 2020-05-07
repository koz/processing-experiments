let xoff = 0;
const yVariant = 0.5
const yStart = 2.2

function setup() {
  createCanvas(790, 1120);
}

function draw() {
  background(255);
  noFill();
  stroke(0);
  for (y = yStart; y < height; y += yStart) {
    let xStop;
    beginShape()
    for (x = 0; x < width; xStop ? x += map(noise(xoff), 0, 1, 1, 3) : x++) {
      xStop = null
      vertex(x, map(noise(xoff), 0, 1, y, y + yVariant))
      xoff += 0.5;
      if (random(0) > 0.9) {
        xStop = true;
        endShape();
        beginShape();
      }
    }
    endShape()
  }
  noLoop()
}