// Selectores de elementos
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuBars = mobileMenuButton.getElementsByTagName('span');
let isMenuOpen = false;

// Función para alternar el menú móvil
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    // Toggle menu visibility with animation
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('animate-fadeIn');
        // Transform hamburger to X
        menuBars[0].classList.add('rotate-45', 'translate-y-2');
        menuBars[1].classList.add('opacity-0');
        menuBars[2].classList.add('-rotate-45', '-translate-y-2');
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('animate-fadeIn');
        // Restore hamburger
        menuBars[0].classList.remove('rotate-45', 'translate-y-2');
        menuBars[1].classList.remove('opacity-0');
        menuBars[2].classList.remove('-rotate-45', '-translate-y-2');
    }
}

// Event Listeners
// Toggle menu on button click
mobileMenuButton.addEventListener('click', toggleMenu);

// Close menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// Close menu on screen resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isMenuOpen) {
        toggleMenu();
    }
});

// Smooth scroll para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});