/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item');

accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector('.questions__header');

    accordionHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.accordion-open');

        if (openItem && openItem !== item) {
            toggleItem(openItem);
        }

        toggleItem(item);
    });
});

function toggleItem(item) {
    const accordionContent = item.querySelector('.questions__content');

    if (item.classList.contains('accordion-open')) {
        accordionContent.style.height = null;
        item.classList.remove('accordion-open');
    } else {
        accordionContent.style.height = accordionContent.scrollHeight + 'px';
        item.classList.add('accordion-open');
    }
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const navItem = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (navItem) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItem.classList.add('active-link');
            } else {
                navItem.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (window.scrollY >= 400) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

/*=============== DARK LIGHT THEME (DEFAULT DARK) ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

const selectedTheme = localStorage.getItem('selected-theme');

/* Default dark mode if no preference saved */
if (!selectedTheme || selectedTheme === 'dark') {
    document.body.classList.add(darkTheme);
    if (themeButton) themeButton.classList.add(iconTheme);
} else {
    document.body.classList.remove(darkTheme);
    if (themeButton) themeButton.classList.remove(iconTheme);
}

if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);

        localStorage.setItem(
            'selected-theme',
            document.body.classList.contains(darkTheme) ? 'dark' : 'light'
        );
    });
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400
});

sr.reveal('.home__data');
sr.reveal('.home__img', { delay: 500 });
sr.reveal('.home__social', { delay: 600 });
sr.reveal('.about__img, .contact__box', { origin: 'left' });
sr.reveal('.about__data, .contact__form', { origin: 'right' });
sr.reveal('.steps__card, .product__card, .questions__group, .footer', { interval: 100 });

/*================ CONTACT FORM SUBMISSION =================*/
document.getElementById("contact-form")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    try {
        const response = await fetch("http://localhost:8080/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.text();
        showToast(result, "success");
        document.getElementById("contact-form").reset();

    } catch (error) {
        showToast("Failed to send message", "error");
    }
});

/*================ NEWSLETTER SUBSCRIBE =================*/
document.getElementById("subscribe-btn")?.addEventListener("click", async function () {
    const email = document.getElementById("subscriber-email").value;

    try {
        const response = await fetch("http://localhost:8080/api/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const result = await response.text();
        showToast(result, "success");
        document.getElementById("subscriber-email").value = "";

    } catch (error) {
        showToast("Subscription failed", "error");
    }
});

/*================ LOAD PRODUCTS =================*/
async function loadProducts() {
    try {
        const response = await fetch("http://localhost:8080/api/products");
        const products = await response.json();

        const container = document.getElementById("product-container");
        if (!container) return;

        container.innerHTML = "";

        products.forEach(product => {
            container.innerHTML += `
                <article class="product__card">
                    <div class="product__circle"></div>
                    <img src="${product.imageUrl}" class="product__img" alt="${product.name}">
                    <h3 class="product__title">${product.name}</h3>
                    <span class="product__price">₹${product.price}</span>
                </article>
            `;
        });
    } catch (error) {
        console.error("Failed to load products", error);
    }
}

loadProducts();

/*================ TOAST =================*/
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.className = "toast show";

    if (type === "error") {
        toast.classList.add("error");
    }

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}