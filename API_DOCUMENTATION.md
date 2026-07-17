# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a JWT token in the cookie named `token`.

### Headers
```
Content-Type: application/json
```

---

## Authentication Routes (No Admin Required)

### 1. Register User
- **URL:** `/auth/register`
- **Method:** `POST`
- **Auth Required:** No
- **Description:** Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": 1712345678
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registration successful",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": 1712345678,
    "role": "user"
  }
}
```

---

### 2. Login
- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth Required:** No
- **Description:** Login user and get token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login Successful",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "shop": "shop_id_or_null"
  }
}
```

---

### 3. Get Current User
- **URL:** `/auth/me`
- **Method:** `GET`
- **Auth Required:** Yes (Token required)
- **Description:** Get current logged in user info

**Response:**
```json
{
  "success": true,
  "message": "User found",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "shop": "shop_id_or_null"
    }
  }
}
```

---

## Admin Routes (Admin Required)

All routes below require:
1. Valid JWT token in cookie
2. User role must be "admin"

---

## Shop Management Routes

### 4. Create Shop
- **URL:** `/admin/create-shop`
- **Method:** `POST`
- **Auth Required:** Yes (Admin)
- **Description:** Create a new shop

**Request Body:**
```json
{
  "name": "My Shop",
  "address": "123 Main Street",
  "type": "retail"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Shop created successfully",
  "data": {
    "_id": "shop_id",
    "userId": "user_id",
    "name": "My Shop",
    "address": "123 Main Street",
    "type": "retail"
  }
}
```

---

### 5. Update Shop
- **URL:** `/admin/update-shop/:id`
- **Method:** `PATCH`
- **Auth Required:** Yes (Admin)
- **Description:** Update shop information

**URL Parameters:**
- `id` - Shop ID

**Request Body:**
```json
{
  "name": "Updated Shop Name",
  "address": "456 New Street",
  "type": "wholesale"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Shop updated successfully",
  "data": {
    "_id": "shop_id",
    "userId": "user_id",
    "name": "Updated Shop Name",
    "address": "456 New Street",
    "type": "wholesale"
  }
}
```

---

### 6. Delete Shop
- **URL:** `/admin/delete-shop/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Admin)
- **Description:** Delete a shop

**URL Parameters:**
- `id` - Shop ID

**Response:**
```json
{
  "success": true,
  "message": "Shop was deleted"
}
```

---

### 7. Get All Shops
- **URL:** `/admin/get-shops/:id`
- **Method:** `GET`
- **Auth Required:** Yes (Admin)
- **Description:** Get all shops for a user

**URL Parameters:**
- `id` - User ID

**Response:**
```json
{
  "success": true,
  "message": "Shops found",
  "data": [
    {
      "_id": "shop_id",
      "userId": "user_id",
      "name": "My Shop",
      "address": "123 Main Street",
      "type": "retail"
    }
  ]
}
```

---

## Employee Management Routes (Admin)

### 8. Register Employee
- **URL:** `/admin/register-employe`
- **Method:** `POST`
- **Auth Required:** Yes (Admin)
- **Description:** Register a new employee and assign to a shop

**Request Body:**
```json
{
  "name": "Employee Name",
  "email": "employee@example.com",
  "password": "password123",
  "phone": 1712345678,
  "role": "user",
  "shop": "shop_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "_id": "employee_id",
    "name": "Employee Name",
    "email": "employee@example.com",
    "phone": 1712345678,
    "role": "user",
    "shop": "shop_id"
  }
}
```

---

### 9. Update Employee
- **URL:** `/admin/update-employe/:id`
- **Method:** `PATCH`
- **Auth Required:** Yes (Admin)
- **Description:** Update employee information

**URL Parameters:**
- `id` - Employee ID

**Request Body:**
```json
{
  "name": "Updated Name",
  "role": "user",
  "shop": "shop_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "_id": "employee_id",
    "name": "Updated Name",
    "role": "user",
    "shop": "shop_id"
  }
}
```

---

### 10. Delete Employee
- **URL:** `/admin/delete-employe/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Admin)
- **Description:** Delete an employee

**URL Parameters:**
- `id` - Employee ID

**Response:**
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

---

### 11. Get All Employees (Admin)
- **URL:** `/admin/get-employees`
- **Method:** `GET`
- **Auth Required:** Yes (Admin)
- **Description:** Get all employees across all shops

**Response:**
```json
{
  "success": true,
  "message": "Employees found",
  "data": [
    {
      "_id": "employee_id",
      "name": "Employee Name",
      "email": "employee@example.com",
      "phone": 1712345678,
      "role": "user",
      "shop": "shop_id"
    }
  ]
}
```

---

## Product Management Routes (Admin)

### 12. Create Product
- **URL:** `/admin/create-product`
- **Method:** `POST`
- **Auth Required:** Yes (Admin)
- **Description:** Create a new product

**Request Body:**
```json
{
  "name": "Product Name",
  "buyingPrice": 100,
  "sellingPrice": 150,
  "sku": "SKU001",
  "company": "Company Name",
  "quantity": 50
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "product_id",
    "shopId": "shop_id",
    "name": "Product Name",
    "buyingPrice": 100,
    "sellingPrice": 150,
    "sku": "SKU001",
    "company": "Company Name",
    "quantity": 50,
    "status": "in-stock"
  }
}
```

---

### 13. Update Product
- **URL:** `/admin/update-product/:id`
- **Method:** `PATCH`
- **Auth Required:** Yes (Admin)
- **Description:** Update product information

**URL Parameters:**
- `id` - Product ID

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "sellingPrice": 180,
  "quantity": 45
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "product_id",
    "name": "Updated Product Name",
    "sellingPrice": 180,
    "quantity": 45
  }
}
```

---

### 14. Delete Product
- **URL:** `/admin/delete-product/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Admin)
- **Description:** Delete a product

**URL Parameters:**
- `id` - Product ID

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "_id": "product_id"
  }
}
```

---

### 15. Get All Products (Admin)
- **URL:** `/admin/get-products`
- **Method:** `GET`
- **Auth Required:** Yes (Admin)
- **Description:** Get all products for the logged-in admin's shop

**Response:**
```json
{
  "success": true,
  "message": "Products found",
  "data": [
    {
      "_id": "product_id",
      "shopId": "shop_id",
      "name": "Product Name",
      "buyingPrice": 100,
      "sellingPrice": 150,
      "sku": "SKU001",
      "company": "Company Name",
      "quantity": 50,
      "status": "in-stock"
    }
  ]
}
```

---

### 16. Get Single Product
- **URL:** `/admin/get-product/:id`
- **Method:** `GET`
- **Auth Required:** Yes (Admin)
- **Description:** Get a single product by ID

**URL Parameters:**
- `id` - Product ID

**Response:**
```json
{
  "success": true,
  "message": "Product found",
  "data": {
    "_id": "product_id",
    "shopId": "shop_id",
    "name": "Product Name",
    "buyingPrice": 100,
    "sellingPrice": 150,
    "sku": "SKU001",
    "company": "Company Name",
    "quantity": 50,
    "status": "in-stock"
  }
}
```

---

## Sale Management Routes (Admin)

### 17. Create Sale
- **URL:** `/admin/create-sale`
- **Method:** `POST`
- **Auth Required:** Yes (Admin)
- **Description:** Create a new sale

**Request Body:**
```json
{
  "productId": "product_id",
  "customerName": "Customer Name",
  "customerPhone": "01712345678",
  "customerAddress": "Customer Address",
  "totalPrice": 5000,
  "status": "paid",
  "dueAmount": 0
}
```

**Status Values:**
- `paid` - Fully paid
- `unpaid` - Not paid at all
- `partial` - Partially paid

**Response:**
```json
{
  "success": true,
  "message": "Sale created successfully",
  "data": {
    "_id": "sale_id",
    "shopId": "shop_id",
    "productId": "product_id",
    "customerName": "Customer Name",
    "customerPhone": "01712345678",
    "customerAddress": "Customer Address",
    "totalPrice": 5000,
    "status": "paid",
    "dueAmount": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 18. Update Sale
- **URL:** `/admin/update-sale/:id`
- **Method:** `PATCH`
- **Auth Required:** Yes (Admin)
- **Description:** Update sale information

**URL Parameters:**
- `id` - Sale ID

**Request Body:**
```json
{
  "status": "partial",
  "dueAmount": 2000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Sale updated successfully",
  "data": {
    "_id": "sale_id",
    "status": "partial",
    "dueAmount": 2000
  }
}
```

---

### 19. Delete Sale
- **URL:** `/admin/delete-sale/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Admin)
- **Description:** Delete a sale

**URL Parameters:**
- `id` - Sale ID

**Response:**
```json
{
  "success": true,
  "message": "Sale deleted successfully",
  "data": {
    "_id": "sale_id"
  }
}
```

---

### 20. Get All Sales (Admin)
- **URL:** `/admin/get-sales`
- **Method:** `GET`
- **Auth Required:** Yes (Admin)
- **Description:** Get all sales for the logged-in admin's shop

**Response:**
```json
{
  "success": true,
  "message": "Sales found",
  "data": [
    {
      "_id": "sale_id",
      "shopId": "shop_id",
      "productId": "product_id",
      "customerName": "Customer Name",
      "customerPhone": "01712345678",
      "totalPrice": 5000,
      "status": "paid",
      "dueAmount": 0
    }
  ]
}
```

---

### 21. Get Single Sale
- **URL:** `/admin/get-sale/:id`
- **Method:** `GET`
- **Auth Required:** Yes (Admin)
- **Description:** Get a single sale by ID

**URL Parameters:**
- `id` - Sale ID

**Response:**
```json
{
  "success": true,
  "message": "Sale found",
  "data": {
    "_id": "sale_id",
    "shopId": "shop_id",
    "productId": "product_id",
    "customerName": "Customer Name",
    "customerPhone": "01712345678",
    "customerAddress": "Customer Address",
    "totalPrice": 5000,
    "status": "paid",
    "dueAmount": 0
  }
}
```

---

### 22. Get Due Sales (Admin)
- **URL:** `/admin/get-due-sales`
- **Method:** `GET`
- **Auth Required:** Yes (Admin)
- **Description:** Get all sales with pending payments (status: partial) for admin's shop

**Response:**
```json
{
  "success": true,
  "message": "Due sales found",
  "data": [
    {
      "_id": "sale_id",
      "shopId": "shop_id",
      "productId": "product_id",
      "customerName": "Customer Name",
      "customerPhone": "01712345678",
      "totalPrice": 5000,
      "status": "partial",
      "dueAmount": 2000
    }
  ]
}
```

---

### 23. Update Due Sale
- **URL:** `/admin/update-due-sale/:id`
- **Method:** `PATCH`
- **Auth Required:** Yes (Admin)
- **Description:** Update a due sale (mark as paid or update due amount)

**URL Parameters:**
- `id` - Sale ID

**Request Body:**
```json
{
  "status": "paid",
  "dueAmount": 0
}
```

**Response:**
```json
{
  "success": true,
  "message": "Due sale updated successfully",
  "data": {
    "_id": "sale_id",
    "status": "paid",
    "dueAmount": 0
  }
}
```

---

### 24. Get All Users (Admin Only)
- **URL:** `/admin/get-all-users`
- **Method:** `GET`
- **Auth Required:** Yes (Admin)
- **Description:** Get all users across all shops (admin, owner, user roles)

**Response:**
```json
{
  "success": true,
  "message": "All users found",
  "data": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": 1712345678,
      "role": "admin",
      "shop": {
        "_id": "shop_id",
        "name": "My Shop",
        "address": "123 Main Street",
        "type": "retail"
      }
    }
  ]
}
```

---

## Shop Routes (Token Required - Auto Shop Detection)

All routes below require:
1. Valid JWT token in cookie
2. User must have a shop assigned (or be admin)
3. **For admin users:** Data is fetched for the admin's own shop
4. **For shop users (owner/user):** Data is automatically filtered by their assigned shop

---

### 25. Create Product (Shop)
- **URL:** `/shop/create-product`
- **Method:** `POST`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Create a product for your shop

**Request Body:**
```json
{
  "name": "Product Name",
  "buyingPrice": 100,
  "sellingPrice": 150,
  "sku": "SKU001",
  "company": "Company Name",
  "quantity": 50
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "product_id",
    "shopId": "shop_id",
    "name": "Product Name",
    "buyingPrice": 100,
    "sellingPrice": 150,
    "sku": "SKU001",
    "company": "Company Name",
    "quantity": 50,
    "status": "in-stock"
  }
}
```

---

### 26. Update Product (Shop)
- **URL:** `/shop/update-product/:id`
- **Method:** `PATCH`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Update a product in your shop

**URL Parameters:**
- `id` - Product ID

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "sellingPrice": 180,
  "quantity": 45
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "product_id",
    "name": "Updated Product Name",
    "sellingPrice": 180,
    "quantity": 45
  }
}
```

---

### 27. Delete Product (Shop)
- **URL:** `/shop/delete-product/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Delete a product from your shop

**URL Parameters:**
- `id` - Product ID

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "_id": "product_id"
  }
}
```

---

### 28. Get All Products (Shop)
- **URL:** `/shop/get-products`
- **Method:** `GET`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Get all products for your shop

**Response:**
```json
{
  "success": true,
  "message": "Products found",
  "data": [
    {
      "_id": "product_id",
      "shopId": "shop_id",
      "name": "Product Name",
      "buyingPrice": 100,
      "sellingPrice": 150,
      "sku": "SKU001",
      "company": "Company Name",
      "quantity": 50,
      "status": "in-stock"
    }
  ]
}
```

---

### 29. Get Single Product (Shop)
- **URL:** `/shop/get-product/:id`
- **Method:** `GET`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Get a single product by ID from your shop

**URL Parameters:**
- `id` - Product ID

**Response:**
```json
{
  "success": true,
  "message": "Product found",
  "data": {
    "_id": "product_id",
    "shopId": "shop_id",
    "name": "Product Name",
    "buyingPrice": 100,
    "sellingPrice": 150,
    "sku": "SKU001",
    "company": "Company Name",
    "quantity": 50,
    "status": "in-stock"
  }
}
```

---

### 30. Create Sale (Shop)
- **URL:** `/shop/create-sale`
- **Method:** `POST`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Create a new sale for your shop

**Request Body:**
```json
{
  "productId": "product_id",
  "customerName": "Customer Name",
  "customerPhone": "01712345678",
  "customerAddress": "Customer Address",
  "totalPrice": 5000,
  "status": "paid",
  "dueAmount": 0
}
```

**Status Values:**
- `paid` - Fully paid
- `unpaid` - Not paid at all
- `partial` - Partially paid

**Response:**
```json
{
  "success": true,
  "message": "Sale created successfully",
  "data": {
    "_id": "sale_id",
    "shopId": "shop_id",
    "productId": "product_id",
    "customerName": "Customer Name",
    "customerPhone": "01712345678",
    "customerAddress": "Customer Address",
    "totalPrice": 5000,
    "status": "paid",
    "dueAmount": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 31. Update Sale (Shop)
- **URL:** `/shop/update-sale/:id`
- **Method:** `PATCH`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Update a sale in your shop

**URL Parameters:**
- `id` - Sale ID

**Request Body:**
```json
{
  "status": "partial",
  "dueAmount": 2000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Sale updated successfully",
  "data": {
    "_id": "sale_id",
    "status": "partial",
    "dueAmount": 2000
  }
}
```

---

### 32. Delete Sale (Shop)
- **URL:** `/shop/delete-sale/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Delete a sale from your shop

**URL Parameters:**
- `id` - Sale ID

**Response:**
```json
{
  "success": true,
  "message": "Sale deleted successfully",
  "data": {
    "_id": "sale_id"
  }
}
```

---

### 33. Get All Sales (Shop)
- **URL:** `/shop/get-sales`
- **Method:** `GET`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Get all sales for your shop

**Response:**
```json
{
  "success": true,
  "message": "Sales found",
  "data": [
    {
      "_id": "sale_id",
      "shopId": "shop_id",
      "productId": "product_id",
      "customerName": "Customer Name",
      "customerPhone": "01712345678",
      "totalPrice": 5000,
      "status": "paid",
      "dueAmount": 0
    }
  ]
}
```

---

### 34. Get Single Sale (Shop)
- **URL:** `/shop/get-sale/:id`
- **Method:** `GET`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Get a single sale by ID from your shop

**URL Parameters:**
- `id` - Sale ID

**Response:**
```json
{
  "success": true,
  "message": "Sale found",
  "data": {
    "_id": "sale_id",
    "shopId": "shop_id",
    "productId": "product_id",
    "customerName": "Customer Name",
    "customerPhone": "01712345678",
    "customerAddress": "Customer Address",
    "totalPrice": 5000,
    "status": "paid",
    "dueAmount": 0
  }
}
```

---

### 35. Get Due Sales (Shop)
- **URL:** `/shop/get-due-sales`
- **Method:** `GET`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Get all due sales (partial payments) for your shop

**Response:**
```json
{
  "success": true,
  "message": "Due sales found",
  "data": [
    {
      "_id": "sale_id",
      "shopId": "shop_id",
      "productId": "product_id",
      "customerName": "Customer Name",
      "customerPhone": "01712345678",
      "totalPrice": 5000,
      "status": "partial",
      "dueAmount": 2000
    }
  ]
}
```

---

### 36. Update Due Sale (Shop)
- **URL:** `/shop/update-due-sale/:id`
- **Method:** `PATCH`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Update a due sale in your shop

**URL Parameters:**
- `id` - Sale ID

**Request Body:**
```json
{
  "status": "paid",
  "dueAmount": 0
}
```

**Response:**
```json
{
  "success": true,
  "message": "Due sale updated successfully",
  "data": {
    "_id": "sale_id",
    "status": "paid",
    "dueAmount": 0
  }
}
```

---

### 37. Get Employees (Shop)
- **URL:** `/shop/get-employees`
- **Method:** `GET`
- **Auth Required:** Yes (Token + Shop Access)
- **Description:** Get all employees assigned to your shop

**Response:**
```json
{
  "success": true,
  "message": "Employees found",
  "data": [
    {
      "_id": "employee_id",
      "name": "Employee Name",
      "email": "employee@example.com",
      "phone": 1712345678,
      "role": "user",
      "shop": "shop_id"
    }
  ]
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Error message here"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorize can not find token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Notes for Frontend Developer

1. **Authentication:** Store the JWT token received from login/register in cookies. The backend will automatically read it from cookies.

2. **Admin Routes:** All routes under `/admin/*` require:
   - Valid JWT token
   - User role must be "admin"

3. **Shop Routes:** All routes under `/shop/*` require:
   - Valid JWT token
   - User must have a shop assigned (or be admin)
   - Data is automatically scoped to the user's shop

4. **Response Format:** All responses follow this structure:
   ```json
   {
     "success": true/false,
     "message": "Message here",
     "data": {} // or []
   }
   ```

5. **Product Status Values:**
   - `in-stock` - Product is available
   - `out-of-stock` - Product is not available
   - `discontinued` - Product is discontinued

6. **Sale Status Values:**
   - `paid` - Fully paid
   - `unpaid` - Not paid
   - `partial` - Partially paid (due sale)

7. **Due Sales:** Sales with `status: "partial"` are considered due sales.

8. **Shop Association:** Products and Sales are automatically associated with the shop of the logged-in user.

9. **User Roles:**
   - `admin` - Full access to all admin routes and can view all shops data
   - `owner` - Shop owner, can access their own shop data via `/shop/*` routes
   - `user` - Regular employee, can access their assigned shop data via `/shop/*` routes

10. **Admin vs Shop Routes:**
    - Use `/admin/*` routes for admin-level operations (creating shops, managing all employees, etc.)
    - Use `/shop/*` routes for day-to-day shop operations (managing products, sales, employees of your shop)
    - Admin users can use both `/admin/*` and `/shop/*` routes

---

## Complete Route Summary

### Public Routes (No Auth)
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user

### Protected Routes (Token Required)
- `GET /auth/me` - Get current user

### Admin Routes (Admin Required)
**Shop Management:**
- `POST /admin/create-shop` - Create shop
- `PATCH /admin/update-shop/:id` - Update shop
- `DELETE /admin/delete-shop/:id` - Delete shop
- `GET /admin/get-shops/:id` - Get all shops for a user

**Employee Management:**
- `POST /admin/register-employe` - Register employee
- `PATCH /admin/update-employe/:id` - Update employee
- `DELETE /admin/delete-employe/:id` - Delete employee
- `GET /admin/get-employees` - Get all employees (all shops)

**Product Management:**
- `POST /admin/create-product` - Create product
- `PATCH /admin/update-product/:id` - Update product
- `DELETE /admin/delete-product/:id` - Delete product
- `GET /admin/get-products` - Get all products
- `GET /admin/get-product/:id` - Get single product

**Sale Management:**
- `POST /admin/create-sale` - Create sale
- `PATCH /admin/update-sale/:id` - Update sale
- `DELETE /admin/delete-sale/:id` - Delete sale
- `GET /admin/get-sales` - Get all sales
- `GET /admin/get-sale/:id` - Get single sale
- `GET /admin/get-due-sales` - Get due sales
- `PATCH /admin/update-due-sale/:id` - Update due sale

**User Management:**
- `GET /admin/get-all-users` - Get all users across all shops

### Shop Routes (Token + Shop Access Required)
**Product Management:**
- `POST /shop/create-product` - Create product for your shop
- `PATCH /shop/update-product/:id` - Update product in your shop
- `DELETE /shop/delete-product/:id` - Delete product from your shop
- `GET /shop/get-products` - Get all products for your shop
- `GET /shop/get-product/:id` - Get single product from your shop

**Sale Management:**
- `POST /shop/create-sale` - Create sale for your shop
- `PATCH /shop/update-sale/:id` - Update sale in your shop
- `DELETE /shop/delete-sale/:id` - Delete sale from your shop
- `GET /shop/get-sales` - Get all sales for your shop
- `GET /shop/get-sale/:id` - Get single sale from your shop
- `GET /shop/get-due-sales` - Get due sales for your shop
- `PATCH /shop/update-due-sale/:id` - Update due sale in your shop

**Employee Management:**
- `GET /shop/get-employees` - Get employees for your shop