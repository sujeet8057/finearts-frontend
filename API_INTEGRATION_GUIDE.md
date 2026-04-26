# Frontend API Integration Guide

## Overview
This frontend has been updated to include **admin authentication** and **product management** that fetches data from your backend API. Only authenticated admins can add, edit, or delete products.

---

## 🔧 Configuration

### Backend API URL
The API base URL is set in `admin.js`:
```javascript
const API_BASE_URL = "http://localhost:8080/api";
```

**Change this URL to match your backend server.**

---

## 📋 API Endpoints Required

Your backend must implement these endpoints:

### 1. **Admin Login** (POST)
```
POST /api/admin/login
Headers: Content-Type: application/json
Body: {
  "email": "admin@example.com",
  "password": "password123"
}

Response (200 OK): {
  "token": "jwt_token_here",
  "email": "admin@example.com",
  "name": "Admin Name"
}

Response (401): Plain text error message
```

### 2. **Get All Products** (GET)
```
GET /api/products
Headers: 
  - Authorization: Bearer <token>
  - Content-Type: application/json

Response (200 OK): [
  {
    "id": 1,
    "name": "Product Name",
    "price": 999.99,
    "description": "Product description",
    "imageUrl": "https://..."
  },
  ...
]
```

### 3. **Get Single Product** (GET)
```
GET /api/products/:id
Headers:
  - Authorization: Bearer <token>
  - Content-Type: application/json

Response (200 OK): {
  "id": 1,
  "name": "Product Name",
  "price": 999.99,
  "description": "Product description",
  "imageUrl": "https://..."
}
```

### 4. **Create Product** (POST)
```
POST /api/products
Headers:
  - Authorization: Bearer <token>
  - Content-Type: multipart/form-data

FormData:
  - name: "Product Name"
  - price: "999.99"
  - description: "Product description"
  - image: <file> (optional)

Response (200 OK): Plain text success message
```

### 5. **Update Product** (PUT)
```
PUT /api/products/:id
Headers:
  - Authorization: Bearer <token>
  - Content-Type: multipart/form-data

FormData:
  - name: "Updated Name"
  - price: "1299.99"
  - description: "Updated description"
  - image: <file> (optional)

Response (200 OK): Plain text success message
```

### 6. **Delete Product** (DELETE)
```
DELETE /api/products/:id
Headers:
  - Authorization: Bearer <token>
  - Content-Type: application/json

Response (200 OK): Plain text success message
```

### 7. **Contact Form** (POST)
```
POST /api/contact
Headers: Content-Type: application/json
Body: {
  "email": "user@example.com",
  "subject": "Subject",
  "message": "Message content"
}

Response (200 OK): Plain text success message
```

### 8. **Newsletter Subscribe** (POST)
```
POST /api/subscribe
Headers: Content-Type: application/json
Body: {
  "email": "subscriber@example.com"
}

Response (200 OK): Plain text success message
```

---

## 🔐 Authentication Flow

### Admin Login Process
1. User visits `/admin.html`
2. Login form appears
3. User enters email and password
4. Frontend sends credentials to `/api/admin/login`
5. Backend validates and returns JWT token
6. Frontend stores token in `localStorage`:
   - `authToken`: JWT token for API calls
   - `adminEmail`: Admin's email
   - `adminName`: Admin's name
   - `role`: "ADMIN"
7. Dashboard is displayed
8. All subsequent API calls include `Authorization: Bearer <token>` header

### Token Usage
Every authenticated request includes the token:
```javascript
headers: {
    "Authorization": `Bearer ${authToken}`,
    "Content-Type": "application/json"
}
```

---

## 📁 File Structure

```
frontend/
├── index.html              # Main website
├── admin.html              # Admin dashboard (login + product management)
├── admin.js                # Admin panel logic (AUTH + CRUD)
├── admin.css               # Admin panel styles
├── assets/
│   ├── js/
│   │   ├── main.js         # Main page logic (product loading)
│   │   └── scrollreveal.min.js
│   ├── css/
│   │   └── stylesold.css
│   └── images/
└── API_INTEGRATION_GUIDE.md
```

---

## 🎯 Key Features

### Admin Panel Features
✅ **Authentication Login**: Email/password login with JWT tokens
✅ **Add Products**: Create new products with image upload
✅ **Edit Products**: Update existing product details
✅ **Delete Products**: Remove products from catalog
✅ **Product List**: View all products in dashboard
✅ **Logout**: Secure logout that clears session

### Main Website Features
✅ **Dynamic Product Loading**: Products fetched from backend API
✅ **Admin Link**: Only visible to authenticated admins
✅ **Contact Form**: Send messages via API
✅ **Newsletter**: Subscribe via API
✅ **Responsive Design**: Works on mobile and desktop

---

## 🚀 How to Use

### For Admins

#### 1. Access Admin Panel
- Navigate to `/admin.html`
- Login with admin credentials

#### 2. Add New Product
1. Fill in product name
2. Enter price (₹)
3. Add description (optional)
4. Upload product image (optional)
5. Click "Save Product"

#### 3. Edit Product
1. Click "Edit" button on any product
2. Form will populate with product details
3. Make changes
4. Click "Save Product"

#### 4. Delete Product
1. Click "Delete" button on product
2. Confirm deletion
3. Product is removed

#### 5. Logout
- Click "Logout" button in top right
- You'll be returned to login page

### For Regular Users

#### 1. Browse Products
- Products load automatically on homepage
- Fetched from backend API

#### 2. Contact Business
- Fill contact form on homepage
- Sent via `/api/contact` endpoint

#### 3. Subscribe Newsletter
- Enter email in footer
- Stored via `/api/subscribe` endpoint

---

## 📝 Code Examples

### Fetching Products (main.js)
```javascript
async function loadProducts() {
    const response = await fetch("http://localhost:8080/api/products");
    const products = await response.json();
    // Render products...
}
```

### Admin Login (admin.js)
```javascript
const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
});

const data = await response.json();
localStorage.setItem("authToken", data.token);
```

### Creating Product (admin.js)
```javascript
const formData = new FormData();
formData.append("name", name);
formData.append("price", price);
formData.append("image", imageFile);

const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${authToken}` },
    body: formData
});
```

---

## 🔒 Security Features

✅ **JWT Authentication**: Secure token-based authentication
✅ **Authorization Headers**: Token required for admin operations
✅ **HTML Escaping**: Prevents XSS attacks
✅ **Session Storage**: Tokens cleared on logout
✅ **Cross-Tab Logout**: Logout in one tab affects all tabs
✅ **Input Validation**: Form validation on frontend

---

## ⚠️ Important Notes

1. **CORS**: Ensure your backend allows CORS from your frontend domain
2. **API URL**: Update `API_BASE_URL` in `admin.js` to match your backend
3. **Token Expiry**: Implement token refresh logic if using short-lived tokens
4. **Image Upload**: Ensure backend handles multipart/form-data
5. **Error Handling**: Backend should return meaningful error messages
6. **HTTPS**: Use HTTPS in production for secure token transmission

---

## 🐛 Troubleshooting

### "Failed to load products"
- Check if backend API is running
- Verify API URL is correct
- Check browser console for CORS errors

### "Login failed. Please check credentials"
- Verify admin credentials are correct
- Check if backend login endpoint is working
- Verify `admin/login` endpoint path

### "Failed to save product"
- Check if token is valid (not expired)
- Verify image file is correct format
- Check backend file upload limits

### Admin link not showing
- Ensure token is stored in localStorage
- Check if role is set to "ADMIN"
- Clear browser cache and reload

---

## 📞 API Testing

Use **Postman** or **Thunder Client** to test endpoints:

1. **Test Login**
   - POST: `http://localhost:8080/api/admin/login`
   - Body: `{ "email": "...", "password": "..." }`

2. **Get Products**
   - GET: `http://localhost:8080/api/products`
   - Header: `Authorization: Bearer <token>`

3. **Create Product**
   - POST: `http://localhost:8080/api/products`
   - Form-Data with image
   - Header: `Authorization: Bearer <token>`

---

## 🎓 Next Steps

1. Set up your backend with the required endpoints
2. Update `API_BASE_URL` in `admin.js`
3. Test login functionality
4. Test product CRUD operations
5. Deploy to production
6. Monitor API logs for errors

---

**Created**: April 2024
**Version**: 2.0
**Status**: Production Ready
