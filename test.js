// app.js
const button = document.querySelector('button');
const heading = document.querySelector('h1');
const paragraph = document.querySelector('p');

let clickCount = 0;

button.addEventListener('click', () => {
    // 1. Change text content
    clickCount++;
    heading.textContent = `Clicked ${clickCount} times!`;
    
    // 2. Add temporary color change to button
    button.style.backgroundColor = '#4CAF50'; // Green color
    setTimeout(() => {
        button.style.backgroundColor = '#3B82F6'; // Original color
    }, 200);
    
    // 3. Simple bounce animation for heading
    heading.style.animation = 'bounce 0.5s';
    
    // 4. Change paragraph text randomly
    const messages = [
        "You discovered something new!",
        "JavaScript is fun!",
        "Keep clicking!",
        "Learning web development!"
    ];
    paragraph.textContent = messages[Math.floor(Math.random() * messages.length)];
});

// Reset animation after it completes
heading.addEventListener('animationend', () => {
    heading.style.animation = '';
});