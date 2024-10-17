let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;
let startX = 0;
let endX = 0;
const swipeThreshold = 50; // Minimum afstand voor een swipe (in pixels)
const autoSlideTime = 5000; // Automatisch verspringen na 5 seconden

// Functie om de huidige slide te tonen
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentSlide = index;
}

// Functie voor de volgende slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Functie voor de vorige slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Touch event handlers voor mobiel (swipen)
function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    endX = e.touches[0].clientX;
}

function handleTouchEnd() {
    if (startX - endX > swipeThreshold) {
        nextSlide(); // Swipe naar links
    } else if (endX - startX > swipeThreshold) {
        prevSlide(); // Swipe naar rechts
    }
    resetAutoSlide(); // Reset de auto-slide timer na een swipe
}

// Functie om auto-slide te starten
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, autoSlideTime);
}

// Functie om auto-slide te stoppen
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Reset auto-slide timer (wordt opgeroepen na handmatige interactie)
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Event listeners voor de dots (handmatige selectie)
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoSlide(); // Reset de auto-slide na handmatige selectie
    });
});

// Event listeners voor touch events op de slider voor mobiel
slides.forEach(slide => {
    slide.addEventListener('touchstart', handleTouchStart);
    slide.addEventListener('touchmove', handleTouchMove);
    slide.addEventListener('touchend', handleTouchEnd);
});

// Start de slider op de eerste slide en activeer auto-slide
showSlide(currentSlide);
startAutoSlide();
