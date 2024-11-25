---

# **JWT Authentication and Role-Based Access Control (RBAC)**  

This project demonstrates the implementation of secure **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)** using **Node.js** and **Express**. It features user registration, login, and secure access to resources based on roles such as **Admin**, **Moderator**, and **User**.  

## **Key Features**  

1. **User Registration**:
   - Accepts user details and stores them in the database.  
   - Passwords are salted and hashed using a secure algorithm before storage.  

2. **User Login**:  
   - Authenticates users based on email and password.  
   - Generates a JSON Web Token (JWT) for authenticated users to manage sessions securely.  

3. **Role-Based Access Control (RBAC)**:
   - Roles (e.g., Admin, Moderator, User) are assigned to users and stored in the database.  
   - Middleware functions (`isAdmin` and `isModerator`) validate user roles to authorize access to protected routes.  

4. **JWT-Based Session Management**:  
   - Secure JWT tokens are used for managing user sessions.  

5. **Postman Testing**:  
   - All routes and functionalities were tested thoroughly using **Postman**, a powerful API testing tool.  

## **Technologies Used**  

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB 
- **Authentication**: JWT (JSON Web Tokens)  
- **Security**: bcrypt for password hashing  
- **Testing Tool**: Postman  

## **Folder Structure**  

```
project-root/
├── controllers/
│   └── userController.js         # Handles user authentication logic
├── middlewares/
│   ├── asyncHandler.js                # Middleware to verify admin role
│   └── authmiddleware.js            # Middleware to verify moderator role
├── models/
│   └── userModel.js              # User schema and model
├── routes/
│   └── userRoutes.js             # Authentication and RBAC-related routes
├── config/
│   └── db.js                     # Database connection setup
├── utils/
│   └── createToken.js             # JWT generation and verification helpers
├── index.js                        # Main application entry point
└── package.json                  # Project dependencies and scripts
```  

## **Endpoints**  

### **Authentication**  

1. **Register User**  
   - **POST** `/`  
   - **Request Body**:  
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "role": "User"
     }
     ```  

2. **Login User**  
   - **POST** `/auth`  
   - **Request Body**:  
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```  
   - **Response**:  
     ```json
     {
       "token": "eyJhbGciOiJIUzI1NiIs..."
     }
     ```  
   2. **Logout User**  
   - **POST** `/logout`    

### **Protected Routes**  

1. **Access Admin Dashboard**  
   - **GET** `/admin/dashboard`  
   - **Middleware**: `isAdmin`  
   - **Description**: Only accessible to users with the `Admin` role.  

2. **Access Moderator Panel**  
   - **GET** `/moderator/panel`  
   - **Middleware**: `isModerator`  
   - **Description**: Only accessible to users with the `Moderator` role.  

### **Middleware Details**  

1. **`isAdmin` Middleware**  
   - Verifies if the user's role is `Admin`.  
   - Checks the role stored in the database.  

2. **`isModerator` Middleware**  
   - Verifies if the user's role is `Moderator` or higher.  
   - Ensures only users with appropriate permissions can proceed.  

## **Postman Testing**  

All routes and functionalities were tested using **Postman**. Below is the procedure followed:  

1. **Setting Up Authorization**:  
   - JWT tokens generated during login were copied and added to the **Authorization** tab in Postman as a **Bearer Token**.  

2. **Testing Registration**:  
   - The `/register` endpoint was tested with valid and invalid payloads to ensure validation and user creation work properly.  

3. **Testing Login**:  
   - The `/login` endpoint was tested with valid and invalid credentials to ensure proper authentication.  

4. **Testing Protected Routes**:  
   - Using the token generated during login, protected routes such as `/admin/dashboard` and `/moderator/panel` were accessed.  
   - Different tokens were used to verify role-based access control (e.g., Admin and Moderator roles).  

5. **Edge Cases**:  
   - Testing with expired tokens, invalid tokens, and requests without tokens to ensure proper error handling.  

## **Security Measures**  

1. **Password Hashing**:  
   - Passwords are salted and hashed using bcrypt before storing in the database.  

2. **JWT Tokens**:  
   - Used for secure session management.  
   - Tokens include expiration to prevent misuse.  

3. **Environment Variables**:  
   - Sensitive information such as JWT secret and database URI is stored in environment variables.  

## **Setup Instructions**  

1. Clone the repository:  
   ```bash
   git clone <repository-url>
   ```  

2. Install dependencies:  
   ```bash
   npm install
   ```  

3. Configure environment variables:  
   Create a `.env` file in the project root and add:  
   ```
   JWT_SECRET=your_jwt_secret
   DB_URI=your_mongo_db_uri
   ```  

4. Start the server:  
   ```bash
   npm start
   ```  

5. Access the API at `http://localhost:5000`.  

## **Conclusion**  

This project demonstrates a fundamental implementation of **Authentication**, **Authorization**, and **RBAC** using **JWT**. It showcases secure practices like password hashing, role-based access, and session management, ensuring a robust foundation for secure systems. **Postman** was used for comprehensive testing, ensuring all functionalities work as intended.  

---  
