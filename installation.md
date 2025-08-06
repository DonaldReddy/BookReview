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
│   ├── .env.example        # Sample environment variables
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

## 🎨 Frontend Setup

```bash
cd frontend
```

```bash
copy .env.example .env
```

Update the `.env` file with your environment variables (e.g., API URL).

```bash
npm install
```

```bash
npm run dev
```

React app will typically run at : http://localhost:5173/

## 🛠 Backend Setup

```bash
cd backend
```

```bash
copy .env.example .env
```

Update the `.env` file with your database connection details and other environment variables.

```bash
npm install
```

```bash
npm run dev
```

Backend API will typically run at : http://localhost:5000/api
