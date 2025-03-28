# React User Management App

## 📌 Assignment Overview
This project is a React application that integrates with the Reqres API to perform basic user management functions. It includes authentication, user listing, pagination, and user modification functionalities.

To test this, use the following credentials:
- **Email:** `eve.holt@reqres.in`
- **Password:** `cityslicka`

## 🚀 Features
### **Level 1: Authentication Screen**
- A basic login screen where users can authenticate using credentials.
- Uses the following API endpoint for authentication:
  ```
  POST /api/login
  ```
- On successful login:
  - The API returns a **token**, which is stored in local storage.
  - The user is redirected to the **Users List** page.

### **Level 2: List All Users**
- After authentication, users are displayed in a paginated list.
- API endpoint to fetch user data:
  ```
  GET /api/users?page=1
  ```
- Displays:
  - First Name
  - Last Name
  - Avatar
- Implements **pagination** for navigating through different pages of users.
- **Filter Users**: Users can be filtered by their **name**.

### **Level 3: Edit, Delete, and Update Users**
#### **Edit User**
- Clicking the **Edit** button opens a form pre-filled with user data.
- Allows updating the following fields:
  - First Name
  - Last Name
  - Email
- API endpoint for updating user details:
  ```
  PUT /api/users/{id}
  ```
- **Confirmation Modal**: Before saving the changes, a modal appears asking for confirmation.

#### **Delete User**
- Clicking the **Delete** button removes the user from the list.
- API endpoint for deleting a user:
  ```
  DELETE /api/users/{id}
  ```
- **Confirmation Modal**: Before deleting, a modal asks the user for confirmation.
- Displays success or error messages based on the operation outcome.

### **Logout Functionality**
- A **Logout** button is available in the Navbar.
- Clicking **Logout**:
  - Clears the authentication token from local storage.
  - Redirects the user to the **Login** page.

## 🛠️ Technology Used
- **React.js** - Frontend framework
- **Tailwind CSS** - For styling
- **Redux** - State management
- **React Router DOM** - For navigation
- **Axios** - API requests handling

## 📦 Dependencies
To run this project locally, install the following dependencies:
```sh
npm i react-icons react-router-dom react-redux
```

## 🌍 Deployment
The project is deployed on **Netlify**.
🔗 [Live Demo](#) (Replace with actual Netlify link)

## 📷 Screenshots
(Include relevant screenshots here)

## ⚡ How to Run the Project
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/react-user-management.git
cd react-user-management
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Run the Application
```sh
npm start
```
The app will run on **`http://localhost:3000`**.

## 🎯 Future Improvements
- Implement user search functionality.
- Improve UI with additional animations.
- Add user role-based authentication.

## 📝 License
This project is licensed under the MIT License.
