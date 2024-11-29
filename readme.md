# **Role-Based Access Control**

## **Table of Contents**
1. [Problem Statement](#problem-statement)  
2. [Tech Stack](#tech-stack)  
3. [Thought Process](#thought-process)  
4. [Project Overview](#project-overview)  
5. [API Walkthrough](#api-walkthrough)  
6. [Frontend Walkthrough](#frontend-walkthrough)  
7. [Testing APIs](#testing-apis)  
8. [Screenshots](#screenshots)  
9. [Potential Improvements](#potential-improvements)  

---

## **Problem Statement**

Design and implement a secure system that ensures proper user authentication, assigns roles to authenticated users, and enforces access control based on these roles. The system demonstrates a robust understanding and practical application of Authentication, Authorization, and Role-Based Access Control (RBAC) principles to prevent unauthorized access and maintain data integrity.

---

## **Tech Stack**

The technologies and tools used to build the project are:

- **Frontend:** React.js, Material-UI, Axios  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** JWT
- **Testing:** Postman  
- **DDOS protection:** Cloudfare Turnstile
---

## **Project Overview**

This project is a secure blog management system that uses **RBAC** to allow users with different roles (Admin, Editor, Viewer) to perform specific actions. Here's how it works:

1. **Admin**: Full control over posts and users.  
2. **Editor**: Can create and edit posts but cannot manage users.  
3. **Viewer**: Can view posts but cannot create or delete posts.

The system ensures:
- Only authenticated users can access the platform.  
- Role-based access control enforces restrictions at both API and UI levels.  

---

## **API Walkthrough**

### **Auth Routes**
1. **Registration**:
   - Register as Admin, Editor, or Viewer.  
   - Validate usernames, passwords, and roles.  
2. **Login**:
   - Ensure credentials are correct.  
   - Handle edge cases like missing or incorrect credentials.  
3. **Email Verification** and **Password Recovery**:
   - Verify email addresses upon registration.  
   - Provide a "forgot password" feature.  

### **User Routes**
- Retrieve all users (Admin-only feature).  
- Update roles for users (Admin-only feature).  
- Change password (accessible to all roles).  

### **Post Routes**
- CRUD operations on blog posts:
- Admins and Editors can create posts.
- Admins can delete posts, but Editors and Viewers cannot.
 

---

## **Frontend Walkthrough**

### **Pages**
1. **Login**: Users can log in with their credentials.  
2. **Register**: New users can sign up and select a role.  
3. **Forgot Password**: Reset password functionality.  
4. **Change Password**: Securely update user passwords.  
5. **Manage Users**: Admin-only page to view and manage all users.  
6. **Dashboard**:  
   - **Admin**: Can view, create, and delete posts; manage users.  
   - **Editor**: Can view and create posts.  
   - **Viewer**: Can only view posts.

---

## **Testing APIs**

### **Auth Routes**
- Register and login tests, covering valid, invalid, and edge cases.  
- Logout functionality.  
- Forgot password and email verification workflows.  

### **User Routes**
- Test different role-based functionalities using Admin, Editor, and Viewer accounts.  

### **Post Routes**
- CRUD operations under different roles to ensure RBAC enforcement.  

---

## **Screenshots**

Include screenshots of different parts of the app:
1. Admin:  

2. Editor:

3. Viewer:  

---

## **Potential Improvements**

1. **Performance Optimization**:  
   - Use caching for frequent API requests.  
   - Optimize database queries.  
2. **UI/UX Enhancements**:  
   - Add animations for transitions.  
   - Provide better error messages and feedback.  
3. **Feature Additions**:  
   - Implement two-factor authentication.  
   - Allow Editors to suggest posts for Admin approval.  
4. **Deploy the website**

---

