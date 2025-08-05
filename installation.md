# 📚 BookReview - INSTALLATION GUIDE

Welcome! This guide walks you through setting up the BookReview project locally for development and testing.

📁 Project Structure

```
BookReview/
├── .github/                # GitHub workflows and configs
├── Backend/                # Backend (Express.js + Prisma)
│   ├── controller/         # Request handlers
│   ├── database/           # DB connection logic
│   ├── middleware/         # Auth and error handling
│   ├── prisma/             # Prisma schema and migrations
│   ├── repository/         # DB query logic (e.g., books, users)
│   ├── routes/             # API route definitions
│   ├── service/            # Business logic
│   ├── utils/              # Helper functions
│   ├── index.js            # Entry point for the server
│   ├── package.json        # Backend dependencies
│   └── package-lock.json
├── Frontend/               # Frontend (React + Tailwind)
│   ├── public/             # Static assets
│   ├── src/                # Main React source code
│   ├── .env.example        # Sample frontend env file
│   ├── eslint.config.js    # ESLint configuration
│   ├── package.json        # Frontend dependencies
│   ├── package-lock.json
│   ├── tsconfig.json       # TypeScript config
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts      # Vite bundler config
├── .gitignore              # Ignore rules
├── CODE_OF_CONDUCT.md      # Contributor behavior rules
├── CONTRIBUTION.md         # Contribution guide
├── README.md               # Main project documentation
└── installation.md         # Local setup instructions

```

---

## 🛠 Prerequisites

Make sure you have the following installed and ready:

- **Node.js** v16 or later (includes `npm`; you can also use **yarn**)
- **Git**
- **PostgreSQL** (for the backend database)
- Optionally:
- **nodemon** (auto-restarts backend server in dev)
- **concurrently** (to run frontend & backend together)
- **Postman** or **Insomnia** for API testing

---

## 🔐 Setting Up Environment Variables

Create .env files in both frontend/ and backend/ directories with the following environment variables.

### Backend(`backend/.env`)

FRONTEND_URL=http://localhost:5173

JWT_SECRET= # add your JWT secret here

PORT=5000

DATABASE_URL= # add your postgresql database URL here
GOOGLE_CLIENT_ID= # your_google_client_id
GOOGLE_CLIENT_SECRET= # your_google_client_secret

AI_KEY= # add your OpenRouter API key here
AI_MODEL= # add your OpenRouter model here (e.g., "gpt-3.5-turbo")

# Email Configuration (for password reset)

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER= # your_gmail_address@gmail.com
EMAIL_PASS= # your_16_character_gmail_app_password
EMAIL_FROM= # your_gmail_address@gmail.com (same as EMAIL_USER)

### Frontend(`frontend/.env`)

VITE_API_BASE_URL=http://localhost:9999
VITE_GOOGLE_CLIENT_ID= # your_google_client_id
VITE_GOOGLE_CLIENT_SECRET= # your_google_client_secret

🚀 Getting Started

1. Clone the Repository
   -> git clone https://github.com/DonaldReddy/BookReview.git
   -> cd BookReview

2. 🧱 Backend Setup
   cd backend

## Install dependencies

npm install

## Start the server

npm run dev

3. 🎨 Frontend Setup
   Navigate to the frontend:
   cd ../frontend

## Install dependencies:

npm install

## Start the development server:

npm start

React app will typically run at : http://localhost:3000/

✅ Verifying Setup

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api

Make sure API routes return valid responses and the frontend connects to the backend.
