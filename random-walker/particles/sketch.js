const particlesQty = 20
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
    return new Particle(x, y)
  })
}

function draw() {
  background(220);
  for (let i = 0; i < particlesQty; i++) {
    particles[i].update()
    particles[i].display()
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(random([0.2, -0.2]), random([0.2, -0.2]));
  }

  update() {
    if (this.pos.x + this.vel.x > width || this.pos.x + this.vel.x < 0) {
      this.vel.x *= -1
    }
    if (this.pos.y + this.vel.y > height || this.pos.y + this.vel.y < 0) {
      this.vel.y *= -1
    }
    this.pos.add(this.vel);
  }

  display() {
    fill('rgba(0%,0%,0%, 0.2)')
    circle(this.pos.x, this.pos.y, 10)
  }

}