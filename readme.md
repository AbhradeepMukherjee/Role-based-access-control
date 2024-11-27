# Project Title: 

Role-Based Access Control

## Problem Statement:

Design and implement a secure system that ensures proper user authentication, assigns roles to authenticated users, and enforces access control based on these roles. The system should demonstrate a robust understanding and practical application of Authentication, Authorization, and Role-Based Access Control (RBAC) principles to prevent unauthorized access and maintain data integrity.

### Backend Endpoints to check using Postman: 

auth routes to test:
- register as admin
- register as editor 
- register as viewer
- login as admin
- login as editor
- login as viewer
- login with wrong credentials
- login with no credentials
- register with same username
- register with password smaller than 8 digits
- register with username starting with number
- register with role being something other than "Admin", "Editor", "Viewer"
- verify email 
- forget password
- logout 

user routes to test:
- get users using admin account
- get users using editor/viewer account
- change password
- promote role of a user using an admin account
- demote role of a user using an admin account
- promote or demote a user using an editor/viewer account

post routes to test:
- get all the posts using editor/viewer/admin accounts
- create a post using admin/editor account
- create a post using viewer account
- create a post without a title or content
- delete a post using admin account
- delete a post using an editor/viewer account