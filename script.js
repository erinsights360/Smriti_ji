const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const bgMusic = document.getElementById('bgMusic');
const bgMusic2 = document.getElementById('bgMusic2');
const successMessage = document.getElementById('successMessage');
const initialContent = document.getElementById('initialContent');
const card = document.getElementById('mainCard');

// State
let yesBtnScale = 1;
let noClickCount = 0;

const noTexts = [
    "No 😢",
    "Plz... 🥺",
    "Man bhi jao naa... 😭",
    "Ek baar soch lo? 🤔",
    "Pakka?? 💔",
    "Dil mat todo... 💔",
    "Last chance! ⚠️",
    "Really? 🥺",
    "Please? 🌹",
    "Pretty please? 🍒",
    "I'll be very sad... 😿",
    "Cry aa jayega... 😭",
    "No chocolates? 🍫",
    "Heart broken... 💔",
    "Ab toh haan bol do! 😡",
    "PLEASEEEE!!! 😭"
];

// 1. Play Music on Load (or first interaction)
window.onload = function () {
    bgMusic.play().catch(e => {
        console.log("Autoplay failed, waiting for interaction");
        // Add one-time click listener as fallback
        document.body.addEventListener('click', () => {
            bgMusic.play();
        }, { once: true });
    });
};

// 2. Yes Button Click Handler
yesBtn.addEventListener('click', () => {
    bgMusic.pause();
    bgMusic2.currentTime = 0;
    bgMusic2.play().catch(e => console.log("Audio play failed:", e));;

    // Hide initial question group
    initialContent.style.display = 'none';

    // Show Success Message
    successMessage.classList.remove('hidden');
    successMessage.style.display = 'block';

    // Increase card size slightly
    card.style.maxWidth = "600px";

    // START EMOJI RAIN (Reduced intensity)
    createEmojiRain();
});

// 3. No Button Interaction Handler
noBtn.addEventListener('mouseover', handleNoInteraction);
noBtn.addEventListener('click', handleNoInteraction);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleNoInteraction();
});

function handleNoInteraction() {
    // 1. Update Text
    noClickCount++;
    const textIndex = Math.min(noClickCount, noTexts.length - 1);
    noBtn.innerText = noTexts[textIndex];

    // 2. Move Button
    moveNoButton();

    // 3. Increment Yes Button Scale (Slowly)
    yesBtnScale += 0.4;
    yesBtn.style.transform = `scale(${yesBtnScale})`;
}

function moveNoButton() {
    const yesRect = yesBtn.getBoundingClientRect();
    const yesCenterX = yesRect.left + yesRect.width / 2;
    const yesCenterY = yesRect.top + yesRect.height / 2;

    const noRect = noBtn.getBoundingClientRect();
    const w = noRect.width;
    const h = noRect.height;

    // Calculate exclusion zone
    const yesRadius = Math.max(yesRect.width, yesRect.height) / 2;

    const minD = yesRadius + (Math.max(w, h) / 2) + 30;
    const maxD = minD + 150;

    const angle = Math.random() * Math.PI * 2;
    const distance = minD + Math.random() * (maxD - minD);

    let newX = yesCenterX + Math.cos(angle) * distance - (w / 2);
    let newY = yesCenterY + Math.sin(angle) * distance - (h / 2);

    const padding = 20;
    const maxX = window.innerWidth - w - padding;
    const maxY = window.innerHeight - h - padding;

    newX = Math.max(padding, Math.min(maxX, newX));
    newY = Math.max(padding, Math.min(maxY, newY));

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;

    const rot = (Math.random() - 0.5) * 40;
    noBtn.style.transform = `rotate(${rot}deg)`;
}

// Emoji Rain (REDUCED to normal levels)
function createEmojiRain() {
    const emojis = ['💖', '❤️', '🌹', '🌸', '🌺', '✨'];

    const interval = setInterval(() => {

        // Spawn 1 emoji per interval (reduced from 3)
        const emoji = document.createElement('div');
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.top = '-50px';
        emoji.style.fontSize = Math.random() * 30 + 20 + 'px';
        emoji.style.zIndex = '1000';
        emoji.style.pointerEvents = 'none';
        emoji.style.userSelect = 'none';

        document.body.appendChild(emoji);

        const duration = Math.random() * 3 + 2;

        emoji.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        });

        setTimeout(() => emoji.remove(), duration * 1000);

    }, 150); // Increased interval from 30ms to 150ms for normal density

    setTimeout(() => clearInterval(interval), 20000); // Reduced from 40s to 20s
}

// Background Hearts
function createHearts() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 10 + 10 + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        container.appendChild(heart);
    }
}

createHearts();