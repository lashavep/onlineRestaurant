# 🍽️ Online Restaurant Management System

Full‑stack project built with **Angular (frontend)** and **ASP.NET Core (backend)**.  
This repository contains both parts of the system in one place for easier management and presentation.

---

## 📂 Project Structure
├── backend/        # ASP.NET Core Web API
├── frontend/       # Angular application
├── .gitignore
└── README.md

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (for Angular)
- [Angular CLI](https://angular.io/cli)
- [.NET 6/7 SDK](https://dotnet.microsoft.com/download)

---

### 🔧 Backend (ASP.NET Core)
```bash
cd backend
dotnet restore
dotnet run

👉 Default URL: https://localhost:5001 or http://localhost:5000

🎨 Frontend (Angular)
bash
cd frontend
npm install
ng serve
👉 Open in browser: http://localhost:4200

⚙️ Configuration
Update API base URL in frontend/src/environments/environment.ts:

ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};


📑 Features
User registration & login
Menu browsing & order placement
Real‑time notifications (SignalR)
Admin dashboard for restaurant management
Basket management & order status tracking
Clean UI/UX with Angular Material



🛡️ .gitignore
This project ignores:

node_modules/
dist/
.angular/cache/
bin/, obj/, .vs/

👨‍💻 Author
Developed by ლაშა  
Tech stack: Angular, TypeScript, ASP.NET Core, SQL Server

📜 License
Licensed under the MIT License.
