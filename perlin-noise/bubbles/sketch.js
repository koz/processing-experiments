let circles = []
let xOff = 0.01;
const border = 50;
const circleMaxSize = 50
const circleMinSize = 3
const fillChance = 0.2
const fillMaxSize = 10;

function setup() {
  createCanvas(800, 750);
  background(255);
  circles = [
    new Circle(width / 2, height / 2, getDiameter())
  ]
}

function draw() {
  xOff += 1;
  circles.forEach((circle, i) => {
    circle.draw()
    circle.seed();
  })
}

const getDiameter = () => map(noise(xOff), 0, 1, 3, circleMaxSize)

class Circle {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.fill = random() < fillChance && this.d < fillMaxSize
  }

  draw() {
    push()
    if (this.fill) {
      fill(0)
    }
    circle(this.x, this.y, this.d)
    pop()
  }

  seed() {
    this.seeded = true
    const newDiameter = getDiameter()
    const newX = map(random(), 0, 1, border + newDiameter / 2, width - border - newDiameter / 2)
    const newY = map(random(), 0, 1, border + newDiameter / 2, height - border - newDiameter / 2)
    const colision = circles.find(c => isColliding({
      x: newX,
      y: newY,
      d: newDiameter
    }, c))
    if (!colision) {
      circles.push(new Circle(newX, newY, newDiameter))
    }
  }
}

const isColliding = (circle1, circle2) => {
  const distX = circle1.x - circle2.x
  const distY = circle1.y - circle2.y
  const distance = sqrt(distX * distX + distY * distY)
  return distance <= circle1.d / 2 + circle2.d / 2 + 1
}