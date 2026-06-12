// Reveal on scroll

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.16,
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// Typewriter effect

const typewriterElement = document.querySelector("[data-typewriter]");

if (typewriterElement) {
    const words = JSON.parse(typewriterElement.getAttribute("data-typewriter"));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typewriterElement.textContent = currentWord.substring(0, charIndex);

        let speed = isDeleting ? 45 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 1400;
            isDeleting = true;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 300;
        }

        setTimeout(type, speed);
    }

    type();
}