const celebrateButton = document.getElementById("celebrateButton");
const sliderContainer = document.getElementById("sliderContainer");
const slider = document.getElementById("slider");
const celebration = document.getElementById("celebration");
const fireworks = document.getElementById("fireworks");
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
let startX, moveX;

celebrateButton.addEventListener("click", () => {
    celebrateButton.style.display = "none";
    sliderContainer.style.display = "block";
});

// Touch events for mobile
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchmove', (e) => {
    moveX = e.touches[0].clientX;
});

slider.addEventListener('touchend', () => {
    if (startX - moveX > 50 && currentSlide < 2) { // Swipe left
        currentSlide++;
        updateSlider();
    } else if (moveX - startX > 50 && currentSlide > 0) { // Swipe right
        currentSlide--;
        updateSlider();
    }
});

// Click events for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    if (currentSlide === 2) {
        setTimeout(() => {
            startCelebration();
        }, 10000);
    }
}

function startCelebration() {
    sliderContainer.style.display = "none";
    celebration.style.display = "block";
    createFireworks();
    setInterval(createFireworks, 2000);
}

function createFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement("div");
            firework.className = "firework";
            
            const x = (Math.random() - 0.5) * 300;
            const y = -(Math.random() * 300 + 100);
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            firework.style.setProperty('--x', `${x}px`);
            firework.style.setProperty('--y', `${y}px`);
            firework.style.setProperty('--color', color);
            firework.style.left = `${Math.random() * 100}%`;
            
            fireworks.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 100);
    }
}
  