// // /*=============== SHOW MENU ===============*/
// // const navMenu = document.getElementById('nav-menu'),
// //       navToggle = document.getElementById('nav-toggle'),
// //       navClose = document.getElementById('nav-close');

// // if (navToggle) {
// //     navToggle.addEventListener('click', () => {
// //         navMenu.classList.add('show-menu');
// //     });
// // }

// // if (navClose) {
// //     navClose.addEventListener('click', () => {
// //         navMenu.classList.remove('show-menu');
// //     });
// // }

// // /*=============== REMOVE MENU MOBILE ===============*/
// // const navLink = document.querySelectorAll('.nav__link');

// // function linkAction() {
// //     navMenu.classList.remove('show-menu');
// // }
// // navLink.forEach(n => n.addEventListener('click', linkAction));

// // /*=============== CHANGE BACKGROUND HEADER ===============*/
// // function scrollHeader() {
// //     const header = document.getElementById('header');
// //     if (window.scrollY >= 80) {
// //         header.classList.add('scroll-header');
// //     } else {
// //         header.classList.remove('scroll-header');
// //     }
// // }
// // window.addEventListener('scroll', scrollHeader);

// // /*=============== QUESTIONS ACCORDION ===============*/
// // const accordionItems = document.querySelectorAll('.questions__item');

// // accordionItems.forEach((item) => {
// //     const accordionHeader = item.querySelector('.questions__header');

// //     accordionHeader.addEventListener('click', () => {
// //         const openItem = document.querySelector('.accordion-open');

// //         if (openItem && openItem !== item) {
// //             toggleItem(openItem);
// //         }

// //         toggleItem(item);
// //     });
// // });

// // function toggleItem(item) {
// //     const accordionContent = item.querySelector('.questions__content');

// //     if (item.classList.contains('accordion-open')) {
// //         accordionContent.style.height = null;
// //         item.classList.remove('accordion-open');
// //     } else {
// //         accordionContent.style.height = accordionContent.scrollHeight + 'px';
// //         item.classList.add('accordion-open');
// //     }
// // }

// // /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// // const sections = document.querySelectorAll('section[id]');

// // function scrollActive() {
// //     const scrollY = window.pageYOffset;

// //     sections.forEach(current => {
// //         const sectionHeight = current.offsetHeight;
// //         const sectionTop = current.offsetTop - 58;
// //         const sectionId = current.getAttribute('id');
// //         const navItem = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

// //         if (navItem) {
// //             if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
// //                 navItem.classList.add('active-link');
// //             } else {
// //                 navItem.classList.remove('active-link');
// //             }
// //         }
// //     });
// // }
// // window.addEventListener('scroll', scrollActive);

// // /*=============== SHOW SCROLL UP ===============*/
// // function scrollUp() {
// //     const scrollUp = document.getElementById('scroll-up');
// //     if (window.scrollY >= 400) {
// //         scrollUp.classList.add('show-scroll');
// //     } else {
// //         scrollUp.classList.remove('show-scroll');
// //     }
// // }
// // window.addEventListener('scroll', scrollUp);

// // /*=============== DARK LIGHT THEME (DEFAULT DARK) ===============*/
// // const themeButton = document.getElementById('theme-button');
// // const darkTheme = 'dark-theme';
// // const iconTheme = 'ri-sun-line';

// // const selectedTheme = localStorage.getItem('selected-theme');

// // /* Default dark mode if no preference saved */
// // if (!selectedTheme || selectedTheme === 'dark') {
// //     document.body.classList.add(darkTheme);
// //     if (themeButton) themeButton.classList.add(iconTheme);
// // } else {
// //     document.body.classList.remove(darkTheme);
// //     if (themeButton) themeButton.classList.remove(iconTheme);
// // }

// // if (themeButton) {
// //     themeButton.addEventListener('click', () => {
// //         document.body.classList.toggle(darkTheme);
// //         themeButton.classList.toggle(iconTheme);

// //         localStorage.setItem(
// //             'selected-theme',
// //             document.body.classList.contains(darkTheme) ? 'dark' : 'light'
// //         );
// //     });
// // }

// // /*=============== SCROLL REVEAL ANIMATION ===============*/
// // const sr = ScrollReveal({
// //     origin: 'top',
// //     distance: '60px',
// //     duration: 2500,
// //     delay: 400
// // });

// // sr.reveal('.home__data');
// // sr.reveal('.home__img', { delay: 500 });
// // sr.reveal('.home__social', { delay: 600 });
// // sr.reveal('.about__img, .contact__box', { origin: 'left' });
// // sr.reveal('.about__data, .contact__form', { origin: 'right' });
// // sr.reveal('.steps__card, .product__card, .questions__group, .footer', { interval: 100 });

// // /*================ CONTACT FORM SUBMISSION =================*/
// // document.getElementById("contact-form")?.addEventListener("submit", async function (e) {
// //     e.preventDefault();

// //     const data = {
// //         email: document.getElementById("email").value,
// //         subject: document.getElementById("subject").value,
// //         message: document.getElementById("message").value
// //     };

// //     try {
// //         const response = await fetch("http://localhost:8080/api/contact", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify(data)
// //         });

// //         const result = await response.text();
// //         showToast(result, "success");
// //         document.getElementById("contact-form").reset();

// //     } catch (error) {
// //         showToast("Failed to send message", "error");
// //     }
// // });

// // /*================ NEWSLETTER SUBSCRIBE =================*/
// // document.getElementById("subscribe-btn")?.addEventListener("click", async function () {
// //     const email = document.getElementById("subscriber-email").value;

// //     try {
// //         const response = await fetch("http://localhost:8080/api/subscribe", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify({ email })
// //         });

// //         const result = await response.text();
// //         showToast(result, "success");
// //         document.getElementById("subscriber-email").value = "";

// //     } catch (error) {
// //         showToast("Subscription failed", "error");
// //     }
// // });

// // /*================ ESCAPE HTML TO PREVENT XSS =================*/
// // function escapeHtml(text) {
// //     const div = document.createElement('div');
// //     div.textContent = text;
// //     return div.innerHTML;
// // }

// // /*================ LOAD PRODUCTS FROM BACKEND API =================*/
// // async function loadProducts() {
// //     try {
// //         const response = await fetch("http://localhost:8080/api/products", {
// //             method: "GET",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             }
// //         });

// //         if (!response.ok) {
// //             throw new Error("Failed to fetch products");
// //         }

// //         const products = await response.json();

// //         const container = document.getElementById("product-container");
// //         if (!container) return;

// //         container.innerHTML = "";

// //         if (!Array.isArray(products) || products.length === 0) {
// //             container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #999;'>No products available</p>";
// //             return;
// //         }

// //         products.forEach(product => {
// //             // Safely handle image URL
// //             // const imageUrl = product.imageUrl || product.image || "https://via.placeholder.com/300?text=No+Image";
// //             const imageUrl = product.imageUrl 
// //     ? `http://localhost:8080${product.imageUrl}` 
// //     : "https://via.placeholder.com/300?text=No+Image";
// //             const safeName = escapeHtml(product.name);
// //             const safePrice = parseFloat(product.price).toFixed(2);
            
// //             container.innerHTML += `
// //                 <article class="product__card">
// //                     <div class="product__circle"></div>
// //                     <img src="${escapeHtml(imageUrl)}" class="product__img" alt="${safeName}" onerror="this.src='https://via.placeholder.com/300?text=Error'">
// //                     <h3 class="product__title">${safeName}</h3>
// //                     <span class="product__price">₹${safePrice}</span>
// //                 </article>
// //             `;
// //         });
// //     } catch (error) {
// //         console.error("Failed to load products:", error);
// //         const container = document.getElementById("product-container");
// //         if (container) {
// //             container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #999;'>Error loading products</p>";
// //         }
// //     }
// // }

// // /*================ LOAD PRODUCTS ON PAGE LOAD =================*/
// // if (document.readyState === 'loading') {
// //     document.addEventListener('DOMContentLoaded', loadProducts);
// // } else {
// //     loadProducts();
// // }

// // /*================ TOAST =================*/
// // function showToast(message, type = "success") {
// //     const toast = document.getElementById("toast");
// //     if (!toast) return;

// //     toast.innerText = message;
// //     toast.className = "toast show";

// //     if (type === "error") {
// //         toast.classList.add("error");
// //     }

// //     setTimeout(() => {
// //         toast.classList.remove("show");
// //     }, 3000);
// // }

// // /*=================SHOW ADMIN LINK FOR AUTHENTICATED ADMINS====================*/
// // // Check if user is logged in and has admin role
// // function checkAdminAccess() {
// //     const adminLink = document.getElementById("admin-link");
// //     const authToken = localStorage.getItem("authToken");
// //     const role = localStorage.getItem("role");

// //     if (authToken && role === "ADMIN") {
// //         if (adminLink) {
// //             adminLink.style.display = "block";
// //         }
// //     } else {
// //         if (adminLink) {
// //             adminLink.style.display = "none";
// //         }
// //     }
// // }

// // // Check admin access on page load
// // if (document.readyState === 'loading') {
// //     document.addEventListener('DOMContentLoaded', checkAdminAccess);
// // } else {
// //     checkAdminAccess();
// // }

// // // Listen for storage changes (logout from other tabs)
// // window.addEventListener('storage', checkAdminAccess);


// // const API_BASE_URL = "http://localhost:8080/api";

// // // ----------------------
// // // Load Products
// // // ----------------------
// // async function loadProducts() {
// //     try {
// //         const response = await fetch(`${API_BASE_URL}/products`);

// //         if (!response.ok) {
// //             throw new Error("Failed to load products");
// //         }

// //         const products = await response.json();
// //         const productsContainer = document.getElementById("productsContainer");

// //         productsContainer.innerHTML = "";

// //         products.forEach(product => {
// //             const productCard = document.createElement("div");
// //             productCard.classList.add("product-card");

// //             productCard.innerHTML = `
// //                 <img src="${product.imageUrl}" alt="${product.name}" width="150">
// //                 <h3>${product.name}</h3>
// //                 <p>₹${product.price}</p>
// //                 <p>${product.description || ""}</p>
// //             `;

// //             productsContainer.appendChild(productCard);
// //         });

// //     } catch (error) {
// //         console.error("Error loading products:", error);
// //     }
// // }

// // // ----------------------
// // // Contact Form Submission
// // // ----------------------
// // const contactForm = document.getElementById("contactForm");

// // if (contactForm) {
// //     contactForm.addEventListener("submit", async function (e) {
// //         e.preventDefault();

// //         const email = document.getElementById("contactEmail").value;
// //         const subject = document.getElementById("subject").value;
// //         const message = document.getElementById("message").value;

// //         try {
// //             const response = await fetch(`${API_BASE_URL}/contact`, {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json"
// //                 },
// //                 body: JSON.stringify({
// //                     email,
// //                     subject,
// //                     message
// //                 })
// //             });

// //             if (!response.ok) {
// //                 throw new Error("Failed to send message");
// //             }

// //             alert("Message sent successfully");
// //             contactForm.reset();

// //         } catch (error) {
// //             alert(error.message);
// //         }
// //     });
// // }

// // // ----------------------
// // // Newsletter Subscription
// // // ----------------------
// // const subscribeForm = document.getElementById("subscribeForm");

// // if (subscribeForm) {
// //     subscribeForm.addEventListener("submit", async function (e) {
// //         e.preventDefault();

// //         const email = document.getElementById("subscribeEmail").value;

// //         try {
// //             const response = await fetch(`${API_BASE_URL}/subscribe`, {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json"
// //                 },
// //                 body: JSON.stringify({ email })
// //             });

// //             if (!response.ok) {
// //                 throw new Error("Subscription failed");
// //             }

// //             alert("Subscribed successfully");
// //             subscribeForm.reset();

// //         } catch (error) {
// //             alert(error.message);
// //         }
// //     });
// // }

// // // ----------------------
// // // Show Admin Link If Logged In
// // // ----------------------
// // function showAdminLink() {
// //     const role = localStorage.getItem("role");
// //     const adminLink = document.getElementById("adminLink");

// //     if (role === "ADMIN" && adminLink) {
// //         adminLink.style.display = "block";
// //     }
// // }

// // // ----------------------
// // // Initialize
// // // ----------------------
// // document.addEventListener("DOMContentLoaded", function () {
// //     loadProducts();
// //     showAdminLink();
// // });

// /*=============== SHOW MENU ===============*/
// const navMenu = document.getElementById('nav-menu'),
//       navToggle = document.getElementById('nav-toggle'),
//       navClose = document.getElementById('nav-close');

// if (navToggle) {
//     navToggle.addEventListener('click', () => {
//         navMenu.classList.add('show-menu');
//     });
// }

// if (navClose) {
//     navClose.addEventListener('click', () => {
//         navMenu.classList.remove('show-menu');
//     });
// }

// /*=============== REMOVE MENU MOBILE ===============*/
// const navLink = document.querySelectorAll('.nav__link');

// function linkAction() {
//     navMenu.classList.remove('show-menu');
// }
// navLink.forEach(n => n.addEventListener('click', linkAction));

// /*=============== CHANGE BACKGROUND HEADER ===============*/
// function scrollHeader() {
//     const header = document.getElementById('header');
//     if (window.scrollY >= 80) {
//         header.classList.add('scroll-header');
//     } else {
//         header.classList.remove('scroll-header');
//     }
// }
// window.addEventListener('scroll', scrollHeader);

// /*=============== QUESTIONS ACCORDION ===============*/
// const accordionItems = document.querySelectorAll('.questions__item');

// accordionItems.forEach((item) => {
//     const accordionHeader = item.querySelector('.questions__header');

//     accordionHeader.addEventListener('click', () => {
//         const openItem = document.querySelector('.accordion-open');

//         if (openItem && openItem !== item) {
//             toggleItem(openItem);
//         }

//         toggleItem(item);
//     });
// });

// function toggleItem(item) {
//     const accordionContent = item.querySelector('.questions__content');

//     if (item.classList.contains('accordion-open')) {
//         accordionContent.style.height = null;
//         item.classList.remove('accordion-open');
//     } else {
//         accordionContent.style.height = accordionContent.scrollHeight + 'px';
//         item.classList.add('accordion-open');
//     }
// }

// /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// const sections = document.querySelectorAll('section[id]');

// function scrollActive() {
//     const scrollY = window.pageYOffset;

//     sections.forEach(current => {
//         const sectionHeight = current.offsetHeight;
//         const sectionTop = current.offsetTop - 58;
//         const sectionId = current.getAttribute('id');
//         const navItem = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

//         if (navItem) {
//             if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
//                 navItem.classList.add('active-link');
//             } else {
//                 navItem.classList.remove('active-link');
//             }
//         }
//     });
// }
// window.addEventListener('scroll', scrollActive);

// /*=============== SHOW SCROLL UP ===============*/
// function scrollUp() {
//     const scrollUp = document.getElementById('scroll-up');
//     if (window.scrollY >= 400) {
//         scrollUp.classList.add('show-scroll');
//     } else {
//         scrollUp.classList.remove('show-scroll');
//     }
// }
// window.addEventListener('scroll', scrollUp);

// /*=============== DARK LIGHT THEME (DEFAULT DARK) ===============*/
// const themeButton = document.getElementById('theme-button');
// const darkTheme = 'dark-theme';
// const iconTheme = 'ri-sun-line';

// const selectedTheme = localStorage.getItem('selected-theme');

// if (!selectedTheme || selectedTheme === 'dark') {
//     document.body.classList.add(darkTheme);
//     if (themeButton) themeButton.classList.add(iconTheme);
// } else {
//     document.body.classList.remove(darkTheme);
//     if (themeButton) themeButton.classList.remove(iconTheme);
// }

// if (themeButton) {
//     themeButton.addEventListener('click', () => {
//         document.body.classList.toggle(darkTheme);
//         themeButton.classList.toggle(iconTheme);

//         localStorage.setItem(
//             'selected-theme',
//             document.body.classList.contains(darkTheme) ? 'dark' : 'light'
//         );
//     });
// }

// /*=============== SCROLL REVEAL ANIMATION ===============*/
// const sr = ScrollReveal({
//     origin: 'top',
//     distance: '60px',
//     duration: 2500,
//     delay: 400
// });

// sr.reveal('.home__data');
// sr.reveal('.home__img', { delay: 500 });
// sr.reveal('.home__social', { delay: 600 });
// sr.reveal('.about__img, .contact__box', { origin: 'left' });
// sr.reveal('.about__data, .contact__form', { origin: 'right' });
// sr.reveal('.steps__card, .product__card, .questions__group, .footer', { interval: 100 });

// /*================ CONTACT FORM SUBMISSION =================*/
// document.getElementById("contact-form")?.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const data = {
//         email: document.getElementById("email").value,
//         subject: document.getElementById("subject").value,
//         message: document.getElementById("message").value
//     };

//     try {
//         const response = await fetch("http://localhost:8080/api/contact", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data)
//         });

//         const result = await response.text();
//         showToast(result, "success");
//         document.getElementById("contact-form").reset();

//     } catch (error) {
//         showToast("Failed to send message", "error");
//     }
// });

// /*================ NEWSLETTER SUBSCRIBE =================*/
// document.getElementById("subscribe-btn")?.addEventListener("click", async function () {
//     const email = document.getElementById("subscriber-email").value;

//     try {
//         const response = await fetch("http://localhost:8080/api/subscribe", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email })
//         });

//         const result = await response.text();
//         showToast(result, "success");
//         document.getElementById("subscriber-email").value = "";

//     } catch (error) {
//         showToast("Subscription failed", "error");
//     }
// });

// /*================ ESCAPE HTML TO PREVENT XSS =================*/
// function escapeHtml(text) {
//     const div = document.createElement('div');
//     div.textContent = text;
//     return div.innerHTML;
// }

// /*================ LOAD PRODUCTS FROM BACKEND API =================*/
// async function loadProducts() {
//     try {
//         const response = await fetch("http://localhost:8080/api/products", {
//             method: "GET",
//             headers: { "Content-Type": "application/json" }
//         });

//         if (!response.ok) {
//             throw new Error("Failed to fetch products");
//         }

//         const products = await response.json();
//         const container = document.getElementById("product-container") || document.getElementById("productsContainer");
//         if (!container) return;

//         container.innerHTML = "";

//         if (!Array.isArray(products) || products.length === 0) {
//             container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #999;'>No products available</p>";
//             return;
//         }

//         products.forEach(product => {
//             const imageUrl = product.imageUrl
//                 ? `http://localhost:8080${product.imageUrl}`
//                 : "https://via.placeholder.com/300?text=No+Image";

//             const productCard = document.createElement("article");
//             productCard.classList.add("product__card");

//             productCard.innerHTML = `
//                 <div class="product__circle"></div>
//                 <img src="${escapeHtml(imageUrl)}" class="product__img" alt="${escapeHtml(product.name)}" onerror="this.src='https://via.placeholder.com/300?text=Error'">
//                 <h3 class="product__title">${escapeHtml(product.name)}</h3>
//                 <span class="product__price">₹${parseFloat(product.price).toFixed(2)}</span>
//             `;

//             container.appendChild(productCard);
//         });

//     } catch (error) {
//         console.error("Failed to load products:", error);
//         const container = document.getElementById("product-container") || document.getElementById("productsContainer");
//         if (container) {
//             container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #999;'>Error loading products</p>";
//         }
//     }
// }

// /*================ LOAD PRODUCTS ON PAGE LOAD =================*/
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', loadProducts);
// } else {
//     loadProducts();
// }

// /*================ TOAST =================*/
// function showToast(message, type = "success") {
//     const toast = document.getElementById("toast");
//     if (!toast) return;

//     toast.innerText = message;
//     toast.className = "toast show";

//     if (type === "error") {
//         toast.classList.add("error");
//     }

//     setTimeout(() => {
//         toast.classList.remove("show");
//     }, 3000);
// }

// /*================ SHOW ADMIN LINK FOR AUTHENTICATED ADMINS =================*/
// function checkAdminAccess() {
//     const adminLink = document.getElementById("admin-link");
//     const authToken = localStorage.getItem("authToken");
//     const role = localStorage.getItem("role");

//     if (authToken && role === "ADMIN") {
//         if (adminLink) adminLink.style.display = "block";
//     } else {
//         if (adminLink) adminLink.style.display = "none";
//     }
// }

// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', checkAdminAccess);
// } else {
//     checkAdminAccess();
// }

// window.addEventListener('storage', checkAdminAccess);


/*==========Backend url==========*/
const Backend_URL = "https://finearts-backend-production.up.railway.app";

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
        const response = await fetch(`${Backend_URL}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
        const response = await fetch(`${Backend_URL}/api/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const result = await response.text();
        showToast(result, "success");
        document.getElementById("subscriber-email").value = "";

    } catch (error) {
        showToast("Subscription failed", "error");
    }
});

/*================ ESCAPE HTML TO PREVENT XSS =================*/
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/*================ LOAD PRODUCTS FROM BACKEND API =================*/
async function loadProducts() {
    try {
        const response = await fetch(`${Backend_URL}/api/products`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();
        const container = document.getElementById("product-container") || document.getElementById("productsContainer");
        if (!container) return;

        container.innerHTML = "";

        if (!Array.isArray(products) || products.length === 0) {
            container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #999;'>No products available</p>";
            return;
        }

        products.forEach(product => {
            const imageUrl = product.imageUrl
                ? `${Backend_URL}${product.imageUrl}`
                : "https://via.placeholder.com/300?text=No+Image";

            const productCard = document.createElement("article");
            productCard.classList.add("product__card");

            productCard.innerHTML = `
                <img src="${escapeHtml(imageUrl)}" class="product__img" alt="${escapeHtml(product.name)}" onerror="this.src='https://via.placeholder.com/300?text=Error'">
                <h3 class="product__title">${escapeHtml(product.name)}</h3>
                <span class="product__price">₹${parseFloat(product.price).toFixed(2)}</span>
            `;

            productCard.addEventListener('click', () => {
                window.open(imageUrl, '_blank');
            });

            container.appendChild(productCard);
        });

    } catch (error) {
        console.error("Failed to load products:", error);
        const container = document.getElementById("product-container") || document.getElementById("productsContainer");
        if (container) {
            container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #999;'>Error loading products</p>";
        }
    }
}

/*================ LOAD PRODUCTS ON PAGE LOAD =================*/
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProducts);
} else {
    loadProducts();
}

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

/*================ SHOW ADMIN LINK FOR AUTHENTICATED ADMINS =================*/
function checkAdminAccess() {
    const adminLink = document.getElementById("admin-link");
    const authToken = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");

    if (authToken && role === "ADMIN") {
        if (adminLink) adminLink.style.display = "block";
    } else {
        if (adminLink) adminLink.style.display = "none";
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAdminAccess);
} else {
    checkAdminAccess();
}

window.addEventListener('storage', checkAdminAccess);