lucide.createIcons();

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const typingElement = document.getElementById('typing-effect');
const textToType = "Software Engineer & Innovator.";
let charIndex = 0;

function type() {
    if (charIndex < textToType.length) {
        typingElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(() => {
            charIndex = 0;
            typingElement.textContent = "";
            type();
        }, 3000);
    }
}
document.addEventListener('DOMContentLoaded', type);

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = document.documentElement.scrollHeight; 

let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#0891b2';
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, '#0891b2'));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

function updateCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
    initParticles();
}

window.addEventListener('resize', updateCanvasDimensions);
window.addEventListener('load', updateCanvasDimensions);


initParticles();
animateParticles();

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    revealObserver.observe(el);
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    const images = card.querySelectorAll('.project-image');
    const prevBtn = card.querySelector('.prev-btn');
    const nextBtn = card.querySelector('.next-btn');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.opacity = i === index ? '1' : '0';
        });
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    let autoSlideInterval = setInterval(() => {
        nextBtn.click();
    }, 5000);

    card.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    card.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            nextBtn.click();
        }, 5000);
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
             targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
       
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

