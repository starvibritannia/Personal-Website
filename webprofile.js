// --- Efek Mengetik ---
const typedTextSpan = document.querySelector(".typing-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Developer", "Gamer", "Student", "Freelancer"];
const typingDelay = 150;
const erasingDelay = 100;
const newTextDelay = 2000; // Jeda sebelum mengetik kata berikutnya
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // Mulai saat halaman dimuat
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});


// --- Navigasi Mobile (Burger Menu) ---
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    // Ubah ikon burger menjadi 'X' (opsional, bisa ditambahkan nanti)
});

// Tutup menu saat link diklik
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
    });
});


// --- Ubah Background Header saat Scroll ---
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 251, 245, 0.95)'; // Warna background sedikit transparan
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'transparent';
        header.style.boxShadow = 'none';
    }
});
// =========================================
// PARTICLE NETWORK ANIMATION
// =========================================
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Konfigurasi Partikel (Bisa diubah)
const particleColor = "rgba(122, 75, 29, 1)"; // Warna Coklat tema kamu
const lineColor = "rgba(122, 75, 29, 0.1)"; // Garis sangat tipis/pudar
const numberOfParticles = (canvas.width * canvas.height) / 15000; // Kepadatan partikel

// Class Partikel
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 1) - 0.5; // Kecepatan X lambat
        this.directionY = (Math.random() * 1) - 0.5; // Kecepatan Y lambat
        this.size = (Math.random() * 2) + 1; // Ukuran titik
    }

    // Gambar titik
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = particleColor;
        ctx.fill();
    }

    // Update posisi
    update() {
        // Pantulan dinding
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Inisialisasi
function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Menghubungkan titik dengan garis
function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                         + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            // Jika jarak dekat, gambar garis
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animasi Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Handle Resize Window
window.addEventListener('resize', 
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    }
);

// Jalankan
init();
animate();

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150; // Jarak toleransi sebelum muncul

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            // Hilangkan 'else' ini jika ingin animasi hanya terjadi sekali (tidak hilang saat scroll up)
            reveals[i].classList.remove("active"); 
        }
    }
}

// Menjalankan fungsi saat user meng-scroll halaman
window.addEventListener("scroll", reveal);

// Panggil sekali saat loading agar elemen paling atas langsung muncul
reveal();