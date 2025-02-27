# User Management API

A RESTful API for managing users with JWT-based authentication, role-based access control, input validation using Joi, and basic unit tests with Jest and Supertest.

## Features

- **Authentication:** Signup and login endpoints with JWT token generation.
- **User CRUD Operations:** Create, read, update, and delete users.
- **Role-Based Access:** Only admins can delete users.
- **Validation:** Input validation using Joi.
- **Testing:** Automated tests with Jest and Supertest.

## Setup Instructions

### 1. Clone the Repository

Clone the repository and navigate to the project directory:

git clone <repository_url>
cd user-management-api

### 2. Install Dependencies

Install the required packages:

npm install

### 3. Configure Environment Variables

Create a .env file in the project root with the following content:

PORT=5001
MONGO_URI=mongodb://localhost:27017/user_api
JWT_SECRET=your_generated_secret_here

    Tip: Generate a secure JWT secret by running:

    node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"

Replace your_generated_secret_here with the generated secret.

### 4. Running the Application

``` bash
npm run dev
```

### 5. API Endpoints
Authentication Endpoints

```bash
    Signup:
    POST /api/auth/signup
    Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Login:
POST /api/auth/login
Body:

{
  "email": "john@example.com",
  "password": "password123"
}

On success, you'll receive a JWT token in the response:

    {
      "token": "your_jwt_token_here"
    }

Protected User CRUD Endpoints

    Note: Include the JWT token in the Authorization header as:

    Authorization: Bearer <your_jwt_token_here>

    Create User:
    POST /api/users
    Body:

{
  "name": "Alice Doe",
  "email": "alice@example.com",
  "role": "admin"
}

Get All Users:
GET /api/users

Get Single User:
GET /api/users/:id

Update User:
PUT /api/users/:id
Body:

    {
      "name": "Alice Updated",
      "email": "alice_updated@example.com",
      "role": "user"
    }

    Delete User (Admin Only):
    DELETE /api/users/:id
    Only an admin user token can perform this operation.

```

### 6. Testing the API

Manual Testing with Postman

    For Protected Routes:
    Log in to obtain a JWT token, then add it in Postman's Authorization tab (choose Bearer Token) or in the Headers tab:

    Authorization: Bearer <your_jwt_token_here>

    Role Testing:
        Create or update a user to have the role "admin" (either manually in the database or via a temporary signup modification).
        Test the DELETE user endpoint with an admin token versus a non-admin token.

Automated Testing

Run the unit tests with:

```bash
npm test
```

Ensure MongoDB is running, and tests will verify:

    Authentication (signup and login).
    Role-based access (admin vs. non-admin).
    CRUD operations and validation.
