// ANIMATED TYPING EFFECT

const typingElement = document.getElementById("typing");

const words = [
    "Web Developer",
    "Video Editor",
    "Photo Editor",
    "Creative Designer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement) return;

    const word = words[wordIndex];

    typingElement.textContent = word.substring(0, charIndex);

    let delay = deleting ? 55 : 100;

    if (!deleting && charIndex < word.length) {
        charIndex++;
    } else if (!deleting) {
        deleting = true;
        delay = 1300;
    } else if (charIndex > 0) {
        charIndex--;
    } else {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();


// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});


// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => observer.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}


// ANIMATED PARTICLE BACKGROUND

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrame;
let canvasWidth = 0;
let canvasHeight = 0;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;

    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(
        65,
        Math.floor((canvasWidth * canvasHeight) / 18000)
    );

    particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45
    }));
}

function drawParticles() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvasWidth) {
            particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > canvasHeight) {
            particle.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(0, 229, 255, 0.7)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j];

            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 110) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);

                ctx.strokeStyle =
                    `rgba(139, 92, 246, ${0.15 * (1 - distance / 110)})`;

                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    });

    if (!reducedMotion) {
        animationFrame = requestAnimationFrame(drawParticles);
    }
}

resizeCanvas();

if (reducedMotion) {
    drawParticles();
} else {
    drawParticles();
}

window.addEventListener("resize", () => {
    cancelAnimationFrame(animationFrame);
    resizeCanvas();
    drawParticles();
});


// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();