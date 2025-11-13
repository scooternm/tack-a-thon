function createLights() {
    const container = document.querySelector('.lights-container');
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    const flashes = ['flash-1', 'flash-2', 'flash-3'];
    const spacing = 40;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let currentTrack = 0;
    let isPlaying = false;  
    
    for (let x = 20; x < viewportWidth - 20; x += spacing) {
        const light = document.createElement('div');
        light.className = `light light-top light-${colors[Math.floor(Math.random() * colors.length)]} ${flashes[Math.floor(Math.random() * flashes.length)]}`;
        light.style.left = x + 'px';
        container.appendChild(light);
    }
    
    for (let x = 20; x < viewportWidth - 20; x += spacing) {
        const light = document.createElement('div');
        light.className = `light light-bottom light-${colors[Math.floor(Math.random() * colors.length)]} ${flashes[Math.floor(Math.random() * flashes.length)]}`;
        light.style.left = x + 'px';
        container.appendChild(light);
    }
    
    for (let y = 60; y < viewportHeight - 60; y += spacing) {
        const light = document.createElement('div');
        light.className = `light light-left light-${colors[Math.floor(Math.random() * colors.length)]} ${flashes[Math.floor(Math.random() * flashes.length)]}`;
        light.style.top = y + 'px';
        container.appendChild(light);
    }
    
    for (let y = 60; y < viewportHeight - 60; y += spacing) {
        const light = document.createElement('div');
        light.className = `light light-right light-${colors[Math.floor(Math.random() * colors.length)]} ${flashes[Math.floor(Math.random() * flashes.length)]}`;
        light.style.top = y + 'px';
        container.appendChild(light);
    }
}

createLights();

window.addEventListener('resize', () => {
    document.querySelector('.lights-container').innerHTML = '';
    createLights();
});

// Music Player
function animateEqualizer() {
    const bars = document.querySelectorAll('.eq-bar');
    setInterval(() => {
        if (isPlaying) {
            bars.forEach(bar => {
                const height = Math.random() * 35 + 10;
                bar.style.height = height + 'px';
            });
        }
    }, 150);
}

function togglePlay() {
    const btn = document.getElementById('playBtn');
    isPlaying = !isPlaying;
    btn.textContent = isPlaying ? '⏸' : '▶';
    btn.classList.toggle('playing');
    
    if (!isPlaying) {
        document.querySelectorAll('.eq-bar').forEach(bar => {
            bar.style.height = '5px';
        });
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    document.getElementById('track-name').textContent = tracks[currentTrack];
}

function previousTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    document.getElementById('track-name').textContent = tracks[currentTrack];
}

animateEqualizer();

let currentSlide = 0;
const messages = document.querySelectorAll('.chat-message');
const totalSlides = messages.length;
let autoPlayInterval;
let hasLoopedOnce = false;

document.getElementById('totalSlides').textContent = totalSlides;

function showSlide(n) {
    messages.forEach(msg => msg.classList.remove('active'));
    messages[currentSlide].classList.add('active');
    document.getElementById('currentSlide').textContent = currentSlide + 1;
}

function nextSlide() {
    currentSlide++;
    
    if (currentSlide >= totalSlides) {
        if (hasLoopedOnce) {
            clearInterval(autoPlayInterval);
            document.querySelector('.nav-buttons').classList.add('show');
            currentSlide = totalSlides - 1;
            return;
        } else {
            hasLoopedOnce = true;
            currentSlide = 0;
        }
    }
    
    showSlide(currentSlide);
}

function restartConversation() {
    currentSlide = 0;
    hasLoopedOnce = false;
    document.querySelector('.nav-buttons').classList.remove('show');
    showSlide(currentSlide);
    autoPlayInterval = setInterval(nextSlide, 4000);
}

function goToNextPage() {
    window.location.href = 'next-page.html';
}

autoPlayInterval = setInterval(nextSlide, 4000);

const audio = new Audio();
const tracks = [
    {
        name: "♫ Jingle Bells - Public Domain ♫",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        name: "♫ Deck The Halls - Classical ♫",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        name: "♫ Silent Night - Traditional ♫",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        name: "♫ We Wish You A Merry Christmas ♫",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
];
let currentTrack = 0;
let isPlaying = false;

audio.src = tracks[0].url;
audio.loop = false;

// Auto-play
audio.addEventListener('ended', () => {
    nextTrack();
});

function animateEqualizer() {
    const bars = document.querySelectorAll('.eq-bar');
    setInterval(() => {
        if (isPlaying) {
            bars.forEach(bar => {
                const height = Math.random() * 35 + 10;
                bar.style.height = height + 'px';
            });
        } else {
            bars.forEach(bar => {
                bar.style.height = '5px';
            });
        }
    }, 150);
}

function togglePlay() {
    const btn = document.getElementById('playBtn');
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        audio.play().catch(e => {
            console.log("Audio play failed:", e);
            isPlaying = false;
            btn.textContent = '▶';
        });
        btn.textContent = '⏸';
        btn.classList.add('playing');
    } else {
        audio.pause();
        btn.textContent = '▶';
        btn.classList.remove('playing');
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    audio.src = tracks[currentTrack].url;
    document.getElementById('track-name').textContent = tracks[currentTrack].name;
    if (isPlaying) {
        audio.play();
    }
}

function previousTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    audio.src = tracks[currentTrack].url;
    document.getElementById('track-name').textContent = tracks[currentTrack].name;
    if (isPlaying) {
        audio.play();
    }
}
document.getElementById('track-name').textContent = tracks[0].name;
document.getElementById('playBtn').textContent = '▶';
document.getElementById('playBtn').classList.remove('playing');

animateEqualizer();