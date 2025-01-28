// app.js
const button = document.querySelector('button');
const heading = document.querySelector('h1');
const paragraph = document.querySelector('p');

let themeIndex = 0;
const themes = [
    { bg: '#f3e8ff', primary: '#8b5cf6', text: '#1f2937' },
    { bg: '#ecfdf5', primary: '#10b981', text: '#064e3b' },
    { bg: '#fff7ed', primary: '#f97316', text: '#431407' },
    { bg: '#eff6ff', primary: '#3b82f6', text: '#172554' }
];

const messages = [
    "Welcome to the Matrix",
    "Reality is negotiable",
    "You're now in phase two",
    "Digital cosmos engaged"
];

button.addEventListener('click', (event) => {
    // Create ripple effect
    createRipple(event);
    
    // Change color theme
    const theme = themes[themeIndex % themes.length];
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--text', theme.text);
    document.body.style.backgroundColor = theme.bg;
    
    // Animate heading
    heading.style.transform = 'scale(1.1)';
    heading.style.animation = 'jump 0.5s ease';
    
    // Create floating particles
    createParticles(10);
    
    // Cycle through messages
    paragraph.innerHTML = messages[themeIndex % messages.length]
        .split(' ')
        .map(word => `<span class="word">${word}</span>`)
        .join(' ');
    
    // Reset animations
    setTimeout(() => {
        heading.style.transform = 'scale(1)';
        heading.style.animation = '';
    }, 500);

    themeIndex++;
});

function createRipple(event) {
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size/2;
    const y = event.clientY - rect.top - size/2;
    
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.4);
    `;
    
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function createParticles(count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: var(--primary);
            border-radius: 50%;
            left: ${event.clientX - 10}px;
            top: ${event.clientY - 10}px;
            pointer-events: none;
            animation: particle ${Math.random() * 0.5 + 0.5}s ease-out forwards;
        `;

        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 500);
    }
}

// Add keyframe animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes jump {
        0% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-20px) scale(1.2); }
        100% { transform: translateY(0) scale(1); }
    }

    @keyframes particle {
        to {
            transform: translate(
                ${Math.random() * 100 - 50}px,
                ${Math.random() * 100 - 50}px
            );
            opacity: 0;
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        animation: ripple 0.6s ease-out;
    }

    @keyframes ripple {
        from { transform: scale(0); opacity: 1; }
        to { transform: scale(2); opacity: 0; }
    }

    .word {
        display: inline-block;
        transition: 0.3s ease;
    }

    .word:hover {
        transform: rotate(3deg) scale(1.1);
        color: var(--primary);
        cursor: pointer;
    }
`;
document.head.appendChild(style);