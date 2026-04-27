/* ============================================
   CONFIGURATION - BACKEND API URL
   ============================================ */
const API_BASE_URL = "https://finearts-backend-production.up.railway.app/api";

/* ============================================
   DOM ELEMENTS
   ============================================ */
const loginContainer = document.getElementById("login-container");
const dashboardContainer = document.getElementById("dashboard-container");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const adminNameDisplay = document.getElementById("admin-name");
const resetFormBtn = document.getElementById("reset-form-btn");
const loadingSpinner = document.getElementById("loading");

/* ============================================
   STATE MANAGEMENT
   ============================================ */
let authToken = localStorage.getItem("authToken");
let adminEmail = localStorage.getItem("adminEmail");


// ============================================
// VALIDATE TOKEN ON PAGE LOAD
// ============================================
async function validateToken() {
    if (!authToken) {
        showLoginPage();
        return;
    }

    try {
        // hit a protected endpoint to verify token is still valid
        const response = await fetch(`${API_BASE_URL}/admin/test`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            showDashboard();
            loadProducts();
        } else {
            // token expired or invalid — force logout
            forceLogout();
        }

    } catch (error) {
        forceLogout();
    }
}

function forceLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminName");
    localStorage.removeItem("role");
    authToken = null;
    adminEmail = null;
    showLoginPage();
}

/* ============================================
   INITIALIZATION
   ============================================ */
// function initializeApp() {
//     if (authToken && adminEmail) {
//         showDashboard();
//         loadProducts();
//     } else {
//         showLoginPage();
//     }
// }

function initializeApp() {
    if (authToken && adminEmail) {
        validateToken(); // validate instead of blindly showing dashboard
    } else {
        showLoginPage();
    }
}

/* ============================================
   LOGIN / LOGOUT HANDLERS
   ============================================ */
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;
    const errorMsg = document.getElementById("login-error");

    try {
        errorMsg.classList.remove("show");
        errorMsg.textContent = "";

        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();

        // Store auth token and admin info
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("adminEmail", data.email);
        localStorage.setItem("adminName", data.name || email);
        localStorage.setItem("role", "ADMIN");

        authToken = data.token;
        adminEmail = data.email;

        loginForm.reset();
        showDashboard();
        loadProducts();

    } catch (error) {
        console.error("Login error:", error);
        errorMsg.textContent = error.message || "Login failed. Please check credentials.";
        errorMsg.classList.add("show");
    }
});

// logoutBtn.addEventListener("click", () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("adminEmail");
//     localStorage.removeItem("adminName");
//     localStorage.removeItem("role");
    
//     authToken = null;
//     adminEmail = null;
    
//     showLoginPage();
//     loginForm.reset();
// });

logoutBtn.addEventListener("click", () => {
    forceLogout();
    loginForm.reset();
});

/* ============================================
   UI VISIBILITY FUNCTIONS
   ============================================ */
function showLoginPage() {
    loginContainer.classList.add("show");
    dashboardContainer.classList.remove("show");
}

function showDashboard() {
    loginContainer.classList.remove("show");
    dashboardContainer.classList.add("show");
    adminNameDisplay.textContent = localStorage.getItem("adminName") || "Admin";
}

/* ============================================
   LOAD PRODUCTS
   ============================================ */
async function loadProducts() {
    try {
        showLoadingSpinner(true);

        const response = await fetch(`${API_BASE_URL}/products`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();
        renderProductList(products);

    } catch (error) {
        console.error("Error loading products:", error);
        showMessage("Failed to load products", "error");
    } finally {
        showLoadingSpinner(false);
    }
}

/* ============================================
   RENDER PRODUCT LIST
   ============================================ */
function renderProductList(products) {
    productList.innerHTML = "";

    if (products.length === 0) {
        productList.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #718096; padding: 40px;'>No products yet. Add your first product!</p>";
        return;
    }

    products.forEach(product => {
        const card = createProductCard(product);
        productList.appendChild(card);
    });
}

/* ============================================
   CREATE PRODUCT CARD
   ============================================ */
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    
    // const imageUrl = product.imageUrl || "https://via.placeholder.com/80?text=No+Image";
    const imageUrl = product.imageUrl 
    ? product.imageUrl 
    : "https://via.placeholder.com/80?text=No+Image";
    
    card.innerHTML = `
        <div class="product-info">
            <img src="${imageUrl}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h3>${escapeHtml(product.name)}</h3>
                ${product.description ? `<p>${escapeHtml(product.description)}</p>` : ''}
                <p class="product-price">₹${product.price.toFixed(2)}</p>
            </div>
        </div>
        <div class="product-actions">
            <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
            <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
    `;

    return card;
}

/* ============================================
   ADD / UPDATE PRODUCT
   ============================================ */
productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("product-id").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const imageFile = document.getElementById("image").files[0];

    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        
        if (imageFile) {
            formData.append("image", imageFile);
        }

        const url = id ? `${API_BASE_URL}/products/${id}` : `${API_BASE_URL}/products`;
        const method = id ? "PUT" : "POST";

        const response = await fetch(url, {
            method: method,
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const message = id ? "Product updated successfully!" : "Product created successfully!";
        showMessage(message, "success");
        
        productForm.reset();
        document.getElementById("product-id").value = "";
        
        loadProducts();

    } catch (error) {
        console.error("Error saving product:", error);
        showMessage(error.message || "Failed to save product", "error");
    }
});

/* ============================================
   EDIT PRODUCT
   ============================================ */
async function editProduct(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch product details");
        }

        const product = await response.json();

        document.getElementById("product-id").value = product.id;
        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("description").value = product.description || "";

        // Scroll to form
        productForm.scrollIntoView({ behavior: "smooth" });

    } catch (error) {
        console.error("Error fetching product:", error);
        showMessage("Failed to load product details", "error");
    }
}

/* ============================================
   DELETE PRODUCT
   ============================================ */
async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        showMessage("Product deleted successfully!", "success");
        loadProducts();

    } catch (error) {
        console.error("Error deleting product:", error);
        showMessage("Failed to delete product", "error");
    }
}

/* ============================================
   RESET FORM
   ============================================ */
resetFormBtn.addEventListener("click", () => {
    productForm.reset();
    document.getElementById("product-id").value = "";
});

/* ============================================
   HELPER FUNCTIONS
   ============================================ */

// Show/hide loading spinner
function showLoadingSpinner(show) {
    if (show) {
        loadingSpinner.classList.add("show");
    } else {
        loadingSpinner.classList.remove("show");
    }
}

// Show notification messages
function showMessage(message, type = "success") {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Insert before the list section
    const listSection = document.querySelector(".list-section");
    listSection.insertBefore(messageDiv, listSection.firstChild);

    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}



/* ============================================
   INITIALIZE APP ON LOAD
   ============================================ */
document.addEventListener("DOMContentLoaded", initializeApp);