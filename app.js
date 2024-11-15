document.addEventListener('mousemove', (e) => {
    // Create a new light tracer element on each mousemove event
    const tracer = document.createElement('div');
    tracer.classList.add('light-tracer');
    tracer.style.left = `${e.pageX}px`;
    tracer.style.top = `${e.pageY}px`;

    document.body.appendChild(tracer);

    // Remove the tracer after a short time to create a fading effect
    setTimeout(() => {
        tracer.remove();
    }, 500); // Adjust time to control how long each tracer lasts
});
// Select all portfolio items
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Function to open modal
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        // Create modal elements
        const modal = document.createElement('div');
        modal.classList.add('portfolio-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                ${item.innerHTML} <!-- Clone portfolio item content -->
            </div>
        `;
        
        document.body.appendChild(modal);

        // Close modal when clicking the close button
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particle-container');
    document.body.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 20; i++) { // Adjust number of particles as needed
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.left = `${Math.random() * 100}vw`;
        particleContainer.appendChild(particle);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const portfolioSection = document.querySelector('.portfolio-section');
    const portfolioHeader = document.querySelector('.portfolio-section header h2');

    function handleScroll() {
        const sectionTop = portfolioSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop <= windowHeight / 1.3) { // Adjust threshold as needed
            portfolioHeader.classList.add('in-view');
            window.removeEventListener('scroll', handleScroll); // Remove listener after animation
        }
    }

    window.addEventListener('scroll', handleScroll);
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
class TypingEffect {
    constructor(elementId, options) {
        this.element = document.querySelector(elementId);
        this.strings = options.strings || [];
        this.typeSpeed = options.typeSpeed || 50;
        this.backSpeed = options.backSpeed || 30;
        this.startDelay = options.startDelay || 500;
        this.backDelay = options.backDelay || 700;
        this.loop = options.loop || false;
        this.cursorChar = options.cursorChar || '|';
        this.currentStringIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingComplete = false;

        this.init();
    }

    init() {
        this.addCursor();
        setTimeout(() => this.type(), this.startDelay);
    }

    type() {
        if (!this.element) return;

        const currentString = this.strings[this.currentStringIndex];
        let displayText = currentString.substring(0, this.currentCharIndex);

        if (this.isDeleting) {
            this.currentCharIndex--;
        } else {
            this.currentCharIndex++;
        }

        this.element.textContent = displayText;

        // Typing complete for the current string
        if (!this.isDeleting && this.currentCharIndex === currentString.length) {
            if (this.loop || this.currentStringIndex < this.strings.length - 1) {
                setTimeout(() => (this.isDeleting = true), this.backDelay);
            } else {
                this.typingComplete = true;
            }
        }

        // Backspacing complete
        if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentStringIndex =
                (this.currentStringIndex + 1) % this.strings.length;
        }

        if (!this.typingComplete) {
            const typingSpeed = this.isDeleting ? this.backSpeed : this.typeSpeed;
            setTimeout(() => this.type(), typingSpeed);
        }
    }

    addCursor() {
        if (!this.element) return;

        const cursor = document.createElement('span');
        cursor.textContent = this.cursorChar;
        cursor.style.marginLeft = '5px';
        cursor.style.animation = 'blink 0.7s infinite';
        this.element.parentNode.insertBefore(cursor, this.element.nextSibling);

        // Add cursor blinking animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the typing animation
document.addEventListener('DOMContentLoaded', () => {
    new TypingEffect('.input', {
        strings: ["Fullstack Developer", "UX Designer", "Web Developer"], // Updated text
        typeSpeed: 60,
        backSpeed: 30,
        startDelay: 500,
        backDelay: 1000,
        loop: true,
        cursorChar: '|',
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init("w8GzCox-PvoROy77z"); // Replace with your actual EmailJS User ID

    // Select the contact form
    const form = document.getElementById('contact-form');

    // Add a submit event listener to the form
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
        };

        // Send email through EmailJS
        emailjs.send("service_od4fx4t", "template_yyetbfl", formData)
            .then(() => {
                alert("Message sent successfully!");
                form.reset();
            })
            .catch(error => {
                console.error("Failed to send message:", error);
                alert(`Error: ${error.text || error}`);
            });
    });
});

