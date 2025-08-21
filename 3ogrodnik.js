let isMenuOpen = false;
const navbar = document.getElementById("navbar");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const contactForm = document.getElementById("contact-form");

// Funkcja toggle menu
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle("open", isMenuOpen);
    menuIcon.classList.toggle("hidden", isMenuOpen);
    closeIcon.classList.toggle("hidden", !isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
}

// Smooth scroll do sekcji
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = navbar.offsetHeight;
        const top = section.offsetTop - navbarHeight;
        window.scrollTo({ top, behavior: "smooth" });
    }
    if (isMenuOpen) toggleMenu();
}

// Po załadowaniu strony
document.addEventListener("DOMContentLoaded", () => {
    // Toggle menu
    document.querySelectorAll(".menu-toggle").forEach(btn => {
        btn.addEventListener("click", toggleMenu);
    });

    // Przycisk scroll
    document.querySelectorAll("button[data-section]").forEach(btn => {
        btn.addEventListener("click", () => scrollToSection(btn.dataset.section));
    });

    // Zamknięcie menu po kliknięciu poza
    document.addEventListener("click", e => {
        if (isMenuOpen && !e.target.closest("#mobile-menu") && !e.target.closest(".menu-toggle")) toggleMenu();
    });

    // Formularz kontaktowy
    if (contactForm) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();
            console.log("Formularz wysłany!");
            alert("Formularz wysłany! (symulacja)");
        });
    }
});