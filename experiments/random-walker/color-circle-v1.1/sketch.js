let w;
const ellipseWidth = 48;
const ellipseHeight = 48;
const firstPosition = [ellipseWidth / 2, ellipseHeight / 2];
let currentHue;

function setup() {
  canvas = createCanvas(ellipseWidth * 18, ellipseWidth * 18);
  w = new Walker();
  currentHue = random(360);
  noStroke();
  background(0);
  colorMode(HSL);
  fill(currentHue, 100, 50);
}

function draw() {
  w.display();
  w.update();
}

function Walker() {
  this.xoff = 0
  this.axis = random([0, 1])
  this.direction = random([-1, 1])
  this.pos = createVector(...firstPosition);
  this.path = firstPosition

  this.display = function() {
    ellipse(this.pos.x, this.pos.y, ellipseWidth, ellipseHeight);
  };

  this.getNewPosition = function() {
    const params = [this.pos.x, this.pos.y]

    params[this.axis] = this.axis === 0 ? this.pos.x + (ellipseWidth * this.direction) : this.pos.y + (ellipseHeight * this.direction)
    return params
  }

  this.checkPositionValid = function (position) {
    return !(position[0] < 0 || position[1] < 0 || position[0] > width || position[1] > height || this.path.find(item => item[0] === position[0] && item[1] === position[1]))
  }

  this.update = function() {
    let params = this.getNewPosition()
    if (!this.checkPositionValid(params)) {
      this.direction = this.direction * -1;
      params = this.getNewPosition();
      if (!this.checkPositionValid(params)) {
        this.axis = this.axis === 0 ? 1 : 0;
        params = this.getNewPosition();
        if (!this.checkPositionValid(params)) {
          return
        }
      }
    }

    this.xoff += 0.05;
    currentHue = (currentHue + noise(this.xoff)) % 360
    fill(currentHue, 100, 50);
    this.path.push(params)
    const nextPosition = createVector(...params)
    this.pos = nextPosition
    this.axis = random([0, 1])
    this.direction = random([-1, 1])
  }
}