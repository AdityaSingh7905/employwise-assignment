# 📌 User Management System
A React-based User Management System that allows users to view, update, and delete users. The app integrates with the ReqRes API for fetching and managing user data, and features pagination, validation, and a responsive UI.

## 🚀 Live Demo
🔗 Vercel Deployment Link:  (https://employwise-assignment-five.vercel.app/login)

## ⚡ Features  
✅ **View Users** – Displays a paginated list of users fetched from the ReqRes API.  
✅ **Edit User** – Update user details like email, first name, and last name.  
✅ **Delete User** – Remove users from the list with a confirmation modal.  
✅ **Pagination** – Navigate between pages using "Next" & "Previous" buttons.  
✅ **Real-Time Updates** – Changes (edits & deletions) reflect instantly.  
✅ **Responsive UI** – Works on all screen sizes (desktop, tablet, mobile).  

## 🛠 Tech Stack
**Frontend** : React.js, Tailwind CSS, React Router
**State Management** : Context API
**API** : ReqRes (https://reqres.in/)

## 📂 Project Setup
Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
**git clone (https://github.com/AdityaSingh7905/employwise-assignment)**
**cd employwise-assignment**

### 2️⃣ Install Dependencies
**npm install**

### 3️⃣ Start the Development Server
**npm start**
The app will be available at http://localhost:3000.

### 🔄 How to Use
**View Users** – The homepage lists all users with pagination.
**Edit User** – Click the "Edit" button → Update details → Click "Save".
**Delete User** – Click "Delete" → Confirm deletion in the modal.
**Pagination** – Click "Next" or "Previous" to navigate pages.

## API Endpoints  
| **Action**      | **Method** | **Endpoint**                            |
|----------------|-----------|-----------------------------------------|
| Get Users     | `GET`     | `https://reqres.in/api/users?page=1`   |
| Update User   | `PUT`     | `https://reqres.in/api/users/:id`      |
| Delete User   | `DELETE`  | `https://reqres.in/api/users/:id`      |
