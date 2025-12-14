
// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenu.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

function closeMenu() {
    navLinks.classList.remove('active');
    const icon = mobileMenu.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// Sticky Header Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Smooth Reveal Animation on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// --- Magnetic Particles System ---
// --- Magnetic Particles System (Technical Words) ---
const initParticles = () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1'; // Behind content
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const techWords = [
        'HTML', 'CSS', 'JS', 'React', 'Node', 'Python', 'AI', 'ML', 'Data',
        'Cloud', 'Git', 'Code', 'API', 'JSON', 'SQL', 'NoSQL', 'DevOps',
        'Docker', 'AWS', 'Azure', 'Linux', 'Sudo', 'Bash', 'Vim', 'Nano',
        'HTTP', 'REST', 'GraphQL', 'Tensor', 'Torch', 'Keras', 'Pandas',
        'NumPy', 'Scikit', 'OpenCV', 'LLM', 'GPT', 'BERT', 'Transformer',
        'Vision', 'NLP', 'RL', 'GAN', 'LSTM', 'RNN', 'CNN', 'Algorithm'
    ];

    // Mouse tracking
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // Handle Resize
    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initTechParticles();
    };

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.size = Math.random() * 10 + 10; // Font size 10-20
            this.text = techWords[Math.floor(Math.random() * techWords.length)];
            this.color = 'rgba(125, 211, 252, 0.35)'; // Increased visibility
        }

        draw() {
            ctx.font = `${this.size}px 'Space Grotesk'`;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        }

        update() {
            // Move
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off walls
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse Interaction (Antimagnetic / Repulsion)
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * 5;
                const directionY = forceDirectionY * force * 5;

                // Move AWAY from mouse by subtracting the vector that points TO the mouse
                this.x -= directionX;
                this.y -= directionY;
            }

            this.draw();
        }
    }

    const initTechParticles = () => {
        particles = [];
        // Fewer particles since words take more space
        let numberOfParticles = (width * height) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        particles.forEach(particle => {
            particle.update();
        });
    };

    window.addEventListener('resize', resize);
    resize();
    animate();
};

// Initialize particles
initParticles();

// --- Typing Effect for Home Page ---
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "Karan Prajapati.";
        let charIndex = 0;
        typingElement.textContent = ""; // Clear initial

        function typeWriter() {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 150); // Typing speed
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
});