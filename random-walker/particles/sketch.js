const particlesQty = 50
const particleSize = 10
const minimalDistance = 70
let particles;

function setup() {
  createCanvas(600, 600);
  noStroke()
  particles = Array(particlesQty).fill(null).map((_, i, a) => {
    let x = map(random(), 0, 1, 0, width)
    let y = map(random(), 0, 1, 0, height)

    while (a.find((item) => item && item.x === x && item.y === y)) {
      x = map(random(), 0, 1, 0, width)
      y = map(random(), 0, 1, 0, height)
    }
    return new Particle(x, y, i)
  })
}

function draw() {
  background(220);
  for (let i = 0; i < particlesQty; i++) {
    particles[i].update()
    particles[i].display()
  }
  for (let i = 0; i < particlesQty; i++) {
    particles[i].connect()
  }
}

class Particle {
  constructor(x, y, i) {
    this.pos = createVector(x, y)
    this.vel = createVector(random([0.2, -0.2]), random([0.2, -0.2]));
    this.closests = [];
    this.id = i
  }

  update() {
    if (this.pos.x + this.vel.x > width || this.pos.x + this.vel.x < 0) {
      this.vel.x *= -1
    }
    if (this.pos.y + this.vel.y > height || this.pos.y + this.vel.y < 0) {
      this.vel.y *= -1
    }
    this.pos.add(this.vel);

    particles.forEach(item => {
      if (item.id === this.id) {
        return
      }

      if (this.pos.dist(item.pos) <= minimalDistance) {
        this.closests = this.closests.filter(c => this.pos.dist(c.pos) > minimalDistance)
        this.closests.push(item)
      } else {
        this.closests = this.closests.filter(c => c.id !== item.id)
      }
    })
  }

  display() {
    fill('rgba(0%,0%,0%, 0.2)')
    circle(this.pos.x, this.pos.y, 10)
  }

  connect() {
    stroke(180)
    this.closests.forEach(item => (
      line(this.pos.x, this.pos.y, item.pos.x, item.pos.y)
    ))
  }
}