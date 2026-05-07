<div align="center">
  <div style="background: linear-gradient(to bottom right, #818cf8, #c084fc); padding: 12px; border-radius: 16px; display: inline-block; margin-bottom: 16px;">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  </div>
  <h1 align="center">HackerPulse: MERN Web Scraper</h1>

  <p align="center">
    A beautifully designed, full-stack MERN application that automatically scrapes top stories from Hacker News.
    <br />
    <br />
    <a href="https://dacby-assignment-sooty.vercel.app"><strong>View Live Demo »</strong></a>
    <br />
  </p>
</div>

---

## ⚡ Overview

HackerPulse is a robust full-stack application built for the DACBY Full Stack Developer Assignment. It demonstrates seamless integration between a Node.js backend and a React frontend, featuring real-time web scraping, secure JWT authentication, and an aesthetically premium UI.

### 🌐 Live Deployments
- **Frontend (Vercel):** [https://dacby-assignment-sooty.vercel.app](https://dacby-assignment-sooty.vercel.app)
- **Backend (Render):** [https://dacby-assignment-ota1.onrender.com](https://dacby-assignment-ota1.onrender.com)

## 🚀 Key Features

- **🕸️ Automated Web Scraper:** Utilizes `axios` and `cheerio` to fetch the top stories from Hacker News automatically on server start and via a manual API trigger.
- **🔐 Secure Authentication:** Complete JWT-based registration, login, and forgot password flow using `bcryptjs` for password hashing.
- **🔖 Bookmark System:** Users can save their favorite stories to a personalized, protected dashboard.
- **🎨 Premium UI/UX:** Built with React, Vite, and Tailwind CSS (v4), featuring dark mode, glassmorphism elements, and smooth micro-animations.
- **📱 Fully Responsive:** Optimized layout ensuring a flawless experience across mobile, tablet, and desktop devices.

## 🛠️ Technology Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS v4** (Utility-first styling)
- **React Router DOM** (Navigation)
- **Context API** (Global state management)

### Backend
- **Node.js & Express.js** (REST API architecture)
- **MongoDB & Mongoose** (Database & ODM)
- **Cheerio & Axios** (Web scraping capabilities)
- **JSON Web Tokens (JWT)** (Secure stateless authentication)

---

## 💻 Local Setup Instructions

Follow these steps to run the project locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Shubham09996/DACBY_Assignment.git
cd DACBY_Assignment
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
```
*(The server will run on http://localhost:5000 and automatically scrape the initial top stories).*

### 3. Frontend Setup
Open a **new terminal window**, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory to connect to the backend:
```env
# Point this to your backend URL. Use localhost for local development.
VITE_API_URL=http://localhost:5000
```

Start the frontend Vite development server:
```bash
npm run dev
```
*(The application will be accessible at http://localhost:5173).*

---

## 📡 API Endpoints Documentation

### Authentication Routes
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | Public |
| `POST` | `/api/auth/forgotpassword` | Generate reset token | Public |
| `PUT`  | `/api/auth/resetpassword/:token` | Reset password using token | Public |

### Story & Scraper Routes
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/stories` | Fetch all scraped stories | Public |
| `POST` | `/api/stories/:id/bookmark`| Toggle story bookmark for the authenticated user | **Private** |
| `POST` | `/api/scrape` | Manually trigger the Hacker News scraper | Public |

---

## ✅ Assignment Requirements Checklist

- [x] Web Scraper developed (fetches Title, URL, Points, Author, Posted Time).
- [x] Scraper runs automatically on server start and is triggerable via API.
- [x] MongoDB database connection established and data is stored properly.
- [x] JWT-based Authentication implemented (`/register`, `/login`).
- [x] Story APIs created (`GET /api/stories`, bookmark functionality).
- [x] React frontend built to display stories and handle user auth.
- [x] Protected Bookmarks page implemented.
- [x] React Context API used for authentication state.
- [x] `.env` utilized for environment variables.
- [x] Clean and scalable folder structure (`routes/`, `models/`, `controllers/`, `middleware/`).
- [x] Properly maintained Git commit history indicating step-by-step progress.

<p align="center">
  <br>
  <i>Designed and built for the DACBY Full Stack Developer Assignment by Shubham Gupta.</i>
</p>
