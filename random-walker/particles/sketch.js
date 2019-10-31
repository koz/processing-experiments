const particlesQty = 40
const particleSize = 10
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
    this.closest;
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

      if (!this.closest) {
        this.closest = item
        return
      } else {
        if (this.pos.dist(item.pos) < this.pos.dist(this.closest.pos)) {
          this.closest = item
        }
      }
    })
  }

  display() {
    fill('rgba(0%,0%,0%, 0.2)')
    circle(this.pos.x, this.pos.y, 10)
  }

  connect() {
    if (this.closest) {
      stroke(180)
      line(this.pos.x, this.pos.y, this.closest.pos.x, this.closest.pos.y)
    }
  }
}