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

1. Login:
![Screenshot from 2024-11-29 21-13-13](https://github.com/user-attachments/assets/41a7086f-0848-4100-baef-8d5bcff2b4ee)

3. Register:
![Screenshot from 2024-11-29 21-13-19](https://github.com/user-attachments/assets/9721d87f-8feb-4966-b46c-aea72642ed01)

4. Forgot Password:
  ![Screenshot from 2024-11-29 21-13-27](https://github.com/user-attachments/assets/de9b064c-099b-43a0-a391-b09136f9d437)

5. Admin:
   a. dashboard:
 ![Screenshot from 2024-11-29 21-13-48](https://github.com/user-attachments/assets/b0355db7-fa06-4a06-9427-441f04cb3822)
   b. modify user's roles (only admin):
 ![Screenshot from 2024-11-29 21-13-53](https://github.com/user-attachments/assets/7f013208-68cb-4669-a0fe-33ef864ea68b)
   c. change password:
   ![Screenshot from 2024-11-29 21-14-00](https://github.com/user-attachments/assets/6f3d2700-ec62-4717-83e0-7abc28508408)
   d. write blog(for admin and users):
   ![Screenshot from 2024-11-29 21-14-13](https://github.com/user-attachments/assets/cfd6d242-7d11-4eaa-9d79-2c58b93ec17e)



7. Editor:
   a. dashboard:
    ![Screenshot from 2024-11-29 21-14-57](https://github.com/user-attachments/assets/57177062-12d2-4d1a-b1a5-1e19b1374d46)
   b. change password:
   ![Screenshot from 2024-11-29 21-41-39](https://github.com/user-attachments/assets/e1d4d3c8-5e35-48e4-8448-be7a4385add8)
   c. write blog:
   ![Screenshot from 2024-11-29 21-42-15](https://github.com/user-attachments/assets/1e7302ef-f3e4-414f-80c0-cddcc41c2291)


9. Viewer:  
   a. dashboard:
   ![Screenshot from 2024-11-29 21-22-26](https://github.com/user-attachments/assets/db1d2220-0777-4c07-a3f7-8247e64fe85a)
   b. change password:
   ![Screenshot from 2024-11-29 21-22-31](https://github.com/user-attachments/assets/fc1f9fb1-2f7c-4565-97e6-c7aaeeca73ce)


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

