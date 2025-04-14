# 📝 Task Manager APP

This is a **scalable** and **secure** RESTful API designed for task management with **user authentication**, built using **React.js** **Node.js**, **Express**, **MongoDB**, **bcryptjs**, and **JWT**.

## 🚀 Tech Stack
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.13.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9AUTH-FF9900?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-3.x-00B5E2?style=for-the-badge&logo=bcrypt&logoColor=white)


<img src="https://github.com/user-attachments/assets/e0fce4b2-4f6c-4a41-a2a4-5db93e2b16a7" width="950" alt="Task-Signup">
<p align="center">
  <img src="https://static.vecteezy.com/system/resources/previews/012/628/921/large_2x/red-down-arrow-3d-png.png" width="150" style="display: inline-block; margin-right: 10;">
  <img src="https://static.vecteezy.com/system/resources/previews/012/628/921/large_2x/red-down-arrow-3d-png.png" width="150" style="display: inline-block;">
</p>

<img src="https://github.com/user-attachments/assets/88642508-222d-49e4-aaef-6234b569fc6d" width="950" alt="Task-management">


## ✨ Features

- 🔐 JWT Authentication (Register/Login)
- ✅ CRUD Operations for Tasks
- 🔒 Route Protection Middleware
- 🛡️ Password Hashing with Bcrypt
- 🌐 CORS Enabled for Frontend
- 📝 Input Validation
- ⚡ Error Handling

# API Documentation

## 📚 Authentication

| Endpoint        | Method | Description            |
|-----------------|--------|------------------------|
| `/api/register` | POST   | Register new user      |
| `/api/login`    | POST   | Login existing user    |

## Tasks (Authenticated)

| Endpoint               | Method | Description        |
|------------------------|--------|--------------------|
| `/api/tasks`           | POST   | Create new task    |
| `/api/tasks`           | GET    | Get all user tasks |
| `/api/tasks/:id`       | GET    | Get single task    |
| `/api/tasks/:id`       | PATCH  | Update task        |
| `/api/tasks/:id`       | DELETE | Delete task        |
