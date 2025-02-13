```
 _       __               _            _                ___
| |     / /_  ___      __(_)__  ____  (_)___  ____  ___/__ \
| | /| / / / / / | /| / / / _ \/_  / / / __ \/ __ \/ _ \/ _/
| |/ |/ / /_/ /| |/ |/ / /  __/ / /_/ / /_/ / / / /  __/_/
|__/|__/\__, / |__/|__/_/\___/ /___/_/\____/_/ /_/\___(_)
       /____/
```
# Wywiezione?
is a web and mobile application that enables residents to track waste collection status in real-time, report issues, and manage schedules. Workers have access to a task panel, and administrators can efficiently manage teams and schedules.

## Technologies Used
The project utilizes the following tech stack:

### Frontend
- [Next.js](https://nextjs.org/) – Modern React framework for SSR and SPA
- TypeScript – Ensures type safety
- Bootstrap – Styling and UI components

### Backend
- [NestJS](https://nestjs.com/) – Scalable Node.js framework
- Express.js – HTTP request handling
- MySQL (via [mysql2](https://www.npmjs.com/package/mysql2)) – Database connection

### Database
- MariaDB (XAMPP)(for now)

## Features
- [x] Real-time waste tracking
- [x] User authentication (JWT)
- [x] Secure password hashing (argon2)
- [x] Admin dashboard for managing users

### Security
- [argon2](https://www.npmjs.com/package/argon2) – Secure password hashing
- JWT (JSON Web Token) – User authentication
- CORS – Restrict unauthorized API access

## Automated VS Code Tasks
This repository includes a **VS Code task configuration** (`.vscode/tasks.json`) to automate the **installation of dependencies** and **running the application**.

### Available Tasks
1. **Install all dependencies** (Runs `npm install` for both `client/` and `server/`)
2. **Start XAMPP (Apache & MySQL)**
3. **Start Backend (NestJS)**
4. **Start Frontend (Next.js)**
5. **Open the application in the browser (`http://localhost:3000`)**

### How to use the tasks in VS Code
1. Open **VS Code**.
2. Press **`Ctrl + Shift + P`** (or **`Cmd + Shift + P`** on macOS).
3. Select **"Tasks: Run Task"**.
4. Choose **"Install Dependencies"** to install all packages.
5. Select **"Run Full Stack"** to start the application.
