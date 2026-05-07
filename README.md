<div align="center">
  <img src="./frontend/public/vite.svg" alt="Logo" width="80" height="80">
  <h1 align="center">HackerPulse: MERN Web Scraper</h1>

  <p align="center">
    A beautifully designed, full-stack MERN application that automatically scrapes top stories from Hacker News.
    <br />
    <br />
    <a href="#features"><strong>Explore the features »</strong></a>
    <br />
  </p>
</div>

---

## ⚡ Overview

HackerPulse is a robust mini full-stack application built for the DACBY Full Stack Developer Assignment. It demonstrates seamless integration between a Node.js backend and a React frontend, featuring real-time web scraping, secure JWT authentication, and an aesthetically premium UI.

## 🚀 Key Features

- **🕸️ Automated Web Scraper:** Utilizes `axios` and `cheerio` to fetch the top 10 stories from Hacker News automatically on server start and via a manual API trigger.
- **🔐 Secure Authentication:** Complete JWT-based registration and login flow using `bcryptjs` for password hashing.
- **🔖 Bookmark System:** Users can save their favorite stories to a personalized, protected dashboard.
- **🎨 Premium UI/UX:** Built with React, Vite, and Tailwind CSS (v4), featuring dark mode, glassmorphism elements, and smooth micro-animations.
- **📱 Fully Responsive:** Optimized layout ensuring a flawless experience across mobile, tablet, and desktop devices.
- **🗄️ Database Integration:** Scalable MongoDB schema design utilizing Mongoose ORM.

## 🛠️ Technology Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS v4** (Utility-first styling)
- **React Router DOM** (Navigation)
- **Context API** (Global state management)
- **Lucide React** (Icons)

### Backend
- **Node.js & Express.js** (REST API architecture)
- **MongoDB & Mongoose** (Database & ODM)
- **Cheerio & Axios** (Web scraping capabilities)
- **JSON Web Tokens (JWT)** (Secure stateless authentication)

---

## 💻 Local Setup Instructions

Follow these steps to run the project locally on your machine.

### 1. Clone the repository
\`\`\`bash
git clone <your-repository-url>
cd DACBY_Assignment
\`\`\`

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
\`\`\`bash
cd backend
npm install
\`\`\`

Create a `.env` file in the `backend` directory with the following variables:
\`\`\`env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key
\`\`\`

Start the backend server:
\`\`\`bash
npm run dev
\`\`\`
*(The server will run on http://localhost:5000 and automatically scrape the initial top 10 stories).*

### 3. Frontend Setup
Open a **new terminal window**, navigate to the frontend directory, and install dependencies:
\`\`\`bash
cd frontend
npm install
\`\`\`

Start the frontend Vite development server:
\`\`\`bash
npm run dev
\`\`\`
*(The application will be accessible at http://localhost:5173).*

---

## 📡 API Endpoints Documentation

### Authentication Routes
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| \`POST\` | \`/api/auth/register\` | Register a new user | Public |
| \`POST\` | \`/api/auth/login\` | Authenticate user & receive JWT token | Public |

### Story & Scraper Routes
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| \`GET\` | \`/api/stories\` | Fetch all scraped stories (Supports pagination e.g., \`?page=1&limit=10\`) | Public |
| \`GET\` | \`/api/stories/:id\` | Fetch a single story by ID | Public |
| \`POST\` | \`/api/stories/:id/bookmark\`| Toggle story bookmark for the authenticated user | **Private** |
| \`POST\` | \`/api/scrape\` | Manually trigger the Hacker News scraper | Public |

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
