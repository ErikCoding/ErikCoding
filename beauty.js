// Mobile menu functionality
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const menuBtn = document.querySelector(".mobile-menu-btn")

  if (mobileMenu.style.display === "block") {
    mobileMenu.style.display = "none"
    menuBtn.classList.remove("active")
  } else {
    mobileMenu.style.display = "block"
    menuBtn.classList.add("active")
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const menuBtn = document.querySelector(".mobile-menu-btn")

  mobileMenu.style.display = "none"
  menuBtn.classList.remove("active")
}

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }

      // Close mobile menu if open
      closeMobileMenu()
    })
  })
})

// Form submission handler
function handleFormSubmit(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const data = Object.fromEntries(formData)

  // Here you would typically send the data to your server
  console.log("Form submitted:", data)

  // Show success message
  alert("Dziękujemy za wysłanie formularza! Skontaktujemy się z Tobą w ciągu 24 godzin.")

  // Reset form
  event.target.reset()
}

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")

  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "none"
  }
})

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  const mobileMenu = document.getElementById("mobileMenu")
  const menuBtn = document.querySelector(".mobile-menu-btn")

  if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
    closeMobileMenu()
  }
})

// Newsletter form handler
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const email = this.querySelector('input[type="email"]').value

      if (email) {
        alert("Dziękujemy za zapisanie się do newslettera!")
        this.querySelector('input[type="email"]').value = ""
      }
    })
  }
})
