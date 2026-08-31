const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];
const particleCount = 200;
const mouse = { x: null, y: null, radius: 170 };

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor(x, y, color = null) {
    this.x = x || Math.random() * width;
    this.y = y || Math.random() * height;
    this.size = Math.random() * 3 + 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.color = color || `hsl(${Math.random() * 60 + 180}, 100%, 70%)`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    if (mouse.x !== null && mouse.y !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        let force = (mouse.radius - distance) / mouse.radius;
        let directionX = dx / distance;
        let directionY = dy / distance;
        this.x += directionX * force * 5;
        this.y += directionY * force * 5;
      }
    }
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

window.addEventListener('click', (e) => {
  for (let i = 0; i < 25; i++) {
    const burstColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
    const p = new Particle(e.x, e.y, burstColor);
    p.vx = (Math.random() - 0.5) * 8;
    p.vy = (Math.random() - 0.5) * 8;
    particles.push(p);
    if (particles.length > particleCount + 100) particles.shift();
  }
});

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 110) {
        let opacity = 1 - (distance / 110);
        ctx.strokeStyle = `rgba(0, 242, 254, ${opacity * 0.25})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  connectParticles();
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

animate();