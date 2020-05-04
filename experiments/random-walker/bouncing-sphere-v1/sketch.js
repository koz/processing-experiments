let p;
let v;
let cOff = 0

function setup() {
  p = createVector(0, 0, 0);
  v = createVector(1, 1, 1);

  createCanvas(1200, 600, WEBGL);
  colorMode(HSL);
}

function draw() {
  background(20);
  noStroke();
  fill(map(noise(cOff), 0, 1, 0, 255), 50, 50)
  translate(p.x, p.y, p.z);

  const w = width / 2
  const h = height / 2
  if (p.x >= w || p.x <= w * -1) {
    v.x = v.x * -1;
  }
  if (p.y >= h || p.y <= h * -1) {
    v.y = v.y * -1;
  }
  if (p.z >= 200 || p.z <= -500) {
    v.z = v.z * -1;
  }
  p.add(v)
  sphere(40, 12, 12);
  fill(255)

  cOff += 0.01;
}